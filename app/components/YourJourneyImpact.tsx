"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Shield, Unlock, Eye, Scale, ArrowUpRight, Zap } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const EngineeringSovereignty = () => {
  const principles = [
    { id: "01", title: "Data Ownership", text: "You control where data lives, who accesses it, and how it is used — full stop.", icon: <Shield size={20} /> },
    { id: "02", title: "Architectural Independence", text: "Systems designed to be portable, interoperable, and free from single-vendor dependency.", icon: <Unlock size={20} /> },
    { id: "03", title: "Algorithmic Transparency", text: "AI and automation systems that can be audited, explained, and corrected by humans.", icon: <Eye size={20} /> },
    { id: "04", title: "Regulatory Resilience", text: "Architecture built to meet — and adapt to — evolving global compliance requirements.", icon: <Scale size={20} /> },
  ];

  const scorecardDimensions = [
    "Data Ownership & Governance",
    "Vendor Concentration Risk",
    "Security Posture",
    "AI Governance Maturity",
    "Team Capability & Independence",
    "Architectural Resilience",
  ];

  return (
    <main className="bg-zinc-50 dark:bg-[#09090b] transition-colors duration-700 overflow-hidden">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          <div className="lg:col-span-8">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 mb-8">
              <Zap size={12} className="text-blue-600 fill-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Core Mandate</span>
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-10 text-zinc-900 dark:text-white">
              Engineering <br />
              Digital <br />
              Sovereignty
            </motion.h2>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-2xl leading-relaxed">
              Your technology should work <span className="text-zinc-900 dark:text-white underline decoration-blue-600/30 underline-offset-4">for you</span> — not against you. 
              We implement systems that maximize your autonomy, resilience, and control.
            </motion.p>
          </div>

          <div className="lg:col-span-4 flex items-end">
            <motion.div variants={itemVariants} className="p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-3xl">
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Digital Sovereignty is the organizational right to make independent technology decisions — free from coercive vendor relationships and proprietary lock-in.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PRINCIPLES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {principles.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-[2rem] bg-zinc-100 dark:bg-zinc-900/50 border border-transparent hover:border-blue-600/20 transition-all group"
            >
              <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-500">{p.icon}</div>
              <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-600 block mb-2">{p.id}</span>
              <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">{p.title}</h4>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SCORECARD SECTION */}
      <section className="bg-white dark:bg-zinc-900/30 py-32 border-y border-zinc-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            <div className="lg:col-span-5">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 text-zinc-900 dark:text-white">
                The Digital <br />Sovereignty <span className="text-blue-600">Scorecard</span>
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                A proprietary diagnostic TheTAG uses to assess your organization's technology independence across six critical dimensions.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-widest px-8 py-5 bg-blue-600 text-white rounded-full transition-all shadow-xl shadow-blue-600/20"
              >
                Request Your Assessment
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scorecardDimensions.map((dim, i) => (
                  <div key={i} className="relative overflow-hidden p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/5 group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-2">Dimension {i + 1}</span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">{dim}</span>
                    
                    {/* Diagnostic UI Element */}
                    <div className="mt-4 flex gap-1">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <div key={dot} className={`h-1 w-full rounded-full ${dot <= 3 ? 'bg-blue-600/20' : 'bg-zinc-200 dark:bg-zinc-700'}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[10px] text-zinc-400 uppercase tracking-widest text-center lg:text-left">
                * Based on average-sized mid-market organization metrics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION (Retained from your original) */}
      <section className="max-w-7xl mx-auto px-6 py-32 md:py-48">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-8 group"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full md:w-auto text-[11px] font-black uppercase tracking-[0.5em] px-12 py-6 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full transition-all hover:shadow-[0_20px_50px_rgba(37,99,235,0.3)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            Start Your Project
          </motion.button>

          <div className="hidden md:block h-px grow bg-zinc-400 dark:bg-zinc-600 group-hover:bg-blue-600/30 transition-colors duration-500" />
          
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
            Let's build the future
          </span>
        </motion.div>
      </section>
    </main>
  );
};

export default EngineeringSovereignty;