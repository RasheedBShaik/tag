import React from 'react';
import { Heart, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const cardContent = [
  {
    icon: <Heart className="w-8 h-8 text-rose-500" />,
    name: "Heart",
    description: "We build with empathy and fairness in design and delivery."
  },
  {
    icon: <Brain className="w-8 h-8 text-blue-500" />,
    name: "Mind",
    description: "We execute with data-driven, agile, and adaptable strategies."
  },
  {
    icon: <Zap className="w-8 h-8 text-amber-500" />, // Amber-500 for better visibility in light mode
    name: "Technology",
    description: "We create ethical solutions that enhance creativity and acceleration."
  }
];

const HeartMindTechnology = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cardContent.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          whileHover={{ y: -10 }}
          /* THEME-AWARE CARD:
             Light: bg-black/5 (soft gray), border-black/10
             Dark: bg-white/5 (soft zinc), border-white/10
          */
          className="group relative p-8 rounded-3xl transition-all duration-300 backdrop-blur-sm
            bg-black/5 border border-black/5 hover:bg-black/10
            dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 shadow-sm dark:shadow-none"
        >
          {/* ICON WRAPPER 
              Light: White bg with shadow
              Dark: Black bg
          */}
          <div className="mb-6 p-4 inline-block rounded-2xl transition-all duration-300 group-hover:scale-110
            bg-white shadow-md border border-black/5
            dark:bg-black/50 dark:border-white/5 dark:shadow-none">
            {item.icon}
          </div>

          {/* TEXT CONTENT
              Light: Zinc-900 (Bold)
              Dark: White
          */}
          <h3 className="text-xl font-bold mb-3 uppercase tracking-wider transition-colors duration-500
            text-zinc-900 dark:text-white">
            {item.name}
          </h3>
          
          {/* DESCRIPTION
              Light: Zinc-600
              Dark: Gray-400
          */}
          <p className="leading-relaxed font-medium transition-colors duration-500
            text-zinc-600 dark:text-zinc-400">
            {item.description}
          </p>

          {/* SUBTLE GLOW DECOR (Only visible in Dark Mode) */}
          <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-blue-600/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity hidden dark:block" />
        </motion.div>
      ))}
    </div>
  );
};

export default HeartMindTechnology;