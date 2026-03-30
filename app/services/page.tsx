"use client";

import React from "react";
import { motion } from "framer-motion";
import { SERVICES_DATA } from "./[slug]/data"; // Adjust path to your data file
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Heart,
  Brain,
  Cpu,
  ArrowRight,
} from "lucide-react";
import HeartMindTechnology from "../components/HeartMindTechnology";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* HERO / HEADER */}
      <section className="pt-32 pb-20 px-6 border-b border-zinc-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-zinc-500 mb-12 font-black">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-blue-600">Services</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] mb-8"
              >
                Our <br /> <span className="text-blue-600">Collective</span>
              </motion.h1>
            </div>
          </div>
        </div>
        <HeartMindTechnology />
      </section>

      <div className="text-center p-4 py-10 text-3xl md:text-6xl text-blue-600 uppercase">Our Services</div>
      {/* SERVICES GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(SERVICES_DATA).map(([slug, service], i) => (
            <Link
              key={slug}
              href={`/services/${slug}`}
              className="group relative"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="h-137.5 rounded-[3.5rem] border border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/50 p-12 flex flex-col justify-between overflow-hidden hover:border-blue-500/50 transition-all duration-500"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-12 text-zinc-200 dark:text-zinc-800 group-hover:text-blue-600/20 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
                  <ArrowUpRight size={160} strokeWidth={1} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8">
                    <Sparkles size={12} /> Domain 0{i + 1}
                  </div>
                  <h3 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-6 max-w-xs group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg max-w-sm">
                    {service.tagline}
                  </p>
                </div>

                <div className="relative z-10">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.outcomes.map((outcome) => (
                      <span
                        key={outcome}
                        className="px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-sm"
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]">
                    Explore Methodology{" "}
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </div>
                </div>

                {/* Subtle Gradient Reveal */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            </Link>
          ))}

          {/* FINAL CTA CARD (Spans 2 columns if odd number of services) */}
          <Link href="/contact" className="md:col-span-2 group">
            <div className="h-75 rounded-[3.5rem] bg-zinc-950 flex items-center justify-center text-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
                  Ready to{" "}
                  <span className="text-blue-600 italic font-light">
                    Transform?
                  </span>
                </h2>
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.5em] font-black group-hover:text-white transition-colors">
                  Get in touch with our partners
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="py-12 border-t border-zinc-100 dark:border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400">
          The Future is Heart + Mind + Technology
        </p>
      </footer>
    </div>
  );
}
