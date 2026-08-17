"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "@/data/services";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  const totalSlides = services.length;

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrolledInto = -rect.top;
      const scrollableHeight = el.offsetHeight - window.innerHeight;
      if (scrolledInto < 0 || scrollableHeight <= 0) return;
      const progress = Math.min(1, Math.max(0, scrolledInto / scrollableHeight));
      const idx = Math.min(totalSlides - 1, Math.floor(progress * totalSlides));
      
      setActiveIndex((prev) => {
        if (prev !== idx) {
          // Track the previous index to determine scroll direction
          setPrevIndex(prev);
          return idx;
        }
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSlides]);

  // Determine if we scrolled down (1) or up (-1)
  const direction = activeIndex > prevIndex ? 1 : -1;
  const activeService = services[activeIndex];

  const variants = {
    enter: (dir: number) => ({
      zIndex: 30,
      clipPath: dir === 1 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
    }),
    center: {
      zIndex: 30,
      clipPath: "inset(0 0 0 0)",
    },
    exit: {
      zIndex: 20,
      clipPath: "inset(0 0 0 0)", // Stay visible underneath while new slide wipes over
    },
  };

  return (
    /* Tall scroll runway — one full viewport per service */
    <section
      ref={containerRef}
      id="services"
      aria-label="Our services"
      style={{ height: `${totalSlides * 100}vh` }}
      className="relative z-10 w-full bg-midnight"
    >
      {/* ── Sticky full-screen viewport ── */}
      <div
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        className="w-full"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", inset: 0 }}
          >
            {/* Full-screen background image */}
            <img
              src={activeService.image}
              alt={activeService.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />

            {/* Overlays */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.85) 100%)",
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)",
            }} />

            {/* ── TOP-LEFT: section label + heading (always same) ── */}
            <div style={{ position: "absolute", top: 0, left: 0, zIndex: 20, padding: "2.5rem 3.5rem" }}>
              <p style={{
                fontSize: "0.7rem", letterSpacing: "0.25em",
                textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
                marginBottom: "0.5rem", fontFamily: "var(--font-inter, sans-serif)",
              }}>
                What we do
              </p>
              <h2
                className="flex flex-wrap gap-x-[0.22em] gap-y-1 cursor-default"
                style={{
                  fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
                  fontFamily: "var(--font-syne, sans-serif)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.2,
                }}
              >
                {["Four", "engines", "of", "growth."].map((word, wIdx) => {
                  const highlight = ["engines", "growth."].includes(word);
                  return (
                    <motion.span
                      key={wIdx}
                      whileHover={{ 
                        scale: 1.05, 
                        color: highlight ? "#A855F7" : "#8B5CF6",
                        textShadow: highlight ? "0px 0px 15px rgba(168,85,247,0.6)" : "0px 0px 15px rgba(139,92,246,0.6)",
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`inline-block transition-colors ${highlight ? "gradient-text" : ""}`}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </h2>
            </div>

            {/* ── BOTTOM-LEFT: service details ── */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
              padding: "0 3.5rem 5rem",
            }}>
              {/* Number + tag */}
              <span style={{
                display: "inline-block", fontSize: "0.7rem",
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: activeService.accentColor,
                border: `1px solid ${activeService.accentColor}40`,
                borderRadius: "999px", padding: "0.25rem 0.75rem",
                marginBottom: "1rem",
                background: `${activeService.accentColor}12`,
                fontFamily: "var(--font-inter, sans-serif)",
              }}>
                {activeService.number} — {activeService.tagline}
              </span>

              {/* Large title */}
              <h3 style={{
                fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                fontFamily: "var(--font-syne, sans-serif)",
                fontWeight: 700, color: "#fff",
                lineHeight: 1.1, marginBottom: "1rem",
              }}>
                {activeService.title}
              </h3>

              {/* Description */}
              <p style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                maxWidth: "480px", lineHeight: 1.7,
                fontFamily: "var(--font-inter, sans-serif)",
                marginBottom: "1.5rem",
              }}>
                {activeService.description}
              </p>

              {/* Sub-items */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {activeService.items.map((item) => (
                  <span key={item} style={{
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-inter, sans-serif)",
                    color: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderRadius: "999px",
                    padding: "0.3rem 0.9rem",
                    background: "rgba(255,255,255,0.05)",
                  }}>
                    {item}
                  </span>
                ))}
              </div>

              {/* Dot progress indicators */}
              <div style={{ display: "flex", gap: "8px", marginTop: "2rem", alignItems: "center" }}>
                {services.map((_, di) => (
                  <motion.div
                    key={di}
                    animate={{
                      width: di === activeIndex ? 28 : 8,
                      opacity: di === activeIndex ? 1 : 0.3,
                      backgroundColor: di === activeIndex ? activeService.accentColor : "#ffffff",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ height: 3, borderRadius: 999 }}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT: slide counter ── */}
            <div style={{
              position: "absolute", right: "2.5rem", top: "50%",
              transform: "translateY(-50%)", zIndex: 20,
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem",
            }}>
              <span style={{
                color: "rgba(255,255,255,0.3)", fontSize: "0.7rem",
                letterSpacing: "0.15em", fontFamily: "var(--font-inter, sans-serif)",
              }}>
                {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(totalSlides).padStart(2, "0")}
              </span>
              <div style={{
                width: 1, height: 64,
                background: "rgba(255,255,255,0.1)",
                borderRadius: 999, overflow: "hidden", position: "relative",
              }}>
                <motion.div
                  style={{
                    position: "absolute", top: 0, left: 0,
                    width: "100%", background: activeService.accentColor, borderRadius: 999,
                  }}
                  animate={{ height: `${((activeIndex + 1) / totalSlides) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Scroll hint on first slide */}
            {activeIndex === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  position: "absolute", bottom: "5rem", right: "5rem",
                  zIndex: 20, display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "6px",
                }}
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
                >
                  <span style={{
                    fontSize: "0.6rem", letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "var(--font-inter,sans-serif)",
                  }}>Scroll</span>
                  <div style={{
                    width: 1, height: 40,
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)",
                  }} />
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
