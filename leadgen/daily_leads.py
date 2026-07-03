# -*- coding: utf-8 -*-
"""Populove 團體製服每日自動獲客腳本。

流程(每日由 GitHub Actions 排程執行,純規則引擎、零 AI 成本):
1. 從經濟部商工行政資料開放平臺下載最新月份的
   「公司設立登記清冊」(新創)與「公司變更登記清冊」(活躍中型企業)。
2. 依當天日期取一段不重複的候選名單(新創 70 家 + 中型 60 家)。
3. 逐家到 twincn(台灣公司網)補「電話」與「營業項目」。
4. 規則引擎評分:產業製服需求 × 公司型態 × 有無電話。
5. 產出 50 家名單(含推測需求與攻略法),再篩出前 10 家重點電話。
6. 寄送 HTML 報告到指定信箱,並輸出 HTML/CSV 到 out/ 目錄。

資料來源均為政府公開資料;公司登記資料依法不含電話,
電話欄位由 twincn 公開頁補齊,查無者附一鍵查詢連結。
"""

import csv
import html
import io
import os
import re
import smtplib
import ssl
import sys
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone, timedelta
from email.message import EmailMessage

from industry_rules import classify, size_pitch

GCIS_BASE = "https://data.gcis.nat.gov.tw"
DATASET_NEW = "AD28285B-7B0E-4241-9F58-F2F0F289333E"   # 公司設立登記清冊(月份)
DATASET_CHG = "75353060-3C3D-453E-8E5C-4ADDEAA8260F"   # 公司變更登記清冊(月份)

NEW_PER_DAY = 70    # 每日抓取的新創候選數(評分後留下較優者)
CHG_PER_DAY = 60    # 每日抓取的中型企業候選數
FINAL_COUNT = 50    # 每日名單總數
TOP_COUNT = 10      # 重點電話數
MID_CAP_MIN = 8_000_000      # 中型企業資本額下限
MID_CAP_MAX = 500_000_000    # 中型企業資本額上限
TWINCN_DELAY = 1.3  # twincn 每次查詢間隔秒數(禮貌性限速)

UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

TPE = timezone(timedelta(hours=8))  # Asia/Taipei


def http_get(url: str, timeout: int = 45, retries: int = 2) -> bytes:
    last_err = None
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": UA, "Accept-Language": "zh-TW,zh;q=0.9"})
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.read()
        except Exception as e:  # noqa: BLE001 - 網路錯誤一律重試
            last_err = e
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"下載失敗 {url}: {last_err}")


def fetch_latest_roster(dataset_oid: str):
    """抓資料集詳細頁上最新月份檔案,回傳 (月份字串, rows)。"""
    page = http_get(f"{GCIS_BASE}/od/detail?oid={dataset_oid}").decode("utf-8", "ignore")
    m = re.search(r"showDialog\('(/od/file\?oid=[A-F0-9-]{36})'\)", page)
    if not m:
        raise RuntimeError(f"找不到資料檔連結 dataset={dataset_oid}")
    raw = http_get(GCIS_BASE + m.group(1), timeout=90)
    text = raw.decode("utf-8-sig", "ignore")
    rows = list(csv.DictReader(io.StringIO(text)))
    month = ""
    mm = re.search(r'"?核准(設立|變更)日期"?', text[:200])
    if rows:
        d = rows[0].get("核准設立日期") or rows[0].get("核准變更日期") or ""
        month = d[:5] if d else ""
    _ = mm
    return month, rows


def daily_slice(rows, per_day: int, day_of_month: int, salt: int = 0):
    """依日期取當日不重複片段;不足時取餘數循環,保證不越界。"""
    if not rows:
        return []
    start = ((day_of_month - 1) * per_day + salt) % len(rows)
    picked = [rows[(start + i) % len(rows)] for i in range(min(per_day, len(rows)))]
    return picked


PHONE_RE = re.compile(r"電話[^\d+(]{0,8}(\+?[\d()\-#]{7,20})")
BIZ_RE = re.compile(r"營業項目</td><td>(.*?)</td>", re.S)
TAG_RE = re.compile(r"<[^>]+>")


def enrich_from_twincn(tax_id: str):
    """回傳 (電話 or '', 營業項目文字 or '')。任何錯誤都回空值。"""
    try:
        page = http_get(f"https://www.twincn.com/item.aspx?no={tax_id}",
                        timeout=25, retries=1).decode("utf-8", "ignore")
    except Exception:
        return "", ""
    phone = ""
    pm = PHONE_RE.search(page)
    if pm:
        digits = re.sub(r"\D", "", pm.group(1))
        if 7 <= len(digits) <= 12:  # 過濾統計數字等雜訊
            phone = pm.group(1)
    biz = ""
    bm = BIZ_RE.search(page)
    if bm:
        biz = TAG_RE.sub(" ", bm.group(1).replace("<br>", "、"))
        biz = re.sub(r"\s+", " ", biz).strip()[:300]
    return phone, biz


def roc_date_str(roc: str) -> str:
    """民國日期字串 1150511 → 2026-05-11。"""
    roc = (roc or "").strip()
    if not roc.isdigit() or len(roc) < 6:
        return roc
    y = int(roc[:-4]) + 1911
    return f"{y}-{roc[-4:-2]}-{roc[-2:]}"


def build_lead(row, is_startup: bool):
    name = (row.get("公司名稱") or "").strip()
    tax_id = (row.get("統一編號") or "").strip()
    addr = (row.get("公司所在地") or "").strip()
    boss = (row.get("代表人") or "").strip()
    cap_raw = (row.get("資本額") or "0").strip()
    capital = int(cap_raw) if cap_raw.isdigit() else 0
    date = roc_date_str(row.get("核准設立日期") or row.get("核准變更日期") or "")
    return {
        "type": "新創" if is_startup else "中型",
        "name": name, "tax_id": tax_id, "addr": addr, "boss": boss,
        "capital": capital, "date": date, "phone": "", "biz": "",
        "industry": "", "items": "", "pitch": "", "score": 0,
    }


def score_lead(lead):
    industry, weight, items, pitch = classify(lead["biz"], lead["name"])
    score = weight
    if lead["phone"]:
        score += 15
    if lead["type"] == "新創":
        score += 12  # 使用者偏好新創
        if lead["capital"] == 0:
            score -= 4  # 未實繳資本,可能是紙上公司
    else:
        if MID_CAP_MIN <= lead["capital"] <= 200_000_000:
            score += 8  # 中型甜蜜帶,決策快、量夠大
    lead.update(industry=industry, items=items, score=score,
                pitch=pitch + " " + size_pitch(lead["type"] == "新創", lead["capital"]))
    return lead


def lookup_links(lead):
    q = urllib.parse.quote(f"{lead['name']} 電話")
    return {
        "twincn": f"https://www.twincn.com/item.aspx?no={lead['tax_id']}",
        "findbiz": ("https://findbiz.nat.gov.tw/fts/query/QueryList/queryList.do"
                    f"?qryCond={lead['tax_id']}&errorMsg=&validofType=&isAlive=all&busiItemMain="),
        "google": f"https://www.google.com/search?q={q}",
    }


def render_report(leads, top, month_new, month_chg, today):
    """回傳 (html_str, text_str)。"""
    e = html.escape

    def cap_fmt(c):
        if c >= 100_000_000:
            return f"{c/100_000_000:.1f} 億"
        if c >= 10_000:
            return f"{c//10_000} 萬"
        return str(c)

    cards = []
    for i, ld in enumerate(top, 1):
        lk = lookup_links(ld)
        phone_html = (f'<span style="font-size:18px;font-weight:700;color:#0a7d33">{e(ld["phone"])}</span>'
                      if ld["phone"] else
                      f'尚無公開電話 → <a href="{lk["google"]}">Google 搜尋</a> / <a href="{lk["twincn"]}">台灣公司網</a>')
        cards.append(f"""
        <div style="border:1px solid #ddd;border-radius:10px;padding:14px 16px;margin:10px 0;background:#fff">
          <div style="font-size:16px;font-weight:700">#{i} {e(ld['name'])}
            <span style="font-size:12px;color:#fff;background:{'#e0662e' if ld['type']=='新創' else '#2e6ee0'};
                         border-radius:4px;padding:2px 6px;margin-left:6px">{ld['type']}</span>
            <span style="font-size:12px;color:#888;margin-left:6px">評分 {ld['score']}</span></div>
          <div style="margin:6px 0">📞 {phone_html}</div>
          <div style="font-size:13px;color:#444">統編 {e(ld['tax_id'])}|代表人 {e(ld['boss'])}|資本額 {cap_fmt(ld['capital'])}|{e(ld['date'])}</div>
          <div style="font-size:13px;color:#444">📍 {e(ld['addr'])}</div>
          <div style="font-size:13px;margin-top:4px"><b>產業:</b>{e(ld['industry'])}
             <span style="color:#888">({e((ld['biz'] or '登記資料未列')[:80])})</span></div>
          <div style="font-size:13px"><b>推測需求:</b>{e(ld['items'])}</div>
          <div style="font-size:13px;background:#f6f8ff;border-radius:6px;padding:8px;margin-top:6px">
             <b>攻略:</b>{e(ld['pitch'])}</div>
          <div style="font-size:12px;margin-top:6px">
            <a href="{lk['twincn']}">台灣公司網</a> · <a href="{lk['findbiz']}">商工登記</a> · <a href="{lk['google']}">Google</a></div>
        </div>""")

    rest = [ld for ld in leads if ld not in top]
    rows_html = []
    for ld in rest:
        lk = lookup_links(ld)
        ph = e(ld["phone"]) if ld["phone"] else f'<a href="{lk["google"]}">查</a>'
        rows_html.append(
            f"<tr><td>{ld['type']}</td><td><a href='{lk['twincn']}'>{e(ld['name'])}</a></td>"
            f"<td>{ph}</td><td>{e(ld['industry'])}</td><td>{e(ld['items'])}</td>"
            f"<td>{cap_fmt(ld['capital'])}</td><td>{e(ld['addr'][:12])}…</td><td>{ld['score']}</td></tr>")

    html_str = f"""
    <div style="font-family:'Microsoft JhengHei',sans-serif;max-width:860px;margin:auto;background:#f4f5f7;padding:16px">
      <h2 style="margin:4px 0">👔 Populove 團體製服|每日獲客名單 {today}</h2>
      <div style="font-size:12px;color:#666">資料月份:設立清冊 {month_new}/變更清冊 {month_chg}(經濟部商工開放資料)
        |電話補查:台灣公司網|共 {len(leads)} 家,重點 {len(top)} 家</div>
      <h3 style="margin:14px 0 4px">🎯 今日 10 通重點電話</h3>
      {''.join(cards)}
      <h3 style="margin:14px 0 4px">📋 其餘 {len(rest)} 家備選</h3>
      <table border="1" cellspacing="0" cellpadding="5"
             style="border-collapse:collapse;font-size:12px;background:#fff;width:100%">
        <tr style="background:#eee"><th>型態</th><th>公司</th><th>電話</th><th>產業</th>
            <th>推測需求</th><th>資本額</th><th>地區</th><th>分</th></tr>
        {''.join(rows_html)}
      </table>
      <p style="font-size:11px;color:#999">說明:公司登記資料依法不含電話;「電話」欄為台灣公司網公開資料,
      新設立公司多數尚未有公開電話,可點連結一鍵查詢。名單依日期輪動,當月內不重複。</p>
    </div>"""

    lines = [f"Populove 每日獲客名單 {today}", "=" * 40, "", "★ 今日 10 通重點電話:"]
    for i, ld in enumerate(top, 1):
        lines.append(f"{i}. [{ld['type']}] {ld['name']}  {ld['phone'] or '(電話待查)'}")
        lines.append(f"   產業:{ld['industry']}|需求:{ld['items']}")
        lines.append(f"   攻略:{ld['pitch']}")
        lines.append("")
    return html_str, "\n".join(lines)


def write_outputs(leads, top, html_str, today):
    os.makedirs("out", exist_ok=True)
    with open(f"out/leads_{today}.html", "w", encoding="utf-8") as f:
        f.write(html_str)
    with open(f"out/leads_{today}.csv", "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f)
        w.writerow(["重點", "型態", "公司名稱", "統一編號", "電話", "產業", "推測需求",
                    "攻略", "資本額", "代表人", "地址", "日期", "評分", "台灣公司網", "Google查電話"])
        for ld in leads:
            lk = lookup_links(ld)
            w.writerow(["★" if ld in top else "", ld["type"], ld["name"], ld["tax_id"],
                        ld["phone"], ld["industry"], ld["items"], ld["pitch"],
                        ld["capital"], ld["boss"], ld["addr"], ld["date"], ld["score"],
                        lk["twincn"], lk["google"]])


def send_mail(html_str, text_str, today, csv_path):
    user = os.environ.get("MAIL_USERNAME", "")
    pwd = os.environ.get("MAIL_APP_PASSWORD", "")
    to = os.environ.get("LEADS_TO_EMAIL", "derrickj.populove@gmail.com")
    if not user or not pwd:
        print("⚠️  未設定 MAIL_USERNAME / MAIL_APP_PASSWORD,略過寄信(報告已存 out/)")
        return False
    msg = EmailMessage()
    msg["Subject"] = f"👔 Populove 每日獲客名單 {today}(重點 {TOP_COUNT} 通)"
    msg["From"] = user
    msg["To"] = to
    msg.set_content(text_str)
    msg.add_alternative(html_str, subtype="html")
    with open(csv_path, "rb") as f:
        msg.add_attachment(f.read(), maintype="text", subtype="csv",
                           filename=os.path.basename(csv_path))
    ctx = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=ctx) as s:
        s.login(user, pwd)
        s.send_message(msg)
    print(f"✅ 已寄出報告到 {to}")
    return True


def main():
    now = datetime.now(TPE)
    today = now.strftime("%Y-%m-%d")
    dom = now.day
    print(f"=== Populove 每日獲客 {today}(台北時間)===")

    month_new, rows_new = fetch_latest_roster(DATASET_NEW)
    print(f"設立清冊:{len(rows_new)} 家(資料月份 {month_new})")
    month_chg, rows_chg = fetch_latest_roster(DATASET_CHG)
    rows_mid = [r for r in rows_chg
                if (r.get("資本額") or "").isdigit()
                and MID_CAP_MIN <= int(r["資本額"]) <= MID_CAP_MAX]
    print(f"變更清冊:{len(rows_chg)} 家,其中中型 {len(rows_mid)} 家")

    cand = ([build_lead(r, True) for r in daily_slice(rows_new, NEW_PER_DAY, dom)]
            + [build_lead(r, False) for r in daily_slice(rows_mid, CHG_PER_DAY, dom)])
    cand = [c for c in cand if c["tax_id"].isdigit()]
    print(f"今日候選 {len(cand)} 家,開始補電話/營業項目(約 {len(cand)*TWINCN_DELAY/60:.0f} 分鐘)…")

    for i, ld in enumerate(cand):
        ld["phone"], ld["biz"] = enrich_from_twincn(ld["tax_id"])
        score_lead(ld)
        if (i + 1) % 20 == 0:
            print(f"  進度 {i+1}/{len(cand)}(已找到電話 {sum(1 for c in cand if c['phone'])} 筆)")
        time.sleep(TWINCN_DELAY)

    cand.sort(key=lambda c: c["score"], reverse=True)
    leads = cand[:FINAL_COUNT]
    with_phone = [ld for ld in leads if ld["phone"]]
    top = (with_phone + [ld for ld in leads if not ld["phone"]])[:TOP_COUNT]
    top.sort(key=lambda c: c["score"], reverse=True)
    print(f"完成:{len(leads)} 家入選,{len(with_phone)} 家有電話,重點 {len(top)} 家")

    html_str, text_str = render_report(leads, top, month_new, month_chg, today)
    write_outputs(leads, top, html_str, today)
    send_mail(html_str, text_str, today, f"out/leads_{today}.csv")
    print("=== 完成 ===")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:  # noqa: BLE001
        print(f"❌ 執行失敗:{e}", file=sys.stderr)
        sys.exit(1)
