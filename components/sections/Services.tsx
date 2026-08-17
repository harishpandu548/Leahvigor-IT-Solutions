"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { services } from "@/data/services";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState<number | null>(null);

  return (
    <section
      id="services"
      className="relative py-24 lg:py-32"
      aria-label="Our services"
    >
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-16">
        <SectionLabel text="What we do" />
        <div className="mt-4 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
          <h2
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
          >
            Four engines of growth.
          </h2>
          <p className="text-slate-400 text-base max-w-sm leading-relaxed font-sans">
            An integrated suite of technology, digital and talent solutions designed around business outcomes.
          </p>
        </div>
      </div>

      {/* Desktop: large interactive panels */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 hidden md:flex gap-4">
        {services.map((service, i) => {
          const isActive = activeIndex === i;
          return (
            <motion.div
              key={service.number}
              onHoverStart={() => setActiveIndex(i)}
              onHoverEnd={() => setActiveIndex(null)}
              className="relative rounded-2xl border border-white/8 overflow-hidden cursor-pointer group"
              style={{
                flex: isActive ? 2.2 : 1,
                transition: "flex 0.5s cubic-bezier(0.16,1,0.3,1)",
                background: isActive
                  ? `linear-gradient(135deg, rgba(13,20,33,0.95), rgba(13,20,33,0.9))`
                  : "rgba(13,20,33,0.7)",
              }}
              data-cursor="EXPLORE"
            >
              {/* Glow border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px ${service.accentColor}40`,
                  background: `radial-gradient(ellipse at top, ${service.accentColor}10, transparent 60%)`,
                }}
              />

              <div className="p-8 h-full flex flex-col justify-between min-h-[360px]">
                {/* Number */}
                <div className="flex items-start justify-between">
                  <motion.span
                    animate={{
                      fontSize: isActive ? "5rem" : "3rem",
                      opacity: isActive ? 0.15 : 0.08,
                    }}
                    transition={{ duration: 0.4 }}
                    className="font-display font-bold text-white leading-none select-none"
                    aria-hidden="true"
                  >
                    {service.number}
                  </motion.span>
                  <motion.div
                    animate={{ rotate: isActive ? 45 : 0, opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                    style={{ color: service.accentColor }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="mt-auto">
                  <p
                    className="text-xs font-sans font-medium uppercase tracking-widest mb-2"
                    style={{ color: service.accentColor }}
                  >
                    {service.tagline}
                  </p>
                  <h3 className="font-display font-bold text-white text-xl mb-3">
                    {service.title}
                  </h3>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="text-slate-400 text-sm leading-relaxed mb-4 font-sans">
                          {service.description}
                        </p>
                        <ul className="space-y-2">
                          {service.items.map((item, j) => (
                            <motion.li
                              key={item}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: j * 0.06, duration: 0.3 }}
                              className="flex items-center gap-2 text-sm text-slate-300 font-sans"
                            >
                              <span
                                className="w-1 h-1 rounded-full flex-shrink-0"
                                style={{ background: service.accentColor }}
                              />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: accordion */}
      <div className="md:hidden max-w-[1400px] mx-auto px-6 space-y-3">
        {services.map((service, i) => {
          const isOpen = mobileOpen === i;
          return (
            <div
              key={service.number}
              className="rounded-xl border border-white/8 overflow-hidden"
              style={{ background: "rgba(13,20,33,0.8)" }}
            >
              <button
                id={`service-accordion-${i}`}
                className="w-full flex items-center justify-between p-5 text-left"
                onClick={() => setMobileOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-display font-bold"
                    style={{ color: service.accentColor }}
                  >
                    {service.number}
                  </span>
                  <span className="font-display font-bold text-white text-lg">
                    {service.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-slate-400 flex-shrink-0 ml-2"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 border-t border-white/5">
                      <p className="text-slate-400 text-sm leading-relaxed mt-4 mb-3 font-sans">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm text-slate-300 font-sans"
                          >
                            <span
                              className="w-1 h-1 rounded-full flex-shrink-0"
                              style={{ background: service.accentColor }}
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
