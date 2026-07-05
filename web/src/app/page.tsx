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

  // 結構化資料（Google 商家／組織資訊），讓搜尋引擎更好理解本站。
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: "POPULOVE 客製化團體服",
    url: "https://populove.org",
    logo: "https://populove.org/brand/populove-logo.svg",
    image: "https://populove.org/banners/banner-populove-fashion.png",
    description:
      "客製化團體服、班服、公司制服、活動服與品牌周邊，提供印刷、刺繡與 DTF 轉印加工。",
    email: data.contact.email,
    telephone: data.contact.phone,
    priceRange: "$$",
    sameAs: data.contact.line
      ? [`https://line.me/ti/p/~${data.contact.line}`]
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
