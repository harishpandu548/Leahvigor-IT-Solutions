"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((prev) => (prev + 1) % testimonials.length),
    []
  );
  const prev = useCallback(
    () =>
      setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      id="testimonials"
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] blur-[140px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #6366F115, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel text="Client voices" className="mb-12" />

        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Quote icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
              <Quote size={18} className="text-indigo-400" />
            </div>
          </motion.div>

          {/* Quote text */}
          <div className="min-h-[120px] mb-10">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-semibold text-white leading-relaxed"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)" }}
              >
                &ldquo;{testimonials[active].quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`author-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4 mb-10"
            >
              {/* Avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0">
                {testimonials[active].company[0]}
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm">
                  {testimonials[active].company}
                </p>
                <p className="text-slate-500 text-xs font-sans mt-0.5">
                  {/* Update with real name/role before publishing */}
                  Verified Client
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-6">
            {/* Progress dots */}
            <div className="flex items-center gap-2 flex-1" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className="group relative h-0.5 rounded-full overflow-hidden transition-all duration-300"
                  style={{ width: active === i ? 32 : 16 }}
                >
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ background: active === i ? "#6366F1" : "rgba(255,255,255,0.15)" }}
                  />
                  {active === i && !paused && (
                    <motion.span
                      className="absolute inset-0 rounded-full origin-left"
                      style={{ background: "#8B5CF6" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-3">
              <button
                id="testimonial-prev"
                onClick={prev}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                id="testimonial-next"
                onClick={next}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/40 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
