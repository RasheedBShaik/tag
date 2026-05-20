"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { client } from "../../sanity/lib/client";
import { 
  ExternalLink, 
  Loader2, 
  ArrowRight, 
  ShieldCheck,
  Heart,
  Zap,
  ChevronRight
} from "lucide-react";

/* ---------------------- TYPES ---------------------- */
interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  category: string;
  imageUrl: string | null;
  linkedinUrl?: string;
}

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  radius: number;
  cluster: "heart" | "mind" | "system";
}

export default function TheTAGExperience() {
  const [visionaries, setVisionaries] = useState<TeamMember[]>([]);
  const [techTeam, setTechTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [constraints, setConstraints] = useState({ right: 0, left: 0 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Sanity Data Fetching
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

  // INTERACTIVE FULLSCREEN BIOMETRIC NEURAL MAP
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodeCount = 110; // Slightly increased for fuller screen distribution
    const nodes: Node[] = [];
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

    // Node generator mapping framework
    const generateNodes = (w: number, h: number) => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        const ratio = i / nodeCount;
        let bx = w * 0.5;
        let by = h * 0.5;
        let clusterType: "heart" | "mind" | "system" = "system";

        if (ratio < 0.35) {
          // Mind - Upper Cerebral Arch
          const angle = (ratio / 0.35) * Math.PI + Math.PI;
          bx += Math.cos(angle) * (w * 0.22) * (0.7 + Math.random() * 0.5);
          by += Math.sin(angle) * (h * 0.15) - (h * 0.05);
          clusterType = "mind";
        } else if (ratio < 0.75) {
          // Heart - Dynamic lower tapering cradle
          const t = ((ratio - 0.35) / 0.4) * Math.PI;
          bx += Math.sin(t) * Math.cos(t) * (w * 0.25);
          by += Math.sin(t) * (h * 0.25) + (h * 0.1);
          clusterType = "heart";
        } else {
          // System Architecture Context links spread globally
          bx += (Math.random() - 0.5) * (w * 0.75);
          by += (Math.random() - 0.5) * (h * 0.75);
        }

        nodes.push({
          x: bx,
          y: by,
          baseX: bx,
          baseY: by,
          vx: 0,
          vy: 0,
          phase: Math.random() * Math.PI * 2,
          speed: 0.008 + Math.random() * 0.012,
          radius: 1.8 + Math.random() * 3.2,
          cluster: clusterType
        });
      }
    };

    generateNodes(width, height);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
      mouse.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    // Core Loop Logic Execution
    const drawMap = () => {
      ctx.clearRect(0, 0, width, height);
      const isDarkMode = document.documentElement.classList.contains("dark");

      // Smooth cursor lerping physics tracking
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Adaptive UI Theme Palette variables
      const lineColor = isDarkMode ? "rgba(59, 130, 246, 0.04)" : "rgba(29, 78, 216, 0.03)";
      const activeLineColor = isDarkMode ? "rgba(96, 165, 250, 0.25)" : "rgba(37, 99, 235, 0.18)";
      const mindNodeColor = isDarkMode ? "#60a5fa" : "#2563eb";
      const heartNodeColor = isDarkMode ? "#f43f5e" : "#dc2626";

      // Physics, Floating and Magnetics phase mapping logic
      nodes.forEach(node => {
        node.phase += node.speed;
        
        // Multi-frequency smooth organic continuous floating vector offsets
        const floatX = Math.sin(node.phase) * 8;
        const floatY = Math.cos(node.phase * 1.3) * 8;

        let targetX = node.baseX + floatX;
        let targetY = node.baseY + floatY;

        // Interactive magnetic repulsion calculations
        const mDist = Math.hypot(mouse.x - targetX, mouse.y - targetY);
        if (mDist < 220) {
          const force = (220 - mDist) / 220;
          const angle = Math.atan2(targetY - mouse.y, targetX - mouse.x);
          // Combine directional push with continuous speed vector processing
          targetX += Math.cos(angle) * force * 45;
          targetY += Math.sin(angle) * force * 45;
        }

        // Spring-inertia tracking calculations
        node.vx += (targetX - node.x) * 0.05;
        node.vy += (targetY - node.y) * 0.05;
        node.vx *= 0.82; 
        node.vy *= 0.82;

        node.x += node.vx;
        node.y += node.vy;
      });

      // Render Interconnected Constellation Channel Framework
      ctx.lineWidth = 0.9;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

          const maxDist = n1.cluster === "system" || n2.cluster === "system" ? 90 : 150;

          if (dist < maxDist) {
            const isNearMouse1 = Math.hypot(mouse.x - n1.x, mouse.y - n1.y) < 180;
            const isNearMouse2 = Math.hypot(mouse.x - n2.x, mouse.y - n2.y) < 180;
            
            ctx.strokeStyle = (isNearMouse1 || isNearMouse2) ? activeLineColor : lineColor;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // Render Core Synaptic Vertices Node Systems
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        
        const isNearCursor = Math.hypot(mouse.x - node.x, mouse.y - node.y) < 180;
        
        if (isNearCursor) {
          ctx.fillStyle = node.cluster === "heart" ? heartNodeColor : mindNodeColor;
          ctx.shadowBlur = 12;
          ctx.shadowColor = ctx.fillStyle;
        } else {
          ctx.fillStyle = isDarkMode ? "rgba(255, 255, 255, 0.22)" : "rgba(10, 10, 10, 0.15)";
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      });
      ctx.shadowBlur = 0; // Clear canvas state buffer allocations

      animationFrameId = requestAnimationFrame(drawMap);
    };

    drawMap();

    // Responsive Canvas Resize Engine Event Listener setup
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      generateNodes(width, height);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    if (carouselRef.current && techTeam.length > 0) {
      setConstraints({
        right: 0,
        left: - (carouselRef.current.scrollWidth - carouselRef.current.offsetWidth)
      });
    }
  }, [techTeam]);

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 overflow-x-hidden min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-blue-800 origin-left z-50" />

      {/* FULLSCREEN INTERACTIVE BIOMETRIC CONSTELLATION HERO LAYER */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center px-6 overflow-hidden z-10">
        {/* Full Viewport Absolute Execution Plane */}
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-90 transition-opacity duration-300"
        />
        {/* Radical Vignette Gradient to blend layout contents securely down layout sections */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fcfcfc] dark:to-[#0a0a0a] pointer-events-none z-0" />

        <div className="relative z-10 max-w-6xl mx-auto space-y-12 text-center select-none mix-blend-normal">
          <motion.div 
            initial={{ opacity: 0, y: -15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <span className="px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400 text-[10px] uppercase tracking-[0.4em] font-black backdrop-blur-sm">
              Heart · Mind · Technology
            </span>
          </motion.div>
          
          <div className="space-y-6">
<<<<<<< HEAD
            <motion.h1 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] md:text-8xl font-black tracking-tight leading-[0.85] uppercase text-zinc-900 dark:text-white"
            >
              Heart Mind <br /> 
              <span className="text-blue-800 dark:text-blue-500 font-serif">technology</span>
=======
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[12vw] md:text-8xl font-black tracking-tight leading-[0.85] uppercase">
              Heart, Mind <br /> <span className="font-serif italic font-light lowercase tracking-normal text-blue-800">&</span> Technology
>>>>>>> ea8f1f09c9f1ac471e309fcfe10ce17f76579369
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light"
            >
              We believe true transformation begins with people, not platforms. TheTAG Ventures & Partners is a founder-led collective helping bold leaders turn ideas into measurable, lasting impact.
            </motion.p>
          </div>
        </div>
      </section>

      {/* CORE METRICS STRIP */}
      <section className="py-20 border-y border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <Metric val="3" label="Founders with operating experience" />
            <Metric val="5" label="Practice areas under one methodology" />
            <Metric val="100%" label="Principal-led in every room" />
            <Metric val="0" label="Engagements without genuine belief" />
        </div>
      </section>

      {/* OUR SHAPE & PHILOSOPHY */}
      <section className="py-32 px-6 relative z-20">
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
      <section className="py-32 px-6 bg-zinc-100 dark:bg-zinc-900/40 relative z-20">
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

      {/* PARTNERS SECTION */}
      <section className="py-32 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div className="max-w-2xl">
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">The <br/><span className="text-blue-800">Architects</span></h2>
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
      <section className="py-32 px-6 bg-zinc-950 text-white overflow-hidden relative z-20">
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
                            loading="lazy"
                            decoding="async"
                            className="object-cover w-full h-full transition-all duration-500 md:opacity-40 md:grayscale md:group-hover:opacity-100 md:group-hover:grayscale-0" 
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
      <section className="py-40 px-6 text-center relative z-20">
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

/* ---------------------- SUB COMPONENTS ---------------------- */
const Metric = React.memo(({ val, label }: { val: string; label: string }) => (
    <div className="group">
        <div className="text-5xl font-black mb-2 text-zinc-900 dark:text-white">{val}</div>
        <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400 leading-tight max-w-[150px] mx-auto">{label}</div>
    </div>
));
Metric.displayName = "Metric";

const StoryMetric = React.memo(({ val, label }: { val: string; label: string }) => (
    <div className="p-6 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex justify-between items-center group hover:border-blue-800 transition-colors">
        <span className="text-3xl font-black text-blue-800">{val}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 text-right max-w-[120px]">{label}</span>
    </div>
));
StoryMetric.displayName = "StoryMetric";

const PhilosophyCard = React.memo(({ icon, title, text }: any) => (
    <div className="p-12 rounded-[3.5rem] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
        <div className="mb-8 transition-transform group-hover:scale-110 duration-500">{React.cloneElement(icon, { size: 36 })}</div>
        <h4 className="text-3xl font-bold mb-6">{title}</h4>
        <p className="text-zinc-500 leading-relaxed font-light text-sm">{text}</p>
    </div>
));
PhilosophyCard.displayName = "PhilosophyCard";

const FounderCard = ({ member }: { member: TeamMember }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="group">
        <div className="relative h-[480px] w-full overflow-hidden rounded-[3rem] mb-8 bg-zinc-200 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
            {member.imageUrl ? (
                <img 
                    src={member.imageUrl} 
                    alt={member.name} 
                    loading="lazy"
                    decoding="async"
                    className="object-cover w-full h-full transition-all duration-700 md:grayscale md:group-hover:grayscale-0 scale-105 group-hover:scale-100" 
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-400 italic">Visionary Portrait</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-10 flex flex-col justify-end">
                <p className="text-white text-sm font-light italic leading-relaxed mb-6">"{member.bio || "Crafting the strategic logic of digital excellence."}"</p>
                {member.linkedinUrl && (
                    <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md hover:bg-white hover:text-blue-900 transition-all">
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
FounderCard.displayName = "FounderCard";