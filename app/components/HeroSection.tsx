"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

/* ---------------------- 1. PARAMETRIC SVG ANIMATION ---------------------- */

const HeroArchitecture = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = svgRef.current?.querySelectorAll(".hero-path");
      const nodes = svgRef.current?.querySelectorAll(".grid-node");

      if (paths) {
        // Initial drawing of the blueprint
        gsap.set(paths, { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 });

        gsap.to(paths, {
          strokeDashoffset: 0,
          opacity: (i) => (i % 3 === 0 ? 0.7 : 0.2),
          duration: 3,
          stagger: 0.04,
          ease: "expo.out",
        });

        // Unique: Floating "Data Nodes" animation
        if (nodes) {
          gsap.set(nodes, { scale: 0, opacity: 0 });
          gsap.to(nodes, {
            scale: 1,
            opacity: 0.8,
            duration: 1,
            stagger: {
              amount: 2,
              grid: [10, 10],
              from: "center"
            },
            delay: 1.5,
            ease: "back.out(2)"
          });

          // Continuous pulsing effect
          gsap.to(nodes, {
            opacity: 0.2,
            duration: "random(1, 3)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      }
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background Gradient for Contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(30,64,175,0.15)_0%,transparent_80%)]" />

      <svg
        ref={svgRef}
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full text-blue-800 dark:text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        {/* The Radial Web */}
        {Array.from({ length: 24 }).map((_, i) => (
          <path
            key={`v-${i}`}
            className="hero-path"
            d={`M${i * (1000 / 23)} 0 C 500 300, 500 700, ${1000 - i * (1000 / 23)} 1000`}
          />
        ))}

        {/* Intersection Nodes (The "Data Points") */}
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 6 }).map((_, col) => (
            <circle
              key={`node-${row}-${col}`}
              className="grid-node fill-blue-800 dark:fill-blue-400"
              cx={200 + col * 120}
              cy={200 + row * 120}
              r="2"
              stroke="none"
            />
          ))
        )}
      </svg>

      {/* Bottom Fade */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#fcfcfc] dark:to-[#0a0a0a]" />
    </div>
  );
};

/* ---------------------- 2. ASSEMBLY INTERFACE ---------------------- */

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.5 + i * 0.1, duration: 0.8, ease: "easeOut" as const }
    })
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#fcfcfc] dark:bg-[#0a0a0a] overflow-hidden py-24">
      <HeroArchitecture />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">

        {/* MAIN TEXT */}
        <div className="space-y-4 mb-12">
          <motion.div
            custom={0} variants={textVariants} initial="hidden" animate="visible"
            className="inline-block px-4 py-1.5 mb-4 rounded-full border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400 text-[10px] uppercase tracking-[0.2em] font-bold"
          >
            Advisory & Consulting Services
          </motion.div>

          <motion.h1
            custom={1} variants={textVariants} initial="hidden" animate="visible"
            className="text-[10vw] md:text-8xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[0.9]"
          >
            Precision <br />
            <span className="font-serif text-blue-800 dark:text-blue-500">Architected.</span>
          </motion.h1>

          <motion.p
            custom={2} variants={textVariants} initial="hidden" animate="visible"
            className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed"
          >
            From high-level strategy to hands-on implementation, our eight service areas span the full transformation lifecycle—shaped by our <span className="text-zinc-950 dark:text-white font-medium">Heart · Mind · Technology</span> framework.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          custom={3} variants={textVariants} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link href="/services" className="group px-10 py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-full font-bold text-[11px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform">
            Explore Services <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="px-10 py-4 border border-zinc-200 dark:border-zinc-800 rounded-full font-bold text-[11px] uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
            Contact
          </Link>
        </motion.div>

        {/* PARTNER BRANDING */}
        <motion.div 
          custom={4} variants={textVariants} initial="hidden" animate="visible"
          className="mx-auto max-w-4xl mt-24 flex flex-col items-center"
        >
          <h3 className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-black mb-4">
            Partner with
          </h3>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            <Link 
              href="https://anaravtech.com" 
              target="_blank"
              className="text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-500 transition-colors duration-300"
            >
              Anarav Technologies
            </Link>
          </h2>
          <div className="w-12 h-px bg-blue-600 mt-6" />
        </motion.div>

      </div>
    </section>
  );
}