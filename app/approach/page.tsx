"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowRight,
  Download,
  Target,
  Zap,
  Layers,
  Users,
  LineChart,
  Activity,
} from "lucide-react";
import Link from "next/link";

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
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
  },
};

export default function OurApproachPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return <div className="min-h-screen bg-white dark:bg-zinc-950" />;

  return (
    <div className="min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-500 text-zinc-950 dark:text-zinc-50 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] top-10 w-full flex items-center overflow-hidden bg-white dark:bg-zinc-950">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/our-approach/our-approach.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-10 bg-white/10 dark:bg-zinc-950/40  transition-all duration-700" />
        </div>

        <div className="relative z-30 w-full pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.nav variants={fadeInUp} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400 mb-8 font-black">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">Home</span>
              <span>/</span>
              <span className="text-blue-600 dark:text-blue-500">Our Approach</span>
            </motion.nav>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-8xl lg:text-[9rem] font-black uppercase tracking-tighter leading-[0.85] mb-12">
              Our <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-blue-500 to-indigo-400 dark:from-blue-500 dark:to-zinc-400">
                Foundation
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="max-w-3xl text-xl md:text-3xl text-zinc-600 dark:text-zinc-400 leading-tight font-light tracking-tight">
              Empowering Innovation Through <br />
              <span className="text-zinc-950 dark:text-white font-medium italic underline decoration-blue-600/20 underline-offset-8">
                Diverse Perspectives and Collaboration.
              </span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. VISION & MISSION GRID */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-zinc-100 dark:border-white/5 bg-white dark:bg-zinc-950 relative z-40">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-12 md:p-24 border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-white/5">
          <span className="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-6 block">01 / Vision</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">Ethical <br /> Revolution</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">To lead the ethical revolution by uniting Heart, Mind, and Technology.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-12 md:p-24 bg-zinc-50 dark:bg-zinc-900/10">
          <span className="text-blue-600 font-black uppercase tracking-widest text-[10px] mb-6 block">02 / Mission</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">Validated <br /> Outcomes</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">We unite compassionate insight, strategic execution, and ethical innovation.</p>
        </motion.div>
      </section>

      {/* 3. THE PROCESS */}
      <section className="py-32 px-6 max-w-7xl mx-auto bg-white dark:bg-zinc-950">
        <div className="mb-20">
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-500 mb-4">The Journey</h2>
          <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">Transparency <br /> by Design.</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200 dark:bg-white/10 border border-zinc-200 dark:border-white/10 rounded-[3rem] overflow-hidden">
          {[
            { title: "Deep Dive & Discovery", icon: <Target className="w-6 h-6" />, desc: "Understanding your vision, challenges, and culture." },
            { title: "Co-Created Roadmap", icon: <Layers className="w-6 h-6" />, desc: "Architecting a strategic, actionable plan with clear milestones." },
            { title: "Agile Implementation", icon: <Zap className="w-6 h-6" />, desc: "Implementing solutions in iterative sprints with constant feedback." },
            { title: "Capability Transfer", icon: <Users className="w-6 h-6" />, desc: "Transferring knowledge for sustainable growth." },
          ].map((step, i) => (
            <div key={i} className="bg-white dark:bg-zinc-950 p-10 md:p-16 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors group">
              <div className="text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-500">{step.icon}</div>
              <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4">{step.title}</h4>
              <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm md:text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. PERFORMANCE METRICS (FIXED THEME - ALWAYS DARK) */}
      <section className="py-32 px-6 bg-zinc-950 text-zinc-50 rounded-t-[3rem] md:rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-20">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">Success <br /> Metrics</h2>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Human-Centric", value: "Design", icon: <Activity />, desc: "Focusing on customer loyalty, employee engagement, and a stronger culture." },
              { label: "Strategic Value", value: "20–35%", icon: <LineChart />, desc: "Average increase in Technology ROI and measurable improvement in process optimization." },
              { label: "Performance", value: "30–50%", icon: <Zap />, desc: "Targeted increase in innovation velocity and faster time-to-value." },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -10 }}
                className="group border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] flex flex-col justify-between min-h-87.5 bg-zinc-900/40 transition-all hover:border-blue-500/50"
              >
                <div>
                  <div className="text-blue-500 mb-8 p-3 bg-blue-500/5 rounded-2xl w-fit group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">{stat.icon}</div>
                  <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-3">{stat.label}</h5>
                  <div className="text-5xl md:text-6xl font-black tracking-tighter mb-8 group-hover:text-blue-500 transition-colors">{stat.value}</div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-40 px-6 text-center bg-white dark:bg-zinc-950">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12 leading-[0.85]">
            The Future is <br />
            <span className="text-blue-600 font-black">Heart + Mind + Tech</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/contact">
            <button className="group w-full sm:w-auto px-12 py-6 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3">
              Connect with Experts <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            </Link>
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-12 py-6 border border-zinc-200 dark:border-white/10 font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-zinc-50 dark:hover:bg-white/5 transition-all">
              <Download className="w-4 h-4" /> Download Brochure
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}