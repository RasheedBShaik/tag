"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lightbulb, BarChart3, ArrowRight } from "lucide-react";

const PartnerWithUs = () => {
  const reasons = [
    {
      id: "01",
      title: "Innovation with a Conscience",
      description: "We don't just build for the sake of novelty. We ensure every breakthrough aligns with human values and ethical standards.",
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      id: "02",
      title: "Strategy that Delivers",
      description: "Move beyond theory. Our agile strategic execution is designed to turn ambitious roadmaps into validated, high-impact outcomes.",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: "03",
      title: "Technology that Builds Trust",
      description: "In an era of uncertainty, we deploy robust, transparent technology solutions that strengthen the bond between you and your users.",
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  return (
    <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* LEFT COLUMN: THE HOOK */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-black uppercase tracking-[0.4em] text-blue-600 mb-6">
              Why Partner With Us
            </h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              More than <br /> 
              <span className="dark:text-zinc-500 text-zinc-400">a vendor.</span>
            </h3>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-md">
              You need a strategic ally who understands that 
              <span className="dark:text-white text-zinc-950 font-medium"> true transformation </span> 
              is built on a foundation of human values and collective intelligence.
            </p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: THE PILLARS */}
        <div className="lg:col-span-7 space-y-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative p-8 md:p-10 rounded-[2rem] border border-zinc-200 dark:border-white/5 
                         bg-zinc-50/50 dark:bg-white/5 hover:bg-white dark:hover:bg-zinc-900 
                         transition-all duration-500 flex flex-col md:flex-row gap-8 items-start"
            >
              {/* Number Overlay */}
              <span className="text-5xl font-black text-zinc-200 dark:text-zinc-800 transition-colors group-hover:text-blue-600/20 tabular-nums">
                {reason.id}
              </span>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-600/10 text-blue-600">
                    {reason.icon}
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-tighter">
                    {reason.title}
                  </h4>
                </div>
                <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm md:text-base max-w-lg">
                  {reason.description}
                </p>
              </div>

              {/* Decorative Corner Arrow */}
              <ArrowRight className="absolute top-8 right-8 w-5 h-5 text-zinc-300 dark:text-zinc-700 
                                     opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartnerWithUs;