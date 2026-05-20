"use client";

import { motion } from "framer-motion";
import HeartMindTechnology from "./HeartMindTechnology";

// TypeScript Interface for the incoming data (optional, but recommended)
interface CoreValuesProps {
  data?: {
    title: string;
    lineColor?: string;
  };
}

const CoreValues = ({ data }: CoreValuesProps) => {
  // Fallback values in case data hasn't loaded or isn't published yet
  const title = data?.title || "Our Core Values";
  const lineColor = data?.lineColor || "bg-blue-600";

  return (
    <section className="py-24 transition-colors duration-500 bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* SECTION HEADER */}
        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-zinc-900 dark:text-white text-3xl md:text-5xl font-black uppercase tracking-tighter"
          >
            {title}
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
            /* Dynamic Tailwind bg class from Sanity */
            className={`w-48 h-1 mt-4 ${lineColor}`}
          />
        </div>
        
        {/* Important: Ensure HeartMindTechnology also has theme classes inside it! */}
        <HeartMindTechnology />
      </div>
    </section>
  );
};

export default CoreValues;