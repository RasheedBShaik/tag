"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Share2, Terminal, Zap, Shield, Fingerprint, ChevronRight, 
  Plus, Minus, Mail, Calendar, Search, Activity, Compass, Target, HelpCircle
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------- DATA TYPING SCHEMAS ---------------------- */
interface MetricItem {
  value: string;
  label: string;
  description: string;
}

interface PillarItem {
  title: string;
  subtitle: string;
  description: string;
}

interface PrincipleItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

interface ApproachCMSData {
  heroTitle: string;
  heroTitleItalic: string;
  heroDescription: string;
  digitalSovereigntyBody: string;
  foundationDescription: string;
  metrics: MetricItem[];
  visionTitleBlock: string;
  visionText: string;
  missionTitleBlock: string;
  missionText: string;
  pillars: PillarItem[];
  principles: PrincipleItem[];
}

/* ---------------------- BIOMETRIC INTERACTIVE CANVASES ---------------------- */
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

const HeroBiometricArchitecture = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const nodeCount = 115;
    const nodes: NeuralNode[] = [];
    const mouse = { x: -1000, y: -1000, tx: -1000, ty: -1000, active: false };

    // Decays smoothly from 1.0 down to 0 on entry to drive canvas node shadows
    let introSurgeFactor = 1.0;

    const initNodes = (width: number, height: number) => {
      nodes.length = 0;
      for (let i = 0; i < nodeCount; i++) {
        const ratio = i / nodeCount;
        let bx = width * 0.5;
        let by = height * 0.5;
        let cType: "heart" | "mind" | "system" = "system";

        if (ratio < 0.35) {
          const angle = (ratio / 0.35) * Math.PI + Math.PI;
          bx += Math.cos(angle) * (width * 0.22) * (0.7 + Math.random() * 0.5);
          by += Math.sin(angle) * (height * 0.15) - (height * 0.05);
          cType = "mind";
        } else if (ratio < 0.75) {
          const t = ((ratio - 0.35) / 0.4) * Math.PI;
          bx += Math.sin(t) * Math.cos(t) * (width * 0.25);
          by += Math.sin(t) * (height * 0.25) + (height * 0.1);
          cType = "heart";
        } else {
          bx += (Math.random() - 0.5) * (width * 0.78);
          by += (Math.random() - 0.5) * (height * 0.78);
        }

        nodes.push({
          x: bx, y: by, baseX: bx, baseY: by, vx: 0, vy: 0,
          phase: Math.random() * Math.PI * 2,
          speed: 0.007 + Math.random() * 0.012,
          radius: 1.8 + Math.random() * 3,
          cluster: cType
        });
      }
    };

    initNodes(w, h);

    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.tx = -1000; mouse.ty = -1000; mouse.active = false;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.body.addEventListener("mouseleave", onMouseLeave, { passive: true });

    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.classList.contains("dark");

      // Diminish initial charge step-by-step frame parameters
      if (introSurgeFactor > 0) {
        introSurgeFactor -= 0.008;
        if (introSurgeFactor < 0) introSurgeFactor = 0;
      }

      if (mouse.active) {
        mouse.x += (mouse.tx - mouse.x) * 0.1;
        mouse.y += (mouse.ty - mouse.y) * 0.1;
      } else {
        mouse.x = -1000; mouse.y = -1000;
      }

      const lColor = dark ? "rgba(59, 130, 246, 0.04)" : "rgba(29, 78, 216, 0.03)";
      const actLColor = dark ? "rgba(96, 165, 250, 0.22)" : "rgba(37, 99, 235, 0.15)";

      nodes.forEach(n => {
        n.phase += n.speed;
        let tx = n.baseX + Math.sin(n.phase) * 8;
        let ty = n.baseY + Math.cos(n.phase * 1.2) * 8;

        const d = Math.hypot(mouse.x - tx, mouse.y - ty);
        if (d < 200) {
          const f = (200 - d) / 200;
          const a = Math.atan2(ty - mouse.y, tx - mouse.x);
          tx += Math.cos(a) * f * 40;
          ty += Math.sin(a) * f * 40;
        }

        n.vx += (tx - n.x) * 0.05; n.vy += (ty - n.y) * 0.05;
        n.vx *= 0.82; n.vy *= 0.82;
        n.x += n.vx; n.y += n.vy;
      });

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const n1 = nodes[i]; const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          const max = n1.cluster === "system" || n2.cluster === "system" ? 95 : 150;

          if (dist < max) {
            const near1 = Math.hypot(mouse.x - n1.x, mouse.y - n1.y) < 170;
            const near2 = Math.hypot(mouse.x - n2.x, mouse.y - n2.y) < 170;
            
            if (near1 || near2 || introSurgeFactor > 0.1) {
              const weight = introSurgeFactor > 0 ? Math.max(introSurgeFactor * 0.25, 0.15) : 0.15;
              ctx.strokeStyle = dark ? `rgba(96, 165, 250, ${weight})` : `rgba(37, 99, 235, ${weight})`;
            } else {
              ctx.strokeStyle = lColor;
            }
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y); ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        ctx.beginPath(); 
        const near = Math.hypot(mouse.x - n.x, mouse.y - n.y) < 170;
        const activeSurge = introSurgeFactor > 0.05;

        if (near || activeSurge) {
          const intensity = activeSurge ? introSurgeFactor : 1;
          ctx.shadowBlur = activeSurge ? 20 * introSurgeFactor : 12;
          ctx.shadowColor = n.cluster === "heart" ? `rgba(244, 63, 94, ${intensity})` : `rgba(37, 99, 235, ${intensity})`;
          ctx.arc(n.x, n.y, n.radius * (activeSurge ? 1 + introSurgeFactor * 0.4 : 1), 0, Math.PI * 2);
          ctx.fillStyle = n.cluster === "heart" ? "#f43f5e" : "#2563eb";
        } else {
          ctx.shadowBlur = 0;
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = dark ? "rgba(255,255,255,0.2)" : "rgba(10,10,10,0.12)";
        }
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(loop);
    };

    loop();

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      initNodes(w, h);
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic light pulse background spot - expands smoothly without resizing layout boxes */}
      <motion.div 
        initial={{ opacity: 0.7, scale: 0.7 }}
        animate={{ opacity: 0.14, scale: 1.05 }}
        transition={{ duration: 2.0, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-blue-600 to-rose-500 blur-[140px] dark:opacity-20"
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-85" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#fcfcfc] dark:to-[#0a0a0a]" />
    </div>
  );
};

/* ---------------------- MAIN PAGE CONTAINER ---------------------- */
export default function OurApproachPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 35 });
  
  const [isHovered, setIsHovered] = useState(false);
  const [cmsData, setCmsData] = useState<ApproachCMSData | null>(null);

  const copyFallback: ApproachCMSData = {
    heroTitle: "Clarity. Collaboration.",
    heroTitleItalic: "Measurable results.",
    heroDescription: "We believe transformation only holds when the humans inside an organization genuinely own it. Every decision we make — on methodology, scope, staffing, and technology — traces back to that conviction.",
    digitalSovereigntyBody: "Digital Sovereignty is not a technology feature. It is the organizational right to make independent decisions — free from coercive vendor relationships, algorithmic opacity, and proprietary lock-in. We design every engagement around it.",
    foundationDescription: "Every partnership follows a transparent, structured journey — from understanding your actual goals to leaving your team fully empowered to sustain the work.",
    metrics: [
      { value: "1", label: "The Framework", description: "Governing framework — Heart, Mind, Technology — in that order" },
      { value: "0", label: "Independence", description: "New dependencies created in any engagement we run" },
      { value: "100%", label: "Clarity Standard", description: "Outcomes agreed in writing before work begins" },
      { value: "Always", label: "Honest", description: "Counsel always — including when we're not the right fit" }
    ],
    visionTitleBlock: "A world where technology serves human flourishing.",
    visionText: "We believe technology is most powerful when it amplifies what humans do best — creativity, empathy, judgment, and community — rather than replacing or obscuring it. The organizations that will lead in the next decade are those who understand this and build accordingly. Our role is to help build those organizations.",
    missionTitleBlock: "Help organizations build genuine independence.",
    missionText: "Not managed dependence. Not annual retainer dependence. Genuine capability — where your team can run the strategy, maintain the systems, and make the decisions without us. This is harder and slower than the conventional consulting model. It is also the only model we find worth pursuing.",
    pillars: [
      { title: "Our North Star", subtitle: "Vision", description: "A world where technology serves human flourishing — not the other way around" },
      { title: "Why We Exist", subtitle: "Mission", description: "Help organizations build the capability to be genuinely independent of their advisors" },
      { title: "How We Get There", subtitle: "Method", description: "Heart · Mind · Technology — applied in sequence, no shortcuts" },
      { title: "The Measure", subtitle: "Standard", description: "Engineering Digital Sovereignty — measurable, auditable, and genuinely yours" },
      { title: "We Practice It", subtitle: "Proof", description: "The Well-being First AI Companion — our own methodology, applied to our own hardest problem" }
    ],
    principles: [
      { number: "01", title: "People before platforms", subtitle: "Empathy is not a soft skill", description: "Every technology decision is a human decision first. We start every engagement — regardless of domain — by understanding the people who will live inside what we build." },
      { number: "02", title: "Clarity over comprehensiveness", subtitle: "A clear plan beats a complete one", description: "We would rather deliver a focused strategy with explicit trade-offs than a comprehensive document that attempts to cover every scenario and commits to none of them." },
      { number: "03", title: "Sovereignty by design", subtitle: "Independence is an architectural decision", description: "Digital sovereignty is not added at the end. It is designed in from the first architecture decision — data residency, vendor selection, and API design all follow from this commitment." },
      { number: "04", title: "Outcomes over outputs", subtitle: "Deliverables are a means, not an end", description: "We agree on what success looks like before we start — in writing — and report against it honestly. A beautiful deliverable that doesn't move the metric is a failed engagement." },
      { number: "05", title: "Honest counsel", subtitle: "Including when it's uncomfortable", description: "We will tell you when an idea isn't ready, a vendor is wrong for you, or an engagement should end early. Commercial pressure to say yes is the enemy of good work." },
      { number: "06", title: "Builders and advisors", subtitle: "We practice what we preach", description: "We are actively building the Well-being First AI Companion. When we advise on AI governance, we are solving that problem in our own codebase. Theory and practice are inseparable for us." }
    ]
  };

  useEffect(() => {
    async function streamSanity() {
      try {
        const { client } = await import("@/sanity/lib/client");
        const query = `*[_type == "ourApproach"][0] {
          heroTitle,
          heroTitleItalic,
          heroDescription,
          digitalSovereigntyBody,
          foundationDescription,
          metrics[] { value, label, description },
          visionTitleBlock,
          visionText,
          missionTitleBlock,
          missionText,
          pillars[] { title, subtitle, description },
          principles[] { number, title, subtitle, description }
        }`;
        const data = await client.fetch(query);
        if (data) setCmsData(data);
      } catch (e) {
        console.warn("Using built-in copy content blocks. Pipeline link inactive.", e);
      }
    }
    streamSanity();
  }, []);

  const data = cmsData || copyFallback;

  const coreIcons = [
    <Compass className="text-blue-500" size={22} key="c1" />,
    <Target className="text-blue-500" size={22} key="c2" />,
    <Activity className="text-blue-500" size={22} key="c3" />,
    <Shield className="text-blue-500" size={22} key="c4" />,
    <Terminal className="text-blue-500" size={22} key="c5" />
  ];

  const principleIcons = [
    <Fingerprint size={24} key="p1" />, <Terminal size={24} key="p2" />, 
    <Shield size={24} key="p3" />, <Share2 size={24} key="p4" />,
    <Zap size={24} key="p5" />, <Activity size={24} key="p6" />
  ];

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden antialiased">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-blue-600 origin-left z-50" />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
        <HeroBiometricArchitecture />
        
        {/* Dynamic page introduction load wrapper */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(8px)", y: 15 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 space-y-10 max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            <span className="text-xs font-mono font-bold tracking-[0.4em] uppercase text-blue-600 block">
              Our Approach
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[0.95] uppercase text-zinc-900 dark:text-white">
              {data.heroTitle} <br />
              <span className="text-blue-600 dark:text-blue-500 font-serif normal-case font-normal block mt-1">
                {data.heroTitleItalic}
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
              {data.heroDescription}
            </p>
          </div>

          {/* Principle block with coordinated transient lighting wave */}
          <motion.div 
            initial={{ boxShadow: "0 0 0px rgba(37,99,235,0)" }}
            animate={{ 
              boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 45px rgba(37,99,235,0.18)", "0 0 0px rgba(37,99,235,0)"]
            }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.4 }}
            className="max-w-3xl mx-auto p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md text-left"
          >
            <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-2">The Principle</p>
            <p className="text-sm md:text-base font-light text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {data.digitalSovereigntyBody}
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="group relative px-7 py-3.5 bg-blue-600 text-white rounded-full overflow-hidden transition-all active:scale-95 text-sm font-medium">
              <span className="relative z-10 flex items-center gap-2">See How We Work <ArrowRight size={16} /></span>
              <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-7 py-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-colors text-sm font-medium">
              Start a conversation &rarr;
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- FRAMEWORK GRID & METRICS --- */}
      <section className="mx-auto max-w-7xl px-6 py-28 border-y border-zinc-100 dark:border-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-28">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">Our Foundation</h3>
            <p className="text-xl md:text-3xl font-light text-zinc-800 dark:text-zinc-200 leading-tight">
              {data.foundationDescription}
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.metrics?.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/80 group">
                <div className="text-3xl font-black text-blue-600 mb-1">{item.value}</div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-100 mb-1">{item.label}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HORIZONTAL STEPPER TIMELINE BLOCK --- */}
      {data.pillars && data.pillars.length > 0 && (
        <section className="py-24 border-b border-zinc-100 dark:border-zinc-900 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {data.pillars.map((pillar, index) => (
              <div key={index} className="p-6 border-l-2 border-zinc-200 dark:border-zinc-800 hover:border-blue-500 transition-colors space-y-3">
                <div className="flex items-center gap-2">
                  {coreIcons[index % coreIcons.length]}
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">{pillar.subtitle}</span>
                </div>
                <h5 className="font-bold text-sm tracking-tight">{pillar.title}</h5>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- VISION & MISSION PARAGRAPHS --- */}
      <section className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28 h-fit">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">Vision <br/>& Mission</h2>
            <div className="h-1 w-12 bg-blue-600 rounded-full" />
            <p className="text-sm text-zinc-500 font-light">What we believe and why we exist.</p>
          </div>
          <div className="lg:col-span-8 space-y-20">
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 block">Vision</span>
              <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{data.visionTitleBlock}</h4>
              <p className="text-base md:text-lg font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {data.visionText}
              </p>
            </div>
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 block">Mission</span>
              <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{data.missionTitleBlock}</h4>
              <p className="text-base md:text-lg font-light text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {data.missionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- INFINITE RUNLOOP GUIDING PRINCIPLES SLIDER --- */}
      {data.principles && data.principles.length > 0 && (
        <section className="relative z-10 py-24 bg-zinc-950 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="approach-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#2563eb" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#approach-grid)" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-2xl mb-16 space-y-2">
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-blue-500 font-bold block">Guiding Principles</span>
              <h3 className="text-3xl md:text-4xl font-medium uppercase tracking-tighter">What shapes every decision we make</h3>
            </div>

            <div className="relative flex overflow-hidden" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
              <motion.div 
                className="flex gap-6 pr-6"
                animate={{ x: isHovered ? undefined : ["0%", "-50%"] }}
                transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 32, ease: "linear" } }}
              >
                {[...data.principles, ...data.principles].map((card, i) => (
                  <div key={i} className="w-[300px] md:w-[380px] flex-shrink-0 group p-8 border border-white/10 rounded-[2rem] bg-zinc-900/40 backdrop-blur-md transition-all duration-500 hover:border-blue-500/40 hover:bg-zinc-900/80">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-blue-500 transition-transform duration-500 group-hover:scale-110">
                        {principleIcons[i % data.principles.length]}
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {card.number}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-1 tracking-tight text-white">{card.title}</h4>
                    <p className="text-blue-400 text-xs tracking-wide uppercase font-semibold mb-3">{card.subtitle}</p>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-light">{card.description}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* --- START THE JOURNEY / CTA CARDS SECTION --- */}
      <section className="py-32 px-6 bg-zinc-50 dark:bg-zinc-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16 space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-blue-600 font-bold block">Start the Journey</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Ready to put the approach into practice?</h2>
            <p className="text-sm md:text-base text-zinc-500 font-light">The first conversation is free. We read every inbound personally and respond within 48 hours.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CTALinkCard icon={<Compass />} title="Go Deeper" subtitle="How We Work" desc="The four-phase methodology, five engagement models, and every standard we commit to." action="Read the methodology →" />
            <CTALinkCard icon={<HelpCircle />} title="Meet the Team" subtitle="Who We Are" desc="The three founding principals and the story behind the firm." action="Meet the founders →" />
            <CTALinkCard icon={<Mail />} title="Ready to Begin" subtitle="Start a Conversation" desc="partners@th3tag.com — 48h response, no intake form." action="Start a conversation →" highlight />
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------- SUB MODULE VISUAL UTILITIES ---------------------- */
const CTALinkCard = ({ icon, title, subtitle, desc, action, highlight }: any) => (
  <div className={`p-8 rounded-[2rem] border transition-all duration-500 flex flex-col justify-between ${highlight ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:border-blue-500'}`}>
    <div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-6 ${highlight ? 'bg-white/20' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <span className={`text-[9px] font-mono tracking-widest uppercase ${highlight ? 'text-blue-200' : 'text-zinc-400'}`}>{title}</span>
      <h4 className="text-xl font-bold mt-1 mb-3 tracking-tight">{subtitle}</h4>
      <p className={`text-xs md:text-sm font-light leading-relaxed mb-6 ${highlight ? 'text-blue-50' : 'text-zinc-500'}`}>{desc}</p>
    </div>
    <button className={`text-xs font-bold tracking-wider uppercase flex items-center gap-1 group w-fit ${highlight ? 'text-white' : 'text-blue-600'}`}>
      {action}
    </button>
  </div>
);