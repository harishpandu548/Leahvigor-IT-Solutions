"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Code2, Megaphone, Users, ArrowUpRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";

const pillars = [
  {
    id: "tech",
    title: "Technology Engine",
    subtitle: "Bulletproof infrastructure and custom architecture designed to handle infinite scale securely.",
    icon: <Code2 size={32} />,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    tags: ["Cloud Infrastructure", "Cybersecurity", "Data Architecture", "Custom Software"],
    color: "from-blue-500/20 to-blue-900/60"
  },
  {
    id: "digital",
    title: "Digital Engine",
    subtitle: "Data-driven acquisition, SEO, and brand elevation. We turn raw traffic into loyal enterprise customers.",
    icon: <Megaphone size={32} />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    tags: ["Performance Marketing", "Enterprise SEO", "Brand Strategy", "Conversion Optimization"],
    color: "from-indigo-500/20 to-indigo-900/60"
  },
  {
    id: "talent",
    title: "Talent Engine",
    subtitle: "Executive search and engineering team scaling. We recruit the 1% of operators that redefine companies.",
    icon: <Users size={32} />,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    tags: ["Executive Search", "Technical Recruitment", "Leadership Consulting", "Team Scaling"],
    color: "from-purple-500/20 to-purple-900/60"
  }
];

function StackingCard({ pillar, index, progress }: { pillar: typeof pillars[0]; index: number; progress: MotionValue<number> }) {
  // Calculate the target scale based on position. Card 0 gets scaled down the most.
  const targetScale = 1 - ((pillars.length - index) * 0.05);
  const rangeStart = index / pillars.length;
  
  const scale = useTransform(progress, [rangeStart, 1], [1, targetScale]);
  // The card darkens slightly as it gets stacked under newer cards
  const overlayOpacity = useTransform(progress, [rangeStart, 1], [0, 0.5]);

  return (
    <div className="sticky top-24 lg:top-32 h-[75vh] w-full flex items-center justify-center origin-top mb-[15vh] last:mb-0">
      <motion.div 
        style={{ scale }}
        className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-[#0A0F1C] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-end transform-gpu"
      >
        {/* Dynamic Shadow/Dimming overlay when stacking */}
        <motion.div 
          style={{ opacity: overlayOpacity }} 
          className="absolute inset-0 bg-black z-20 pointer-events-none" 
        />

        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${pillar.image})` }}
          />
          {/* Heavy Gradient Overlay so text is highly readable */}
          <div className={`absolute inset-0 bg-gradient-to-t ${pillar.color} mix-blend-multiply opacity-80`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-[#050A14]/80 to-transparent opacity-90" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 w-full max-w-4xl">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-6">
            {pillar.icon}
          </div>
          <h3 className="font-display font-bold text-white text-4xl lg:text-6xl mb-6">
            {pillar.title}
          </h3>
          <p className="text-slate-300 text-xl lg:text-2xl leading-relaxed mb-10 max-w-3xl">
            {pillar.subtitle}
          </p>
          
          <div className="flex flex-wrap gap-3 mb-10">
            {pillar.tags.map((tag, i) => (
              <div key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium backdrop-blur-md">
                {tag}
              </div>
            ))}
          </div>

          <button className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-sans font-bold text-sm uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-colors duration-300 w-max cursor-pointer">
            Explore Engine
            <ArrowUpRight className="w-5 h-5 text-black group-hover:text-white transition-colors" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function GrowthEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // We map the progress from when the top of the container hits the viewport, 
    // to when the bottom of the container leaves.
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="growth-engine"
      className="relative bg-[#050A14] overflow-clip pt-24 lg:pt-32 pb-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 mb-16 md:mb-24 flex flex-col items-center text-center">
        <SectionLabel text="How we work" className="mb-6 mx-auto flex justify-center" />
        <h2 className="font-display font-bold text-white leading-[1.1] max-w-4xl mx-auto"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
          One partner.<br />
          <span className="gradient-text">Multiple growth engines.</span>
        </h2>
      </div>

      <div ref={containerRef} className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {pillars.map((pillar, index) => (
          <StackingCard 
            key={pillar.id} 
            pillar={pillar} 
            index={index} 
            progress={scrollYProgress} 
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 mt-16 md:mt-32 text-center">
        <p className="text-slate-400 text-xl lg:text-3xl leading-relaxed max-w-4xl mx-auto font-display font-medium">
          We don&apos;t build in silos. Our unique operating model integrates engineering, marketing, and talent acquisition into a single, high-performance machine designed to exponentially scale your enterprise.
        </p>
      </div>
    </section>
  );
}
