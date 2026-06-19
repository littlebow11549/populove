import { Icon } from "@/components/icon";

const METHODS: ReadonlyArray<{ icon: string; title: string; text: string }> = [
  {
    icon: "i-layers",
    title: "網版印刷",
    text: "適合大量、少色、耐洗需求高的團體服。",
  },
  {
    icon: "i-spark",
    title: "DTF 轉印",
    text: "適合彩色圖案、複雜線條與多品項混搭。",
  },
  {
    icon: "i-flame",
    title: "熱轉印",
    text: "少量、照片感、活動限定款都能彈性製作。",
  },
  {
    icon: "i-needle",
    title: "電腦刺繡",
    text: "適合制服、POLO、帽子與質感品牌識別。",
  },
];

export function Methods() {
  return (
    <section id="process-detail" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <p className="text-amber text-sm font-bold tracking-widest">
          Print Method
        </p>
        <h2 className="text-2xl font-black sm:text-3xl">多種加工方式</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METHODS.map((method) => (
          <article
            key={method.title}
            className="border-border bg-panel rounded-2xl border p-5"
          >
            <Icon name={method.icon} className="text-amber h-7 w-7" />
            <h3 className="mt-2 font-bold">{method.title}</h3>
            <p className="text-muted mt-1 text-sm">{method.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
