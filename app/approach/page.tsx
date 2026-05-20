"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Share2, Terminal, Zap, Shield, Fingerprint, ChevronRight, 
  Plus, Minus, Mail, Calendar, Search
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------- 1. BIOMETRIC NEURAL FIELD ENGINE ---------------------- */
interface NeuralNode {
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

const HeroArchitecture = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodeCount = 110;
    const nodes: NeuralNode[] = [];
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };

    const generateNodes = (w: number, h: number) => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        const ratio = i / nodeCount;
        let bx = w * 0.5;
        let by = h * 0.5;
        let clusterType: "heart" | "mind" | "system" = "system";

        if (ratio < 0.35) {
          const angle = (ratio / 0.35) * Math.PI + Math.PI;
          bx += Math.cos(angle) * (w * 0.22) * (0.7 + Math.random() * 0.5);
          by += Math.sin(angle) * (h * 0.15) - (h * 0.05);
          clusterType = "mind";
        } else if (ratio < 0.75) {
          const t = ((ratio - 0.35) / 0.4) * Math.PI;
          bx += Math.sin(t) * Math.cos(t) * (w * 0.25);
          by += Math.sin(t) * (h * 0.25) + (h * 0.1);
          clusterType = "heart";
        } else {
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

    const renderField = () => {
      ctx.clearRect(0, 0, width, height);
      const isDarkMode = document.documentElement.classList.contains("dark");

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      const lineColor = isDarkMode ? "rgba(59, 130, 246, 0.04)" : "rgba(29, 78, 216, 0.03)";
      const activeLineColor = isDarkMode ? "rgba(96, 165, 250, 0.25)" : "rgba(37, 99, 235, 0.18)";
      const mindNodeColor = isDarkMode ? "#60a5fa" : "#2563eb";
      const heartNodeColor = isDarkMode ? "#f43f5e" : "#dc2626";

      nodes.forEach(node => {
        node.phase += node.speed;
        const floatX = Math.sin(node.phase) * 8;
        const floatY = Math.cos(node.phase * 1.3) * 8;

        let targetX = node.baseX + floatX;
        let targetY = node.baseY + floatY;

        const mDist = Math.hypot(mouse.x - targetX, mouse.y - targetY);
        if (mDist < 220) {
          const force = (220 - mDist) / 220;
          const angle = Math.atan2(targetY - mouse.y, targetX - mouse.x);
          targetX += Math.cos(angle) * force * 45;
          targetY += Math.sin(angle) * force * 45;
        }

        node.vx += (targetX - node.x) * 0.05;
        node.vy += (targetY - node.y) * 0.05;
        node.vx *= 0.82; 
        node.vy *= 0.82;

        node.x += node.vx;
        node.y += node.vy;
      });

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
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(renderField);
    };

    renderField();

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

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fcfcfc] dark:to-[#0a0a0a]" />
    </div>
  );
};

/* ---------------------- 2. TYPES ---------------------- */
interface CMSFaqItem {
  _id?: string;
  title: string;
  description: string;
  order?: number;
}

interface AestheticApproachProps {
  faqData?: CMSFaqItem[];
}

/* ---------------------- 3. MAIN COMPONENT ---------------------- */
export default function AestheticApproach({ faqData: initialFaqData = [] }: AestheticApproachProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [isHovered, setIsHovered] = useState(false);
  const [faqs, setFaqs] = useState<CMSFaqItem[]>(initialFaqData);
  const [loading, setLoading] = useState(initialFaqData.length === 0);

  // Client-side execution logic fetching your Studio data entries smoothly
  useEffect(() => {
    if (initialFaqData.length > 0) return;

    async function fetchFaqData() {
      try {
        // Dynamically import client to keep bundle optimization cleaner
        const { client } = await import("@/sanity/lib/client");
        const query = `*[_type == "processFaq"] | order(order asc)`;
        const result = await client.fetch(query);
        
        if (result && result.length > 0) {
          setFaqs(result);
        }
      } catch (error) {
        console.error("Failed to query data records from Sanity Studio:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFaqData();
  }, [initialFaqData]);

  const baseCards = [
    { icon: <Terminal size={24} />, t: "Edge Intelligence", d: "Sub-10ms response times via localized edge processing." },
    { icon: <Share2 size={24} />, t: "Mesh Connectivity", d: "Interconnected systems sharing state with zero drift." },
    { icon: <Fingerprint size={24} />, t: "Identity Core", d: "Privacy-first protocols built on zero-knowledge proofing." },
    { icon: <Shield size={24} />, t: "Secure Governance", d: "Automated compliance and ethical guardrails integrated." }
  ];

  const infiniteCards = [...baseCards, ...baseCards];

  const textVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.2 + i * 0.12, duration: 0.8, ease: "easeOut" as const }
    })
  };

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-blue-600 origin-left z-50" />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center select-none">
        <HeroArchitecture />
        <div className="relative z-10 space-y-12 max-w-5xl">
          <div className="space-y-6">
            <motion.h1 
              custom={0} variants={textVariants} initial="hidden" animate="visible"
              className="text-[12vw] md:text-8xl font-black tracking-tight leading-[0.85] uppercase text-zinc-900 dark:text-white"
            >
              Clarity & <br /> 
              <span className="text-blue-800 dark:text-blue-500 font-serif">measurable results</span>
            </motion.h1>
            <motion.p 
              custom={1} variants={textVariants} initial="hidden" animate="visible"
              className="max-w-xl mx-auto text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-light"
            >
              Our approach is built on diversity of thought and collective creativity. We believe the most powerful solutions emerge from the synergy of empathy, strategic intelligence, and purposeful technology.
            </motion.p>
          </div>
          <motion.div 
            custom={2} variants={textVariants} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-full overflow-hidden transition-all active:scale-95">
              <span className="relative z-10 flex items-center gap-2 font-medium">Start a Conversation <ArrowRight size={18} /></span>
              <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2 font-medium group">
                See Our Process <ChevronRight size={18} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOUNDATION SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-32 border-y border-zinc-100 dark:border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">Our Foundation</h3>
                <p className="text-3xl md:text-4xl font-light text-zinc-800 dark:text-zinc-200 leading-tight">
                    Every partnership follows a transparent, structured journey — from understanding your actual goals to leaving your team <span className="font-serif italic">fully empowered</span> to sustain the work.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <MetricCard val="4" label="Phases applied to every engagement — Listen, Plan, Build, Hand Off" />
                <MetricCard val="1pg" label="Written plan delivered by week 4 — scope, milestones, success criteria" />
                <MetricCard val="2wk" label="Shipping cadence during the Build phase — working demo every fortnight" />
                <MetricCard val="100%" label="Knowledge transferred at close — your team owns all artifacts" />
            </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          <div className="space-y-8 sticky top-32 h-fit">
            <h2 className="text-6xl font-black tracking-tighter uppercase">Vision <br/>& Mission</h2>
            <p className="text-xl text-zinc-500 font-light max-w-md">What we're building toward — and why. These statements govern every decision we make on your behalf.</p>
          </div>
          <div className="space-y-32">
            <div className="space-y-8">
                <div className="flex items-center gap-4 text-blue-600"><Zap size={40}/> <h4 className="text-3xl font-bold">Vision</h4></div>
                <p className="text-2xl font-serif italic font-light text-zinc-700 dark:text-zinc-300 leading-relaxed">"To lead the ethical revolution by uniting Heart, Mind, and Technology — empowering organizations to innovate responsibly, grow inclusively, and operate with genuine independence."</p>
            </div>
            <div className="space-y-8">
                <div className="flex items-center gap-4 text-blue-600"><Shield size={40}/> <h4 className="text-3xl font-bold">Mission</h4></div>
                <p className="text-2xl font-serif italic font-light text-zinc-700 dark:text-zinc-300 line-leading-relaxed">"We unite compassionate insight, agile strategic execution, and ethical innovation to turn ambition into validated, impactful outcomes through transparency and full knowledge transfer."</p>
            </div>
          </div>
        </div>
      </section>

      {/* FIRST INFINITE CAROUSEL SECTION */}
      <section className="relative z-10 py-24 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="node-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#2563eb" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#node-grid-pattern)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-20">
            <h3 className="text-4xl font-medium mb-6 uppercase tracking-tighter">Our Process Delivers Clarity</h3>
            <p className="text-zinc-400 text-lg font-light">Every partnership follows a transparent, structured journey.</p>
          </div>

          <div className="relative flex overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <motion.div 
              className="flex gap-6 pr-6"
              animate={{ x: isHovered ? undefined : ["0%", "-50%"] }}
              transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" } }}
            >
              {infiniteCards.map((card, i) => (
                <div key={i} className="w-[320px] md:w-[400px] flex-shrink-0 group p-10 border border-white/10 rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 hover:bg-zinc-900/80">
                  <div className="text-blue-500 mb-8 transition-transform duration-500 group-hover:scale-110">{card.icon}</div>
                  <h4 className="text-2xl font-bold mb-4">{card.t}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{card.d}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS QUESTIONS (FAQ) CMS MAPPED */}
      <section className="py-32 px-6 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Process Questions</h2>
            <p className="text-zinc-500 text-lg">How it works in practice. The most common questions about how TheTAG engagements actually run.</p>
          </div>
          <div className="space-y-4">
            {loading ? (
              <p className="text-zinc-400 text-sm italic animate-pulse">Checking Sanity dataset pipeline...</p>
            ) : faqs && faqs.length > 0 ? (
              faqs.map((faq, i) => (
                <FAQItem key={faq._id || i} question={faq.title} answer={faq.description} />
              ))
            ) : (
              <p className="text-zinc-400 text-sm italic">No FAQ items found. Populate data in your Sanity Studio CMS.</p>
            )}
          </div>
        </div>
      </section>

      {/* LET'S BUILD TOGETHER (CTA) */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">Let's Build <br/>Together.</h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light">Every partnership starts with an honest conversation. Tell us what you're trying to build.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CTACard icon={<Calendar />} title="Start Here" subtitle="Book a Discovery Call" desc="30 minutes — we listen to the actual problem and give you an honest read. No pitch decks." action="Book a call" />
            <CTACard icon={<Search />} title="Fast Track" subtitle="Request a Rapid Diagnostic" desc="Already know the domain? A 2–4 week scoped diagnostic produces a prioritized action plan." action="Request diagnostic" />
            <CTACard icon={<Mail />} title="Direct" subtitle="Email the Principals" desc="partners@th3tag.com — read by a founding principal, responded to within 48 hours." action="Send an email" highlight />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------- REUSABLE UI COMPONENTS ---------------------- */
const MetricCard = ({ val, label }: { val: string; label: string }) => (
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 hover:border-blue-500 transition-colors group">
        <div className="text-4xl font-black text-blue-600 mb-2">{val}</div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 leading-tight">{label}</p>
    </div>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-8 flex justify-between items-center text-left group">
        <span className="text-xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">{question}</span>
        <div className="flex-shrink-0 ml-4">{isOpen ? <Minus size={20} /> : <Plus size={20} />}</div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-8 text-zinc-500 text-lg leading-relaxed font-light">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CTACard = ({ icon, title, subtitle, desc, action, highlight }: any) => (
  <div className={`p-10 rounded-[3rem] border transition-all duration-500 flex flex-col h-full ${highlight ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-blue-500'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-8 ${highlight ? 'bg-white/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
      {React.cloneElement(icon, { size: 24, className: highlight ? "text-white" : "text-blue-600" })}
    </div>
    <div className="flex-grow">
      <span className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-blue-100' : 'text-blue-600'}`}>{title}</span>
      <h4 className="text-2xl font-bold mt-2 mb-4 leading-tight">{subtitle}</h4>
      <p className={`text-sm font-light leading-relaxed mb-8 ${highlight ? 'text-blue-50' : 'text-zinc-500'}`}>{desc}</p>
    </div>
    <button className={`flex items-center gap-2 text-xs font-black uppercase tracking-widest group ${highlight ? 'text-white' : 'text-blue-600'}`}>
      {action} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </button>
  </div>
);