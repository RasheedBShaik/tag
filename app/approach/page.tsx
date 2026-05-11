"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight, Share2, Terminal, Zap, Shield, Fingerprint, ChevronRight, 
  Cpu, Rocket, Paintbrush, Coffee, Heart, Plus, Minus, Mail, Calendar, Search
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------- 1. HERO ARCHITECTURE ---------------------- */
const HeroArchitecture = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const paths = svgRef.current?.querySelectorAll(".hero-path");
      const nodes = svgRef.current?.querySelectorAll(".hero-node");
      if (paths) {
        gsap.fromTo(paths,
          { strokeDasharray: 3000, strokeDashoffset: 3000, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: (i) => (i % 2 === 0 ? 0.4 : 0.1),
            duration: 2.5,
            stagger: { amount: 1.5, from: "start" },
            ease: "power4.inOut",
            onComplete: () => { gsap.set(paths, { clearProps: "strokeDasharray,strokeDashoffset" }); }
          }
        );
      }
      if (nodes) {
        gsap.fromTo(nodes,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, stagger: { amount: 1, from: "random" }, ease: "back.out(1.7)", delay: 1 }
        );
      }
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none pt-10 z-0 flex items-center justify-center">
      <svg ref={svgRef} viewBox="0 0 1000 1000" className="w-[120%] h-[120%] md:w-full md:h-full text-blue-900 dark:text-blue-500" fill="none" stroke="currentColor" strokeWidth="1">
        <g>
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 24;
            const x2 = (500 + 700 * Math.cos(angle)).toFixed(3);
            const y2 = (500 + 700 * Math.sin(angle)).toFixed(3);
            return <path key={`radial-${i}`} d={`M500,500 L${x2},${y2}`} className="hero-path opacity-20" strokeWidth="0.5" />;
          })}
        </g>
        <circle cx="500" cy="500" r="120" className="hero-path" strokeDasharray="4 8" />
        <circle cx="500" cy="500" r="280" className="hero-path opacity-10" />
        <circle cx="500" cy="500" r="420" className="hero-path opacity-30" strokeWidth="0.5" />
        {[120, 280, 420].map((r, ringIdx) =>
          Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 8;
            const cx = (500 + r * Math.cos(angle)).toFixed(3);
            const cy = (500 + r * Math.sin(angle)).toFixed(3);
            return <circle key={`node-${ringIdx}-${i}`} cx={cx} cy={cy} r={ringIdx === 0 ? 3 : 2} fill="currentColor" className="hero-node" />;
          })
        )}
        <rect x="440" y="440" width="120" height="120" className="hero-path" rx="2" strokeWidth="1.5" />
        <path d="M440,440 L400,400 M560,440 L600,400 M440,560 L400,600 M560,560 L600,600" className="hero-path opacity-40" />
      </svg>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#fcfcfc] dark:to-[#0a0a0a] opacity-80" />
    </div>
  );
};

/* ---------------------- 2. BLUEPRINT SVG ---------------------- */
const BlueprintSVG = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = svgRef.current?.querySelectorAll("path, circle, rect, polyline");
      if (targets && targets.length > 0) {
        gsap.fromTo(targets,
          { strokeDasharray: 1000, strokeDashoffset: 1000, opacity: 0 },
          {
            strokeDashoffset: 0, opacity: 1, duration: 1.5, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: svgRef.current, start: "top 90%", toggleActions: "play none none reverse" },
            onComplete: () => { gsap.set(targets, { clearProps: "strokeDasharray,strokeDashoffset" }); }
          }
        );
      }
    }, svgRef);
    return () => ctx.revert();
  }, []);
  return <svg ref={svgRef} viewBox="0 0 400 400" fill="none" stroke="currentColor" className={`text-blue-600/30 dark:text-blue-400/20 stroke-[1.5] ${className}`} style={{ overflow: 'visible' }}>{children}</svg>;
};

/* ---------------------- 3. MAIN COMPONENT ---------------------- */
export default function AestheticApproach() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSecondHovered, setIsSecondHovered] = useState(false);

  const baseCards = [
    { icon: <Terminal size={24} />, t: "Edge Intelligence", d: "Sub-10ms response times via localized edge processing." },
    { icon: <Share2 size={24} />, t: "Mesh Connectivity", d: "Interconnected systems sharing state with zero drift." },
    { icon: <Fingerprint size={24} />, t: "Identity Core", d: "Privacy-first protocols built on zero-knowledge proofing." },
    { icon: <Shield size={24} />, t: "Secure Governance", d: "Automated compliance and ethical guardrails integrated." }
  ];

  const specialtyCards = [
    { icon: <Cpu size={24} />, t: "Technology Advisory & Consulting", d: "Navigating digital complexity with architectural precision." },
    { icon: <Rocket size={24} />, t: "Strategic Ventures & Partnerships", d: "Scaling impact through high-alignment collaborative ecosystems." },
    { icon: <Paintbrush size={24} />, t: "Design Studio", d: "Crafting sensory-rich digital experiences and interfaces." },
    { icon: <Coffee size={24} />, t: "Culinary Arts & Culture", d: "Bridging the gap between modern tech and traditional craft." },
    { icon: <Heart size={24} />, t: "Health & Wellness", d: "Integrating data-driven insights into human-centric care." }
  ];

  const faqData = [
    { q: "What does the first conversation look like?", a: "We spend 30 minutes listening to the actual problem. We don't bring a pitch deck. We give you an honest read on fit, model, and timeline right then and there." },
    { q: "How are engagements priced?", a: "We use fixed-fee, milestone-based pricing. You know exactly what you are paying and what the deliverable is before we start. No open-ended hourly billing." },
    { q: "What if the plan needs to change mid-engagement?", a: "We maintain a shared decision log. If scope or direction needs to shift, we document the trade-offs in writing and both sides sign off before we proceed." },
    { q: "Can we stop partway through?", a: "Yes. Our milestone structure includes go/no-go checkpoints. If the project's structural reality changes, you can stop at any milestone with no further obligation." },
    { q: "Does this approach apply to all five practice areas?", a: "Absolutely. Whether it's Technology Advisory or Culinary Arts, the Heart-Mind-Technology sequence and the 4-phase delivery model remain constant." },
    { q: "What happens after the engagement closes?", a: "We provide 90 days of availability for questions at no extra cost. We ensure your team is fully independent, but we stay close enough to ensure a smooth transition." }
  ];

  const infiniteCards = [...baseCards, ...baseCards];
  const infiniteSpecialty = [...specialtyCards, ...specialtyCards];

  return (
    <div className="bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-x-hidden">
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-[2px] bg-blue-600 origin-left z-50" />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <HeroArchitecture />
        <div className="relative z-10 space-y-10 max-w-5xl">
          <div className="space-y-6">
            <h1 className="text-[10vw] md:text-8xl font-medium tracking-tight leading-[0.85]">
                Clarity, Collaboration, <br /> 
                <span className="font-serif italic font-light text-blue-600">and Measurable Results.</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg md:text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                Our approach is built on diversity of thought and collective creativity. We believe the most powerful solutions emerge from the synergy of empathy, strategic intelligence, and purposeful technology.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="group relative px-8 py-4 bg-blue-600 text-white rounded-full overflow-hidden transition-all active:scale-95">
              <span className="relative z-10 flex items-center gap-2 font-medium">Start a Conversation <ArrowRight size={18} /></span>
              <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="px-8 py-4 rounded-full border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors flex items-center gap-2 font-medium group">
                See Our Process <ChevronRight size={18} className="text-blue-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
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
                <p className="text-2xl font-serif italic font-light text-zinc-700 dark:text-zinc-300 leading-relaxed">"We unite compassionate insight, agile strategic execution, and ethical innovation to turn ambition into validated, impactful outcomes through transparency and full knowledge transfer."</p>
            </div>
          </div>
        </div>
      </section>

      {/* FIRST INFINITE CAROUSEL SECTION */}
      <section className="relative z-10 py-24 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
          <svg width="100%" height="100%">
            <pattern id="node-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#2563eb" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#node-grid)" />
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

      {/* SECOND INFINITE CAROUSEL SECTION (Specialties) */}
      <section className="relative z-10 py-24 bg-[#050505] text-white overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mb-20 text-right ml-auto">
            <h3 className="text-4xl font-medium mb-6 uppercase tracking-tighter">Multidisciplinary Verticals</h3>
            <p className="text-zinc-400 text-lg font-light">Our expertise extends across diverse industries and practice areas.</p>
          </div>

          <div className="relative flex overflow-hidden" onMouseEnter={() => setIsSecondHovered(true)} onMouseLeave={() => setIsSecondHovered(false)}>
            <motion.div 
              className="flex gap-6 pr-6"
              animate={{ x: isSecondHovered ? undefined : ["-50%", "0%"] }}
              transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
            >
              {infiniteSpecialty.map((card, i) => (
                <div key={i} className="w-[320px] md:w-[400px] flex-shrink-0 group p-10 border border-white/5 rounded-[2.5rem] bg-zinc-900/30 backdrop-blur-xl transition-all duration-500 hover:border-zinc-500/50">
                  <div className="text-zinc-400 mb-8 group-hover:text-white transition-all">{card.icon}</div>
                  <h4 className="text-2xl font-bold mb-4">{card.t}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">{card.d}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS QUESTIONS (FAQ) */}
      <section className="py-32 px-6 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">Process Questions</h2>
            <p className="text-zinc-500 text-lg">How it works in practice. The most common questions about how TheTAG engagements actually run.</p>
          </div>
          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
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
            <CTACard icon={<Calendar className="text-blue-600" />} title="Start Here" subtitle="Book a Discovery Call" desc="30 minutes — we listen to the actual problem and give you an honest read. No pitch decks." action="Book a call" />
            <CTACard icon={<Search className="text-blue-600" />} title="Fast Track" subtitle="Request a Rapid Diagnostic" desc="Already know the domain? A 2–4 week scoped diagnostic produces a prioritized action plan." action="Request diagnostic" />
            <CTACard icon={<Mail className="text-blue-600" />} title="Direct" subtitle="Email the Principals" desc="partners@th3tag.com — read by a founding principal, responded to within 48 hours." action="Send an email" highlight />
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-zinc-100 dark:border-zinc-900 text-center">
          <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">© 2026 TheTAG Ventures & Partners · partners@th3tag.com</p>
      </footer>
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