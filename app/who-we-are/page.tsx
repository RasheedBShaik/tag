"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { client } from "../../sanity/lib/client";
import { 
  ExternalLink, 
  Loader2, 
  ArrowRight, 
  Cpu,
  ShieldCheck,
  Heart,
  Zap,
  Code2,
  ChevronRight,
  Plus
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

export default function TheTAGExperience() {
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
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 overflow-x-hidden min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-blue-800 origin-left z-50" />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <HeroArchitecture />
        <div className="relative z-10 space-y-12 max-w-6xl">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400 text-[10px] uppercase tracking-[0.4em] font-black">
                Empowering Visionaries
            </span>
          </motion.div>
          
          <div className="space-y-6">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[12vw] md:text-8xl font-black tracking-tight leading-[0.85] uppercase">
              Heart, Mind <br /> <span className="font-serif italic font-light lowercase tracking-normal text-blue-800">&</span> Technology.
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              We believe true transformation begins with people, not platforms. TheTAG Ventures & Partners is a founder-led collective helping bold leaders turn ideas into measurable, lasting impact.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CORE METRICS STRIP */}
      <section className="py-20 border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <Metric val="3" label="Founders with operating experience" />
            <Metric val="5" label="Practice areas under one methodology" />
            <Metric val="100%" label="Principal-led in every room" />
            <Metric val="0" label="Engagements without genuine belief" />
        </div>
      </section>

      {/* OUR SHAPE & PHILOSOPHY */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-32">
                <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Our <span className="text-blue-800">Shape.</span></h2>
                    <p className="text-2xl font-serif italic text-zinc-800 dark:text-zinc-200 leading-snug">
                        "Deliberately small. The people in the room during the conversation are the people doing the work."
                    </p>
                </div>
                <div className="text-lg text-zinc-500 font-light leading-relaxed space-y-6">
                    <p>
                        We take on a handful of engagements at a time — that constraint is a choice, not a limitation. Small means senior principals on every project, and honest counsel without commercial pressure to say yes.
                    </p>
                    <div className="pt-6 grid grid-cols-2 gap-8">
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-blue-800 mb-2">Response Commitment</div>
                            <p className="text-sm">48h response to every qualified inbound.</p>
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-blue-800 mb-2">No-Dependency</div>
                            <p className="text-sm">Success is measured by what you can do without us.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <PhilosophyCard 
                    icon={<Heart className="text-red-500" />} 
                    title="Human Resonance" 
                    text="Strategy led by empathy. We design digital ecosystems that resonate with the end-user while serving the bottom line." 
                />
                <PhilosophyCard 
                    icon={<Zap className="text-yellow-500" />} 
                    title="Strategic Mind" 
                    text="The high-level logic. We define the market path and venture architecture before a single line of code is written." 
                />
                <PhilosophyCard 
                    icon={<ShieldCheck className="text-blue-500" />} 
                    title="System Governance" 
                    text="Ensuring your digital sovereignty. Through our partnership with Anarav, we enforce strict standards of architectural integrity." 
                />
            </div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-32 px-6 bg-zinc-100 dark:bg-zinc-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
            <div className="lg:col-span-3 space-y-8">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Our Story Begins <br/><span className="text-blue-800 font-serif italic font-light lowercase">with people.</span></h2>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    TheTAG Ventures & Partners was built on a simple conviction: that the best technology decisions are human decisions first. By blending empathy (Heart), strategic intelligence (Mind), and purposeful technology (Technology), we design solutions that are ethical, evidence-based, and built to last.
                </p>
                <div className="flex items-center gap-4 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                    <span className="w-12 h-[1px] bg-zinc-300"></span> Webster, Texas · Working Globally
                </div>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 gap-4">
                <StoryMetric val="2015" label="Founding conviction formed" />
                <StoryMetric val="16wk" label="Typical arc to knowledge handover" />
                <StoryMetric val="100%" label="Full knowledge transfer guarantee" />
            </div>
        </div>
      </section>

      {/* ANARAV PARTNER SECTION */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="bg-white dark:bg-zinc-950 rounded-[4rem] p-8 md:p-20 border border-zinc-200 dark:border-zinc-800 flex flex-col lg:flex-row gap-16 items-center shadow-xl shadow-blue-900/5">
                <div className="lg:w-1/2 space-y-8">
                    <div className="flex items-center gap-3 text-blue-600 font-black tracking-widest uppercase text-[10px]">
                        <Code2 size={16} /> Official Technical Partner
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-none uppercase">Powered by <br/>Anarav Tech.</h2>
                    <p className="text-lg text-zinc-500 leading-relaxed font-light">
                        While TheTAG provides high-performance strategy, **Anarav Technologies** acts as our dedicated engineering engine. This synergy ensures grand visions are built with industrial-grade precision.
                    </p>
                    <a href="https://anaravtech.com" target="_blank" className="group flex items-center gap-3 text-blue-800 dark:text-blue-400 font-bold uppercase tracking-widest text-xs">
                        View Engineering Suite <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
                <div className="lg:w-1/2 w-full aspect-square bg-zinc-50 dark:bg-zinc-900 rounded-[3rem] flex items-center justify-center border border-zinc-200 dark:border-zinc-800 relative">
                    <Cpu size={80} className="text-blue-800/20 dark:text-blue-400/20 animate-pulse" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent"></div>
                </div>
            </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">The <br/><span className="text-blue-800">Partners.</span></h2>
              <p className="mt-6 text-xl text-zinc-500 font-light italic font-serif">Principal-led engagements. No exceptions.</p>
            </div>
            {loading && <Loader2 className="animate-spin text-zinc-500" />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {visionaries.map((v, i) => (
                <FounderCard key={v.name + i} member={v} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ENGINEERING SQUAD CAROUSEL */}
      <section className="py-32 px-6 bg-zinc-950 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto mb-16 flex justify-between items-end">
            <div>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">Engineering Squad</h3>
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                    <ChevronRight size={14} className="text-blue-600" /> Powered by Anarav Tech
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto">
            <motion.div ref={carouselRef} className="cursor-grab active:cursor-grabbing">
                <motion.div drag="x" dragConstraints={constraints} className="flex gap-8">
                    {techTeam.map((t, i) => (
                    <motion.div key={t.name + i} className="w-[300px] md:w-[400px] group relative overflow-hidden rounded-[2.5rem] aspect-[3/4] bg-zinc-900 border border-zinc-800 flex-shrink-0">
                        {t.imageUrl ? (
                        <img 
                            src={t.imageUrl} 
                            className="object-cover w-full h-full transition-all duration-700 md:opacity-40 md:grayscale md:group-hover:opacity-100 md:group-hover:grayscale-0" 
                            alt={t.name} 
                        />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-800 font-mono text-[10px]">ANARAV_DEV_UNIT</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform">
                            <span className="text-[9px] font-mono text-blue-500 uppercase tracking-widest mb-1">{t.role}</span>
                            <h5 className="font-bold text-2xl tracking-tight">{t.name}</h5>
                        </div>
                    </motion.div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
      </section>

      {/* START A CONVERSATION */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-10">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">Start a <br/>Conversation.</h2>
            <p className="text-xl text-zinc-500 font-light">We respond within 48 hours. No intake forms, just direct access.</p>
            <a href="mailto:partners@th3tag.com" className="inline-flex items-center gap-6 text-2xl font-black uppercase tracking-widest group border-b-2 border-zinc-200 dark:border-zinc-800 pb-4 hover:border-blue-800 transition-colors">
                partners@th3tag.com <ArrowRight className="group-hover:translate-x-3 transition-transform" />
            </a>
        </div>
      </section>

    </div>
  );
}

/* ---------------------- REUSABLE UI ---------------------- */

const Metric = ({ val, label }: { val: string; label: string }) => (
    <div className="group">
        <div className="text-5xl font-black mb-2 text-zinc-900 dark:text-white">{val}</div>
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 leading-tight max-w-[150px] mx-auto">{label}</div>
    </div>
);

const StoryMetric = ({ val, label }: { val: string; label: string }) => (
    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center group hover:border-blue-800 transition-colors">
        <span className="text-3xl font-black text-blue-800">{val}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right max-w-[120px]">{label}</span>
    </div>
);

const PhilosophyCard = ({ icon, title, text }: any) => (
    <div className="p-12 rounded-[3.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
        <div className="mb-8 transition-transform group-hover:scale-110 duration-500">{React.cloneElement(icon, { size: 36 })}</div>
        <h4 className="text-3xl font-bold mb-6">{title}</h4>
        <p className="text-zinc-500 leading-relaxed font-light text-sm">{text}</p>
        <div className="absolute bottom-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
            <Plus size={20} className="text-blue-800" />
        </div>
    </div>
);

const FounderCard = ({ member }: { member: TeamMember }) => (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group">
        <div className="relative h-[480px] w-full overflow-hidden rounded-[3rem] mb-8 bg-zinc-200 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            {member.imageUrl ? (
                <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="object-cover w-full h-full transition-all duration-1000 md:grayscale md:group-hover:grayscale-0 scale-105 group-hover:scale-100" 
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 italic">Visionary Portrait</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10 flex flex-col justify-end">
                <p className="text-white text-sm font-light italic leading-relaxed mb-6">"{member.bio || "Crafting the strategic logic of digital excellence."}"</p>
                {member.linkedinUrl && (
                    <a href={member.linkedinUrl} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white hover:text-blue-900 transition-all">
                        <ExternalLink size={16} />
                    </a>
                )}
            </div>
        </div>
        <div className="px-4">
            <h4 className="text-2xl font-bold tracking-tight">{member.name}</h4>
            <p className="text-blue-800 dark:text-blue-500 font-mono text-[10px] uppercase mt-1 font-black tracking-widest">{member.role}</p>
        </div>
    </motion.div>
);