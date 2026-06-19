import { FloatButtons } from "@/features/home/float-buttons";
import { Footer } from "@/features/home/footer";
import { Header } from "@/features/home/header";
import { Hero } from "@/features/home/hero";
import { load } from "@/lib/store/index";

export default function Home() {
  const contact = load("contact");
  const banners = load("banners");
  const smileEntry = load("smileEntry");
  const floatButtons = load("floatButtons");

  return (
    <>
      <Header contact={contact} />
      <main id="top">
        <Hero banners={banners} />
      </main>
      <Footer />
      <FloatButtons smileEntry={smileEntry} buttons={floatButtons} />
    </>
  );
}
