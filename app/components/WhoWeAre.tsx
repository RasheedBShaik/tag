"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Fingerprint } from "lucide-react";

const HomeHeroPhilosophy = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-[80vh] bg-white dark:bg-zinc-950" />;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-12 overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/5 dark:bg-blue-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-zinc-200/50 dark:bg-zinc-900/40 blur-[100px] rounded-full" />
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 dark:opacity-10" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* MAIN HEADLINE AREA */}
          <div className="lg:col-span-8 space-y-10">
            <motion.div variants={fadeInUp} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-12 bg-blue-600 dark:bg-blue-500" />
                <span className="text-blue-600 dark:text-blue-500 font-bold uppercase tracking-[0.5em] text-[10px]">
                  Where human wisdom meets
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.85] tracking-tighter uppercase text-zinc-950 dark:text-white">
                Technological <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-zinc-400 to-zinc-500 dark:from-white dark:via-zinc-300 dark:to-zinc-700">
                  Precision.
                </span>
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp} className="max-w-xl">
              <p className="text-xl md:text-2xl leading-snug text-zinc-600 dark:text-zinc-400 font-medium">
                Engagements often fail from lack of alignment, not capability. We anchor every outcome in <span className="text-zinc-950 dark:text-white">empathy, strategic intelligence, and rigorous execution.</span>
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-8 pt-4">
              <Link 
                href="/services" 
                className="group flex items-center gap-4 px-8 py-4 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-full transition-all duration-300 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white"
              >
                <span className="text-sm font-black uppercase tracking-widest">Explore Our Services</span>
                <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform" />
              </Link>
              
              <Link href="/contact" className="group flex items-center gap-2">
                <span className="text-sm font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                  Start Your Transformation ↓
                </span>
              </Link>
            </motion.div>
          </div>

          {/* SIDEBAR: PHILOSOPHY & SOVEREIGNTY */}
          <div className="lg:col-span-4 mt-12 lg:mt-0">
            <motion.div 
              variants={fadeInUp}
              className="relative p-1 border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="pt-28 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-zinc-950 dark:text-white">
                    <Fingerprint className="w-5 h-5" />
                    <h4 className="text-sm font-black uppercase tracking-widest">Our Philosophy</h4>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm leading-relaxed">
                    We practice <span className="text-zinc-950 dark:text-white font-bold italic">Digital Sovereignty</span> — the conviction that every organization deserves to own its data and control its technology choices.
                  </p>
                </div>

                <div className="p-6 bg-zinc-50 dark:bg-white/5 rounded-2xl border border-zinc-100 dark:border-white/5">
                  <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-3" />
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-300 leading-normal">
                    "This isn't a feature. It's a founding principle."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default HomeHeroPhilosophy;