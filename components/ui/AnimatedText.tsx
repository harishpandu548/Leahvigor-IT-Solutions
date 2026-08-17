"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  highlightWords = [],
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.toLowerCase().includes(hw.toLowerCase())
        );
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block mr-[0.25em] ${
              isHighlighted ? "gradient-text font-bold" : ""
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </span>
  );
}
