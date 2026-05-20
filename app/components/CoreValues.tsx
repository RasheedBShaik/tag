// components/CoreValues.tsx
"use client";

import React from 'react';
import { Heart, Brain, Cpu, CheckCircle2, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// --- TYPE INTERFACES ---
export interface ValueItem {
  _key?: string;
  id?: string | null;
  name?: string | null;
  tagline?: string | null;
  description?: string | null;
  icon?: string | null; 
  features?: string[] | null;
}

interface CoreValuesProps {
  data: {
    heading?: string;
    technologies?: ValueItem[];
  } | null;
}

// --- ICON & STYLE MAPS ---
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

// Clean invisible zero-width characters often injected during data transfer/copying
const cleanText = (str: string | null | undefined): string => {
  if (!str) return "";
  return str.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();
};

// Main static fallbacks if array is totally unpopulated
export const defaultValues = [
  {
    id: "01",
    name: "Heart",
    tagline: "Empathy · Ethics · Human-Centricity",
    description: "Technology built without empathy becomes a burden. We design every system around the humans who live inside it.",
    icon: "heart",
    features: ["Stakeholder empathy mapping", "Ethical AI & responsible governance", "Change management for adoption", "Inclusive design for all users"]
  },
  {
    id: "02",
    name: "Mind",
    tagline: "Strategy · Intelligence · Clarity",
    description: "Complexity is the enemy of progress. We cut through it with sharp strategic thinking and data-driven clarity.",
    icon: "brain",
    features: ["Digital transformation milestones", "Data architecture & AI strategy", "Portfolio rationalization", "Board-ready technical roadmaps"]
  },
  {
    id: "03",
    name: "Technology",
    tagline: "Architecture · Security · Scale",
    description: "Great strategy demands execution. We deliver scalable, secure, and sovereign systems that perform today.",
    icon: "cpu",
    features: ["Cloud & Enterprise architecture", "Zero-trust & Digital sovereignty", "AI/ML & Data pipelines", "Emerging tech production readiness"]
  }
];

// --- MAIN CONSOLIDATED COMPONENT ---
const CoreValues: React.FC<CoreValuesProps> = ({ data }) => {
  const rawHeading = data?.heading || "Our Core Values";
  const heading = cleanText(rawHeading);
  const items = data?.technologies || [];
  
  const rawDisplayItems = items && items.length > 0 ? items : defaultValues;

  // Pre-process and normalize items to identify their names/IDs before sorting
  const normalizedItems = rawDisplayItems.map((item, index) => {
    let name = cleanText(item.name);
    let tagline = cleanText(item.tagline);
    let description = cleanText(item.description);
    let features: string[] = item.features ? item.features.map(f => cleanText(f)) : [];
    let iconKey = cleanText(item.icon).toLowerCase();

    // Defensive parsing for single mashed string layouts
    if (!name && description.includes('\n')) {
      const lines = description.split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length >= 3) {
        tagline = lines[0];
        description = lines[1];
        features = lines.slice(2);
      }
      if (tagline.toLowerCase().includes('empathy') || iconKey === 'heart') name = "Heart";
      else if (tagline.toLowerCase().includes('strategy') || iconKey === 'brain') name = "Mind";
      else name = "Technology";
    }

    if (!name) name = index === 0 ? "Heart" : index === 1 ? "Mind" : "Technology";
    
    // Explicitly calculate a reliable sorting ID if missing from Sanity
    let derivedId = cleanText(item.id);
    if (!derivedId) {
      if (name.toLowerCase().includes("heart")) derivedId = "1";
      else if (name.toLowerCase().includes("mind") || name.toLowerCase().includes("brain")) derivedId = "2";
      else derivedId = "3";
    }

    if (iconKey === 'icon' || !iconKey) {
      iconKey = name.toLowerCase().includes('heart') ? 'heart' : name.toLowerCase().includes('mind') || name.toLowerCase().includes('brain') ? 'brain' : 'cpu';
    }

    // Safely check for CMS _key presence across union object patterns
    const cmsKey = '_key' in item ? (item._key as string) : undefined;

    return {
      cmsKey,
      name,
      tagline,
      description,
      features,
      iconKey,
      sortId: parseInt(derivedId, 10) || (index + 1)
    };
  });

  // Enforce clean mathematical ascending order (1 -> 2 -> 3)
  const sortedDisplayItems = [...normalizedItems].sort((a, b) => a.sortId - b.sortId);

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
            className="w-48 h-1 bg-blue-600 mt-4"
            aria-hidden="true"
          />
        </div>
        
        {/* GRID ENGINE */}
        <div className="max-w-7xl mx-auto py-4">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {sortedDisplayItems.map((processedItem, index) => {
              const formattedDisplayId = String(processedItem.sortId).padStart(2, '0');
              const renderedIcon = iconMap[processedItem.iconKey] || <HelpCircle className="w-8 h-8 text-zinc-500" />;
              const accentClass = accentMap[processedItem.iconKey] || "group-hover:border-zinc-500/50";

              return (
                <motion.div
                  key={processedItem.cmsKey || formattedDisplayId || index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className={`group relative p-8 rounded-3xl transition-all duration-500 backdrop-blur-md
                    bg-white border border-zinc-200 shadow-sm
                    dark:bg-zinc-900/50 dark:border-zinc-800 ${accentClass}`}
                >
                  {/* Background Watermark ID */}
                  <span className="absolute top-6 right-8 text-6xl font-black opacity-5 dark:opacity-10 pointer-events-none italic select-none">
                    {formattedDisplayId}
                  </span>

                  {/* Icon Container */}
                  <div className="mb-8 p-4 inline-block rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {renderedIcon}
                  </div>

                  {/* Headers */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">
                      {processedItem.name}
                    </h3>
                    {processedItem.tagline && (
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400/80 uppercase tracking-widest mt-1">
                        {processedItem.tagline}
                      </p>
                    )}
                  </div>

                  {/* Main Body */}
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 font-medium">
                    {processedItem.description}
                  </p>

                  {/* Checklist Features */}
                  {processedItem.features && processedItem.features.length > 0 && (
                    <ul className="space-y-4 border-t border-zinc-100 dark:border-zinc-800 pt-8">
                      {processedItem.features.map((feature, idx) => (
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