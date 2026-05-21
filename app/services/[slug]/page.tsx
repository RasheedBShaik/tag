"use client";

import React, { use, useMemo, useState, useEffect, useRef, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2, Shield, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { type ServiceContent, iconMap } from "./types";

/* ===========================
    1. GPU ACCELERATED ENGINE (Shader-Based)
   =========================== */
const BackgroundEngine = memo(({ color }: { color: string }) => {
  const { viewport } = useThree();
  const count = 140;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color).multiplyScalar(1.8) },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uViewport: { value: new THREE.Vector2(viewport.width, viewport.height) }
  }), [color, viewport]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.set(state.mouse.x, state.mouse.y);
  });

  const [offsets, speeds] = useMemo(() => {
    const off = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      off[i * 3] = (Math.random() - 0.5) * 44;
      off[i * 3 + 1] = (Math.random() - 0.5) * 24;
      off[i * 3 + 2] = (Math.random() - 0.5) * 6;
      spd[i] = 0.3 + Math.random() * 0.7;
    }
    return [off, spd];
  }, [count]);

  return (
    <instancedMesh args={[undefined, undefined, count]} frustumCulled={false}>
      <circleGeometry args={[1, 16]}>
        <instancedBufferAttribute attach="attributes-aOffset" args={[offsets, 3]} />
        <instancedBufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </circleGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec2 uViewport;
          attribute vec3 aOffset;
          attribute float aSpeed;
          
          void main() {
            vUv = uv;
            vec3 pos = aOffset;
            float t = uTime * aSpeed * 0.25;
            pos.x += cos(t + aOffset.y) * 2.5;
            pos.y += sin(t + aOffset.x) * 2.5;
            vec2 mouseWorld = uMouse * uViewport.xy * 0.5;
            float dist = distance(pos.xy, mouseWorld);
            if(dist < 14.0) {
              pos.xy += normalize(pos.xy - mouseWorld) * (1.0 - dist/14.0) * 1.8;
            }
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            float pulse = 1.0 + sin(uTime * 3.5 + aOffset.z) * 0.35;
            mvPosition.xyz += position * pulse * 0.14; 
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform vec3 uColor;
          void main() {
            float d = length(vUv - 0.5);
            if (d > 0.5) discard;
            float alpha = smoothstep(0.5, 0.1, d);
            gl_FragColor = vec4(uColor, alpha * 0.55);
          }
        `}
      />
    </instancedMesh>
  );
});

BackgroundEngine.displayName = "BackgroundEngine";

/* ===========================
    2. MAIN COMPONENT SYSTEM
   =========================== */
export default function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [data, setData] = useState<ServiceContent | null>(null);
  const [fetching, setFetching] = useState(true);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  
  // Carousel Tracking State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchService() {
      try {
        setFetching(true);
        const query = `*[_type == "service" && slug.current == $slug][0] {
          _id, id, title, description, iconName,
          portfolioTiers[] { label, name, subtitle, summary, benchmarks },
          valuePillars[] { index, headline, subline, body },
          processTimeline[] { stepNumber, frameworkNode, durationWindow, title, narrative },
          caseStudies[] { vertical, transformType, headline, problemDescription, resolutionDescription, impactMetrics, activeNodes },
          faqCollection[] { question, answer },
          theme { primary, secondary, accent, glow, glass }
        }`;
        
        const res = await client.fetch(query, { slug }, { cache: "no-store" });
        if (res) setData(res);
      } catch (err) {
        console.error("Sanity engine content extraction error:", err);
      } finally {
        setFetching(false);
      }
    }
    fetchService();
  }, [slug]);

  // Carousel Navigation Operators
  const handleCarouselStep = (direction: "prev" | "next") => {
    if (!data?.caseStudies) return;
    const maxIdx = data.caseStudies.length - 1;
    if (direction === "prev") {
      setCarouselIndex((prev) => (prev === 0 ? maxIdx : prev - 1));
    } else {
      setCarouselIndex((prev) => (prev === maxIdx ? 0 : prev + 1));
    }
  };

  useEffect(() => {
    if (carouselContainerRef.current) {
      const cardNode = carouselContainerRef.current.children[carouselIndex] as HTMLElement;
      if (cardNode) {
        carouselContainerRef.current.scrollTo({
          left: cardNode.offsetLeft,
          behavior: "smooth"
        });
      }
    }
  }, [carouselIndex]);

  if (fetching) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#09090b] gap-6">
        <Loader2 className="animate-spin" style={{ color: "#2563eb" }} size={32} />
        <span className="font-mono text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase">Synchronizing Strategic Content Matrix...</span>
      </div>
    );
  }

  if (!data) notFound();

  const themeColor = data.theme?.glow || "#2563eb";

  return (
    <div
      className="relative w-full min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-500 overflow-x-hidden selection:bg-(--accent) selection:text-white"
      style={{
        "--accent": themeColor,
        "--accent-glow": `${themeColor}1a`,
      } as React.CSSProperties}
    >
      {/* 3D BACKGROUND GPU ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-75 mix-blend-multiply dark:mix-blend-screen">
        <Canvas camera={{ position: [0, 0, 20], fov: 40 }} dpr={[1, 2]} gl={{ antialias: false, powerPreference: "high-performance" }}>
          <BackgroundEngine color={themeColor} />
        </Canvas>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.95)_85%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,#09090b_90%)]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 md:pt-40 pb-32">
        {/* BACK TO DASHBOARD ACTION HEADER */}
        <div className="mb-16 md:mb-24">
          <Link href="/services" className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/40 hover:border-(--accent) transition-all duration-500 shadow-sm backdrop-blur-md">
            <ArrowLeft size={14} className="group-hover:-translate-x-1.5 transition-transform duration-300 text-zinc-500" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white">Our Services</span>
          </Link>
        </div>

        {/* HERO BLOCK STATEMENT */}
        <section className="mb-32 md:mb-40 max-w-5xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-2 w-2 rounded-full bg-(--accent) shadow-[0_0_12px_var(--accent)]" />
            <span className="font-mono text-[10px] tracking-[0.4em] font-extrabold uppercase text-zinc-400 dark:text-zinc-500">
              Architecture &amp; Advisory Matrix · {data.id || "01"}
            </span>
          </div>
          <h1 className="text-[clamp(2.5rem,7.5vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tighter mb-10 text-zinc-900 dark:text-white">
            {data.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium max-w-3xl border-l-[3px] pl-6 md:pl-8 py-2 text-zinc-500 dark:text-zinc-400 leading-relaxed tracking-wide" style={{ borderColor: "var(--accent)" }}>
            {data.description}
          </p>
        </section>

        {/* SECTION ONE: TECHNOLOGY PORTFOLIO INVESTMENT TIERS */}
        {data.portfolioTiers && data.portfolioTiers.length > 0 && (
          <section className="mb-32 md:mb-44">
            <div className="grid lg:grid-cols-3 gap-12 items-start mb-16">
              <div className="lg:col-span-1 space-y-4">
                <span className="font-mono text-[10px] font-black text-zinc-400 uppercase tracking-widest block">Framework Application</span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none text-zinc-900 dark:text-white">Technology as an Investment Portfolio</h2>
              </div>
              <div className="lg:col-span-2">
                <p className="text-lg font-bold text-zinc-400 dark:text-zinc-500 leading-normal max-w-2xl uppercase tracking-tight">
                  The right model for your moment.<br />
                  <span className="text-zinc-900 dark:text-white">Every technology investment belongs in one of three categories. The discipline is keeping them honest.</span>
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.portfolioTiers.map((tier, idx) => (
                <div key={idx} className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-900 backdrop-blur-md flex flex-col justify-between h-full group hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-500">
                  <div className="space-y-6">
                    <div className="flex justify-between items-baseline border-b border-zinc-200/60 dark:border-zinc-900 pb-4">
                      <span className="font-mono text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">{tier.label}</span>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">{tier.name}</h3>
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider text-(--accent) block">{tier.subtitle}</span>
                    <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{tier.summary}</p>
                  </div>
                  
                  {tier.benchmarks && (
                    <div className="pt-8 mt-8 border-t border-zinc-200/40 dark:border-zinc-900/60 space-y-3">
                      {tier.benchmarks.map((mark, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-3 text-xs text-zinc-600 dark:text-zinc-400 font-semibold tracking-wide">
                          <CheckCircle2 size={14} className="text-zinc-400 dark:text-zinc-600 mt-0.5 shrink-0" />
                          <span>{mark}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION TWO: VALUE CONVICTION PILLARS */}
        {data.valuePillars && data.valuePillars.length > 0 && (
          <section className="mb-32 md:mb-44 border-t border-zinc-200 dark:border-zinc-900 pt-24">
            <div className="mb-16 md:mb-20">
              <span className="font-mono text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Our Manifesto</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">Built for conviction-driven leaders.</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {data.valuePillars.map((pillar, idx) => (
                <div key={idx} className="space-y-4 relative group">
                  <div className="font-mono text-xs font-black text-zinc-300 dark:text-zinc-700 tracking-widest flex items-center gap-3">
                    <span>{pillar.index}</span>
                    <span className="h-px w-8 bg-zinc-200 dark:bg-zinc-800 group-hover:w-12 group-hover:bg-(--accent) transition-all duration-500" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">{pillar.headline}</h3>
                    <p className="text-xs font-bold italic font-serif text-zinc-400 dark:text-zinc-500 tracking-wide">{pillar.subline}</p>
                  </div>
                  <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium tracking-wide pt-2">{pillar.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION THREE: HIGH-UX PROCESS TIMELINE TRACK */}
        {data.processTimeline && data.processTimeline.length > 0 && (
          <section className="mb-32 md:mb-44 border-t border-zinc-200 dark:border-zinc-900 pt-24">
            <div className="mb-16 md:mb-24">
              <span className="font-mono text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Execution Protocol</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">From first conversation to lasting impact.</h2>
            </div>

            {/* RESPONSIVE TIMELINE FLOW */}
            <div className="relative flex flex-col lg:flex-row gap-8 lg:gap-6 justify-between items-stretch">
              {/* HORIZONTAL CONTINUUM LINE FOR DESKTOP VIEWPORTS */}
              <div className="absolute top-[28px] left-4 right-4 h-px bg-zinc-200 dark:bg-zinc-950 hidden lg:block z-0" />
              
              {data.processTimeline.map((phase, idx) => (
                <div key={idx} className="relative z-10 flex-1 p-8 rounded-[2rem] bg-zinc-50/40 dark:bg-zinc-900/10 border border-zinc-200/60 dark:border-zinc-900/60 backdrop-blur-md flex flex-col justify-between group hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors duration-500">
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      {/* SEQUENCE ANCHOR BLOCK */}
                      <span className="font-mono text-[10px] font-black h-7 w-7 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-950 flex items-center justify-center group-hover:border-(--accent) group-hover:text-(--accent) transition-all duration-500 shadow-sm">
                        {phase.stepNumber}
                      </span>
                      <span className="font-mono text-[9px] font-extrabold uppercase tracking-[0.15em] text-zinc-400 dark:text-zinc-600">
                        {phase.frameworkNode} <span className="italic opacity-60 font-serif lowercase">&middot;</span> {phase.durationWindow}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-2">{phase.title}</h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium tracking-wide">{phase.narrative}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION FOUR: HARDWARE ACCELERATED SWIPE/DRAG CASE STUDIES CAROUSEL */}
        {data.caseStudies && data.caseStudies.length > 0 && (
          <section className="mb-32 md:mb-44 border-t border-zinc-200 dark:border-zinc-900 pt-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div>
                <span className="font-mono text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Validated Metrics</span>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">The kind of work we actually do.</h2>
              </div>
              
              {/* CAROUSEL UI NAVIGATION HANDLERS */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => handleCarouselStep("prev")}
                  className="h-12 w-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-(--accent) hover:text-(--accent) transition-all backdrop-blur-md focus:outline-none"
                  aria-label="Previous Case Study"
                >
                  <ChevronLeft size={18} />
                </button>
                <div className="font-mono text-xs font-bold text-zinc-400 px-1">
                  {String(carouselIndex + 1).padStart(2, '0')} / {String(data.caseStudies.length).padStart(2, '0')}
                </div>
                <button 
                  onClick={() => handleCarouselStep("next")}
                  className="h-12 w-12 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-zinc-900/10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:border-(--accent) hover:text-(--accent) transition-all backdrop-blur-md focus:outline-none"
                  aria-label="Next Case Study"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* HORIZONTAL SWIPE CONTEXT FRAMEWAY */}
            <div 
              ref={carouselContainerRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 mask-image-linear-edge"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {data.caseStudies.map((item, idx) => (
                <div 
                  key={idx} 
                  className="w-full lg:w-[calc(100%-4rem)] shrink-0 snap-start snap-always p-8 md:p-12 rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/80 dark:border-zinc-900/60 backdrop-blur-md grid lg:grid-cols-12 gap-8 items-start transition-all duration-500"
                >
                  <div className="lg:col-span-4 space-y-4">
                    <div className="flex items-center gap-2 font-mono text-[9px] font-extrabold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      <span>{item.vertical}</span>
                      <span className="opacity-40">&#124;</span>
                      <span className="text-(--accent)">{item.transformType}</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-snug text-zinc-900 dark:text-white">{item.headline}</h3>
                    {item.activeNodes && (
                      <div className="flex gap-2 pt-2">
                        {item.activeNodes.map((node, nIdx) => (
                          <span key={nIdx} className="font-mono text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">{node}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 space-y-4 border-l border-zinc-200 dark:border-zinc-900 pl-6 lg:pl-8">
                    <div>
                      <span className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1">The Problem</span>
                      <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium tracking-wide">{item.problemDescription}</p>
                    </div>
                    <div>
                      <span className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-400 block mb-1">What We Did</span>
                      <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium tracking-wide">{item.resolutionDescription}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-white/80 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 p-6 md:p-8 rounded-2xl flex flex-col justify-center h-full space-y-2">
                    <span className="font-mono text-[9px] font-black uppercase tracking-widest text-(--accent) block">Realized Outcome</span>
                    <p className="text-sm md:text-base font-bold text-zinc-900 dark:text-white leading-relaxed tracking-wide">{item.impactMetrics}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* SELECTION BULLET MATRIX TRANSITIONS */}
            <div className="flex justify-center items-center gap-2 mt-8">
              {data.caseStudies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${carouselIndex === idx ? "w-8 bg-(--accent)" : "w-1.5 bg-zinc-200 dark:bg-zinc-800"}`}
                  aria-label={`Go to case matrix index ${idx + 1}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* SECTION FIVE: ACCORDION DIAGNOSTIC FAQS */}
        {data.faqCollection && data.faqCollection.length > 0 && (
          <section className="mb-32 md:mb-44 border-t border-zinc-200 dark:border-zinc-900 pt-24 max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="font-mono text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Common Questions</span>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">What people ask first.</h2>
            </div>

            <div className="space-y-4">
              {data.faqCollection.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={idx} className="border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
                    <button onClick={() => setOpenFaqIdx(isOpen ? null : idx)} className="w-full py-6 flex justify-between items-center text-left group gap-4 focus:outline-none">
                      <h3 className="text-base md:text-lg font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-(--accent) transition-colors">{faq.question}</h3>
                      <ChevronDown size={18} className={`text-zinc-400 dark:text-zinc-600 shrink-0 transition-transform duration-500 ${isOpen ? "rotate-180 text-(--accent)" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                          <p className="pb-8 text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed tracking-wide font-medium max-w-3xl pl-1 border-l-2 border-(--accent)">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION SIX: READY TO BEGIN CTA MATRIX */}
        <section className="border-t border-zinc-200 dark:border-zinc-900 pt-24 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] font-black text-zinc-400 uppercase tracking-widest block mb-2">Ready to Begin</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-zinc-900 dark:text-white">Your next step shouldn't cost you a thing.</h2>
            <p className="text-sm md:text-base text-zinc-400 dark:text-zinc-500 max-w-md mx-auto mt-4 font-semibold uppercase tracking-wide">The first conversation is free. 30 minutes — we listen to the actual problem and give you an honest read on fit, model, and timeline.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {/* CTA NODE 1 */}
            <div className="p-8 rounded-[2.25rem] bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/80 dark:border-zinc-900/60 backdrop-blur-md flex flex-col justify-between space-y-8 group hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 block">Free &middot; 30 Minutes</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">Discovery Call</h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Honest read on fit, model, and timeline. No pitch.</p>
              </div>
              <Link href="/book" className="inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-(--accent) group-hover:gap-3 transition-all">
                Book a call <ArrowRight size={12} />
              </Link>
            </div>

            {/* CTA NODE 2 */}
            <div className="p-8 rounded-[2.25rem] bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/80 dark:border-zinc-900/60 backdrop-blur-md flex flex-col justify-between space-y-8 group hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 block">2–4 Week Sprint</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">Rapid Diagnostic</h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">Scoped technology assessment. Fixed fee.</p>
              </div>
              <Link href="/diagnostic" className="inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-(--accent) group-hover:gap-3 transition-all">
                Request a diagnostic <ArrowRight size={12} />
              </Link>
            </div>

            {/* CTA NODE 3 */}
            <div className="p-8 rounded-[2.25rem] bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/80 dark:border-zinc-900/60 backdrop-blur-md flex flex-col justify-between space-y-8 group hover:border-zinc-300 dark:hover:border-zinc-800 transition-colors">
              <div className="space-y-3">
                <span className="font-mono text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-600 block">Direct Access</span>
                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">Email the Principals</h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">partners@th3tag.com — 48h response.</p>
              </div>
              <a href="mailto:partners@th3tag.com" className="inline-flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest text-(--accent) group-hover:gap-3 transition-all">
                partners@th3tag.com <ArrowRight size={12} />
              </a>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="font-mono text-[9px] font-extrabold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
              No long-term commitment on first engagement &nbsp;&middot;&nbsp; Principal-led always
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}