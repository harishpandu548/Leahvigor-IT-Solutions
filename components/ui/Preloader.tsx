"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PHRASES = [
  "IT Solutions...",
  "Digital Marketing...",
  "Talent Acquisition...",
  "Website Creation...",
  "Ready."
];

// Total loading time in ms
const LOAD_DURATION = 1800;

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    // Force scroll to top on page load, bypassing browser's default scroll restoration
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }

    // Cycle through phrases based on the total load duration
    const intervalTime = LOAD_DURATION / (PHRASES.length - 1);
    
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => {
        if (prev < PHRASES.length - 1) return prev + 1;
        return prev;
      });
    }, intervalTime);

    // End loading after LOAD_DURATION
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, LOAD_DURATION + 200); // 200ms extra buffer for the "Ready." text to display

    return () => {
      clearInterval(phraseInterval);
      clearTimeout(timeout);
    };
  }, []);

  // To prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] text-white"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16 relative w-[240px] md:w-[320px] lg:w-[400px] flex justify-center items-center"
          >
            <img
              src="/logo/logo (2).png"
              alt="LEAHVIGOR Logo"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Changing Text */}
          <div className="h-10 mb-8 overflow-hidden relative w-full flex justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="text-white font-sans text-lg md:text-xl font-bold tracking-widest uppercase absolute drop-shadow-lg"
              >
                {PHRASES[phraseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: LOAD_DURATION / 1000, ease: "linear" }}
              className="absolute inset-0 bg-indigo-500 origin-left rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
