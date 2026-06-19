"use client";

import { useState, type FormEvent } from "react";

import { Icon } from "@/components/icon";

const PRODUCT_OPTIONS = [
  "T恤",
  "POLO衫",
  "帽T / 大學T",
  "外套",
  "圍裙 / 帽子 / 袋子",
];
const METHOD_OPTIONS = [
  "需要建議",
  "網版印刷",
  "DTF 轉印",
  "熱轉印",
  "電腦刺繡",
];

const fieldClass =
  "rounded-xl border border-border bg-surface px-4 py-3 text-ink outline-none focus:border-brand";
const labelClass = "flex flex-col gap-1.5 text-sm font-bold text-text";

export function QuoteForm() {
  const [result, setResult] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      `品項：${data.get("product")}`,
      `件數：${data.get("quantity")}`,
      `加工方式：${data.get("method")}`,
      `聯絡方式：${data.get("contact")}`,
    ];
    const message = String(data.get("message") ?? "").trim();
    if (message) lines.push(`補充需求：${message}`);
    setResult(`【POPULOVE 詢價】\n${lines.join("\n")}`);
  }

  return (
    <section id="estimate" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <p className="text-amber text-sm font-bold tracking-widest">Estimate</p>
        <h2 className="text-2xl font-black sm:text-3xl">費用估算</h2>
        <p className="text-text mt-1">
          填寫基本需求後，頁面會先幫你整理成詢價文字，再接 LINE 或 Email。
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="i-shirt" />
            品項
          </span>
          <select name="product" className={fieldClass}>
            {PRODUCT_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="i-hash" />
            件數
          </span>
          <input
            name="quantity"
            type="number"
            min={1}
            required
            placeholder="例如：80"
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="i-wrench" />
            加工方式
          </span>
          <select name="method" className={fieldClass}>
            {METHOD_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="i-user" />
            聯絡方式
          </span>
          <input
            name="contact"
            type="text"
            required
            placeholder="LINE ID / 電話 / Email"
            className={fieldClass}
          />
        </label>
        <label className={`${labelClass} sm:col-span-2`}>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="i-note" />
            補充需求
          </span>
          <textarea
            name="message"
            rows={4}
            placeholder="交期、預算、顏色、印刷位置、是否有圖稿"
            className={fieldClass}
          />
        </label>
        <button
          type="submit"
          className="bg-brand shadow-brand/30 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-black text-[#15110d] shadow-lg hover:brightness-105 sm:col-span-2"
        >
          <Icon name="i-clipboard" />
          整理詢價內容
        </button>
      </form>

      {result && (
        <div className="border-border bg-panel mt-4 rounded-xl border p-4">
          <pre className="text-ink font-sans text-sm whitespace-pre-wrap">
            {result}
          </pre>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(result)}
              className="border-border bg-surface hover:bg-panel-strong rounded-full border px-4 py-2 text-sm font-bold"
            >
              複製詢價文字
            </button>
            <a
              href="https://line.me/ti/p/~derrick00"
              target="_blank"
              rel="noopener"
              className="bg-brand rounded-full px-4 py-2 text-sm font-black text-[#15110d]"
            >
              用 LINE 詢價
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
