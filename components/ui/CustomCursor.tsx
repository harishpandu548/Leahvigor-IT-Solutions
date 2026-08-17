"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [label, setLabel] = useState("");
  const [isTouch, setIsTouch] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
      }
      setIsVisible(true);
    };

    const animate = () => {
      const dx = pos.current.x - ringPos.current.x;
      const dy = pos.current.y - ringPos.current.y;
      ringPos.current.x += dx * 0.12;
      ringPos.current.y += dy * 0.12;
      if (cursorRingRef.current) {
        const size = isHovering ? 48 : 32;
        cursorRingRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const dataLabel = target.getAttribute("data-cursor");
      setLabel(dataLabel || "");
      setIsHovering(true);
    };

    const handleElementLeave = () => {
      setIsHovering(false);
      setLabel("");
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const attachListeners = () => {
      const interactiveEls = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", handleElementEnter);
        el.addEventListener("mouseleave", handleElementLeave);
      });
    };

    attachListeners();
    rafRef.current = requestAnimationFrame(animate);

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [isHovering]);

  if (isTouch) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white z-[9999] pointer-events-none mix-blend-difference"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease, width 0.3s ease, height 0.3s ease",
          willChange: "transform",
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
        }}
      >
        <div
          className="w-full h-full rounded-full border flex items-center justify-center"
          style={{
            borderColor: isHovering
              ? "rgba(99,102,241,0.8)"
              : "rgba(255,255,255,0.3)",
            backgroundColor: isHovering ? "rgba(99,102,241,0.1)" : "transparent",
            transition: "border-color 0.3s ease, background-color 0.3s ease",
          }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-[8px] font-display font-bold text-indigo-400 tracking-widest uppercase whitespace-nowrap"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
