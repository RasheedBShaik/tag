import React from 'react';
import { Heart, Brain, Cpu, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const frameworkData = [
  {
    id: "01",
    name: "Heart",
    tagline: "Empathy · Ethics · Human-Centricity",
    description: "Technology built without empathy becomes a burden. We design every system around the humans who live inside it.",
    icon: <Heart className="w-8 h-8 text-rose-500" />,
    features: [
      "Stakeholder empathy mapping",
      "Ethical AI & responsible governance",
      "Change management for adoption",
      "Inclusive design for all users"
    ],
    accent: "group-hover:border-rose-500/50"
  },
  {
    id: "02",
    name: "Mind",
    tagline: "Strategy · Intelligence · Clarity",
    description: "Complexity is the enemy of progress. We cut through it with sharp strategic thinking and data-driven clarity.",
    icon: <Brain className="w-8 h-8 text-blue-500" />,
    features: [
      "Digital transformation milestones",
      "Data architecture & AI strategy",
      "Portfolio rationalization",
      "Board-ready technical roadmaps"
    ],
    accent: "group-hover:border-blue-500/50"
  },
  {
    id: "03",
    name: "Technology",
    tagline: "Architecture · Security · Scale",
    description: "Great strategy demands execution. We deliver scalable, secure, and sovereign systems that perform today.",
    icon: <Cpu className="w-8 h-8 text-amber-500" />,
    features: [
      "Cloud & Enterprise architecture",
      "Zero-trust & Digital sovereignty",
      "AI/ML & Data pipelines",
      "Emerging tech production readiness"
    ],
    accent: "group-hover:border-amber-500/50"
  }
];

const HeartMindTechnology = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {frameworkData.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className={`group relative p-8 rounded-3xl transition-all duration-500 backdrop-blur-md
              bg-white border border-zinc-200 shadow-sm
              dark:bg-zinc-900/50 dark:border-zinc-800 ${item.accent}`}
          >
            {/* Background Numbering */}
            <span className="absolute top-6 right-8 text-6xl font-black opacity-5 dark:opacity-10 pointer-events-none italic">
              {item.id}
            </span>

            {/* Icon Header */}
            <div className="mb-8 p-4 inline-block rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              {item.icon}
            </div>

            {/* Title & Tagline */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">
                {item.name}
              </h3>
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400/80 uppercase tracking-widest mt-1">
                {item.tagline}
              </p>
            </div>

            {/* Core Description */}
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 font-medium">
              {item.description}
            </p>

            {/* Feature List */}
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

            {/* Decorative Hover Glow */}
            <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-zinc-500/5" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeartMindTechnology;