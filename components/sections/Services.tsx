"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, MotionValue } from "framer-motion";
import { services, Service } from "@/data/services";

function ServiceSlide({ 
  slide, 
  index, 
  totalSlides, 
  progress 
}: { 
  slide: Service; 
  index: number; 
  totalSlides: number; 
  progress: MotionValue<number> 
}) {
  const segmentLength = 1 / (totalSlides - 1);
  const start = (index - 1) * segmentLength;
  const wipeEnd = start + (segmentLength * 0.8);
  
  // Wipe from bottom to top (100% to 0%)
  const clipPercent = useTransform(progress, [start, wipeEnd], [100, 0]);
  const clipPath = useMotionTemplate`inset(${index === 0 ? 0 : clipPercent}% 0 0 0)`;

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
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 40,
        padding: "0 3.5rem 4rem",
        maxWidth: "800px"
      }}>
        <motion.div style={{ opacity: index === 0 ? 1 : opacity, y: index === 0 ? 0 : y }}>
          <span style={{
            display: "inline-block", fontSize: "0.7rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: slide.accentColor,
            border: `1px solid ${slide.accentColor}40`,
            borderRadius: "999px", padding: "0.25rem 0.75rem",
            marginBottom: "1rem",
            background: `${slide.accentColor}12`,
            fontFamily: "var(--font-inter, sans-serif)",
          }}>
            {slide.number} — {slide.tagline}
          </span>

          <h3 style={{
            fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
            fontFamily: "var(--font-syne, sans-serif)",
            fontWeight: 700, color: "#fff",
            lineHeight: 1.1, marginBottom: "1rem",
          }}>
            {slide.title}
          </h3>

          <p style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)",
            maxWidth: "480px", lineHeight: 1.7,
            fontFamily: "var(--font-inter, sans-serif)",
            marginBottom: "1.5rem",
          }}>
            {slide.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {slide.items.map((item) => (
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
        </motion.div>

        {/* Dot progress indicators for THIS specific slide state */}
        <div style={{ display: "flex", gap: "8px", marginTop: "2rem", alignItems: "center" }}>
          {services.map((_, di) => (
            <div
              key={di}
              style={{
                width: di === index ? 28 : 8,
                opacity: di === index ? 1 : 0.3,
                backgroundColor: di === index ? slide.accentColor : "#ffffff",
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

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = services.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
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
        {/* Render all slides stacked, their clipPath is driven by scrollYProgress */}
        {services.map((slide, index) => (
          <ServiceSlide 
            key={slide.number} 
            slide={slide} 
            index={index} 
            totalSlides={totalSlides} 
            progress={scrollYProgress} 
          />
        ))}

        {/* ── SECTION HEADING (Static on top) ── */}
        <div style={{ 
          position: "absolute", zIndex: 100, padding: "2.5rem 3.5rem",
          top: "5rem", left: 0, pointerEvents: "none"
        }}>
          <p style={{
            fontSize: "0.7rem", letterSpacing: "0.25em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
            marginBottom: "0.5rem", fontFamily: "var(--font-inter, sans-serif)",
          }}>
            What we do
          </p>
          <h2
            className="flex flex-nowrap gap-x-[0.22em] gap-y-1 cursor-default"
            style={{
              fontSize: "clamp(1.4rem, 2.2vw, 2rem)",
              fontFamily: "var(--font-syne, sans-serif)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.2,
              whiteSpace: "nowrap",
              width: "max-content",
            }}
          >
            {["Four", "engines", "of", "growth."].map((word, wIdx) => {
              const highlight = ["engines", "growth."].includes(word);
              return (
                <span
                  key={wIdx}
                  className={`inline-block ${highlight ? "gradient-text" : ""}`}
                >
                  {word}
                </span>
              );
            })}
          </h2>
        </div>

        {/* ── RIGHT: slide counter (Static on top) ── */}
        <div style={{
          position: "absolute", right: "2.5rem", top: "50%",
          transform: "translateY(-50%)", zIndex: 100,
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem",
          pointerEvents: "none"
        }}>
          <div style={{
            width: 1, height: 64,
            background: "rgba(255,255,255,0.1)",
            borderRadius: 999, overflow: "hidden", position: "relative",
          }}>
            <motion.div
              style={{
                position: "absolute", top: 0, left: 0,
                width: "100%", background: "#fff", borderRadius: 999, originY: 0,
                scaleY: scrollYProgress
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
