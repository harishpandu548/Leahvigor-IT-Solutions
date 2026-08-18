"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import SectionLabel from "@/components/ui/SectionLabel";

// Awwwards-style text stagger effect
const wordVariants = {
  initial: { y: "120%", opacity: 0 },
  animate: { 
    y: "0%", 
    opacity: 1, 
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.2 } 
  },
};

function StaggeredQuote({ text, active }: { text: string; active: number }) {
  const words = text.split(" ");
  return (
    <motion.div
      key={active}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ staggerChildren: 0.035 }}
      className="font-display font-medium text-white leading-[1.1] flex flex-wrap gap-x-[0.25em] gap-y-2"
      style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)" }}
    >
      {/* 
        We use an absolute quote mark positioned in the background 
        to give that premium editorial feel without disrupting the text flow 
      */}
      <span className="absolute -top-16 -left-10 text-[10rem] text-white/5 font-serif select-none pointer-events-none">
        &ldquo;
      </span>
      
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block pb-2">
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
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
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section
      id="testimonials"
      className="relative z-10 py-32 lg:py-48 bg-midnight overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* Dynamic Background Glow - shifts based on active slide */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] blur-[160px] opacity-10 pointer-events-none transition-transform duration-1000"
        style={{ 
          background: "radial-gradient(ellipse, #6366F1, transparent 70%)",
          transform: `translate(-50%, -50%) rotate(${active * 45}deg) scale(${1 + active * 0.1})`
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative lg:min-h-[60vh]">
          
          {/* ─── LEFT COLUMN: Sticky Controls ─── */}
          <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit flex flex-col gap-16 z-20">
            <SectionLabel text="Client voices" />
            
            <div className="flex flex-col gap-8">
              {/* Premium Numeric Pagination */}
              <div className="font-display text-5xl text-white font-light tracking-tighter flex items-end gap-3">
                <span>{String(active + 1).padStart(2, '0')}</span>
                <span className="text-white/20 text-3xl mb-1">/</span> 
                <span className="text-white/40 text-3xl mb-1">{String(testimonials.length).padStart(2, '0')}</span>
              </div>

              {/* Progress Line */}
              <div className="w-full max-w-[200px] h-[2px] bg-white/10 relative overflow-hidden rounded-full">
                  <motion.div 
                    key={active}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                    className="absolute inset-0 bg-indigo-500 origin-left rounded-full"
                  />
              </div>

              {/* Magnetic Navigation Arrows */}
              <div className="flex gap-4 mt-2">
                <button 
                  onClick={prev} 
                  className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 backdrop-blur-sm"
                  aria-label="Previous testimonial"
                >
                   <ChevronLeft className="text-white/50 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </button>
                <button 
                  onClick={next} 
                  className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 backdrop-blur-sm"
                  aria-label="Next testimonial"
                >
                   <ChevronRight className="text-white/50 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* ─── RIGHT COLUMN: Typography Reveal ─── */}
          <div className="lg:col-span-8 flex flex-col justify-center relative z-20">
            <div className="min-h-[450px]">
              <AnimatePresence mode="wait">
                <div key={active} className="absolute inset-0">
                  
                   <StaggeredQuote text={testimonials[active].quote} active={active} />
                   
                   {/* Author Details - Parallax Entrance */}
                   <motion.div 
                     initial={{ opacity: 0, x: 30 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, transition: { duration: 0.2 } }}
                     transition={{ delay: 0.6, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                     className="mt-14 flex items-center gap-6"
                   >
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-display text-xl font-bold flex-shrink-0 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                        {testimonials[active].company[0]}
                      </div>
                      <div>
                        <p className="font-display font-bold text-white text-xl tracking-wide">
                          {testimonials[active].company}
                        </p>
                        <p className="text-indigo-400 text-xs font-sans mt-1.5 tracking-[0.2em] uppercase font-semibold">
                          Verified Client
                        </p>
                      </div>
                   </motion.div>
                   
                </div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
