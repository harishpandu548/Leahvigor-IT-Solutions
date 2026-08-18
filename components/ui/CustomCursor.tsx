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
      if (cursorRingRef.current) {
        // Center the 64x64 logo cursor exactly on the pointer (32px offset)
        cursorRingRef.current.style.transform = `translate(${e.clientX - 32}px, ${e.clientY - 32}px)`;
      }
      setIsVisible(true);
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

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      observer.disconnect();
    };
  }, [isHovering]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRingRef}
      className="fixed top-0 left-0 z-[999999] pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
        willChange: "transform",
      }}
    >
      <div
        className={`relative transition-transform duration-300 flex flex-col items-center justify-center ${
          isHovering ? "scale-125" : "scale-100"
        }`}
      >
        {/* The Logo Cursor */}
        <div className="relative w-16 h-16 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
          <img
            src="/logo/logo (2).png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        {/* Hover Label */}
        <AnimatePresence>
          {label && (
            <motion.span
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute -bottom-6 text-[10px] font-display font-bold text-white tracking-widest uppercase whitespace-nowrap bg-indigo-600/80 px-2 py-0.5 rounded-sm backdrop-blur-md"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
