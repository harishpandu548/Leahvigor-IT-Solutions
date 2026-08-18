"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue } from "framer-motion";
import { solutions, Solution } from "@/data/solutions";
import SectionLabel from "@/components/ui/SectionLabel";

function SolutionSlide({ 
  slide, 
  index, 
  totalSlides, 
  progress 
}: { 
  slide: Solution; 
  index: number; 
  totalSlides: number; 
  progress: MotionValue<number> 
}) {
  // Each slide (except 0) gets a segment of the total scroll progress to wipe in.
  const segmentLength = 1 / (totalSlides - 1);
  const start = (index - 1) * segmentLength;
  // We make the wipe finish slightly before the end of the segment to give a "hold" effect
  const wipeEnd = start + (segmentLength * 0.8);
  
  // Wipe from right to left (100% to 0%)
  const clipPercent = useTransform(progress, [start, wipeEnd], [100, 0]);
  const clipPath = useMotionTemplate`inset(0 0 0 ${index === 0 ? 0 : clipPercent}%)`;

  // Fade and slide up the text slightly after the wipe starts
  const textStart = start + (segmentLength * 0.2);
  const textEnd = start + (segmentLength * 0.6);
  const opacity = useTransform(progress, [textStart, textEnd], [0, 1]);
  const y = useTransform(progress, [textStart, textEnd], [20, 0]);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: index * 10,
        clipPath
      }}
    >
      {/* Background Image */}
      <img
        src={slide.image}
        alt={slide.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "contrast(1.15) saturate(1.15) brightness(1.05)"
        }}
      />
      {/* Smooth Edge Overlays */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 35%, transparent 60%)",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 25%, transparent 50%)",
        pointerEvents: "none"
      }} />

      {/* Slide Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          padding: "0 3.5rem 5rem",
        }}
      >
        <motion.div style={{ opacity: index === 0 ? 1 : opacity, y: index === 0 ? 0 : y }}>
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
            {slide.number} &mdash; {slide.tag}
          </span>
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
            {slide.title}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
              maxWidth: "480px",
              lineHeight: 1.7,
              fontFamily: "var(--font-inter, sans-serif)",
            }}
          >
            {slide.description}
          </p>
        </motion.div>

        {/* Dot indicators for THIS specific slide state */}
        <div style={{ display: "flex", gap: "8px", marginTop: "2rem", alignItems: "center" }}>
          {solutions.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === index ? 28 : 8,
                opacity: i === index ? 1 : 0.3,
                backgroundColor: i === index ? "#818cf8" : "#ffffff",
                height: 3,
                borderRadius: 999
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Solutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = solutions.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={containerRef}
      id="solutions"
      style={{ height: `${totalSlides * 100}vh` }}
      className="relative z-10 w-full bg-midnight"
      aria-label="Solutions section"
    >
      {/* ─── STICKY FULL-SCREEN PANEL ─── */}
      <div
        style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
        className="w-full"
      >
        {/* Render all slides stacked, their clipPath is driven by scrollYProgress */}
        {solutions.map((slide, index) => (
          <SolutionSlide 
            key={slide.number} 
            slide={slide} 
            index={index} 
            totalSlides={totalSlides} 
            progress={scrollYProgress} 
          />
        ))}

        {/* ── SECTION HEADING (Static on top of everything) ── */}
        <div style={{ 
          position: "absolute", zIndex: 100, padding: "2.5rem 3.5rem",
          top: "5rem", left: 0, pointerEvents: "none"
        }}>
          <div className="mb-2">
            <SectionLabel text="What we offer" />
          </div>
          <h2
            className="flex flex-nowrap gap-x-[0.22em] gap-y-1 cursor-default"
            style={{
              fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            Built for what's next.
          </h2>
        </div>

        {/* ─── RIGHT: Counter + progress line (Static on top) ─── */}
        <div
          style={{
            position: "absolute",
            right: "2.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.75rem",
            pointerEvents: "none"
          }}
        >
          {/* We can map the counter to the scroll progress to change the number smoothly */}
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
                originY: 0
              }}
              // Scale the progress bar directly from 0 to 1
              style={{ scaleY: scrollYProgress, background: "#818cf8", width: "100%", height: "100%", transformOrigin: "top" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
