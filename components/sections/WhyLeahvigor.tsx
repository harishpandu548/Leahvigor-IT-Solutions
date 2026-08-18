"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const blocks = [
  {
    number: "01",
    title: "Business First",
    description:
      "Technology should solve a business problem, not create another one. Every recommendation starts with your goals.",
    image: "/herosection/Why_Leahvigor/busfirst.webp",
  },
  {
    number: "02",
    title: "Built to Scale",
    description:
      "Solutions designed for where your business is going — not just where it is today. Architecture for tomorrow.",
    image: "/herosection/Why_Leahvigor/build to scale.webp",
  },
  {
    number: "03",
    title: "One Strategic Partner",
    description:
      "Technology, digital growth and talent under one roof. No silos, no misalignment — just integrated strategy.",
    image: "/herosection/Why_Leahvigor/one strategic partner.webp",
  },
  {
    number: "04",
    title: "Measurable Impact",
    description:
      "Every engagement should create measurable business value. We track what matters and optimize continuously.",
    image: "/herosection/Why_Leahvigor/Measurable Impact.webp",
  },
];

function Card({ block, index }: { block: typeof blocks[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative p-10 lg:p-12 min-h-[350px] overflow-hidden flex flex-col justify-end border-r border-b border-white/5"
    >
      {/* ── Background Image ── */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url('${block.image}')` }}
      />
      
      {/* ── Default Dark Overlay ── */}
      <div className="absolute inset-0 z-10 bg-black/60 transition-opacity duration-500 group-hover:opacity-0" />

      {/* ── Hover Solid Color Overlay ── */}
      {/* Uses the primary brand color (Leahvigor Purple/Indigo) */}
      <div className="absolute inset-0 z-20 bg-[#6366F1]/95 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* ── Content (Text) ── */}
      {/* Translates upward slightly on hover as requested */}
      <div className="relative z-30 transform transition-transform duration-500 group-hover:-translate-y-4">
        <span
          className="block font-display font-bold leading-none mb-6 select-none"
          style={{
            fontSize: "clamp(3rem, 6vw, 5.5rem)",
            background: "linear-gradient(135deg, rgba(255,255,255,1), rgba(255,255,255,0.4))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
          aria-hidden="true"
        >
          {block.number}
        </span>

        <h3 className="font-display font-bold text-white mb-4" style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}>
          {block.title}
        </h3>
        
        <p className="text-slate-200 leading-relaxed font-sans max-w-sm transition-colors duration-500 group-hover:text-white" style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}>
          {block.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function WhyLeahvigor() {
  return (
    <section
      id="why-leahvigor"
      className="relative py-24 lg:py-32 bg-midnight"
      aria-label="Why LEAHVIGOR"
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] blur-[140px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF620, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel text="Why Leahvigor" />
        <h2
          className="font-display font-bold text-white leading-tight mt-4 mb-16 flex flex-wrap gap-x-[0.22em] gap-y-2 cursor-default"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
        >
          {["Built", "around", "your", "ambition."].map((word, i) => {
            const highlight = ["your", "ambition."].includes(word);
            return (
              <motion.span
                key={i}
                whileHover={{ 
                  scale: 1.05, 
                  color: highlight ? "#A855F7" : "#8B5CF6",
                  textShadow: highlight ? "0px 0px 20px rgba(168,85,247,0.6)" : "0px 0px 20px rgba(139,92,246,0.6)",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`inline-block transition-colors ${highlight ? "gradient-text" : ""}`}
              >
                {word}
              </motion.span>
            );
          })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 bg-black/20 rounded-2xl overflow-hidden border border-white/10">
          {blocks.map((block, i) => (
            <Card key={block.number} block={block} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
