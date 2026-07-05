import { Icon } from "@/components/icon";

const CARDS: ReadonlyArray<{ icon: string; title: string; text: string }> = [
  {
    icon: "i-calculator",
    title: "透明估價",
    text: "商品、加工、數量與交期分開確認",
  },
  { icon: "i-message", title: "專人服務", text: "從圖稿到生產細節都協助整理" },
  {
    icon: "i-grid",
    title: "多元品項",
    text: "T恤、POLO、帽T、圍裙、帽子、袋子",
  },
];

export function About() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-amber text-sm font-bold tracking-widest">
          About POPULOVE
        </p>
        <h2 className="mt-2 text-2xl font-black sm:text-3xl">
          客製化團體服，從挑款、圖稿、估價到交件都有人陪你確認。
        </h2>
        <p className="text-text mt-3">
          我們服務企業、學校、活動單位、品牌主理人與社團組織，依照預算、用途、件數與交期建議適合的衣服與加工方式。
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="border-border bg-panel rounded-2xl border p-5"
          >
            <Icon name={card.icon} className="text-amber h-7 w-7" />
            <strong className="mt-2 block">{card.title}</strong>
            <span className="text-muted text-sm">{card.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
