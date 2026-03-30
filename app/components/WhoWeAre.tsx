"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const WhoWeArePreview = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.2 
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  if (!mounted) return <div className="h-48 bg-white dark:bg-zinc-950" />;

  return (
    <section className="relative py-20 overflow-hidden transition-colors duration-500 bg-white dark:bg-zinc-950">
      
      {/* Dynamic Background Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 dark:bg-blue-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-zinc-200/50 dark:bg-blue-900/10 blur-[100px] rounded-full -z-10" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          
          {/* LEFT: Concise Branding */}
          <div className="flex-1 space-y-4">
            <motion.span 
              variants={itemVariants}
              className="inline-block text-blue-600 dark:text-blue-500 font-bold uppercase tracking-[0.4em] text-[10px]"
            >
              Who We Are
            </motion.span>
            
            <motion.h3 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black tracking-tighter leading-none uppercase text-zinc-950 dark:text-white"
            >
              Building with <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-zinc-400 dark:from-white dark:to-zinc-500">
                Heart & Mind.
              </span>
            </motion.h3>
          </div>

          {/* RIGHT: The Preview Text + View More */}
          <motion.div 
            variants={itemVariants}
            className="flex-1 max-w-xl group"
          >
            <p className="text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 font-medium">
              We are a millennial-driven collective delivering <span className="text-zinc-950 dark:text-white">human-centric AI</span> innovations. We blend empathy and strategic intelligence to drive meaningful, sustainable change.
            </p>

            <div className="mt-8 flex items-center gap-6">
              <Link href="/who-we-are" className="group/btn relative inline-flex items-center gap-2 overflow-hidden">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-950 dark:text-white">
                  Discover Our Story
                </span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 group-hover/btn:bg-blue-600 group-hover/btn:border-blue-600 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-zinc-950 dark:text-white group-hover/btn:text-white transition-colors" />
                </div>
                {/* Underline animation */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover/btn:w-2/3" />
              </Link>
              <Link href="/approach" className="group/btn relative inline-flex items-center gap-2 overflow-hidden">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-950 dark:text-white">
                  Our Approach
                </span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 group-hover/btn:bg-blue-600 group-hover/btn:border-blue-600 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-zinc-950 dark:text-white group-hover/btn:text-white transition-colors" />
                </div>
                {/* Underline animation */}
                <div className="absolute bottom-0 left-0 w-0 h-px bg-blue-600 transition-all duration-300 group-hover/btn:w-2/3" />
              </Link>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default WhoWeArePreview;