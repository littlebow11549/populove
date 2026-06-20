import { About } from "@/features/home/about";
import { CategoryStrip } from "@/features/home/category-strip";
import { ContactCards } from "@/features/home/contact-cards";
import { FloatButtons } from "@/features/home/float-buttons";
import { Footer } from "@/features/home/footer";
import { Header } from "@/features/home/header";
import { Hero } from "@/features/home/hero";
import { Methods } from "@/features/home/methods";
import { OrderFlow } from "@/features/home/order-flow";
import { Products } from "@/features/home/products";
import { QuoteForm } from "@/features/home/quote-form";
import { resolveSiteData } from "@/lib/data/resolve";
import { fetchAllSiteData } from "@/lib/supabase/server";

export default async function Home() {
  const data = resolveSiteData(await fetchAllSiteData());

  return (
    <>
      <Header contact={data.contact} />
      <main id="top">
        <CategoryStrip categories={data.categories} />
        <Hero banners={data.banners} />
        <About />
        <OrderFlow steps={data.flow} />
        <Methods />
        <Products products={data.products} />
        <QuoteForm />
        <ContactCards cards={data.contactCards} />
      </main>
      <Footer />
      <FloatButtons smileEntry={data.smileEntry} buttons={data.floatButtons} />
    </>
  );
}
