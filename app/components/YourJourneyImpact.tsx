"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const YourJourneyImpact = () => {
  return (
    <main className="bg-gray-200 dark:bg-[#09090b] transition-colors duration-700">
      {/* CONTENT SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-12 md:pt-48 md:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end"
        >
          {/* Main Headline - Spans 8 columns */}
          <div className="lg:col-span-8">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Your Journey <br /> 
              <span className="dark:text-zinc-500 text-zinc-400">to Impact</span>
            </h3>
          </div>

          {/* Subtext - Spans 4 columns, slightly offset for rhythm */}
          <div className="lg:col-span-4 lg:pb-4">
            <motion.p 
              variants={textVariants}
              className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed border-l border-blue-600 pl-6 md:pl-8"
            >
              We believe meaningful innovation happens where empathy, intelligence, 
              and technology intersect — shaping solutions that make a real difference.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32 md:pb-48">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
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

export default YourJourneyImpact;