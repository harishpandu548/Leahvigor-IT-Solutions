"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { solutions } from "@/data/solutions";

export default function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSlides = solutions.length;

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionTop = -rect.top; // how far we've scrolled into the section
      const sectionHeight = el.offsetHeight - window.innerHeight;

      if (sectionTop < 0 || sectionHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, sectionTop / sectionHeight));
      const idx = Math.min(totalSlides - 1, Math.floor(progress * totalSlides));
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [totalSlides]);

  return (
    /*
     * The section is TALL: one full viewport height per slide.
     * The inner sticky div pins itself to the top of the viewport
     * while the user scrolls through the tall section.
     */
    <section
      ref={containerRef}
      id="solutions"
      style={{ height: `${totalSlides * 100}vh` }}
      className="relative w-full"
      aria-label="Solutions section"
    >
      {/* ─── STICKY FULL-SCREEN PANEL ─── */}
      <div
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        className="w-full"
      >
        {/* Full-screen background image — cross-fades between slides */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0 }}
          >
            <img
              src={solutions[activeIndex].image}
              alt={solutions[activeIndex].title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Overlays for text legibility */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.82) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 60%)",
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ─── TOP-LEFT: Label + heading (always visible) ─── */}
        <div
          style={{ position: "absolute", top: 0, left: 0, zIndex: 20, padding: "2.5rem 3.5rem" }}
        >
          <p
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginBottom: "0.5rem",
              fontFamily: "var(--font-inter, sans-serif)",
            }}
          >
            What we offer
          </p>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            Built for what&apos;s next.
          </h2>
        </div>

        {/* ─── BOTTOM-LEFT: Title + description (changes per slide) ─── */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 20,
            padding: "0 3.5rem 5rem",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Number / tag badge */}
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#818cf8",
                  border: "1px solid rgba(99,102,241,0.35)",
                  borderRadius: "999px",
                  padding: "0.25rem 0.75rem",
                  marginBottom: "1rem",
                  background: "rgba(99,102,241,0.08)",
                  fontFamily: "var(--font-inter, sans-serif)",
                }}
              >
                {solutions[activeIndex].number} &mdash; {solutions[activeIndex].tag}
              </span>

              {/* Large solution title */}
              <h3
                style={{
                  fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                  fontFamily: "var(--font-syne, sans-serif)",
                  fontWeight: 700,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                }}
              >
                {solutions[activeIndex].title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
                  maxWidth: "480px",
                  lineHeight: 1.7,
                  fontFamily: "var(--font-inter, sans-serif)",
                }}
              >
                {solutions[activeIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot indicators */}
          <div style={{ display: "flex", gap: "8px", marginTop: "2rem", alignItems: "center" }}>
            {solutions.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === activeIndex ? 28 : 8,
                  opacity: i === activeIndex ? 1 : 0.3,
                  backgroundColor: i === activeIndex ? "#818cf8" : "#ffffff",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ height: 3, borderRadius: 999 }}
              />
            ))}
          </div>
        </div>

        {/* ─── RIGHT: Counter + progress line ─── */}
        <div
          style={{
            position: "absolute",
            right: "2.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.7rem",
              letterSpacing: "0.15em",
              fontFamily: "var(--font-inter, sans-serif)",
            }}
          >
            {String(activeIndex + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(totalSlides).padStart(2, "0")}
          </span>
          <div
            style={{
              width: 1,
              height: 64,
              background: "rgba(255,255,255,0.1)",
              borderRadius: 999,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                background: "#818cf8",
                borderRadius: 999,
              }}
              animate={{ height: `${((activeIndex + 1) / totalSlides) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Scroll hint — first slide only */}
        {activeIndex === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{
              position: "absolute",
              bottom: "5rem",
              right: "5rem",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
            >
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter,sans-serif)" }}>
                Scroll
              </span>
              <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)" }} />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
