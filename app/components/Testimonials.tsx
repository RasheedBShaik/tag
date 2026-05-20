"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Quote, Star, ChevronUp, ChevronDown } from "lucide-react";

interface Testimonial {
  _id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  stat: string;
  stars: number;
}

interface TestimonialsProps {
  testimonialsData?: Testimonial[];
}

export default function VerticalTestimonials({ testimonialsData = [] }: TestimonialsProps) {
  // tuple tracking: [currentIndex, direction (-1 for up/prev, 1 for down/next)]
  const [[page, direction], setPage] = useState([0, 0]);

  if (!testimonialsData || testimonialsData.length === 0) return null;

  const currentIndex = ((page % testimonialsData.length) + testimonialsData.length) % testimonialsData.length;
  const current = testimonialsData[currentIndex];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Handle vertical drag mechanics
  const handleDragEnd = (_event: any, info: PanInfo) => {
    const swipeThreshold = 40; // Minimum vertical distance to register a slide switch
    if (info.offset.y < -swipeThreshold) {
      paginate(1); // Swiped Up -> Next Slide (moves down)
    } else if (info.offset.y > swipeThreshold) {
      paginate(-1); // Swiped Down -> Previous Slide (moves up)
    }
  };

  // Dynamic vertical animation variants
  const verticalSlideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir < 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  return (
    <section className="relative grid min-h-[600px] w-full grid-cols-1 md:grid-cols-12 bg-zinc-50 dark:bg-zinc-950 overflow-hidden border-t border-zinc-200 dark:border-white/5 select-none">
      
      {/* LEFT SIDE IMAGERY (Spans 5 columns on desktop) */}
      <div className="relative h-48 w-full md:h-auto md:col-span-5 overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
          alt="Collaboration & Impact"
          className="h-full w-full object-cover grayscale dark:opacity-80 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-zinc-900/10 dark:bg-zinc-950/20 mix-blend-multiply" />
      </div>

      {/* RIGHT SIDE CONTENT (Spans 7 columns on desktop) */}
      <div className="flex flex-col justify-between p-8 md:p-12 lg:p-20 md:col-span-7 bg-white dark:bg-zinc-900/40 backdrop-blur-md relative border-l border-zinc-200 dark:border-white/5 touch-pan-x">
        
        {/* Background Decorative Watermark */}
        <div className="absolute right-12 bottom-12 text-zinc-900/[0.02] dark:text-white/[0.02] pointer-events-none">
          <Quote size={240} strokeWidth={1} />
        </div>

        {/* Header Tagline */}
        <div className="mb-8 pointer-events-none">
          <span className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.2em] uppercase text-xs block mb-2">
            Voice of users
          </span>
          <div className="w-12 h-0.5 bg-blue-600 dark:bg-blue-400" />
        </div>

        {/* Main Content Area Container with Side-by-Side Content + Dot Navigation Layout */}
        <div className="relative flex-1 flex flex-row items-center gap-6 min-h-[340px]">
          
          {/* Vertical Track Engine */}
          <div className="flex-1 relative h-full flex items-center cursor-grab active:cursor-grabbing">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={page}
                custom={direction}
                variants={verticalSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="y" // Changed axis constraint to Y
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.3}
                onDragEnd={handleDragEnd}
                transition={{ type: "spring", stiffness: 200, damping: 24 }}
                className="w-full flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tighter leading-none">
                    {current.stat}
                  </h3>

                  <blockquote className="text-lg md:text-xl font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                    "{current.quote}"
                  </blockquote>
                  
                  {/* Stars moved directly underneath the quote */}
                  <div className="flex gap-1 items-center pt-1">
                    {Array.from({ length: current.stars }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className="text-blue-500 fill-blue-500 dark:text-blue-400 dark:fill-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]"
                      />
                    ))}
                  </div>
                </div>

                {/* Author Block */}
                <div className="flex items-center gap-4 border-t border-zinc-100 dark:border-white/5 pt-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/10 dark:bg-blue-500/10 border border-blue-600/10 dark:border-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs tracking-wider shrink-0">
                    {getInitials(current.author)}
                  </div>

                  <div className="overflow-hidden">
                    <h4 className="text-base font-bold text-zinc-900 dark:text-white tracking-tight truncate">
                      {current.author}
                    </h4>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate">
                      {current.role} at <span className="text-blue-600 dark:text-blue-400 font-semibold">{current.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* SIDE INDICATOR: Vertical Dot Track Matrix */}
          {testimonialsData.length > 1 && (
            <div className="hidden sm:flex flex-col gap-2 z-10 shrink-0">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const dir = index > currentIndex ? 1 : -1;
                    setPage([index, dir]);
                  }}
                  className={`w-1.5 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? "h-6 bg-blue-600 dark:bg-blue-400" 
                      : "h-1.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400 dark:hover:bg-zinc-600"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* FOOTER CONTROLS: Arrow Navigation */}
        {testimonialsData.length > 1 && (
          <div className="flex items-center justify-between sm:justify-end mt-8 pt-4 border-t border-zinc-100 dark:border-white/5 z-10">
            {/* Mobile-only visible dot system underneath content */}
            <div className="flex gap-1.5 sm:hidden">
              {testimonialsData.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentIndex ? "w-4 bg-blue-600" : "w-1.5 bg-zinc-300"
                  }`}
                />
              ))}
            </div>

            {/* Top-Down Control Toggle Arrows */}
            <div className="flex gap-2">
              <button
                onClick={() => paginate(-1)}
                className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronUp size={16} />
              </button>
              <button
                onClick={() => paginate(1)}
                className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}