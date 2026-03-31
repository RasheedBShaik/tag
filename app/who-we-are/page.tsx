"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { Download, ArrowUpRight, Zap } from "lucide-react";
import Link from "next/link";
import HeartMindTechnology from "../components/HeartMindTechnology";

/* ---------------------- ANIMATION VARIANTS ---------------------- */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function WhoWeArePage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted)
    return <div className="min-h-screen bg-white dark:bg-zinc-950" />;

  return (
    <div className="min-h-screen font-sans selection:bg-blue-600/30 transition-colors duration-500 bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover dark:brightness-[0.4] brightness-110 transition-all duration-700"
          >
            <source src="/who-we-are/who-we-are.mp4" type="video/mp4" />
          </video>
          {/* Dynamic Overlays */}
          {/* <div className="absolute inset-0 z-10 bg-white/20 dark:bg-zinc-950/60 transition-colors duration-700" /> */}
          <div className="absolute inset-0 z-10 bg-white/10 dark:bg-zinc-950/40  transition-all duration-700" />
        </div>

        <div className="relative z-30 w-full pt-20 px-2 md:px-24 max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="flex items-center gap-4 text-blue-600 mb-10">
              <div className="h-px w-12 bg-current" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Origin_Story</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-12"
            >
              The <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-300 dark:to-zinc-500">
                collective
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="max-w-2xl text-xl md:text-3xl text-zinc-700 dark:text-zinc-400 leading-tight font-light tracking-tight"
            >
              We are a <span className="text-zinc-950 dark:text-white font-bold">Millennial-driven</span> venture laboratory bridging the gap between <span className="italic">Humanity</span> and <span className="italic">Hyper-Innovation.</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. MISSION STATEMENT */}
      <section className="py-32 px-8 md:px-24 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-white/5 transition-colors duration-500">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <div className="flex items-center gap-3 text-blue-600 mb-6">
              <Zap size={14} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-widest">System_Manifesto</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-blue-600 dark:text-blue-500 uppercase tracking-tighter leading-[0.9]">
              Empowering <br /> the Visionary <br /> in Everyone.
            </h3>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-7 space-y-8 text-zinc-600 dark:text-zinc-400 text-xl md:text-2xl font-medium leading-relaxed"
          >
            <p>
              At Tagventures, we don’t just consult—we co-architect. We believe the future isn't built by machines, but by leaders who use machines to amplify their heart.
            </p>
            <p className="text-zinc-400 dark:text-zinc-600 italic">
              "We leverage empathy as a technical specification, ensuring every line of code serves a heartbeat."
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. PHILOSOPHY GRID */}
      <section className="py-20 max-w-7xl mx-auto transition-colors duration-500">
        <HeartMindTechnology />
      </section>

      {/* 4. THE ARCHITECTS */}
      <section className="py-40 px-8 md:px-24 bg-zinc-950 text-white rounded-t-[4rem] md:rounded-t-[6rem] shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-32">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.8]">
              The <br /> Architects
            </h2>
            <div className="max-w-xs text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-black leading-loose">
              Registry: Founder_Access<br />
              Status: Operational<br />
              Node: Global_Ventures
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { name: "Manasa Kommana", role: "Co-Founder / Co-CEO" },
              { name: "Kiran Kommana", role: "Co-Founder / CEO" },
              { name: "Amith Indurthi", role: "Founder / CTO" },
            ].map((member, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group border-b border-white/10 pb-12 transition-all cursor-crosshair"
              >
                <h4 className="text-3xl font-black uppercase group-hover:text-blue-500 transition-colors">
                  {member.name}
                </h4>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-4">
                  {member.role}
                </p>
              </motion.div>
            ))}

            <motion.div whileHover={{ y: -10 }}>
              <Link 
                href="https://www.linkedin.com/in/amithindurthi/" 
                target="_blank"
                className="group flex flex-col justify-between h-full border-b border-blue-600 pb-12 transition-all"
              >
                <h4 className="text-3xl font-black uppercase text-blue-500 flex items-center gap-3 italic">
                  LinkedIn <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </h4>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-4">
                  Connect_With_Experts
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-48 px-4 text-center bg-white dark:bg-zinc-950 transition-colors duration-500">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-16">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            Architecting <br /> 
            <span className="text-zinc-200 dark:text-zinc-800 transition-colors duration-700">
              Digital Futures.
            </span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
            <Link href="/contact" className="w-full sm:w-auto px-16 py-7 bg-blue-600 text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-full hover:scale-105 transition-transform shadow-2xl shadow-blue-500/20">
              Start_Conversation
            </Link>
            <button className="w-full sm:w-auto flex items-center justify-center gap-4 px-16 py-7 border border-zinc-200 dark:border-white/10 font-black uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
              <Download size={14} /> Brochure_2026
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}