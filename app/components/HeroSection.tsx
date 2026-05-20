"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ---------------------- TYPES ---------------------- */
interface QuantumParticle {
  x: number;
  y: number;
  angle: number;
  radius: number;
  speed: number;
  size: number;
  colorType: "primary" | "secondary" | "ambient";
  pulsePhase: number;
}

/* ---------------------- 1. QUANTUM GRAVITY CANVAS ENGINE ---------------------- */

const QuantumFieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particleCount = 180;
    const particles: QuantumParticle[] = [];
    
    // Core singularity anchor point (Defaults to center screen)
    const singularity = { 
      x: width * 0.5, 
      y: height * 0.5,
      targetX: width * 0.5,
      targetY: height * 0.5
    };

    const generateField = (w: number, h: number) => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        // Distribute particles in expanding algorithmic radii
        const maxRadius = Math.max(w, h) * 0.6;
        const radius = Math.pow(Math.random(), 1.5) * maxRadius + 20;
        
        let colorType: "primary" | "secondary" | "ambient" = "ambient";
        const rand = Math.random();
        if (rand < 0.15) colorType = "primary";      // Mind (Blue Tech)
        else if (rand < 0.25) colorType = "secondary"; // Heart (Crimson Accent)

        particles.push({
          x: w * 0.5,
          y: h * 0.5,
          angle: Math.random() * Math.PI * 2,
          radius: radius,
          speed: (0.2 + Math.random() * 0.6) * (radius < 200 ? 1.5 : 0.6) * 0.015,
          size: Math.random() * 1.8 + 0.6,
          colorType,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    };

    generateField(width, height);

    const handleMouseMove = (e: MouseEvent) => {
      singularity.targetX = e.clientX;
      singularity.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      singularity.targetX = window.innerWidth * 0.5;
      singularity.targetY = window.innerHeight * 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Mathematical Render Loop
    const renderField = () => {
      ctx.clearRect(0, 0, width, height);
      const isDarkMode = document.documentElement.classList.contains("dark");

      // Smooth interpolation for the gravity well anchor
      singularity.x += (singularity.targetX - singularity.x) * 0.05;
      singularity.y += (singularity.targetY - singularity.y) * 0.05;

      // Color Palette Configurations
      const pColor = isDarkMode ? "rgba(96, 165, 250," : "rgba(37, 99, 235,";  // Primary
      const sColor = isDarkMode ? "rgba(244, 63, 94," : "rgba(220, 38, 38,";   // Secondary
      const aColor = isDarkMode ? "rgba(255, 255, 255," : "rgba(10, 10, 10,";  // Ambient base

      particles.forEach(p => {
        // Advance orbital tracking angle
        p.angle += p.speed;
        p.pulsePhase += 0.02;

        // Transform radial geometry relative to the shifting gravitational singularity
        const orbitX = singularity.x + Math.cos(p.angle) * p.radius;
        const orbitY = singularity.y + Math.sin(p.angle) * p.radius * 0.65; // Matrix compression for 3D depth tilt

        // Particle positioning physics mapping
        p.x += (orbitX - p.x) * 0.1;
        p.y += (orbitY - p.y) * 0.1;

        // Render trails and node states
        const pulse = Math.sin(p.pulsePhase) * 0.3 + 0.7;
        ctx.beginPath();
        
        let alpha = 0.15 * pulse;
        if (p.colorType === "primary") {
          ctx.fillStyle = `${pColor}${alpha * 4})`;
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        } else if (p.colorType === "secondary") {
          ctx.fillStyle = `${sColor}${alpha * 4})`;
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `${aColor}${alpha})`;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        }
        ctx.fill();

        // Architectural geometric connection matrix rules
        if (p.colorType !== "ambient") {
          ctx.strokeStyle = p.colorType === "primary" ? `${pColor}0.04)` : `${sColor}0.03)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(singularity.x, singularity.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(renderField);
    };

    renderField();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      generateField(width, height);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,64,175,0.04)_0%,transparent_75%)]" />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-85"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fcfcfc] dark:to-[#0a0a0a]" />
    </div>
  );
};

/* ---------------------- 2. ASSEMBLY INTERFACE ---------------------- */

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
    <section className="relative h-screen flex flex-col items-center justify-center bg-[#fcfcfc] dark:bg-[#0a0a0a] overflow-hidden px-6">
      <QuantumFieldCanvas />

      <div className="relative z-10 max-w-7xl mx-auto w-full text-center flex flex-col items-center select-none">
        
        {/* BRAND TAG */}
        <motion.div
          custom={0} variants={textVariants} initial="hidden" animate="visible"
          className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400 text-[10px] uppercase tracking-[0.2em] font-bold backdrop-blur-xs"
        >
          TheTAG Ventures & Partners
        </motion.div>

        {/* MAIN HEADING - 10vw size */}
        <motion.h1
          custom={1} variants={textVariants} initial="hidden" animate="visible"
          className="text-[10vw] uppercase md:text-8xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[0.9] mb-8"
        >
          Bold ideas <br />
          <span className="font-serif text-blue-800 dark:text-blue-500 tracking-normal">Real impact</span>
        </motion.h1>

        {/* ANALYTICS STRIP */}
        <motion.div 
          custom={2} variants={textVariants} initial="hidden" animate="visible"
          className="w-full max-w-5xl grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-y border-zinc-200 dark:border-zinc-800/50 mb-8 bg-transparent"
        >
          <Metric value="5" label="Practice areas, one methodology" />
          <Metric value="100%" label="Senior principal-led engagements" />
          <Metric value="48h" label="Response commitment on every inbound" />
          <Metric value="16wk" label="Typical arc: conversation to handover" />
        </motion.div>

        {/* DESCRIPTION */}
        <motion.p
          custom={3} variants={textVariants} initial="hidden" animate="visible"
          className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-10"
        >
          We combine empathy, strategic intelligence, and <span className="text-zinc-950 dark:text-white font-medium">purposeful technology</span> to build ventures, brands, and communities that matter.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4} variants={textVariants} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link href="/services" className="group px-10 py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-full font-bold text-[11px] uppercase tracking-widest flex items-center gap-3 hover:scale-105 transition-transform">
            Explore Our Services <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="px-10 py-4 border border-zinc-200 dark:border-zinc-800 rounded-full font-bold text-[11px] uppercase tracking-widest text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
            Start a Conversation
          </Link>
        </motion.div>

        {/* PRINCIPLE ANCHOR */}
        <motion.div 
          custom={5} variants={textVariants} initial="hidden" animate="visible"
          className="mt-12 flex flex-col items-center"
        >
          <span className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-black mb-2">Our Framework ↓</span>
          <p className="text-[11px] text-zinc-400 max-w-md italic">"We practice Digital Sovereignty — every organization deserves to own its data."</p>
        </motion.div>

      </div>
    </section>
  );
}

const Metric = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-1">{value}</span>
    <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold leading-tight max-w-[120px]">
      {label}
    </span>
  </div>
);