"use client";

import { motion, useScroll, useTransform, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const stats = [
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 12, suffix: "+", label: "Countries Served" },
  { value: 24, suffix: "/7", label: "Global Support" },
];

function AnimatedCounter({ value, suffix }: { value: number, suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2.5,
        ease: [0.32, 0.72, 0, 1], // snappy spring-like ease
        onUpdate: (v) => setCount(Math.floor(v)),
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Impact() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 lg:py-48 bg-[#050505] overflow-hidden"
      aria-label="Our Impact"
    >
      {/* Background abstract elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          <SectionLabel text="The Impact" />
          
          <motion.h2 
            style={{ scale, opacity }}
            className="font-display font-bold text-white text-5xl md:text-7xl lg:text-8xl mt-8 leading-[1.1] max-w-5xl"
          >
            We don&apos;t just build technology. We engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric via-indigo to-violet">growth.</span>
          </motion.h2>

          <p className="mt-8 text-slate-400 font-sans text-xl md:text-2xl max-w-2xl">
            Empowering global enterprises to scale faster, operate smarter, and dominate their industries.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 mt-32">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              style={{ y: index % 2 === 0 ? y1 : y2 }}
              className="flex flex-col items-center text-center p-8 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
            >
              <h3 className="font-display font-bold text-5xl md:text-6xl text-white mb-4">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="font-sans text-slate-400 text-sm tracking-widest uppercase font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Marquee Background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="flex whitespace-nowrap"
        >
          <span className="font-display font-bold text-[15rem] leading-none text-white mr-16">
            LEAHVIGOR  
          </span>
          <span className="font-display font-bold text-[15rem] leading-none text-white mr-16">
            LEAHVIGOR 
          </span>
        </motion.div>
      </div>
    </section>
  );
}
