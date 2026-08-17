import { Metadata } from "next";
import SectionLabel from "@/components/ui/SectionLabel";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about LEAHVIGOR Solutions — the team, mission and values behind one of Hyderabad's growing technology and digital consultancies.",
};

const values = [
  {
    title: "Business First",
    description:
      "Technology should solve a business problem, not create another one.",
  },
  {
    title: "Built to Scale",
    description:
      "Solutions designed for where your business is going — not just where it is today.",
  },
  {
    title: "One Strategic Partner",
    description:
      "Technology, digital growth and talent under one roof.",
  },
  {
    title: "Measurable Impact",
    description:
      "Every engagement should create measurable business value.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="pt-24">
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <SectionLabel text="Who we are" />
        <h1
          className="font-display font-bold text-white leading-tight mt-4 mb-6"
          style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
        >
          Built around{" "}
          <span className="gradient-text">your ambition.</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl font-sans leading-relaxed">
          LEAHVIGOR Solutions Pvt. Ltd. is a Hyderabad-based technology and growth consultancy helping businesses accelerate through integrated IT, digital and talent solutions.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-10 bg-midnight hover:bg-surface transition-colors"
            >
              <h3 className="font-display font-bold text-white text-xl mb-3">
                {v.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-sans">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
