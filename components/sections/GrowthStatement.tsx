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

  return (
    <section
      ref={ref}
      id="growth-statement"
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-label="Growth statement"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div style={{ opacity, y }}>
          <div className="w-full mx-auto text-center">
            {/* H2 headline — split words */}
            <h2
              className="font-display font-bold text-white leading-tight mb-4 flex flex-wrap justify-center gap-x-[0.22em] gap-y-2 cursor-default"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
            >
              {words1.map((word, i) => (
                <motion.span
                  key={`w1-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.05, 
                    color: "#8B5CF6",
                    textShadow: "0px 0px 20px rgba(139,92,246,0.6)",
                  }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                    scale: { duration: 0.2, ease: "easeOut" },
                    color: { duration: 0.2 },
                    textShadow: { duration: 0.2 }
                  }}
                  className="inline-block transition-colors"
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <h2
              className="font-display font-bold leading-tight mb-12 flex flex-wrap justify-center gap-x-[0.22em] gap-y-2 cursor-default"
              style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
            >
              {words2.map((word, i) => {
                const highlight = ["technology", "ready"].includes(word.toLowerCase().replace("?", ""));
                return (
                  <motion.span
                    key={`w2-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      scale: 1.05, 
                      color: "#6366F1",
                      textShadow: "0px 0px 20px rgba(99,102,241,0.6)",
                    }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                      duration: 0.7,
                      delay: 0.3 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                      scale: { duration: 0.2, ease: "easeOut" },
                      color: { duration: 0.2 },
                      textShadow: { duration: 0.2 }
                    }}
                    className={`inline-block transition-colors ${highlight ? "gradient-text" : "text-slate-300"}`}
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-400 text-lg md:text-xl xl:text-2xl leading-relaxed w-full mx-auto font-sans flex flex-col gap-6"
            >
              <p>
                Growth creates complexity. New customers, new teams, new systems, and entirely new challenges. At Leahvigor, we specialize in helping modern businesses turn that growing complexity into an unfair competitive advantage. 
              </p>
              <p>
                Whether you need to architect scalable digital infrastructure, deploy predictive marketing engines, or recruit elite engineering talent, we bridge the gap between where your business is today, and where it demands to be tomorrow. We don&apos;t just consult; we execute. 
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
