"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Palette,
  UtensilsCrossed,
  HeartPulse,
  Terminal,
  Handshake,
  ArrowRight,
} from "lucide-react";

/* ---------------------- DATA ---------------------- */

const SERVICES = [
  {
    title: ["Design", "Studio"],
    framework: "Heart",
    icon: Palette,
    desc: "We design experiences that feel human. Our studio translates your story into beautiful, intuitive systems.",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-500/10",
    accent: "group-hover:border-rose-500/50",
  },
  {
    title: ["Culinary Arts", "Culture"],
    framework: "Heart",
    icon: UtensilsCrossed,
    desc: "We craft authentic cultural experiences through immersive concepts and storytelling.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    accent: "group-hover:border-orange-500/50",
  },
  {
    title: ["Health", "Wellness"],
    framework: "Heart & Tech",
    icon: HeartPulse,
    desc: "Bridging community, care, and technology to create meaningful wellness systems.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    accent: "group-hover:border-emerald-500/50",
  },
  {
    title: ["Technology", "Advisory"],
    framework: "Mind & Tech",
    icon: Terminal,
    desc: "We transform complex challenges into human-centered digital solutions.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    accent: "group-hover:border-blue-500/50",
  },
  {
    title: ["Strategic", "Ventures"],
    framework: "Heart & Mind",
    icon: Handshake,
    desc: "We co-build ventures aligned with mission, creativity, and capital.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
    accent: "group-hover:border-indigo-500/50",
  },
];

/* ---------------------- CARD ---------------------- */

const ServiceCard = ({
  service,
  isActive,
}: {
  service: any;
  isActive: boolean;
}) => {
  const Icon = service.icon;
  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.95,
      }}
      transition={{ duration: 0.5, ease: "circOut" }}
      className={`group relative h-120 md:h-130 p-8 md:p-12 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/5 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl ${service.accent}`}
    >
      <div>
        <div
          className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-8 md:mb-12 shadow-inner border border-white/10`}
        >
          <Icon className="w-6 h-6 md:w-7 md:h-7" />
        </div>

        <div className="mb-6 flex items-center gap-2">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 md:px-4 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-800/40">
            {service.framework}
          </span>
        </div>

        <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 text-zinc-900 dark:text-white leading-[0.9]">
          {service.title.map((part: string, i: number) => (
            <span key={i} className="block">
              {i > 0 && (
                <span className="text-zinc-300 dark:text-zinc-700 italic font-light">
                  &{" "}
                </span>
              )}
              {part}
            </span>
          ))}
        </h4>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-70">
          {service.desc}
        </p>
      </div>
    </motion.div>
  );
};

/* ---------------------- MAIN ---------------------- */

const FrameworkCarousel = () => {
  const autoplay = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center", // Center alignment for the centered text theme
      containScroll: false,
      dragFree: false, // Turned off for smoother "snapping" to center
    },
    [autoplay],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 md:py-40 bg-white dark:bg-[#09090b] transition-colors duration-500 overflow-hidden">
      {/* CENTERED HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-px w-8 bg-blue-600"></span>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-blue-600">
              Our Integrated Framework
            </h2>
            <span className="h-px w-8 bg-blue-600"></span>
          </motion.div>

          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-zinc-900 dark:text-white max-w-5xl">
            The Heart, Mind & Technology <br />
            <span className="text-zinc-200 dark:text-zinc-800 font-light">
              Framework in Action.
            </span>
          </h3>
        </div>

        {/* NAVIGATION BUTTONS (Centered) */}
      </div>

      {/* CAROUSEL VIEWPORT */}
      <div className="embla cursor-grab active:cursor-grabbing" ref={emblaRef}>
        <div className="flex touch-pan-y ml-[-1rem] md:ml-[-2rem]">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="flex-[0_0_85%] md:flex-[0_0_50%] lg:flex-[0_0_35%] min-w-0 pl-4 md:pl-8"
            >
              <ServiceCard service={service} isActive={selectedIndex === i} />
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER PROGRESS */}
      <div className="max-w-7xl mx-auto px-6 mt-16 md:mt-24 flex flex-col items-center gap-8">
        <div className="flex items-center gap-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="group relative h-1.5 transition-all duration-500"
              style={{ width: selectedIndex === index ? "80px" : "12px" }}
            >
              <div className="absolute inset-0 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors" />
              {selectedIndex === index && (
                <motion.div
                  key={`progress-${index}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute inset-0 rounded-full bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="text-[10px] font-bold tracking-[0.5em] text-zinc-400 uppercase">
          <span className="text-zinc-900 dark:text-white">
            0{selectedIndex + 1}
          </span>{" "}
          / 0{SERVICES.length}
        </div>
      </div>
    </section>
  );
};

export default FrameworkCarousel;
