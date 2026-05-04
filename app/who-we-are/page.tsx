"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, Heart, Cpu, Brain, ChevronRight, Activity, Layers, 
  Fingerprint, Sparkles, Terminal, Code2, Microscope, Compass, ExternalLink
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------- 1. HERO PERSPECTIVE ---------------------- */

const HeroArchitecture = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = svgRef.current?.querySelectorAll(".hero-path");
      if (paths) {
        gsap.set(paths, { strokeDasharray: 1200, strokeDashoffset: 1200, opacity: 0 });
        gsap.to(paths, { 
          strokeDashoffset: 0, 
          opacity: (i) => (i % 2 === 0 ? 0.5 : 0.2),
          duration: 2.5, 
          stagger: 0.02, 
          ease: "power3.out",
          delay: 0.1
        });
      }
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg ref={svgRef} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full text-blue-900 dark:text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.2">
        {Array.from({ length: 18 }).map((_, i) => (
          <path key={`v-${i}`} d={`M${i * (1000/17)} 0 L${500 + (i - 8.5) * 140} 1000`} className="hero-path opacity-0" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => {
          if (i === 6) return null; 
          return <path key={`h-${i}`} d={`M-50 ${i * 90} Q 500 ${i * 90 + 120} 1050 ${i * 90}`} className="hero-path opacity-0" />;
        })}
        <g className="hero-path opacity-0" strokeWidth="1.5">
          <path d="M500 0 V1000" />
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fcfcfc] dark:to-[#0a0a0a]" />
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
        gsap.set(targets, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });
        gsap.to(targets, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: svgRef.current, start: "top 90%", toggleActions: "play none none reverse" }
        });
      }
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 400 400" fill="none" stroke="currentColor" className={`text-blue-900/60 dark:text-blue-400/20 stroke-[2] ${className}`} style={{ overflow: 'visible' }}>
      {children}
    </svg>
  );
};

/* ---------------------- 3. MAIN PAGE ---------------------- */

export default function AestheticApproach() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-blue-800 origin-left z-50" />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <HeroArchitecture />
        <div className="relative z-10 space-y-10 max-w-5xl">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.3em] uppercase border border-blue-800/20 bg-white/60 dark:bg-black/50 backdrop-blur-md text-blue-800 dark:text-blue-400 rounded-full">
              Digital Framework v2.0
            </span>
            <h1 className="text-[10vw] md:text-8xl font-medium tracking-tight leading-[0.85]">
              Precision <br/> <span className="font-serif italic font-light">Architected.</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg md:text-xl text-zinc-700 dark:text-zinc-400 leading-relaxed font-light">
              Transforming complex visions into high-performance digital assets through mathematical rigor and aesthetic clarity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 bg-blue-800 text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2 font-medium">Explore Core <ArrowRight size={18} /></span>
              <div className="absolute inset-0 bg-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 rounded-full border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors text-blue-800 dark:text-blue-400 font-medium">
              View Roadmap
            </button>
          </div>
        </div>
      </section>

      {/* VISIONARIES */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-sm font-mono text-blue-800 dark:text-blue-500 uppercase tracking-widest mb-4">02 // The Mindset</h2>
            <h3 className="text-5xl font-light tracking-tighter italic">The Visionaries.</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
                name: "Dr. Elena Vance", 
                role: "Director of Strategy",
                bio: "Spearheading the intersection of human behavior and algorithmic efficiency.",
                blueprint: <circle cx="200" cy="200" r="120" strokeDasharray="10 10" className="opacity-0" />
              },
              { 
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800",
                name: "Marcus Thorne", 
                role: "Lead Creative Architect",
                bio: "Defining the visual language of the next-generation decentralized web.",
                blueprint: <path d="M50 200 L200 50 L350 200 L200 350 Z" className="opacity-0" />
              }
            ].map((v, i) => (
              <div key={i} className="group relative">
                <div className="relative h-[500px] w-full overflow-hidden rounded-[3rem] mb-8">
                  <img src={v.img} alt={v.name} className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-12">
                    <p className="text-white text-lg italic">"{v.bio}"</p>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-3xl font-bold tracking-tight">{v.name}</h4>
                    <p className="text-blue-800 dark:text-blue-500 font-mono text-sm uppercase mt-1">{v.role}</p>
                  </div>
                  <BlueprintSVG className="w-24 h-24">{v.blueprint}</BlueprintSVG>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL TEAM GRID */}
      <section className="py-32 px-6 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="space-y-4">
              <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest">03 // Execution Layer</h2>
              <h3 className="text-5xl font-light tracking-tighter italic">Technical Engineering.</h3>
            </div>
            <p className="max-w-xs text-zinc-500 text-sm leading-relaxed">
              Our multidisciplinary squad of engineers ensures every line of code is optimized for extreme scale.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", title: "Backend Systems", name: "Julian Reyes" },
              { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", title: "Frontend Dev", name: "Sarah Chen" },
              { img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400", title: "R&D Specialists", name: "Aiden Frost" },
              { img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400", title: "DevOps", name: "Lila Voss" }
            ].map((t, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[3/4]">
                <img src={t.img} className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={t.name} />
                <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-end backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1">{t.title}</span>
                  <h5 className="font-bold text-xl">{t.name}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST INSIGHTS / BLOG PREVIEW */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-16">
            <h3 className="text-4xl font-light tracking-tight">Latest Insights.</h3>
            <button className="text-sm font-mono flex items-center gap-2 hover:text-blue-800 transition-colors">
              VIEW ARCHIVE <ExternalLink size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { date: "MAY 2026", title: "The Neural Latency Problem", cat: "RESEARCH" },
              { date: "APR 2026", title: "Architectural Symmetry in CSS", cat: "DESIGN" },
              { date: "MAR 2026", title: "Scaling Beyond 1M Concurrents", cat: "ENGINEERING" }
            ].map((post, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="text-[10px] font-mono text-zinc-400 mb-4">{post.date} — {post.cat}</div>
                <h4 className="text-2xl font-medium leading-tight group-hover:text-blue-800 transition-colors underline-offset-8 decoration-1 group-hover:underline">{post.title}</h4>
                <div className="mt-6 h-px w-full bg-zinc-200 dark:bg-zinc-800 group-hover:bg-blue-800 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}