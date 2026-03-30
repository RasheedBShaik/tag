"use client";

import React, { use, useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue } from "framer-motion";
import { BarChart3, Zap, ArrowUpRight, Fingerprint, MoveDown } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES_DATA } from "./data";
import HeartMindTechnology from "@/app/components/HeartMindTechnology";

/* ===========================
   1. VISCOUS FLUID ENGINE
=========================== */
function ViscousFluid({ color, scrollVelocity }: { color: string; scrollVelocity: any }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { geometry, count } = useMemo(() => {
    // Large enough to cover screen but limited to prevent lag
    const geo = new THREE.PlaneGeometry(180, 120, 70, 70);
    return { geometry: geo, count: geo.attributes.position.count };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const vel = Math.abs(scrollVelocity.get() * 12);
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const wave = Math.sin(x * 0.08 + t + vel) * (1 + vel) + Math.cos(y * 0.12 + t * 0.7) * 1.2;
      pos.setZ(i, wave);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 3.5, 0, 0]} position={[0, -10, 0]}>
      <meshStandardMaterial color={color} wireframe transparent opacity={0.08} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
}

/* ===========================
   2. HIGH-LEVEL DEPTH CARD
=========================== */
function DepthCard({ item, index }: { item: string; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 25 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative w-full aspect-[16/10] sm:aspect-square md:aspect-[1.2/1] p-10 rounded-[2.5rem] bg-white/40 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-white/5 backdrop-blur-3xl transition-colors hover:border-blue-500/30"
    >
      <div className="flex flex-col h-full justify-between pointer-events-none" style={{ transform: "translateZ(40px)" }}>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[9px] font-black tracking-[0.4em] uppercase text-blue-500">Node_ID</span>
            <p className="text-[10px] font-mono opacity-40">0{index + 1}.SYS</p>
          </div>
          <ArrowUpRight size={20} className="text-zinc-400 group-hover:text-blue-500 transition-all" />
        </div>
        <h3 className="text-3xl font-bold tracking-tighter leading-none">{item}</h3>
      </div>
    </motion.div>
  );
}

/* ===========================
   3. REFINED SERVICE PAGE
=========================== */
export default function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = SERVICES_DATA[slug];
  const containerRef = useRef<HTMLDivElement>(null);

  if (!data) notFound();

  const { scrollYProgress } = useScroll({ target: containerRef });
  const scrollVel = useVelocity(scrollYProgress);
  const smoothVel = useSpring(scrollVel, { stiffness: 100, damping: 30 });
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full overflow-x-clip bg-white dark:bg-[#020202] text-zinc-950 dark:text-white selection:bg-blue-500">
      
      {/* 3D ATMOSPHERE (Absolute, No Width impact) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Canvas camera={{ position: [0, 15, 45], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <pointLight position={[20, 20, 20]} intensity={2} color={data.theme.glow} />
          <ViscousFluid color={data.theme.glow} scrollVelocity={smoothVel} />
        </Canvas>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#020202] opacity-80" />
      </div>


      {/* CONTENT (Locked Center Column) */}
      <main className="relative z-10 w-full flex flex-col items-center">
        
        {/* HERO SECTION */}
        <motion.section 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="h-screen w-full flex flex-col justify-center items-center text-center px-6 sticky top-0"
        >
          <div className="w-full max-w-[1400px]">
            <h1 className="text-6xl md:text-[11vw] font-black tracking-tighter leading-[0.8] uppercase italic">
              {data.title.split("&")[0]}<br />
              <span className="text-transparent stroke-zinc-200 dark:stroke-zinc-800 [-webkit-text-stroke:1px_currentColor]">
                {data.title.split("&")[1] || "Nexus"}
              </span>
            </h1>
            <p className="mt-12 max-w-xl mx-auto text-zinc-500 font-medium text-lg">
              {data.tagline}
            </p>
          </div>
        </motion.section>

        {/* MASONRY DATA GRID */}
        <section className="relative py-60 w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-12 md:gap-20">
            
            {/* Sidebar Logic */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-48 space-y-10">
                <BarChart3 className="text-blue-500" size={40} />
                <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">
                  Neural<br /><span className="text-blue-500">Logic</span>
                </h2>
                <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  {data.description}
                </p>
              </div>
            </div>

            {/* Grid Column */}
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 md:gap-8">
              {data.framework.map((item, i) => (
                <div key={i} className={i % 2 === 1 ? "sm:mt-32" : "mt-0"}>
                   <DepthCard item={item} index={i} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER SECTION */}
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-40 border-t border-zinc-200 dark:border-white/5">
           <HeartMindTechnology />
        </div>
      </main>
    </div>
  );
}