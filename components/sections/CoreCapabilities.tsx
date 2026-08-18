"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionLabel from "@/components/ui/SectionLabel";

const capabilities = [
  {
    id: "01",
    title: "Audience Expansion",
    description: "Architecting hyper-targeted campaigns. We leverage advanced analytics and performance marketing to dominate search rankings and maximize conversion ROI.",
    tags: ["SEO & SEM", "PERFORMANCE", "BRANDING"],
    image: "/clientwork/newsec1.webp",
  },
  {
    id: "02",
    title: "Elite Team Building",
    description: "Securing elite technical talent. Our specialized executive search frameworks rapidly scale your engineering teams with top-tier, vetted professionals.",
    tags: ["EXECUTIVE SEARCH", "TECH RECRUITMENT", "SCALING"],
    image: "/clientwork/newsec2.webp",
  },
  {
    id: "03",
    title: "Enterprise Engineering",
    description: "Designing bespoke software architecture. We build robust, custom enterprise systems that streamline your operations from concept to deployment.",
    tags: ["CUSTOM DEV", "ARCHITECTURE", "ENTERPRISE"],
    image: "/clientwork/newsec3.webp",
  },
  {
    id: "04",
    title: "Infrastructure Modernization",
    description: "Executing flawless transitions to modern cloud infrastructure. Guaranteeing maximum uptime, uncompromising security, and infinite scalability.",
    tags: ["AWS & AZURE", "SECURITY", "SCALABLE"],
    image: "/clientwork/newsec4.webp",
  },
  {
    id: "05",
    title: "Digital Fortification",
    description: "Deploying enterprise-grade protection networks. We provide proactive threat monitoring and stringent compliance structures to safeguard critical assets.",
    tags: ["THREAT MONITORING", "COMPLIANCE", "PROTECTION"],
    image: "/clientwork/newsec5.webp",
  },
];

export default function CoreCapabilities() {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <section className="relative py-24 lg:py-32 bg-[#050505]" aria-label="Core Capabilities">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-12">
        <SectionLabel text="Client work" />
        <h2 className="font-display font-bold text-white text-4xl md:text-5xl lg:text-6xl mt-6 max-w-3xl leading-[1.2]">
          Work that moves businesses forward.
        </h2>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-[400px] md:h-[450px] lg:h-[500px] flex gap-2 md:gap-4">
        {capabilities.map((item, index) => {
          const isActive = activeItem === index;

          return (
            <motion.div
              key={item.id}
              layout
              onMouseEnter={() => setActiveItem(index)}
              className="relative rounded-3xl overflow-hidden cursor-pointer group"
              animate={{
                flex: isActive ? 5 : 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1], // snappy but smooth spring-like easing
              }}
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className={`object-cover transition-transform duration-1000 ${
                  isActive ? "scale-100" : "scale-110 group-hover:scale-105"
                }`}
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-700 ${
                  isActive ? "opacity-100" : "opacity-50 group-hover:opacity-70"
                }`}
              />

              {/* Content Container */}
              <div className="absolute inset-0 p-4 lg:p-8 flex flex-col justify-end">
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="mb-6"
                    >
                      <h3 className="font-display font-bold text-2xl lg:text-4xl text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 font-sans text-sm lg:text-base max-w-lg mb-4 line-clamp-2 lg:line-clamp-none">
                        {item.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 hidden md:flex">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-sm border border-[#D4AF37]/30 bg-black/40 text-[#D4AF37] text-[10px] lg:text-xs font-sans font-bold tracking-widest uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Circle Number (Always Visible) */}
                <motion.div
                  layout
                  className={`w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center font-display font-bold text-base lg:text-xl transition-colors duration-500 z-10 ${
                    isActive
                      ? "bg-[#D4AF37] text-black"
                      : "bg-white/10 text-white backdrop-blur-md border border-white/20 group-hover:bg-[#D4AF37] group-hover:text-black group-hover:border-[#D4AF37]"
                  }`}
                >
                  {item.id}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Added bottom text/button area */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 border-t border-white/10 pt-10">
        <div className="max-w-2xl">
          <p className="text-slate-400 font-sans text-base lg:text-lg leading-relaxed">
            We don&apos;t just deliver services; we engineer holistic business transformations. By fusing data-driven strategy, world-class design, and robust technical architecture, we empower global enterprises to outpace their competition and scale effortlessly into the future.
          </p>
        </div>
        <button 
          data-cursor="VIEW"
          className="px-8 py-4 bg-white text-black font-sans font-bold tracking-widest uppercase text-xs rounded-full hover:bg-[#D4AF37] transition-colors duration-300 flex-shrink-0"
        >
          Explore All Case Studies
        </button>
      </div>
    </section>
  );
}
