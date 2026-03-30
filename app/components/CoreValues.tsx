"use client";

import { motion } from "framer-motion";
import HeartMindTechnology from "./HeartMindTechnology";

const CoreValues = () => {
  return (
    /* Change 1: Use transition-colors so the shift is smooth.
       Change 2: Explicitly set light bg (zinc-50) and dark bg (zinc-950).
    */
    <section className="py-24 transition-colors duration-500 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            /* Change 3: text-zinc-900 for light mode, dark:text-white for dark mode */
            className="text-zinc-900 dark:text-white text-3xl md:text-5xl font-black uppercase tracking-tighter"
          >
            Our Core Values
          </motion.h2>

          {/* ANIMATED LINE */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 0.3,
            }}
            style={{ originX: 0 }}
            /* Blue line works for both themes */
            className="w-48 h-1 bg-blue-600 mt-4"
          />
        </div>
        
        {/* Important: Ensure HeartMindTechnology also has theme classes inside it! */}
        <HeartMindTechnology />
      </div>
    </section>
  );
};

export default CoreValues;