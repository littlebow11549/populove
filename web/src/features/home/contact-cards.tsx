import { Icon } from "@/components/icon";
import type { ContactCard } from "@/lib/data/types";

export function ContactCards({ cards }: { cards: ContactCard[] }) {
  if (!cards.length) return null;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <p className="text-amber text-sm font-bold tracking-widest">Contact</p>
        <h2 className="text-2xl font-black sm:text-3xl">線上諮詢</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => {
          const body = (
            <>
              <Icon name={card.icon} className="text-amber h-7 w-7" />
              <strong className="block">{card.title}</strong>
              <p className="text-muted text-sm whitespace-pre-line">
                {card.text}
              </p>
            </>
          );
          const classes =
            "flex flex-col gap-2 rounded-2xl border border-border bg-panel p-6";

          if (card.href) {
            return (
              <a
                key={card.id}
                href={card.href}
                target={/^https?:/i.test(card.href) ? "_blank" : undefined}
                rel="noopener"
                className={`${classes} hover:border-brand`}
              >
                {body}
              </a>
            );
          }
          return (
            <article key={card.id} className={classes}>
              {body}
            </article>
          );
        })}
      </div>
    </section>
  );
}
