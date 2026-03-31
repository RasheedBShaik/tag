"use client";

import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  if (!mounted) return <main className="min-h-screen bg-white dark:bg-zinc-950" />;

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 bg-white dark:bg-zinc-950 selection:bg-blue-500/30">
      
      {/* 1. BACKGROUND VIDEO */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover">
          <source src="/hero/hero-bg-new.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-white/10 dark:bg-zinc-950/40  transition-all duration-700" />
      </div>
      {/* 2. THE PARENT TEXT CONTAINER */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-6 p-8 md:p-16 rounded-4xl transition-all duration-500
          /* Parent shifts background based on theme */
          bg-white/40 border border-black/5 backdrop-blur-md
          dark:bg-zinc-900/40 dark:border-white/10 dark:backdrop-blur-xl
          text-center shadow-2xl"
      >
        {/* MAIN TITLE */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase leading-[0.85] 
            text-zinc-900 dark:text-zinc-100 transition-colors duration-500"
        >
          Bold Ideas
          <br />
          <span className="text-blue-600 dark:text-blue-500">Real Impact</span>
        </motion.h1>

        {/* DESCRIPTION */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed 
            font-medium transition-colors duration-500
            text-zinc-800 dark:text-zinc-200
            drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] 
            dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
        >
          At{" "}
          <span className="font-black text-black dark:text-white underline decoration-blue-600/50 underline-offset-4">
            The TAG V.P.
          </span>
          , we combine intelligence and innovation to build solutions that
          matter—fast, measurable, and impactful.
        </motion.p>

        {/* 3. BUTTONS */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center gap-5"
        >
          {/* PRIMARY BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-5 overflow-hidden rounded-full transition-all duration-300
              bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 
              font-black uppercase tracking-[0.2em] text-[10px] cursor-pointer shadow-xl"
          >
            <Link href="/portfolio">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Explore Work
            </span>
            </Link>
            <div className="absolute inset-0 bg-blue-600 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </motion.button>

          {/* SECONDARY BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-12 py-5 border overflow-hidden rounded-full transition-all duration-300
              border-zinc-950/20 dark:border-white/20 
              text-zinc-950 dark:text-white 
              font-black uppercase tracking-[0.2em] text-[10px] cursor-pointer backdrop-blur-sm"
          >
            <Link href="/contact">
            <span className="relative z-10 group-hover:text-white dark:group-hover:text-zinc-950 transition-colors duration-300">
              Get in Touch
            </span>
            </Link>
            <div className="absolute inset-0 bg-zinc-950 dark:bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
}