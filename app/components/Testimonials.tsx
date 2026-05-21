"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Quote, Star, ArrowLeft, ArrowRight } from "lucide-react";
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

interface HomeTestimonialsProps {
  testimonialsData: TestimonialItem[]; // Updated interface name
}

/* ---------------------- SUB-COMPONENT: STARS ---------------------- */

const InteractiveStars = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count
              ? "fill-blue-600 text-blue-600 dark:fill-blue-400 dark:text-blue-400 drop-shadow-[0_0_6px_rgba(37,99,235,0.3)]"
              : "text-zinc-200 dark:text-zinc-700 fill-transparent"
          }`}
        />
      ))}
    </div>
  );
};

/* ---------------------- MAIN COMPONENT ---------------------- */

const HomeTestimonials = ({ testimonialsData = [] }: HomeTestimonialsProps) => { // Updated component name
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      duration: 35,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // CMS Empty State Fallback UI
  if (!testimonialsData || testimonialsData.length === 0) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center p-8 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl max-w-sm">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            No testimonials found. Publish content in your Sanity Studio dashboard to populate this section.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center bg-white dark:bg-[#09090b] overflow-hidden transition-colors duration-1000">
      <div className="flex flex-col lg:flex-row w-full h-full min-h-screen">
        
        {/* LEFT SIDE: CINEMATIC VISUAL PANEL */}
        <div className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen overflow-hidden bg-zinc-900">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Strategic Partnership"
              className="w-full h-full object-cover grayscale brightness-[0.5] contrast-[1.15]"
            />
          </motion.div>

          {/* Color Depth Gradient Layer Blends */}
          <div className="absolute inset-0 bg-blue-950/20 mix-blend-overlay z-10" />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/70 via-black/20 to-transparent z-20" />

          <div className="absolute bottom-8 left-8 lg:bottom-20 lg:left-20 z-30 max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-8 bg-blue-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-blue-400">
                True Partnership
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none drop-shadow-2xl">
              Impact <br />
              <span className="italic font-extralight text-zinc-400 opacity-90">by Design.</span>
            </h2>
          </div>
        </div>

        {/* RIGHT SIDE: CAROUSEL CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 md:px-16 lg:px-24 py-12 lg:py-20 relative min-h-[60vh] lg:min-h-screen">
          
          {/* Top Progress Visual Indicator */}
          <div className="w-full relative z-10">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.8em] text-zinc-400 dark:text-zinc-500 mb-4">
              Voice of Partnership
            </h3>
            <div className="w-full h-[2px] bg-zinc-100 dark:bg-zinc-800/60 overflow-hidden rounded-full">
              <motion.div 
                key={selectedIndex}
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
                className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
              />
            </div>
          </div>

          {/* Main Carousel Slider Track */}
          <div className="overflow-hidden my-auto py-8 cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {testimonialsData.map((t) => (
                <div key={t._id} className="flex-[0_0_100%] min-w-0 px-1 flex flex-col justify-center group">
                  <Quote className="w-10 h-10 text-blue-600/10 dark:text-blue-400/10 mb-6 group-hover:text-blue-500/20 transition-colors duration-500" />
                  
                  <p className="text-xl md:text-2xl lg:text-3xl font-medium text-zinc-800 dark:text-zinc-100 leading-snug mb-6 tracking-tight">
                    "{t.quote}"
                  </p>
                  
                  <InteractiveStars count={t.stars} />

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-900">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                        {t.author}
                      </h4>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-500 mt-0.5">
                        {t.role} <span className="mx-1.5 text-zinc-300 dark:text-zinc-800">|</span> {t.company}
                      </p>
                    </div>

                    <div className="px-4 py-1.5 rounded-full border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 shadow-sm">
                      <span className="text-[10px] font-bold uppercase tracking-tight text-blue-600 dark:text-blue-400">
                        {t.stat}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Navigation Control Strip */}
          <div className="w-full flex items-center justify-between pt-4 relative z-10">
            {/* Pagination Indicators */}
            <div className="flex gap-2">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex 
                      ? "w-6 bg-blue-600 dark:bg-blue-500" 
                      : "w-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Manual Step Arrows */}
            <div className="flex gap-3">
              <button
                onClick={scrollPrev}
                className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                aria-label="Next slide"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Extra Large Structural Watermark Index */}
          <div className="absolute bottom-4 right-6 lg:bottom-12 lg:right-12 text-[14vh] font-black text-zinc-100 dark:text-zinc-900/10 -z-10 select-none pointer-events-none transition-colors duration-1000">
            0{selectedIndex + 1}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeTestimonials;