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
  ChevronRight,
  Sparkles,
  Layers,
  Fingerprint
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

interface ContentBlock {
  name: string;      // Actively mapping as Section Title
  role?: string;     // Actively mapping as Section Subtitle
  bio?: string;      // Actively mapping as Paragraph text Content
  contentIdentifier: "origin" | "conviction" | "structure" | "proof" | "standard";
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

export default function WhoWeArePage() {
  const [visionaries, setVisionaries] = useState<TeamMember[]>([]);
  const [techTeam, setTechTeam] = useState<TeamMember[]>([]);
  const [cmsContent, setCmsContent] = useState<Record<string, ContentBlock>>({});
  const [loading, setLoading] = useState(true);

  const carouselRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [constraints, setConstraints] = useState({ right: 0, left: 0 });

  const [isRevealed, setIsRevealed] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setIsRevealed(true);
    setRevealProgress(150);
  }, []);

  // Sanity Complex Data Handlers
  useEffect(() => {
    const fetchWhoWeAreData = async () => {
      try {
        setLoading(true);
        const query = `*[_type == "team"] | order(order desc) {
          documentType,
          name, role, bio, category, contentIdentifier,
          "imageUrl": image.asset->url,
          linkedinUrl
        }`;
        const data: any[] = await client.fetch(query, {}, { cache: 'no-store' });

        if (data) {
          // 1. Separate Team Profiles
          const members = data.filter(item => item.documentType === "member" || !item.documentType);
          const cleanFilter = (cat: string) => members.filter(m =>
            m.category?.toLowerCase().trim().includes(cat.toLowerCase())
          );
          setVisionaries(cleanFilter("visionary"));
          setTechTeam(cleanFilter("technical"));

          // 2. Parse Extra Text Narrative Editorial Blocks
          const textBlocks = data.filter(item => item.documentType === "contentBlock");
          const contentMap: Record<string, ContentBlock> = {};
          textBlocks.forEach((block) => {
            if (block.contentIdentifier) {
              contentMap[block.contentIdentifier] = block;
            }
          });
          setCmsContent(contentMap);
        }
      } catch (err) {
        console.error("Sanity connection error inside WhoWeAre layout configuration:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWhoWeAreData();
  }, []);

  // Biometric Neural Matrix Canvas System
  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodeCount = 110; 
    const nodes: Node[] = [];
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
          x: bx, y: by, baseX: bx, baseY: by,
          vx: 0, vy: 0,
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
      setRevealProgress(150);
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000; mouse.targetY = -1000;
      mouse.active = false;
      setRevealProgress(150);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const drawMap = () => {
      ctx.clearRect(0, 0, width, height);
      const isDarkMode = document.documentElement.classList.contains("dark");

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      } else {
        mouse.x = -1000; mouse.y = -1000;
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
        node.vx *= 0.82; node.vy *= 0.82;
        node.x += node.vx; node.y += node.vy;
      });

      ctx.lineWidth = 0.9;
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const n1 = nodes[i]; const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          const maxDist = n1.cluster === "system" || n2.cluster === "system" ? 90 : 150;

          if (dist < maxDist) {
            const isNearMouse1 = Math.hypot(mouse.x - n1.x, mouse.y - n1.y) < 180;
            const isNearMouse2 = Math.hypot(mouse.x - n2.x, mouse.y - n2.y) < 180;
            ctx.strokeStyle = (isNearMouse1 || isNearMouse2) ? activeLineColor : lineColor;
            ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y); ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        ctx.beginPath(); ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        const isNearCursor = Math.hypot(mouse.x - node.x, mouse.y - node.y) < 180;
        if (isNearCursor) {
          ctx.fillStyle = node.cluster === "heart" ? heartNodeColor : mindNodeColor;
          ctx.shadowBlur = 12; ctx.shadowColor = ctx.fillStyle;
        } else {
          ctx.fillStyle = isDarkMode ? "rgba(255, 255, 255, 0.22)" : "rgba(10, 10, 10, 0.15)";
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(drawMap);
    };

    drawMap();

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

  // Fallback structural text arrays when Sanity data is loading or fields are blank
  const defaultBlocks = {
    origin: {
      name: "The Origin",
      bio: "We started TheTAG because we kept seeing the same failures. Technology built without empathy. Strategies that looked right on a slide deck and failed on contact with the actual user. Engagements designed to create continued dependency rather than capability."
    },
    conviction: {
      name: "The Conviction",
      role: "Technology must serve the human",
      bio: "Not the vendor relationship, not the architecture preference, not the consultant's retainer model."
    },
    structure: {
      name: "The Structure",
      role: "Small, principal-led, by design",
      bio: "Five practices. Three principals. Deliberately small. Knowledge transfer from day one."
    },
    proof: {
      name: "The Proof",
      role: "We apply the methodology to ourselves",
      bio: "The Well-being First AI Companion: built internally, using our own framework, on a problem we believe matters."
    },
    standard: {
      name: "The Standard",
      role: "Engineering Digital Sovereignty",
      bio: "Every partner leaves with ownership, independence, and a team that can run what we built together."
    }
  };

  const getBlock = (id: keyof typeof defaultBlocks) => {
    return cmsContent[id] || defaultBlocks[id];
  };

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 overflow-x-hidden min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-blue-800 origin-left z-50" />

      {/* CANVAS HERO LAYER */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center px-6 overflow-hidden z-10">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fcfcfc] dark:to-[#0a0a0a] pointer-events-none z-0" />

        <motion.div 
          animate={{ clipPath: `circle(${revealProgress}% at 50% 50%)` }}
          transition={{ type: "spring", stiffness: 45, damping: 20 }}
          className="relative z-10 max-w-6xl mx-auto space-y-12 text-center select-none mix-blend-normal [clip-path:circle(0%_at_50%_50%)]"
        >
          <motion.div initial={{ opacity: 0, y: -15 }} animate={isRevealed ? { opacity: 1, y: 0 } : {}} className="flex justify-center">
            <span className="px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-950/20 text-blue-800 dark:text-blue-400 text-[10px] uppercase tracking-[0.4em] font-black backdrop-blur-sm">
              Heart · Mind · Technology
            </span>
          </motion.div>
          
          <div className="space-y-6">
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={isRevealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 }} className="text-[12vw] md:text-8xl font-black tracking-tight leading-[0.85] uppercase">
              Heart, Mind <br /> <span className="font-serif italic font-light lowercase tracking-normal text-blue-800">&</span> Technology
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 15 }} animate={isRevealed ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35 }} className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
              We believe true transformation begins with people, not platforms. TheTAG Ventures & Partners is a founder-led collective helping bold leaders turn ideas into measurable, lasting impact.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* EDITORIAL NARRATIVE LAYER (THE ORIGIN - DYNAMIC SECTION) */}
      <section className="py-32 px-6 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/30 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-baseline">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-blue-800 font-bold block mb-3">01 // Foundation</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                {getBlock("origin").name}
              </h2>
            </div>
            <div className="lg:col-span-2 space-y-6 text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              <p className="font-serif italic text-2xl text-zinc-800 dark:text-zinc-200">
                "{getBlock("origin").bio?.split('.')[0]}."
              </p>
              <p className="text-base text-zinc-500">
                {getBlock("origin").bio?.split('.').slice(1).join('.')}
              </p>
              <p className="text-sm font-light text-zinc-400 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                We also build. The Well-being First AI Companion — TheTAG's own venture — is our proof of work: the same Heart · Mind · Technology framework applied to our own hardest problem. Builder-advisors, not advisors who used to build.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC CONVICTION GRID (CMS DRIVEN EXTRA SECTIONS) */}
      <section className="py-24 px-6 bg-zinc-50 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 flex flex-col justify-between space-y-8">
              <div>
                <div className="w-8 h-8 rounded-full bg-red-500/10 dark:bg-red-500/5 flex items-center justify-center text-red-500 mb-6"><Heart size={16}/></div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">{getBlock("conviction").name}</span>
                <h4 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white leading-snug">{getBlock("conviction").role}</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">{getBlock("conviction").bio}</p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 flex flex-col justify-between space-y-8">
              <div>
                <div className="w-8 h-8 rounded-full bg-blue-500/10 dark:bg-blue-500/5 flex items-center justify-center text-blue-500 mb-6"><Fingerprint size={16}/></div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">{getBlock("structure").name}</span>
                <h4 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white leading-snug">{getBlock("structure").role}</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">{getBlock("structure").bio}</p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 flex flex-col justify-between space-y-8">
              <div>
                <div className="w-8 h-8 rounded-full bg-yellow-500/10 dark:bg-yellow-500/5 flex items-center justify-center text-yellow-500 mb-6"><Sparkles size={16}/></div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">{getBlock("proof").name}</span>
                <h4 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white leading-snug">{getBlock("proof").role}</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">{getBlock("proof").bio}</p>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800 flex flex-col justify-between space-y-8">
              <div>
                <div className="w-8 h-8 rounded-full bg-green-500/10 dark:bg-green-500/5 flex items-center justify-center text-green-500 mb-6"><Layers size={16}/></div>
                <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 block mb-1">{getBlock("standard").name}</span>
                <h4 className="text-lg font-bold tracking-tight text-zinc-950 dark:text-white leading-snug">{getBlock("standard").role}</h4>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">{getBlock("standard").bio}</p>
            </div>

          </div>
        </div>
      </section>

      {/* CORE VISIONARY ARCHITECTS */}
      <section className="py-32 px-6 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-20">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-blue-800 font-bold block mb-2">02 // Leadership</span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">The <br/><span className="text-blue-800">Architects</span></h2>
              <p className="mt-6 text-xl text-zinc-500 font-light italic font-serif">Practice-led engagements. No exceptions.</p>
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
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 font-bold block mb-2">03 // Implementation</span>
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

      {/* FOOTER CALL TO ACTION */}
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

/* ---------------------- REMAINING COMPONENTS ---------------------- */
const FounderCard = ({ member }: { member: TeamMember }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} className="group">
    <div className="relative h-[480px] w-full overflow-hidden rounded-[3rem] mb-8 bg-zinc-200 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
      {member.imageUrl ? (
        <img 
          src={member.imageUrl} 
          alt={member.name} 
          loading="lazy"
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