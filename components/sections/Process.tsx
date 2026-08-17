"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processStages } from "@/data/process";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });

  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-label="Our process"
    >
      {/* BG grid */}
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden="true" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel text="How we work" />
        <h2
          className="font-display font-bold text-white leading-tight mt-4 mb-16 lg:mb-24"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
        >
          From ambition{" "}
          <span className="gradient-text">to acceleration.</span>
        </h2>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          {/* Progress line */}
          <div className="relative mb-12">
            <div className="absolute top-0 left-0 right-0 h-px bg-white/8" />
            <motion.div
              className="absolute top-0 left-0 h-px bg-gradient-to-r from-electric via-indigo-500 to-violet origin-left"
              style={{ width: lineWidth }}
            />
          </div>

          <div className="grid grid-cols-4 gap-8">
            {processStages.map((stage, i) => (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative group"
              >
                {/* Node dot on timeline */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, type: "spring", stiffness: 300 }}
                  className="absolute -top-[25px] left-0 w-[13px] h-[13px] rounded-full border-2 border-indigo-500 bg-midnight"
                  style={{
                    boxShadow: "0 0 12px rgba(99,102,241,0.6)",
                  }}
                />

                {/* Content */}
                <div className="pt-8">
                  <span
                    className="text-xs font-display font-bold tracking-[0.2em] uppercase gradient-text mb-3 block"
                  >
                    {stage.number}
                  </span>
                  <h3 className="font-display font-bold text-white text-2xl mb-3 group-hover:gradient-text transition-all">
                    {stage.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed font-sans">
                    {stage.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical steps */}
        <div className="lg:hidden relative pl-8 border-l border-white/8">
          {/* Animated fill line */}
          <motion.div
            className="absolute left-0 top-0 w-px bg-gradient-to-b from-electric via-indigo-500 to-violet origin-top"
            style={{ height: lineWidth }}
          />

          <div className="space-y-10">
            {processStages.map((stage, i) => (
              <motion.div
                key={stage.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Dot */}
                <div
                  className="absolute -left-[37px] top-1 w-3 h-3 rounded-full bg-indigo-500 border-2 border-midnight"
                  style={{ boxShadow: "0 0 8px rgba(99,102,241,0.6)" }}
                />

                <span className="text-xs font-display font-bold tracking-widest uppercase gradient-text block mb-1">
                  {stage.number}
                </span>
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  {stage.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-sans">
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
