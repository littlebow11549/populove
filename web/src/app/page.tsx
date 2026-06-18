const stack: ReadonlyArray<{ label: string; value: string }> = [
  { label: "框架", value: "Next.js 16 · App Router" },
  { label: "語言", value: "TypeScript（strict）" },
  { label: "樣式", value: "Tailwind CSS v4 · 設計變數" },
  { label: "規範", value: "ESLint · Prettier" },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-10 px-6 py-20">
      <header className="space-y-3">
        <p className="text-brand text-sm font-bold tracking-widest uppercase">
          Rebuild · Phase 0
        </p>
        <h1 className="text-3xl font-black sm:text-4xl">
          POPULOVE 重構基礎已就緒
        </h1>
        <p className="text-muted leading-relaxed">
          這是新版網站的「可交付專案基礎」。目前只建立乾淨的開發骨架與規範，
          <strong className="text-ink">尚未搬移任何現有功能</strong>
          ，正式站（populove.org）不受影響。
        </p>
      </header>

      <section className="border-border bg-surface grid gap-4 rounded-2xl border p-6">
        <h2 className="text-muted text-sm font-bold">技術棧</h2>
        <dl className="grid gap-2 sm:grid-cols-2">
          {stack.map((item) => (
            <div key={item.label} className="flex items-baseline gap-3">
              <dt className="text-muted w-12 shrink-0 text-sm">{item.label}</dt>
              <dd className="font-semibold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="text-muted space-y-2 text-sm">
        <p>
          下一步：依{" "}
          <code className="bg-surface text-brand rounded px-1.5 py-0.5">
            REBUILD-PLAN.md
          </code>{" "}
          進入 P1（樣式系統）與後續功能搬移。
        </p>
        <p>
          開發指令與規範請見{" "}
          <code className="bg-surface text-brand rounded px-1.5 py-0.5">
            web/README.md
          </code>
          。
        </p>
      </section>
    </main>
  );
}
