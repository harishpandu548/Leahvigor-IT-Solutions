import { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives, thought leadership and insights from the LEAHVIGOR Solutions team on technology, digital growth and talent.",
};

export default function InsightsPage() {
  return (
    <main id="main-content" className="pt-24">
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <SectionLabel text="Insights" />
        <h1
          className="font-display font-bold text-white leading-tight mt-4 mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          Perspectives on{" "}
          <span className="gradient-text">growth.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-xl font-sans leading-relaxed">
          Insights and thought leadership from the LEAHVIGOR team. Content coming soon.
        </p>
      </section>
      <FinalCTA />
      <Footer />
    </main>
  );
}
