"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

/* ---------------------- TYPES ---------------------- */

export interface TestimonialItem {
  _id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  stat: string;
  stars: number;
}

interface PartnerTestimonialsProps {
  testimonials: TestimonialItem[];
}

/* ---------------------- SUB-COMPONENT: STARS ---------------------- */

const InteractiveStars = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-1.5 mb-6">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
        >
          <Star className="w-4 h-4 fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400 drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
        </motion.div>
      ))}
    </div>
  );
};

/* ---------------------- MAIN COMPONENT ---------------------- */

const PartnerTestimonials = ({ testimonials = [] }: PartnerTestimonialsProps) => {
  const autoplay = React.useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      axis: "y",
      loop: true,
      duration: 50,
    },
    [autoplay.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Fallback state if no content is published yet
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="relative min-h-screen flex items-center bg-white dark:bg-[#09090b] overflow-hidden transition-colors duration-1000">
      <div className="flex flex-col lg:flex-row w-full h-full min-h-screen">
        
        {/* LEFT SIDE: CINEMATIC VISUAL PANEL */}
        <div className="relative w-full lg:w-1/2 h-[45vh] lg:h-screen overflow-hidden bg-zinc-900">
          <motion.div 
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Strategic Partnership"
              className="w-full h-full object-cover grayscale brightness-[0.6] contrast-[1.1]"
            />
          </motion.div>

          {/* Depth Overlays */}
          <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-10" />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-white/10 dark:to-[#09090b] z-20" />

          <div className="absolute bottom-10 left-10 lg:bottom-20 lg:left-20 z-30 max-w-md">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-blue-400">
                True Partnership
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.85] drop-shadow-2xl">
              Impact <br />
              <span className="italic font-extralight text-zinc-400 opacity-90">by Design.</span>
            </h2>
          </div>
        </div>

        {/* RIGHT SIDE: CAROUSEL CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-20 lg:px-28 py-16 relative">
          
          {/* Header & Progress */}
          <div className="mb-12 relative z-10">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.8em] text-zinc-400 dark:text-zinc-500 mb-6">
              Voice of Partnership
            </h3>
            <div className="w-full h-[1px] bg-zinc-100 dark:bg-zinc-800/50 overflow-hidden">
               <motion.div 
                key={selectedIndex}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="h-full bg-blue-600 dark:bg-blue-500"
               />
            </div>
          </div>

          {/* Testimonial Feed */}
          <div className="overflow-hidden h-[450px] cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="h-full flex flex-col">
              {testimonials.map((t) => (
                <div key={t._id} className="flex-[0_0_100%] min-h-0 flex flex-col justify-center group">
                  
                  <Quote className="w-10 h-10 text-blue-600/5 dark:text-blue-400/5 mb-6 group-hover:text-blue-500/10 transition-colors duration-500" />
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-xl md:text-3xl font-semibold text-zinc-800 dark:text-zinc-100 leading-[1.15] mb-8 tracking-tight"
                  >
                    "{t.quote}"
                  </motion.p>
                  
                  <InteractiveStars count={t.stars} />

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8 border-t border-zinc-50 dark:border-zinc-900">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white">
                        {t.author}
                      </h4>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 font-medium">
                        {t.role} <span className="mx-2 opacity-30">|</span> {t.company}
                      </p>
                    </div>

                    <div className="self-start md:self-center px-5 py-2 rounded-full border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm transition-transform hover:scale-105">
                       <span className="text-[10px] font-black uppercase tracking-tighter text-blue-600 dark:text-blue-400">
                         {t.stat}
                       </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative numbering */}
          <div className="absolute top-1/2 right-4 lg:right-10 -translate-y-1/2 text-[18vh] font-black text-zinc-100/50 dark:text-zinc-900/20 -z-10 select-none pointer-events-none transition-colors duration-1000">
            0{selectedIndex + 1}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerTestimonials;