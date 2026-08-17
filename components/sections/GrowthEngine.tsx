"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

type PillarKey = "technology" | "digital" | "talent" | null;

const pillars = {
  technology: {
    label: "Technology",
    color: "#3B82F6",
    items: ["Software", "Cloud", "Security", "Infrastructure"],
    orbitIcons: ["⚙️", "☁️", "🔒", "🖥️"],
  },
  digital: {
    label: "Digital",
    color: "#6366F1",
    items: ["Marketing", "SEO", "Brand", "Content"],
    orbitIcons: ["📈", "🎯", "✨", "📱"],
  },
  talent: {
    label: "Talent",
    color: "#8B5CF6",
    items: ["Recruitment", "Teams", "Leadership", "Employer Brand"],
    orbitIcons: ["👥", "🏆", "🚀", "🤝"],
  },
} as const;

// SVG viewBox dimensions — keep in sync with the svg below
const VW = 800;
const VH = 560;

// Node centers in SVG units (will be converted to % for HTML overlay)
const CX = 400, CY = 280, RADIUS = 200;
const nodePos = {
  technology: { x: CX - RADIUS,       y: CY - RADIUS * 0.6 },
  digital:    { x: CX + RADIUS,       y: CY - RADIUS * 0.6 },
  talent:     { x: CX,                y: CY + RADIUS * 0.9  },
};

/**
 * OrbitRing — pure HTML/CSS so rotation always works.
 * Renders an absolutely-positioned ring of icons that spin.
 */
function OrbitRing({
  svgX, svgY,       // node centre in SVG coords
  icons,
  color,
  active,
  orbitPx = 68,     // orbit radius in pixels (of the rendered SVG element)
}: {
  svgX: number; svgY: number;
  icons: readonly string[];
  color: string;
  active: boolean;
  orbitPx?: number;
}) {
  // Convert SVG coords → percentage of container
  const leftPct = (svgX / VW) * 100;
  const topPct  = (svgY / VH) * 100;

  return (
    <div
      style={{
        position: "absolute",
        left: `${leftPct}%`,
        top:  `${topPct}%`,
        width: 0,
        height: 0,
        // Don't add pointer events so SVG hover still works
        pointerEvents: "none",
      }}
    >
      {/* Spinning wrapper */}
      <motion.div
        style={{ width: 0, height: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: active ? 5 : 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {icons.map((icon, idx) => {
          const angleDeg = (idx / icons.length) * 360;
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = Math.cos(angleRad) * orbitPx;
          const y = Math.sin(angleRad) * orbitPx;

          return (
            <motion.div
              key={idx}
              animate={{ opacity: active ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "absolute",
                left: x,
                top:  y,
                width: 28,
                height: 28,
                transform: "translate(-50%, -50%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(10,16,26,0.92)",
                border: `1px solid ${color}55`,
                borderRadius: "50%",
                fontSize: "13px",
                // Counter-rotate so emoji stays upright
                animation: active
                  ? `counterSpin 5s linear infinite`
                  : `counterSpin 10s linear infinite`,
              }}
            >
              {icon}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function GrowthEngine() {
  const [hovered, setHovered] = useState<PillarKey>(null);

  const tipPos: Record<NonNullable<PillarKey>, React.CSSProperties> = {
    technology: { top: "8%",  left: "2%" },
    digital:    { top: "8%",  right: "2%" },
    talent:     { bottom: "6%", left: "50%", transform: "translateX(-50%)" },
  };

  return (
    <section
      id="growth-engine"
      className="relative py-24 lg:py-32"
      aria-label="Growth engine diagram"
    >
      {/* CSS keyframes for counter-spin (keeps icons upright) */}
      <style>{`
        @keyframes counterSpin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(-360deg); }
        }
      `}</style>

      {/* BG glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[160px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.12), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <SectionLabel text="How we work" className="justify-center mb-4" />
          <h2
            className="font-display font-bold text-white leading-tight flex flex-wrap justify-center gap-x-[0.22em] gap-y-2 cursor-default"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
          >
            {["One", "partner.", "Multiple", "growth", "engines."].map((word, i) => {
              const highlight = ["Multiple", "growth", "engines."].includes(word);
              return (
                <motion.span
                  key={i}
                  whileHover={{ 
                    scale: 1.05, 
                    color: highlight ? "#A855F7" : "#8B5CF6",
                    textShadow: highlight ? "0px 0px 20px rgba(168,85,247,0.6)" : "0px 0px 20px rgba(139,92,246,0.6)",
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

        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-center gap-16">
          {/* Diagram container — position:relative so HTML overlays work */}
          <div className="relative w-[800px] h-[560px]">

            {/* ── SVG ── */}
            <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full" aria-hidden="true">
              <defs>
                <radialGradient id="cGlow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#6366F1" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <linearGradient id="cGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#3B82F6" />
                  <stop offset="50%"  stopColor="#6366F1" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>

              {/* Connection lines */}
              {(["technology", "digital", "talent"] as const).map((key) => {
                const p = nodePos[key];
                return (
                  <motion.line
                    key={key}
                    x1={p.x} y1={p.y} x2={CX} y2={CY}
                    stroke={pillars[key].color}
                    strokeDasharray="6 4"
                    animate={{
                      opacity: hovered === key ? 0.8 : hovered === null ? 0.2 : 0.06,
                      strokeWidth: hovered === key ? 2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                );
              })}

              {/* Pillar nodes */}
              {(["technology", "digital", "talent"] as const).map((key) => {
                const p  = nodePos[key];
                const pl = pillars[key];
                const active = hovered === key;
                const dimmed = hovered !== null && hovered !== key;
                return (
                  <g
                    key={key}
                    onMouseEnter={() => setHovered(key)}
                    onMouseLeave={() => setHovered(null)}
                    className="cursor-pointer"
                    role="button"
                    aria-label={pl.label}
                    tabIndex={0}
                    onFocus={() => setHovered(key)}
                    onBlur={() => setHovered(null)}
                  >
                    {/* Faint orbit track */}
                    <circle cx={p.x} cy={p.y} r={52}
                      fill="none" stroke={pl.color}
                      strokeWidth={0.6} strokeDasharray="3 7"
                      opacity={active ? 0.45 : 0.14}
                    />
                    {/* Glow fill */}
                    <motion.circle cx={p.x} cy={p.y} r={50} fill={pl.color}
                      animate={{ opacity: active ? 0.14 : 0.04, r: active ? 52 : 50 }}
                      transition={{ duration: 0.35 }}
                    />
                    {/* Main circle */}
                    <motion.circle cx={p.x} cy={p.y} r={36}
                      fill="rgba(13,20,33,0.95)" stroke={pl.color}
                      animate={{ strokeWidth: active ? 2 : 1, opacity: dimmed ? 0.3 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Letter */}
                    <text x={p.x} y={p.y + 6} textAnchor="middle"
                      fill={pl.color} fontSize="16"
                      fontFamily="var(--font-syne, sans-serif)" fontWeight="800"
                    >{pl.label[0]}</text>
                    {/* Label */}
                    <text
                      x={p.x}
                      y={key === "talent" ? p.y + 62 : p.y - 52}
                      textAnchor="middle"
                      fill={active ? pl.color : "#94A3B8"}
                      fontSize="12"
                      fontFamily="var(--font-syne, sans-serif)"
                      fontWeight="700" letterSpacing="0.1em"
                    >{pl.label.toUpperCase()}</text>
                  </g>
                );
              })}

              {/* Centre — Business Growth */}
              <g>
                <motion.circle cx={CX} cy={CY} r={90}
                  fill="none" stroke="rgba(99,102,241,0.18)"
                  strokeWidth={1} strokeDasharray="4 8"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: `${CX}px ${CY}px` }}
                />
                <motion.circle cx={CX} cy={CY} r={70}
                  fill="transparent" stroke="url(#cGrad)"
                  animate={{ r: hovered !== null ? 76 : 70 }}
                  transition={{ duration: 0.4 }} strokeWidth={1.5}
                />
                <motion.circle cx={CX} cy={CY} r={55}
                  fill="rgba(13,20,33,0.95)"
                  animate={{ r: hovered !== null ? 58 : 55 }}
                  transition={{ duration: 0.4 }}
                />
                <motion.circle cx={CX} cy={CY} r={70}
                  fill="url(#cGlow)"
                  animate={{ opacity: hovered !== null ? 0.3 : 0.12 }}
                  transition={{ duration: 0.4 }}
                />
                <text x={CX} y={CY - 6} textAnchor="middle" fill="white"
                  fontSize="10" fontFamily="var(--font-syne,sans-serif)"
                  fontWeight="700" letterSpacing="0.06em">BUSINESS</text>
                <text x={CX} y={CY + 9} textAnchor="middle" fill="#6366F1"
                  fontSize="10" fontFamily="var(--font-syne,sans-serif)"
                  fontWeight="800" letterSpacing="0.06em">GROWTH</text>
              </g>
            </svg>

            {/* ── HTML orbit rings (rotate reliably) ── */}
            {(["technology", "digital", "talent"] as const).map((key) => (
              <OrbitRing
                key={key}
                svgX={nodePos[key].x}
                svgY={nodePos[key].y}
                icons={pillars[key].orbitIcons}
                color={pillars[key].color}
                active={hovered === key}
              />
            ))}

            {/* ── Hover tooltip ── */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  key={hovered}
                  initial={{ opacity: 0, scale: 0.88, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, y: 6 }}
                  transition={{ duration: 0.22 }}
                  className="absolute rounded-xl border p-4 min-w-[160px] z-30 pointer-events-none"
                  style={{
                    ...tipPos[hovered],
                    borderColor: `${pillars[hovered].color}45`,
                    background: "rgba(10,16,26,0.97)",
                    backdropFilter: "blur(12px)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  }}
                >
                  <p className="text-xs font-display font-bold tracking-widest uppercase mb-3"
                    style={{ color: pillars[hovered].color }}>
                    {pillars[hovered].label}
                  </p>
                  <ul className="space-y-2">
                    {pillars[hovered].items.map((item, i) => (
                      <motion.li key={item}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-2 text-sm text-slate-300 font-sans"
                      >
                        <span className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: pillars[hovered].color }} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right side text */}
          <div className="max-w-xs">
            <div className="space-y-6">
              {(["technology", "digital", "talent"] as const).map((key) => (
                <motion.div key={key}
                  className="flex items-start gap-3 cursor-pointer"
                  onHoverStart={() => setHovered(key)}
                  onHoverEnd={() => setHovered(null)}
                  animate={{ opacity: hovered !== null && hovered !== key ? 0.35 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                    style={{ background: pillars[key].color }} />
                  <div>
                    <p className="font-display font-bold text-sm uppercase tracking-widest"
                      style={{ color: pillars[key].color }}>{pillars[key].label}</p>
                    <p className="text-slate-400 text-sm font-sans mt-1">
                      {pillars[key].items.join(" · ")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden grid grid-cols-1 gap-4 mt-8">
          {(["technology", "digital", "talent"] as const).map((key) => {
            const pl = pillars[key];
            return (
              <div key={key} className="rounded-xl border p-6"
                style={{ borderColor: `${pl.color}30`, background: "rgba(13,20,33,0.8)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{pl.orbitIcons[0]}</span>
                  <p className="font-display font-bold text-sm uppercase tracking-widest"
                    style={{ color: pl.color }}>{pl.label}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pl.items.map((item) => (
                    <span key={item}
                      className="text-xs font-sans px-3 py-1 rounded-full border border-white/10 text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="rounded-xl border border-indigo-500/30 p-6 text-center bg-gradient-to-br from-indigo-500/5 to-violet-500/5">
            <p className="font-display font-bold text-xl text-white">
              Business <span className="gradient-text">Growth</span>
            </p>
            <p className="text-slate-400 text-sm font-sans mt-2">All three engines working as one</p>
          </div>
        </div>
      </div>
    </section>
  );
}
