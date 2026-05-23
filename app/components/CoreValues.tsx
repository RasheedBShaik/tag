// components/CoreValues.tsx
"use client";

import React from 'react';
import { Heart, Brain, Cpu, CheckCircle2, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export interface ValueItem {
  _key: string;
  id?: string;
  name: string;
  tagline?: string;
  description?: string;
  icon?: string;
  features?: string[];
}

interface CoreValuesProps {
  data: {
    heading?: string;
    lineColor?: string;
    technologies?: ValueItem[];
  } | null;
}

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="w-8 h-8 text-rose-500" />,
  brain: <Brain className="w-8 h-8 text-blue-500" />,
  cpu: <Cpu className="w-8 h-8 text-amber-500" />,
};

const accentMap: Record<string, string> = {
  heart: "group-hover:border-rose-500/50",
  brain: "group-hover:border-blue-500/50",
  cpu: "group-hover:border-amber-500/50",
};

const CoreValues: React.FC<CoreValuesProps> = ({ data }) => {
  if (!data || !data.technologies || data.technologies.length === 0) return null;

  const heading = data.heading || "";
  const activeLineColor = data.lineColor || "bg-blue-600";
  const items = data.technologies;

  // Strict sorting based on your manual CMS ID entry
  const sortedItems = [...items].sort((a, b) => {
    const idA = parseInt(a.id || "0", 10);
    const idB = parseInt(b.id || "0", 10);
    return idA - idB;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* SECTION HEADER */}
        {heading && (
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white"
            >
              {heading}
            </motion.h2>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
              style={{ originX: 0 }}
              className={`w-48 h-1 mt-4 ${activeLineColor}`}
              aria-hidden="true"
            />
          </div>
        )}
        
        {/* GRID ENGINE */}
        <div className="max-w-7xl mx-auto py-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {sortedItems.map((item) => {
              const iconKey = item.icon?.toLowerCase() || "";
              const renderedIcon = iconMap[iconKey] || <HelpCircle className="w-8 h-8 text-zinc-500" />;
              const accentClass = accentMap[iconKey] || "group-hover:border-zinc-500/50";
              const formattedDisplayId = item.id ? item.id.padStart(2, '0') : "";

              return (
                <motion.div
                  key={item._key}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className={`group relative p-8 rounded-3xl transition-all duration-500 backdrop-blur-md
                    bg-white border border-zinc-200 shadow-sm
                    dark:bg-zinc-900/50 dark:border-zinc-800 ${accentClass}`}
                >
                  {/* Background Watermark ID */}
                  {formattedDisplayId && (
                    <span className="absolute top-6 right-8 text-6xl font-black opacity-5 dark:opacity-10 pointer-events-none italic select-none">
                      {formattedDisplayId}
                    </span>
                  )}

                  {/* Icon Container */}
                  <div className="mb-8 p-4 inline-block rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {renderedIcon}
                  </div>

                  {/* Headers */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">
                      {item.name}
                    </h3>
                    {item.tagline && (
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400/80 uppercase tracking-widest mt-1">
                        {item.tagline}
                      </p>
                    )}
                  </div>

                  {/* Main Body */}
                  {item.description && (
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 font-medium">
                      {item.description}
                    </p>
                  )}

                  {/* Checklist Features */}
                  {item.features && item.features.length > 0 && (
                    <ul className="space-y-4 border-t border-zinc-100 dark:border-zinc-800 pt-8">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-zinc-400 dark:text-zinc-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Overlay Gradient Ring */}
                  <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-zinc-500/5" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default CoreValues;