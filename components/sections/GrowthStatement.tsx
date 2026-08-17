"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GrowthStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [60, 0]);

  const words1 = "Your business is ready to grow.".split(" ");
  const words2 = "Is your technology ready to keep up?".split(" ");
  const body =
    "Growth creates complexity. New customers, new teams, new systems and new challenges. Leahvigor helps businesses turn that complexity into an advantage.";

  return (
    <section
      ref={ref}
      id="growth-statement"
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-label="Growth statement"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] blur-[140px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #6366F1, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div style={{ opacity, y }}>
          <div className="max-w-4xl mx-auto text-center">
            {/* H2 headline — split words */}
            <h2
              className="font-display font-bold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
            >
              {words1.map((word, i) => (
                <motion.span
                  key={`w1-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block mr-[0.22em]"
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <h2
              className="font-display font-bold leading-tight mb-12"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
            >
              {words2.map((word, i) => {
                const highlight = ["technology", "ready"].includes(word.toLowerCase().replace("?", ""));
                return (
                  <motion.span
                    key={`w2-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.3 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block mr-[0.22em] ${highlight ? "gradient-text" : "text-slate-300"}`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </h2>

            {/* Glow divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 h-px mx-auto mb-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent origin-center"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-sans"
            >
              {body}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
