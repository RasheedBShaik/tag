"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";
const FinalRoadmapCTA = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-24 lg:py-40 bg-white dark:bg-[#030303] transition-colors duration-500 overflow-hidden group/section"
    >
      {/* Dynamic Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover/section:opacity-100 transition duration-300 z-0"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(650px circle at ${x}px ${y}px, rgba(30, 64, 175, 0.07), transparent 80%)`
          ),
        }}
      />

      {/* High-Visibility SVG: Right-to-Left */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            {/* Multi-stage gradient for cross-theme visibility */}
            <linearGradient id="visibleGradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0" />
              <stop offset="30%" stopColor="#1e40af" stopOpacity="0.8" /> {/* Deep blue for Light Mode */}
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />   {/* Bright blue for Dark Mode */}
              <stop offset="70%" stopColor="#1e40af" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
            </linearGradient>

            {/* Subtle glow filter to prevent washing out */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="0.4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Primary Flow Line */}
          <motion.path
            d="M110 30 C 80 30, 50 70, -10 70"
            fill="none"
            stroke="url(#visibleGradient)"
            strokeWidth="0.25" // Slightly thicker for visibility
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />

          {/* Secondary Accent Line */}
          <motion.path
            d="M110 80 Q 70 90, 30 50 T -10 20"
            fill="none"
            stroke="url(#visibleGradient)"
            strokeWidth="0.15"
            strokeDasharray="2 4"
            opacity="0.4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-blue-500/10 border border-zinc-200 dark:border-blue-500/20 mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-700 dark:text-blue-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600 dark:text-blue-400">
                Performance Optimized
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white leading-[0.85] mb-8"
            >
              Let's build your <br />
              <span className="text-blue-700 dark:text-blue-500">Roadmap.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl mx-auto lg:mx-0 text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10"
            >
              Your transformation starts with a conversation — not a sales pitch. Tell us what you're building, what's standing in your way, and where you want to go. We'll tell you honestly whether and how we can help
            </motion.p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <Link href="/Portfolio">
              <button className="px-8 py-4 bg-blue-700 dark:bg-white text-white dark:text-black rounded-xl font-bold transition-all hover:bg-blue-800 dark:hover:bg-zinc-100 flex items-center gap-2 shadow-xl shadow-blue-900/10 dark:shadow-none">
                Visit our Insights <ArrowRight className="w-4 h-4" />
              </button>
              </Link>
            </div>
          </div>

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-[420px]"
          >
            <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-zinc-200 to-transparent dark:from-zinc-800 dark:to-transparent">
              <div className="relative bg-zinc-50/50 dark:bg-zinc-900/90 backdrop-blur-3xl rounded-[2.4rem] p-10 shadow-2xl border border-white dark:border-zinc-800">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-blue-700 dark:bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-700/20">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white">Health Check</h4>
                    <p className="text-sm text-zinc-500">2-4 Week Sprint</p>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  {[
                    "Typical first engagement: 2–4 week Technology",
                    "Health Check · Fixed fee · No long-term",
                    "commitment required · Response within 48 hours"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-700 dark:bg-blue-500" />
                      <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact">
                  <button className="w-full py-4 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-black font-bold transition-transform hover:scale-[1.02]">
                    Check Availability
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FinalRoadmapCTA;