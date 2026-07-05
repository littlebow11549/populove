import { Icon } from "@/components/icon";
import type { FlowStep } from "@/lib/data/types";

export function OrderFlow({ steps }: { steps: FlowStep[] }) {
  if (!steps.length) return null;

  return (
    <section id="process" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <p className="text-amber text-sm font-bold tracking-widest">
          Order Flow
        </p>
        <h2 className="text-2xl font-black sm:text-3xl">團體服訂購流程</h2>
        <p className="text-text mt-1">
          簡單 5 步驟，把想法變成可以穿出去的成品。
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <article
            key={step.id}
            className="border-border bg-panel flex flex-col gap-2 rounded-2xl border p-5"
          >
            <span className="text-amber inline-flex items-center gap-2">
              <Icon name={step.icon} className="h-5 w-5" />
              <span className="text-sm font-black">
                {String(index + 1).padStart(2, "0")}
              </span>
            </span>
            <h3 className="font-bold">{step.title}</h3>
            <p className="text-muted text-sm">{step.text}</p>
            {step.link && (
              <a
                href={step.href || "#"}
                className="text-text hover:text-ink mt-1 inline-flex items-center gap-1 text-sm font-bold"
              >
                {step.link}
                <Icon name="i-arrow" />
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
