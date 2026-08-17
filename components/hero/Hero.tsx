"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    // Set initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-midnight"
      aria-label="Hero section"
    >
      {/* Container to center the huge text */}
      <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none z-10">
        {!scrolled && (
          <motion.h1
            layoutId="brand-logo-text"
            className="font-display font-medium leading-none text-white tracking-tight uppercase"
            style={{ 
              fontSize: "clamp(3rem, 12vw, 15rem)",
              transformOrigin: "center center"
            }}
            transition={{ type: "spring", bounce: 0.1, duration: 0.8 }}
          >
            LEAHVIGOR
          </motion.h1>
        )}
      </div>

      {/* Bottom info area (like Produx) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-12 left-0 right-0 max-w-[1400px] mx-auto px-6 lg:px-12 w-full flex flex-col md:flex-row justify-between items-end gap-6 z-20"
      >
        <div className="max-w-md">
          <h2 className="font-sans text-2xl md:text-3xl lg:text-4xl text-white font-medium leading-tight">
            Accelerate your growth.
          </h2>
        </div>

        <div className="flex flex-col items-end gap-3 text-slate-400">
          <span className="text-xs font-sans tracking-[0.2em] uppercase">[Scroll Down]</span>
        </div>
      </motion.div>
    </section>
  );
}
