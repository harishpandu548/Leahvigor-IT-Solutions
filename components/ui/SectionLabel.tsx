"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionLabelProps {
  text: string;
  className?: string;
}

export default function SectionLabel({ text, className = "" }: SectionLabelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      <span className="w-6 h-px bg-gradient-to-r from-electric to-violet" />
      <span className="text-xs font-sans font-medium tracking-[0.2em] uppercase text-indigo-400">
        {text}
      </span>
    </motion.div>
  );
}
