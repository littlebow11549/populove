import { CategoryStrip } from "@/features/home/category-strip";
import { ContactCards } from "@/features/home/contact-cards";
import { FloatButtons } from "@/features/home/float-buttons";
import { Footer } from "@/features/home/footer";
import { Header } from "@/features/home/header";
import { Hero } from "@/features/home/hero";
import { OrderFlow } from "@/features/home/order-flow";
import { Products } from "@/features/home/products";
import { QuoteForm } from "@/features/home/quote-form";
import { load } from "@/lib/store/index";

export default function Home() {
  const contact = load("contact");
  const categories = load("categories");
  const banners = load("banners");
  const flow = load("flow");
  const products = load("products");
  const contactCards = load("contactCards");
  const smileEntry = load("smileEntry");
  const floatButtons = load("floatButtons");

  return (
    <>
      <Header contact={contact} />
      <main id="top">
        <CategoryStrip categories={categories} />
        <Hero banners={banners} />
        <OrderFlow steps={flow} />
        <Products products={products} />
        <QuoteForm />
        <ContactCards cards={contactCards} />
      </main>
      <Footer />
      <FloatButtons smileEntry={smileEntry} buttons={floatButtons} />
    </>
  );
}
