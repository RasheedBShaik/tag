"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SERVICES_DATA } from "./[slug]/data";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  ChevronRight,
  ArrowLeft, // Added for the home button
} from "lucide-react";

export default function ServicesPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-blue-600 selection:text-white transition-colors duration-500 overflow-hidden">
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* HERO / HEADER */}
      <section className="relative z-10 pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* NAVIGATION & HOME BUTTON */}
          <div className="flex flex-col gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link 
                href="/" 
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md hover:border-blue-600 transition-all duration-300 shadow-sm"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-blue-600" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">Back to Home</span>
              </Link>
            </motion.div>

            <motion.nav 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black"
            >
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight size={10} className="text-zinc-300" />
              <span className="text-blue-600">Services</span>
            </motion.nav>
          </div>

          <div className="relative">
            <motion.div
              style={{ y: y1 }}
              className="absolute -top-20 -left-10 text-[15rem] font-black text-zinc-100 dark:text-zinc-900/50 select-none z-0 hidden lg:block"
            >
              SOLUTIONS
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-[clamp(3.5rem,12vw,9rem)] font-black uppercase tracking-tighter leading-[0.8] mb-12"
            >
              Our <br /> 
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Collective
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed border-l-2 border-blue-600 pl-6"
            >
              We bridge the gap between human intuition and technical precision, 
              delivering specialized domains designed for the next era of innovation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="relative py-10 overflow-hidden border-y border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] backdrop-blur-sm">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-blue-600/20 px-8">
              Strategy • Design • Development • Growth • Scale • Identity •
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES GRID */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {Object.entries(SERVICES_DATA).map(([slug, service], i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className={`${i % 2 !== 0 ? "lg:mt-24" : ""}`} // Staggered Effect
            >
              <Link href={`/services/${slug}`} className="group block h-full">
                <div className="relative h-full min-h-[500px] rounded-[4rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/40 p-10 md:p-14 flex flex-col justify-between overflow-hidden hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 group-hover:-translate-y-2">
                  
                  {/* Decorative Glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-colors" />

                  {/* Icon / Top Section */}
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-12">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 bg-blue-50 dark:bg-blue-600/10 px-4 py-2 rounded-full">
                        <Sparkles size={12} className="animate-pulse" /> Domain 0{i + 1}
                      </div>
                      <div className="w-16 h-16 rounded-3xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 group-hover:rotate-12">
                        <ArrowUpRight size={32} strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-8 group-hover:translate-x-2 transition-transform duration-500">
                      {service.title.split(' ').map((word, idx) => (
                        <span key={idx} className="block">{word}</span>
                      ))}
                    </h3>
                    
                    <p className="text-zinc-500 dark:text-zinc-400 font-normal text-lg max-w-xs leading-snug">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div className="relative z-10 mt-12">
                    <div className="flex flex-wrap gap-2 mb-10">
                      {service.outcomes.slice(0, 3).map((outcome) => (
                        <span
                          key={outcome}
                          className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/5 rounded-full text-[9px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300"
                        >
                          {outcome}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] group-hover:text-blue-600 transition-colors">
                      <span className="h-[1px] w-8 bg-zinc-300 dark:bg-zinc-700 group-hover:w-12 group-hover:bg-blue-600 transition-all" />
                      View Methodology
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>

                  {/* Hover Image/Pattern Overlay (Optional: adds high-end feel) */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-700 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </div>
              </Link>
            </motion.div>
          ))}

          {/* FINAL CTA CARD */}
          <Link href="/contact" className="lg:col-span-2 group mt-20">
            <motion.div 
              whileHover={{ scale: 0.99 }}
              className="h-80 rounded-[4rem] bg-zinc-950 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Animated rings for CTA */}
              <div className="absolute w-[500px] h-[500px] border border-blue-600/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="absolute w-[700px] h-[700px] border border-white/5 rounded-full animate-[spin_30s_linear_infinite_reverse]" />

              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
                  Ready to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic font-serif lowercase">
                    Transform?
                  </span>
                </h2>
                <div className="inline-flex flex-col items-center gap-4">
                   <p className="text-zinc-500 text-[10px] uppercase tracking-[0.6em] font-black group-hover:text-blue-400 transition-colors">
                    Initialize Partnership Sequence
                  </p>
                  <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Global CSS for Marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}