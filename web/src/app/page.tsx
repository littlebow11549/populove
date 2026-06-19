import { CategoryStrip } from "@/features/home/category-strip";
import { FloatButtons } from "@/features/home/float-buttons";
import { Footer } from "@/features/home/footer";
import { Header } from "@/features/home/header";
import { Hero } from "@/features/home/hero";
import { Products } from "@/features/home/products";
import { load } from "@/lib/store/index";

export default function Home() {
  const contact = load("contact");
  const categories = load("categories");
  const banners = load("banners");
  const products = load("products");
  const smileEntry = load("smileEntry");
  const floatButtons = load("floatButtons");

  return (
    <>
      <Header contact={contact} />
      <main id="top">
        <CategoryStrip categories={categories} />
        <Hero banners={banners} />
        <Products products={products} />
      </main>
      <Footer />
      <FloatButtons smileEntry={smileEntry} buttons={floatButtons} />
    </>
  );
}
