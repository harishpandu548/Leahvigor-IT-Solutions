import { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import Work from "@/components/sections/Work";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and client partnerships — see how LEAHVIGOR Solutions helps businesses grow.",
};

export default function WorkPage() {
  return (
    <main id="main-content" className="pt-24">
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <SectionLabel text="Our work" />
        <h1
          className="font-display font-bold text-white leading-tight mt-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          Work that moves{" "}
          <span className="gradient-text">businesses forward.</span>
        </h1>
      </section>
      <Work />
      <FinalCTA />
      <Footer />
    </main>
  );
}
