import { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import Services from "@/components/sections/Services";
import GrowthEngine from "@/components/sections/GrowthEngine";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore LEAHVIGOR's integrated suite of IT Solutions, Digital Growth, Talent Acquisition and Website Creation services.",
};

export default function ServicesPage() {
  return (
    <main id="main-content" className="pt-24">
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <SectionLabel text="What we offer" />
        <h1
          className="font-display font-bold text-white leading-tight mt-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          Four engines of{" "}
          <span className="gradient-text">growth.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mt-4 font-sans leading-relaxed">
          An integrated suite of technology, digital and talent solutions designed around business outcomes.
        </p>
      </section>
      <Services />
      <GrowthEngine />
      <FinalCTA />
      <Footer />
    </main>
  );
}
