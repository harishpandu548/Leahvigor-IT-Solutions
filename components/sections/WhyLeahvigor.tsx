"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const blocks = [
  {
    number: "01",
    title: "Business First",
    description:
      "Technology should solve a business problem, not create another one. Every recommendation starts with your goals.",
  },
  {
    number: "02",
    title: "Built to Scale",
    description:
      "Solutions designed for where your business is going — not just where it is today. Architecture for tomorrow.",
  },
  {
    number: "03",
    title: "One Strategic Partner",
    description:
      "Technology, digital growth and talent under one roof. No silos, no misalignment — just integrated strategy.",
  },
  {
    number: "04",
    title: "Measurable Impact",
    description:
      "Every engagement should create measurable business value. We track what matters and optimize continuously.",
  },
];

/** A single card with magnifying-glass text zoom on hover */
function MagCard({ block, index }: { block: typeof blocks[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  const handleMouseLeave = useCallback(() => setMouse(null), []);

  // Lens config
  const LENS_R   = 110;   // radius of the magnifying lens in px
  const MAX_SCALE = 1.55; // max text scale at lens centre

  /**
   * Given a text element's bounding box (relative to card),
   * compute a scale factor based on how close it is to the lens centre.
   * Returns 1 (normal) when mouse is absent or element is outside lens.
   */
  const scaleFor = (elRef: React.RefObject<HTMLElement | null>) => {
    if (!mouse || !cardRef.current || !elRef.current) return 1;
    const cardRect = cardRef.current.getBoundingClientRect();
    const elRect   = elRef.current.getBoundingClientRect();

    // Centre of element relative to card
    const elCx = elRect.left + elRect.width  / 2 - cardRect.left;
    const elCy = elRect.top  + elRect.height / 2 - cardRect.top;

    const dist = Math.hypot(mouse.x - elCx, mouse.y - elCy);
    if (dist > LENS_R) return 1;

    // Smooth falloff: cosine curve from MAX_SCALE at centre → 1 at edge
    const t = 1 - dist / LENS_R;
    return 1 + (MAX_SCALE - 1) * Math.pow(Math.sin(t * Math.PI / 2), 1.6);
  };

  // Refs for each text element
  const numRef   = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef  = useRef<HTMLParagraphElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative p-10 lg:p-12 bg-midnight hover:bg-surface transition-colors duration-500 overflow-hidden cursor-none"
    >
      {/* Subtle hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top left, rgba(99,102,241,0.06), transparent 60%)" }}
      />

      {/* ── Magnifying lens circle ── */}
      {mouse && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            left: mouse.x - LENS_R,
            top:  mouse.y - LENS_R,
            width:  LENS_R * 2,
            height: LENS_R * 2,
            borderRadius: "50%",
            border: "1.5px solid rgba(99,102,241,0.35)",
            background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            boxShadow: "0 0 30px rgba(99,102,241,0.12), inset 0 0 20px rgba(99,102,241,0.05)",
          }}
        />
      )}

      {/* ── Number ── */}
      <motion.span
        ref={numRef}
        className="block font-display font-bold leading-none mb-8 select-none"
        style={{
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          background: "linear-gradient(135deg, #3B82F630, #6366F118)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          transformOrigin: "left center",
          display: "inline-block",
        }}
        animate={{ scale: scaleFor(numRef) }}
        transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
        aria-hidden="true"
      >
        {block.number}
      </motion.span>

      {/* ── Title ── */}
      <motion.h3
        ref={titleRef}
        className="font-display font-bold text-white mb-4"
        style={{
          fontSize: "clamp(1.2rem, 2vw, 1.5rem)",
          transformOrigin: "left center",
          display: "inline-block",
        }}
        animate={{ scale: scaleFor(titleRef) }}
        transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
      >
        {block.title}
      </motion.h3>

      {/* ── Description ── */}
      <br />
      <motion.p
        ref={descRef}
        className="text-slate-400 leading-relaxed font-sans max-w-sm"
        style={{
          fontSize: "clamp(0.85rem, 1.1vw, 1rem)",
          transformOrigin: "left center",
          display: "inline-block",
        }}
        animate={{ scale: scaleFor(descRef) }}
        transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
      >
        {block.description}
      </motion.p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-indigo-500/0 to-transparent group-hover:via-indigo-500/30 transition-all duration-500" />
    </motion.div>
  );
}

export default function WhyLeahvigor() {
  return (
    <section
      id="why-leahvigor"
      className="relative py-24 lg:py-32"
      aria-label="Why LEAHVIGOR"
    >
      {/* Glow */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] blur-[140px] opacity-8 pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF620, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionLabel text="Why Leahvigor" />
        <h2
          className="font-display font-bold text-white leading-tight mt-4 mb-16"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
        >
          Built around{" "}
          <span className="gradient-text">your ambition.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {blocks.map((block, i) => (
            <MagCard key={block.number} block={block} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
