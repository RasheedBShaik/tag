"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Share2, Terminal, Zap, Shield, Fingerprint, ChevronRight, 
  Cpu, Rocket, Paintbrush, Coffee, Heart
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------- 1. HERO ARCHITECTURE ---------------------- */
const HeroArchitecture = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = svgRef.current?.querySelectorAll(".hero-path");
      const nodes = svgRef.current?.querySelectorAll(".hero-node");
      if (paths) {
        gsap.fromTo(paths,
          { strokeDasharray: 3000, strokeDashoffset: 3000, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: (i) => (i % 2 === 0 ? 0.4 : 0.1),
            duration: 2.5,
            stagger: { amount: 1.5, from: "start" },
            ease: "power4.inOut",
            onComplete: () => { gsap.set(paths, { clearProps: "strokeDasharray,strokeDashoffset" }); }
          }
        );
      }
      if (nodes) {
        gsap.fromTo(nodes,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, stagger: { amount: 1, from: "random" }, ease: "back.out(1.7)", delay: 1 }
        );
      }
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none pt-10 z-0 flex items-center justify-center">
      <svg ref={svgRef} viewBox="0 0 1000 1000" className="w-[120%] h-[120%] md:w-full md:h-full text-blue-900 dark:text-blue-500" fill="none" stroke="currentColor" strokeWidth="1">
        <g>
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 24;
            const x2 = (500 + 700 * Math.cos(angle)).toFixed(3);
            const y2 = (500 + 700 * Math.sin(angle)).toFixed(3);
            return <path key={`radial-${i}`} d={`M500,500 L${x2},${y2}`} className="hero-path opacity-20" strokeWidth="0.5" />;
          })}
        </g>
        <circle cx="500" cy="500" r="120" className="hero-path" strokeDasharray="4 8" />
        <circle cx="500" cy="500" r="280" className="hero-path opacity-10" />
        <circle cx="500" cy="500" r="420" className="hero-path opacity-30" strokeWidth="0.5" />
        {[120, 280, 420].map((r, ringIdx) =>
          Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const cx = (500 + r * Math.cos(angle)).toFixed(3);
            const cy = (500 + r * Math.sin(angle)).toFixed(3);
            return <circle key={`node-${ringIdx}-${i}`} cx={cx} cy={cy} r={ringIdx === 0 ? 3 : 2} fill="currentColor" className="hero-node" />;
          })
        )}
        <rect x="440" y="440" width="120" height="120" className="hero-path" rx="2" strokeWidth="1.5" />
        <path d="M440,440 L400,400 M560,440 L600,400 M440,560 L400,600 M560,560 L600,600" className="hero-path opacity-40" />
      </svg>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#fcfcfc] dark:to-[#0a0a0a] opacity-80" />
    </div>
  );
};

/* ---------------------- 2. BLUEPRINT SVG ---------------------- */
const BlueprintSVG = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = svgRef.current?.querySelectorAll("path, circle, rect, polyline");
      if (targets && targets.length > 0) {
        gsap.fromTo(targets,
          { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 },
          {
            strokeDashoffset: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: svgRef.current, start: "top 90%", toggleActions: "play none none reverse" },
            onComplete: () => { gsap.set(targets, { clearProps: "strokeDasharray,strokeDashoffset" }); }
          }
        );
      }
    }, svgRef);
    return () => ctx.revert();
  }, []);
  return <svg ref={svgRef} viewBox="0 0 400 400" fill="none" stroke="currentColor" className={`text-blue-600/30 dark:text-blue-400/20 stroke-[1.5] ${className}`} style={{ overflow: 'visible' }}>{children}</svg>;
};

/* ---------------------- 3. MAIN COMPONENT ---------------------- */
export default function AestheticApproach() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSecondHovered, setIsSecondHovered] = useState(false);

  const baseCards = [
    { icon: <Terminal size={24} />, t: "Edge Intelligence", d: "Sub-10ms response times via localized edge processing." },
    { icon: <Share2 size={24} />, t: "Mesh Connectivity", d: "Interconnected systems sharing state with zero drift." },
    { icon: <Fingerprint size={24} />, t: "Identity Core", d: "Privacy-first protocols built on zero-knowledge proofing." },
    { icon: <Shield size={24} />, t: "Secure Governance", d: "Automated compliance and ethical guardrails integrated." }
  ];

  const specialtyCards = [
    { icon: <Cpu size={24} />, t: "Technology Advisory & Consulting", d: "Navigating digital complexity with architectural precision." },
    { icon: <Rocket size={24} />, t: "Strategic Ventures & Partnerships", d: "Scaling impact through high-alignment collaborative ecosystems." },
    { icon: <Paintbrush size={24} />, t: "Design Studio", d: "Crafting sensory-rich digital experiences and interfaces." },
    { icon: <Coffee size={24} />, t: "Culinary Arts & Culture", d: "Bridging the gap between modern tech and traditional craft." },
    { icon: <Heart size={24} />, t: "Health & Wellness", d: "Integrating data-driven insights into human-centric care." }
  ];

  const infiniteCards = [...baseCards, ...baseCards];
  const infiniteSpecialty = [...specialtyCards, ...specialtyCards];

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-blue-600 origin-left z-50" />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <HeroArchitecture />
        <div className="relative z-10 space-y-10 max-w-5xl">
          <div className="space-y-6">
            <h1 className="text-[10vw] md:text-8xl font-medium tracking-tight leading-[0.85]">Precision <br /> <span className="font-serif italic font-light">Architected.</span></h1>
            <p className="max-w-xl mx-auto text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">Converting complex vision into robust, scalable technological assets through multidisciplinary rigor.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-full overflow-hidden transition-all hover:pr-12 active:scale-95">
              <span className="relative z-10 flex items-center gap-2 font-medium">Insights <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /></span>
              <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2 font-medium">Portfolio <ChevronRight size={18} className="text-blue-500" /></button>
          </div>
        </div>
      </section>

      {/* FOUNDATION SECTION */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h3 className="text-3xl my-4 font-medium">Our Foundation: Empowering Innovation Through Diverse Perspectives.</h3>
        <p className="text-md text-zinc-500 leading-relaxed">Our approach is built on diversity of thought and collective creativity. We believe the most powerful solutions emerge from the synergy of human empathy, strategic intelligence, and purposeful technology.</p>
      </section>

      {/* VISION & MISSION */}
      <section className="relative z-10 py-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <div className="space-y-8">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-600/10 rounded-2xl text-blue-600"><Zap /></div>
              <h2 className="text-5xl font-medium tracking-tight">Vision</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed italic text-lg font-light">We seek a world where technology feels like an extension of our best selves—where the brilliance of the human mind and the warmth of the human heart are amplified by the tools we create, leaving no one behind in the shadow of the machine.</p>
          </div>
          <div className="relative aspect-square">
            <BlueprintSVG className="w-full h-full">
              <circle cx="200" cy="200" r="150" strokeDasharray="10 5" />
              <rect x="120" y="120" width="160" height="160" rx="20" strokeWidth="2" className="text-blue-600" />
            </BlueprintSVG>
          </div>
          <div className="relative aspect-square md:order-last">
            <BlueprintSVG className="w-full h-full">
              <path d="M50 300 L200 50 L350 300 Z" strokeWidth="2" className="text-blue-600" strokeLinejoin="round" />
              <circle cx="200" cy="215" r="78" strokeWidth="1.5" className="text-blue-500" strokeDasharray="4 4" />
            </BlueprintSVG>
          </div>
          <div className="space-y-8">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 flex items-center justify-center bg-zinc-100 dark:bg-white/5 rounded-2xl text-blue-600"><Shield /></div>
              <h2 className="text-5xl font-medium tracking-tight">Mission</h2>
            </div>
            <p className="text-zinc-400 leading-relaxed italic text-lg font-light">Transparency is the soul of the ethical revolution. It transforms the 'black box' of technology into a glass house, where the heart’s intent and the mind’s logic are visible to all.</p>
          </div>
        </div>
      </section>

      {/* FIRST INFINITE CAROUSEL SECTION */}
      <section className="relative z-10 py-24 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <svg width="100%" height="100%">
            <pattern id="node-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#2563eb" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#node-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-20">
            <h3 className="text-4xl font-medium mb-6">Our Process Delivers Clarity, Collaboration, and Results.</h3>
            <p className="text-zinc-400 text-lg">Every partnership follows a transparent, structured journey.</p>
          </div>

          <div 
            className="relative flex overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <motion.div 
              className="flex gap-6 pr-6"
              animate={{ x: isHovered ? undefined : ["0%", "-50%"] }}
              transition={{
                x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" },
              }}
            >
              {infiniteCards.map((card, i) => (
                <div key={i} className="w-[320px] md:w-[400px] flex-shrink-0 group p-10 border border-white/10 rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 hover:bg-zinc-900/80">
                  <div className="text-blue-500 mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">{card.icon}</div>
                  <h4 className="text-2xl font-bold mb-4 transition-colors group-hover:text-blue-400">{card.t}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed transition-colors group-hover:text-zinc-300">{card.d}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECOND INFINITE CAROUSEL SECTION (Specialties) */}
      <section className="relative z-10 py-24 bg-[#050505] text-white overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-20 text-right ml-auto">
            <h3 className="text-4xl font-medium mb-6">Multidisciplinary Verticals</h3>
            <p className="text-zinc-400 text-lg">Our expertise extends across diverse industries, from strategic consulting to culinary arts.</p>
          </div>

          <div 
            className="relative flex overflow-hidden"
            onMouseEnter={() => setIsSecondHovered(true)}
            onMouseLeave={() => setIsSecondHovered(false)}
          >
            <motion.div 
              className="flex gap-6 pr-6"
              animate={{ x: isSecondHovered ? undefined : ["-50%", "0%"] }} // Reversed direction for visual balance
              transition={{
                x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" }, // Slightly slower for readability
              }}
            >
              {infiniteSpecialty.map((card, i) => (
                <div key={i} className="w-[320px] md:w-[400px] flex-shrink-0 group p-10 border border-white/5 rounded-[2.5rem] bg-zinc-900/30 backdrop-blur-xl transition-all duration-500 hover:border-zinc-500/50 hover:bg-zinc-900/60">
                  <div className="text-zinc-400 mb-8 transition-all duration-500 group-hover:text-white group-hover:scale-110">
                    {card.icon}
                  </div>
                  <h4 className="text-2xl font-bold mb-4 transition-colors group-hover:text-blue-400">{card.t}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed transition-colors group-hover:text-zinc-300">{card.d}</p>
                  
                </div>
              ))}
            </motion.div>
          </div>

          {/* Combined Status Indicator for both carousels */}
          <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${(isHovered || isSecondHovered) ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-blue-600 animate-pulse shadow-[0_0_8px_#2563eb]'}`} />
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                {(isHovered || isSecondHovered) ? "System Inspection Active" : "Universal Scroll Engine: Online"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}