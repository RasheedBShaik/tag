"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  Handshake, Unplug, UserCheck, Scale, Globe, 
  Layers, ShieldCheck, Target, Zap, ArrowRight, ChevronDown 
} from "lucide-react";

const differentiators = [
  { id: "01", title: "Shared Risk. Shared Reward.", text: "We don't get paid to produce slide decks. Our engagement model ties compensation to outcomes.", icon: <Handshake /> },
  { id: "02", title: "The No-Dependency Commitment", text: "We build capability, not stickiness. Every engagement ends with a documented handover.", icon: <Unplug /> },
  { id: "03", title: "Senior Principals. Every Engagement.", text: "The people in the room during the pitch are the people doing the work. No bait-and-switch.", icon: <UserCheck /> },
  { id: "04", title: "Ethics Are Non-Negotiable", text: "Responsible technology isn't a checkbox — it's a core constraint we never compromise on.", icon: <Scale /> },
  { id: "05", title: "ESG-Integrated Architecture", text: "Environmental and Social principles are woven into every technical decision from day one.", icon: <Globe /> },
  { id: "06", title: "Strategy Through to Production", text: "Genuine end-to-end capability from board-level vision to production-grade deployment.", icon: <Layers /> },
  { id: "07", title: "Digital Sovereignty by Design", text: "We architect for independence: vendor-neutral, portable, and free from lock-in patterns.", icon: <ShieldCheck /> },
  { id: "08", title: "Mission Alignment", text: "We invest time understanding your values. Tech that contradicts culture always underperforms.", icon: <Target /> },
];

const WhyTheTAG = () => {
  const containerRef = useRef(null);
  const [showAll, setShowAll] = useState(false);

  // Determine which cards to show
  const visibleCards = showAll ? differentiators : differentiators.slice(0, 4);

  return (
    <section ref={containerRef} className="relative py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      
      {/* FULL SECTION SVG BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg 
          className="w-full h-full opacity-40 dark:opacity-60" 
          viewBox="0 0 1440 1000" 
          preserveAspectRatio="none" 
          fill="none"
        >
          <motion.path
            d="M -100 0 C 200 300 1200 100 1500 1000"
            stroke="url(#gradient-long)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="gradient-long" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        {/* HEADER */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 mb-6"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">The Edge</span>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-white">
            WHY <span className="text-blue-600 italic font-light">TAG?</span>
          </h2>
        </div>

        {/* RESPONSIVE GRID: Mobile 1, Tab 2, PC 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleCards.map((item, i) => (
              <GridCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {/* VIEW MORE TOGGLE */}
        <div className="mt-16 flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="group flex items-center gap-3 px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-full text-sm font-bold uppercase tracking-widest transition-all hover:border-blue-600 hover:text-blue-600"
          >
            {showAll ? "Show Less" : "View More"}
            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>
        </div>
      </div>
    </section>
  );
};

const GridCard = ({ item, index }: { item: any; index: number }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const skew = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);

  return (
    <motion.div
      ref={cardRef}
      layout
      style={{ skewY: skew }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative"
    >
      <div className="h-full p-8 rounded-[2.5rem] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 group-hover:-translate-y-2">
        <div className="mb-8 flex justify-between items-start">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            {React.cloneElement(item.icon, { size: 22 })}
          </div>
          <span className="text-2xl font-black text-zinc-200 dark:text-zinc-800 group-hover:text-blue-600/20 transition-colors">
            {item.id}
          </span>
        </div>

        <h3 className="text-xl font-bold text-zinc-950 dark:text-white mb-4 leading-tight">
          {item.title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {item.text}
        </p>

        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-bold uppercase tracking-widest text-blue-600">
            Details
          </span>
          <ArrowRight size={16} className="text-blue-600" />
        </div>
      </div>
    </motion.div>
  );
};

export default WhyTheTAG;