"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from "../../sanity/lib/client";
import { 
  ExternalLink, 
  Users, 
  Loader2, 
  ChevronRight, 
  ArrowRight, 
  Download, 
  MessageSquare 
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------- TYPES ---------------------- */

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  category: string;
  imageUrl: string | null;
  linkedinUrl?: string;
}

/* ---------------------- HERO ARCHITECTURE ---------------------- */

const HeroArchitecture = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = svgRef.current?.querySelectorAll(".hero-path");
      if (paths) {
        gsap.set(paths, { strokeDasharray: 1200, strokeDashoffset: 1200, opacity: 0 });
        gsap.to(paths, {
          strokeDashoffset: 0,
          opacity: (i) => (i % 2 === 0 ? 0.5 : 0.2),
          duration: 2.5,
          stagger: 0.02,
          ease: "power3.out",
        });
      }
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <svg ref={svgRef} viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" className="w-full h-full text-blue-900 dark:text-blue-500" fill="none" stroke="currentColor" strokeWidth="1.2">
        {Array.from({ length: 18 }).map((_, i) => (
          <path key={`v-${i}`} d={`M${i * (1000 / 17)} 0 L${500 + (i - 8.5) * 140} 1000`} className="hero-path opacity-0" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => i !== 6 && <path key={`h-${i}`} d={`M-50 ${i * 90} Q 500 ${i * 90 + 120} 1050 ${i * 90}`} className="hero-path opacity-0" />)}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fcfcfc] dark:to-[#0a0a0a]" />
    </div>
  );
};

/* ---------------------- MAIN COMPONENT ---------------------- */

export default function AestheticApproach() {
  const [visionaries, setVisionaries] = useState<TeamMember[]>([]);
  const [techTeam, setTechTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ right: 0, left: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "team"] | order(order desc) {
          name, role, bio, category,
          "imageUrl": image.asset->url,
          linkedinUrl
        }`;
        const data: TeamMember[] = await client.fetch(query, {}, { cache: 'no-store' });

        if (data) {
          const cleanFilter = (cat: string) => data.filter(m =>
            m.category?.toLowerCase().trim().includes(cat.toLowerCase())
          );
          setVisionaries(cleanFilter("visionary"));
          setTechTeam(cleanFilter("technical"));
        }
      } catch (err) {
        console.error("Sanity connection error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      setConstraints({
        right: 0,
        left: - (carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
      });
    }
  }, [techTeam]);

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 overflow-x-hidden min-h-screen">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-blue-800 origin-left z-50" />

      {/* HERO SECTION UPDATED */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <HeroArchitecture />
        <div className="relative z-10 space-y-10 max-w-5xl">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-[10vw] md:text-8xl font-medium tracking-tight leading-[0.85]"
            >
              Precision <br /> <span className="font-serif italic font-light">Architected.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl mx-auto text-lg md:text-xl text-zinc-700 dark:text-zinc-400 leading-relaxed font-light"
            >
              Transforming complex visions into high-performance digital assets through mathematical rigor and aesthetic clarity.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group relative px-8 py-4 bg-blue-800 text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2 font-medium">
                Explore Core <ArrowRight size={18} />
              </span>
              <div className="absolute inset-0 bg-blue-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 rounded-full border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-colors text-blue-800 dark:text-blue-400 font-medium">
              View Roadmap
            </button>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6">
        <h3 className="text-3xl my-4">Empowering Visionaries. Transforming Futures through Heart, Mind & Technology.</h3>
        <p className="text-md">At The TAG V.P., we are more than a technology partner—we are a millennial-driven collective of innovators, strategists, and creators united by a shared purpose. We believe true transformation begins with people, not just platforms. By blending empathy (Heart), strategic intelligence (Mind), and advanced technology (Technology), we design solutions that are human-centric, ethical, and built to last. Our mission is simple: to help visionary leaders turn bold ideas into measurable, sustainable impact.</p>
      </section>


      {/* VISIONARIES SECTION (Static Grid) */}
      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-20">
            <h3 className="text-5xl uppercase tracking-tighter">The Architects</h3>
            <Users className="text-blue-800 w-10 h-10" />
            {loading && <Loader2 className="animate-spin text-zinc-500" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <AnimatePresence mode="popLayout">
              {visionaries.map((v, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={v.name + i}
                  className="group relative"
                >
                  <div className="relative h-[550px] w-full overflow-hidden rounded-[3rem] mb-8 bg-zinc-200 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50">
                    {v.imageUrl ? (
                      <img src={v.imageUrl} alt={v.name} className="object-cover w-full h-full md:grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 italic text-zinc-500">Image Pending</div>
                    )}
                    {v.bio && (
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-12">
                        <p className="text-white text-lg leading-relaxed font-light">"{v.bio}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-start px-4">
                    <div>
                      <h4 className="text-3xl font-bold tracking-tight">{v.name}</h4>
                      <p className="text-blue-800 dark:text-blue-500 font-mono text-sm uppercase mt-1">{v.role}</p>
                    </div>
                    {v.linkedinUrl && (
                      <a href={v.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-blue-800 hover:text-white transition-all hover:scale-110">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* TECHNICAL TEAM SECTION (Carousel) */}
<section className="py-32 px-6 bg-zinc-950 text-white overflow-hidden">
  <div className="max-w-7xl mx-auto mb-12">
    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
      <div>
        <h3 className="text-5xl tracking-tighter">Technical Team</h3>
        <p className="text-zinc-500 text-sm font-mono mt-2 flex items-center gap-2">
          <ChevronRight size={14} className="text-blue-500" /> DRAG TO EXPLORE
        </p>
      </div>
      <p className="max-w-xs text-zinc-500 text-sm font-light">
        Our multidisciplinary squad of engineers optimized for scale and high-load performance.
      </p>
    </div>
  </div>

  <div className="max-w-7xl mx-auto">
    <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing">
      <motion.div
        drag="x"
        dragConstraints={constraints}
        className="flex gap-6"
      >
        {techTeam.map((t, i) => (
          <motion.div
            key={t.name + i}
            /* Fixed min-w and added max-w to ensure images don't over-expand */
            className="w-[280px] md:w-[320px] max-w-[350px] group relative overflow-hidden rounded-2xl aspect-[3/4] bg-zinc-900 border border-zinc-800 flex-shrink-0"
          >
            {t.imageUrl ? (
              <img 
                src={t.imageUrl} 
                className="object-cover w-full h-full md:grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                alt={t.name} 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-700 font-mono text-[10px]">NO_IMAGE</div>
            )}

            {t.linkedinUrl && (
              <a
                href={t.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 z-20 p-3 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
              >
                <ExternalLink size={16} />
              </a>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1">{t.role}</span>
              <h5 className="font-bold text-xl">{t.name}</h5>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  </div>
</section>

      {/* START JOURNEY SECTION */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[4rem] p-12 md:p-24 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-800/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4" />
            
            <div className="max-w-3xl space-y-8">
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight leading-none">
                Ready to start <br /> 
                <span className="font-serif italic font-light">the journey?</span>
              </h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                Join forces with our collective of architects and engineers. Let's turn your digital framework into a high-performance reality.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="group flex items-center gap-3 bg-blue-800 text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-blue-700 hover:scale-105 active:scale-95">
                  <MessageSquare size={18} />
                  Connect with Us
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="group flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700">
                  <Download size={18} />
                  Download Brochure
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold tracking-tighter uppercase">The TAG V.P.</span>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">© 2026 HEART • MIND • TECHNOLOGY</p>
          </div>
          
          <div className="flex gap-10">
            {['LinkedIn', 'Instagram', 'Twitter'].map((social) => (
              <a 
                key={social} 
                href="#" 
                className="text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}