"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

// Using only verified client names from the existing Leahvigor website.
// Case study details are placeholder — update with real project information before publishing.
const caseStudies = [
  {
    client: "Rainsoft Global",
    category: "Technology Partnership",
    headline: "Modernizing operations for global scale",
    description:
      "A strategic technology engagement focused on building the systems and processes needed to support international growth. Details available on request.",
    tags: ["IT Solutions", "Digital Strategy"],
    placeholder: true,
  },
  {
    client: "CAP Technologies",
    category: "Digital Transformation",
    headline: "Aligning technology with business ambition",
    description:
      "An integrated engagement combining technology consulting and digital presence to accelerate market positioning. Details available on request.",
    tags: ["Web Development", "Brand Strategy"],
    placeholder: true,
  },
];

export default function Work() {
  return (
    <section
      id="work"
      className="relative py-24 lg:py-32"
      aria-label="Our work"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel text="Client work" />
        <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <h2
            className="font-display font-bold text-white leading-tight flex flex-wrap gap-x-[0.22em] gap-y-2 cursor-default"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
          >
            {["Work", "that", "moves", "businesses", "forward."].map((word, i) => {
              const highlight = ["businesses", "forward."].includes(word);
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
          <p className="text-slate-400 text-sm max-w-xs font-sans leading-relaxed">
            Partnerships built on strategy, delivered through execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {caseStudies.map((study, i) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: "rgba(13,20,33,0.85)" }}
              data-cursor="VIEW"
            >
              {/* Top gradient bar */}
              <div className="h-1 bg-gradient-to-r from-electric via-indigo-500 to-violet" />

              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-indigo-500/5 to-transparent" />

              <div className="p-8 lg:p-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs font-sans font-medium tracking-widest uppercase text-indigo-400 mb-1">
                      {study.category}
                    </p>
                    <h3 className="font-display font-bold text-white text-2xl">
                      {study.client}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10 transition-all duration-300">
                    <ArrowUpRight
                      size={16}
                      className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>
                </div>

                {/* Headline */}
                <p className="text-white font-display font-semibold text-lg mb-3 leading-snug">
                  {study.headline}
                </p>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed font-sans mb-6">
                  {study.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-sans px-3 py-1 rounded-full border border-white/8 text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Placeholder notice */}
                {study.placeholder && (
                  <p className="mt-4 text-xs text-slate-600 font-sans italic">
                    * Case study content — replace with detailed project information before publishing.
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
