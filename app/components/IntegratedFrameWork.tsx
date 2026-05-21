"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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
    accent: "group-hover:border-rose-500/30 hover:shadow-rose-500/5",
    href: "/services/design",
  },
  {
    title: ["Culinary Arts", "Culture"],
    framework: "Heart",
    icon: UtensilsCrossed,
    desc: "We craft authentic cultural experiences through immersive concepts and storytelling.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-500/10",
    accent: "group-hover:border-orange-500/30 hover:shadow-orange-500/5",
    href: "/services/arts",
  },
  {
    title: ["Health", "Wellness"],
    framework: "Heart & Tech",
    icon: HeartPulse,
    desc: "Bridging community, care, and technology to create meaningful wellness systems.",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
    accent: "group-hover:border-emerald-500/30 hover:shadow-emerald-500/5",
    href: "/services/health",
  },
  {
    title: ["Technology", "Advisory"],
    framework: "Mind & Tech",
    icon: Terminal,
    desc: "We transform complex challenges into human-centered digital solutions.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
    accent: "group-hover:border-blue-500/30 hover:shadow-blue-500/5",
    href: "/services/advisory",
  },
  {
    title: ["Strategic", "Ventures"],
    framework: "Heart & Mind",
    icon: Handshake,
    desc: "We co-build ventures aligned with mission, creativity, and capital.",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-500/10",
    accent: "group-hover:border-indigo-500/30 hover:shadow-indigo-500/5",
    href: "/services/strategic",
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
    <Link href={service.href} className="block cursor-pointer select-none">
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0.65,
          scale: isActive ? 1 : 0.96,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative h-[480px] md:h-[520px] p-8 md:p-10 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/80 dark:border-white/5 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl ${service.accent}`}
      >
        <div>
          {/* Icon Wrapper */}
          <div
            className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-8 shadow-sm transition-transform duration-500 group-hover:scale-105`}
          >
            <Icon className="w-6 h-6 md:w-7 md:h-7 stroke-[1.75]" />
          </div>

          {/* Framework Tag */}
          <div className="mb-5 flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 bg-white/80 dark:bg-zinc-800/30">
              {service.framework}
            </span>
          </div>

          {/* Heading */}
          <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4 text-zinc-900 dark:text-white leading-[1.05]">
            {service.title.map((part: string, i: number) => (
              <span key={i} className="block">
                {i > 0 && (
                  <span className="text-zinc-300 dark:text-zinc-700 italic font-light font-serif lowercase mr-1.5">
                    &amp;{" "}
                  </span>
                )}
                {part}
              </span>
            ))}
          </h4>

          {/* Description */}
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm font-medium tracking-wide">
            {service.desc}
          </p>
        </div>

        {/* Action Footing */}
        <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300">
          <span className="relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:bg-blue-600 dark:after:bg-blue-400 after:transition-all after:duration-300 group-hover:after:w-full">
            Learn More
          </span>
          <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 transform transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </motion.div>
    </Link>
  );
};

/* ---------------------- MAIN ---------------------- */

const FrameworkCarousel = () => {
  const autoplay = useMemo(
    () => Autoplay({ delay: 5000, stopOnInteraction: false }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: false,
      dragFree: false,
    },
    [autoplay]
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
    <section className="py-24 md:py-36 bg-white dark:bg-[#09090b] transition-colors max-w-[1400px] mx-auto duration-500 overflow-hidden relative">
      {/* CENTERED HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-20 text-center relative z-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-[1.5px] w-6 bg-blue-600 dark:bg-blue-500"></span>
            <h2 className="text-[11px] font-extrabold uppercase tracking-[0.4em] text-blue-600 dark:text-blue-500">
              Our Integrated Framework
            </h2>
            <span className="h-[1.5px] w-6 bg-blue-600 dark:bg-blue-500"></span>
          </motion.div>

          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.95] text-zinc-900 dark:text-white max-w-4xl mb-8">
            The Heart, Mind &amp; Technology <br />
            Framework in Action.
          </h3>

          {/* VIEW ALL SERVICES BUTTON */}
          <Link href="/services">
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-xs font-black uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg hover:shadow-blue-500/10"
            >
              View All Services
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.div>
          </Link>
        </div>
      </div>

      {/* CAROUSEL VIEWPORT */}
      <div 
        className="embla cursor-grab active:cursor-grabbing px-4 md:px-0 relative before:absolute before:left-0 before:top-0 before:h-full before:w-12 before:bg-gradient-to-r before:from-white before:to-transparent dark:before:from-[#09090b] before:z-10 after:absolute after:right-0 after:top-0 after:h-full after:w-12 after:bg-gradient-to-l after:from-white after:to-transparent dark:after:from-[#09090b] after:z-10" 
        ref={emblaRef}
      >
        <div className="flex touch-pan-y ml-[-1rem] md:ml-[-1.5rem]">
          {SERVICES.map((service, i) => (
            <div
              key={i}
              className="flex-[0_0_88%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4 md:pl-6"
            >
              <ServiceCard service={service} isActive={selectedIndex === i} />
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER PROGRESS */}
      <div className="max-w-7xl mx-auto px-6 mt-14 md:mt-18 flex flex-col items-center gap-6">
        <div className="flex items-center gap-2.5">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="group relative h-1.5 transition-all duration-500 focus:outline-none"
              style={{ width: selectedIndex === index ? "64px" : "10px" }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="absolute inset-0 rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700" />
              {selectedIndex === index && (
                <motion.div
                  key={`progress-${index}`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute inset-0 rounded-full bg-blue-600 dark:bg-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.3)]"
                />
              )}
            </button>
          ))}
        </div>

        <div className="text-[10px] font-extrabold tracking-[0.4em] text-zinc-400 dark:text-zinc-500 uppercase flex items-center gap-1.5">
          <span className="text-zinc-900 dark:text-white transition-colors">
            0{selectedIndex + 1}
          </span>{" "}
          <span className="opacity-40">/</span> 0{SERVICES.length}
        </div>
      </div>
    </section>
  );
};

export default FrameworkCarousel;