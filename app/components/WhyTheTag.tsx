"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimationControls, PanInfo } from "framer-motion";
import { 
  Handshake, Unplug, UserCheck, Scale, Globe, 
  Layers, ArrowRight 
} from "lucide-react";

const differentiators = [
  { id: "01", title: "Skin In The Game", text: "We reject the 'billable hour' trap. Our compensation is structurally tied to measurable outcomes, ensuring our incentives are perfectly mirrored with your success.", icon: <Handshake /> },
  { id: "02", title: "The Zero-Lock-In Pact", text: "Our goal is to become unnecessary. We architect for total independence, delivering every engagement with a comprehensive, 'day-one' ready handover.", icon: <Unplug /> },
  { id: "03", title: "Architects, Not Analysts", text: "The senior specialists who design your strategy are the ones writing the code. No junior bait-and-switch—just elite execution from board level to production.", icon: <UserCheck /> },
  { id: "04", title: "Ethics as a Constraint", text: "Responsible technology isn't a post-script. We treat privacy, bias mitigation, and safety as non-negotiable architectural constraints from the first line of code.", icon: <Scale /> },
  { id: "05", title: "Green-State Infrastructure", text: "We optimize for the 'Carbon Footprint of Code.' Our ESG-integrated architecture reduces compute waste, lowering both your overhead and environmental impact.", icon: <Globe /> },
  { id: "06", title: "Execution-Led Strategy", text: "Slide decks don't ship products. We bridge the gap between high-level advisory and industrial-grade deployment with a single, unified delivery team.", icon: <Layers /> },
];

const WhyTheTAG = () => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  
  // Double the data for seamless looping
  const extendedData = [...differentiators, ...differentiators];

  // Animation settings
  const duration = 30; // Seconds for one full cycle

  return (
    <section className="relative py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/20 dark:bg-blue-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/20 dark:bg-indigo-500/10 rounded-full blur-[140px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl">
          <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">The Advantage</span>
          <h2 className="text-zinc-900 dark:text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85]">Why TAG?</h2>
          <div className="w-24 h-1.5 bg-blue-600 mt-8" />
        </motion.div>
      </div>

      {/* INFINITE TRACK */}
      <div 
        className="relative cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          ref={containerRef}
          className="flex gap-6 w-max"
          animate={isPaused ? {} : { x: ["0%", "-50%"] }}
          transition={{
            duration: duration,
            ease: "linear",
            repeat: Infinity,
          }}
          drag="x"
          dragConstraints={{ left: -2000, right: 0 }} // Dynamic constraints usually required for precise drag
          whileTap={{ cursor: "grabbing" }}
        >
          {extendedData.map((item, idx) => (
            <div key={`${item.id}-${idx}`} className="w-[320px] md:w-[450px] shrink-0">
              <CarouselCard item={item} />
            </div>
          ))}
        </motion.div>

        {/* SIDE GRADIENT MASKS */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-50 dark:from-zinc-950 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-50 dark:from-zinc-950 to-transparent z-20 pointer-events-none" />
      </div>
    </section>
  );
};

const CarouselCard = ({ item }: { item: any }) => (
  <div className="group h-full select-none">
    <div className="h-full min-h-[520px] p-8 md:p-10 rounded-[2.5rem] bg-white/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-white/5 transition-all duration-500 hover:border-blue-600/40 hover:shadow-2xl flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
      
      <span className="absolute right-6 top-6 text-7xl font-black text-zinc-900/[0.07] dark:text-white/[0.08] select-none pointer-events-none group-hover:text-blue-600/20 transition-colors duration-500 italic">
        {item.id}
      </span>

      <div className="relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/5 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mb-12 shadow-inner">
          {React.cloneElement(item.icon, { size: 32, strokeWidth: 1.5 })}
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-medium">
          {item.text}
        </p>
      </div>
    </div>
  </div>
);

export default WhyTheTAG;