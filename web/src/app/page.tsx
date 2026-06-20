import { About } from "@/features/home/about";
import { ContactCards } from "@/features/home/contact-cards";
import { FloatButtons } from "@/features/home/float-buttons";
import { Footer } from "@/features/home/footer";
import { Header } from "@/features/home/header";
import { Hero } from "@/features/home/hero";
import { Methods } from "@/features/home/methods";
import { OrderFlow } from "@/features/home/order-flow";
import { Products } from "@/features/home/products";
import { QuoteForm } from "@/features/home/quote-form";
import { Reveal } from "@/components/reveal";
import { resolveSiteData } from "@/lib/data/resolve";
import { fetchAllSiteData } from "@/lib/supabase/server";

export default async function Home() {
  const data = resolveSiteData(await fetchAllSiteData());

  return (
    <>
      <Header contact={data.contact} categories={data.categories} />
      <main id="top">
        <Hero banners={data.banners} />
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <OrderFlow steps={data.flow} />
        </Reveal>
        <Reveal>
          <Methods />
        </Reveal>
        <Reveal>
          <Products products={data.products} />
        </Reveal>
        <Reveal>
          <QuoteForm />
        </Reveal>
        <Reveal>
          <ContactCards cards={data.contactCards} />
        </Reveal>
      </main>
      <Footer />
      <FloatButtons smileEntry={data.smileEntry} buttons={data.floatButtons} />
    </>
  );
}
