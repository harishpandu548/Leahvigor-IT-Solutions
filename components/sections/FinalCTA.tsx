"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Animated glow background */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.25), rgba(59,130,246,0.15), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden="true" />

      {/* Border top/bottom */}
      <div className="absolute top-0 left-0 right-0 h-px glow-line" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 h-px glow-line" aria-hidden="true" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2
            className="font-display font-bold text-white leading-[0.95] mb-6 flex flex-wrap justify-center gap-x-[0.22em] gap-y-2 cursor-default"
            style={{ fontSize: "clamp(3rem, 8vw, 7.5rem)" }}
          >
            {["Ready", "to", "accelerate", "your", "growth?"].map((word, i) => {
              const highlight = ["your", "growth?"].includes(word);
              return (
                <motion.span
                  key={i}
                  whileHover={{ 
                    scale: 1.05, 
                    color: highlight ? "#A855F7" : "#8B5CF6",
                    textShadow: highlight ? "0px 0px 20px rgba(168,85,247,0.6)" : "0px 0px 20px rgba(139,92,246,0.6)",
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className={`inline-block transition-colors ${highlight ? "gradient-text-animated" : ""}`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h2>

          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto font-sans leading-relaxed mb-12">
            Let&apos;s turn your next challenge into your next opportunity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton>
              <Link
                id="final-cta-primary"
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-electric via-indigo-500 to-violet text-white font-display font-bold text-lg hover:shadow-glow-indigo hover:scale-[1.02] transition-all duration-300"
                data-cursor="TALK"
              >
                Start a Conversation
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                id="final-cta-secondary"
                href="/services"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-base hover:bg-white/5 hover:border-white/40 transition-all duration-300"
                data-cursor="EXPLORE"
              >
                Explore Our Services
                <ArrowRight
                  size={16}
                  className="text-indigo-400 group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
