"use client";

import React, { use, useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Shield, BarChart3, Globe, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "./data";
import HeartMindTechnology from "@/app/components/HeartMindTechnology";

/* ===========================
   1. HIGH-CONTRAST ENGINE
   =========================== */
function ReactiveCircles({ color }: { color: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null!);
  const { mouse, viewport } = useThree();
  const count = 120;

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(color).multiplyScalar(3);
    }
  }, [color]);

  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      t: Math.random() * 100,
      speed: 0.005 + Math.random() * 0.01,
      x: (Math.random() - 0.5) * 45,
      y: (Math.random() - 0.5) * 25,
      z: (Math.random() - 0.5) * 5,
      size: 0.08 + Math.random() * 0.15,
    }));
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    particles.forEach((p, i) => {
      p.t += p.speed;
      let currentX = p.x + Math.cos(p.t) * 3;
      let currentY = p.y + Math.sin(p.t) * 3;

      const mX = (mouse.x * viewport.width) / 2;
      const mY = (mouse.y * viewport.height) / 2;
      const dist = Math.hypot(mX - currentX, mY - currentY);

      if (dist < 15) {
        const pull = (1 - dist / 15) * 0.12;
        currentX += (mX - currentX) * pull;
        currentY += (mY - currentY) * pull;
      }

      dummy.position.set(currentX, currentY, p.z);
      const pulse = 1 + Math.sin(p.t * 5) * 0.6;
      dummy.scale.setScalar(p.size * pulse);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <circleGeometry args={[1, 32]} />
      <meshBasicMaterial
        ref={materialRef}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/* ===========================
   2. MAIN COMPONENT
=========================== */
export default function ServiceSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const data = SERVICES_DATA[slug];
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!data) notFound();

  const themeColor = data.theme.glow;
  const MainIcon = data.icon;

  return (
    <div
      className="relative w-full min-h-screen bg-(--background) text-(--foreground) overflow-x-hidden"
      style={
        {
          "--accent": themeColor,
          "--accent-glow": `${themeColor}66`,
        } as React.CSSProperties
      }
    >
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80 dark:opacity-60">
        <Canvas camera={{ position: [0, 0, 20], fov: 40 }}>
          <ReactiveCircles color={themeColor} />
        </Canvas>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-32">
        {/* HERO */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-3 w-3 rounded-full bg-(--accent) shadow-[0_0_20px_var(--accent)]" />
            <span className="font-mono text-[10px] tracking-[0.5em] font-black opacity-100 uppercase">
              SYS_ACTIVE // {data.id}
            </span>
          </motion.div>

          <h1 className="text-[clamp(3rem,10vw,7rem)] font-black italic uppercase leading-[0.85] tracking-tighter mb-10">
            <span className="block">{data.title.split("&")[0]}</span>
            <span className="block opacity-20 [-webkit-text-stroke:2px_var(--foreground)] text-transparent italic">
              {data.title.split("&")[1] || "CORE"}
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl font-bold max-w-3xl border-l-8 pl-8 py-2 opacity-100"
            style={{ borderColor: "var(--accent)" }}
          >
            {data.description}
          </p>
        </section>

        {/* GRID */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-40">
          {data.outcomes.map((outcome, i) => (
            <motion.div
              layoutId={`card-${i}`}
              key={i}
              onClick={() => setSelectedIdx(i)}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative p-10 rounded-[3rem] bg-(--card) border-2 border-(--border) cursor-pointer overflow-hidden transition-all hover:border-(--accent) hover:shadow-[0_0_50px_-15px_var(--accent-glow)]"
            >
              <div className="relative z-10 space-y-12">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-(--background) shadow-xl group-hover:bg-(--accent) transition-colors">
                    <MainIcon
                      size={28}
                      className="group-hover:text-white transition-colors"
                    />
                  </div>
                  <div className="font-mono text-[10px] font-black opacity-30">
                    0{i + 1}
                  </div>
                </div>
                <h3 className="text-4xl font-black italic uppercase leading-none tracking-tighter">
                  {outcome}
                </h3>
                <div className="flex items-center gap-2 font-mono text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100">
                  Deploy Module{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* UI/UX OPTIMIZED MODAL */}
        <AnimatePresence>
          {selectedIdx !== null && (
            <div className="fixed inset-0 z-100 flex items-start justify-center pt-24 pb-12 px-4 md:px-8 overflow-y-auto custom-scrollbar">
              {/* Backdrop: Adaptive Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedIdx(null)}
                className="fixed inset-0 bg-slate-200/60 dark:bg-black/95 backdrop-blur-2xl z-0"
              />

              <motion.div
                layoutId={`card-${selectedIdx}`}
                className="relative w-full max-w-2xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl dark:shadow-[0_0_80px_-20px_var(--accent-glow)] z-10 flex flex-col overflow-hidden"
              >
                {/* TOP HARDWARE ACCENT: Pulsing Line */}
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-(--accent) to-transparent opacity-100" />

                {/* MODAL HEADER: STICKY */}
                <div className="sticky top-0 z-20 flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-[#080808]/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 rounded-t-2xl">
                  <div className="flex items-center gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-(--accent) shadow-[0_0_8px_var(--accent)] animate-pulse" />
                    <span className="font-mono text-[9px] font-black tracking-[0.4em] text-slate-400 dark:text-white/30 uppercase italic">
                      Protocol_Node_{selectedIdx + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedIdx(null)}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 hover:border-(--accent)/50 transition-all bg-slate-50 dark:bg-white/5"
                  >
                    <span className="font-mono text-[9px] font-bold text-slate-400 dark:text-white/20 group-hover:text-(--accent) transition-colors">
                      CLOSE
                    </span>
                    <X
                      size={14}
                      className="text-slate-400 dark:text-white/20 group-hover:text-(--accent) transition-colors"
                    />
                  </button>
                </div>

                {/* SCROLLABLE CONTENT BODY */}
                <div className="flex-1 overflow-y-auto p-8 relative">
                  {/* Scanner Animation: Visible in both modes */}
                  <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: "100%" }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-x-0 h-px bg-linear-to-r from-transparent via-(--accent)/20 to-transparent pointer-events-none"
                  />

                  <div className="relative z-10 space-y-12">
                    {/* TITLE BLOCK */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-px w-8 bg-(--accent)" />
                        <span className="text-(--accent) font-mono text-[10px] font-black uppercase tracking-widest">
                          Diagnostic_Report
                        </span>
                      </div>
                      <h2 className="text-4xl md:text-6xl font-black italic uppercase leading-[0.8] tracking-tighter text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-2xl">
                        {data.outcomes[selectedIdx]}
                      </h2>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="relative pl-6 border-l-2 border-slate-100 dark:border-white/10">
                      <p className="text-lg md:text-xl font-bold text-slate-600 dark:text-white/80 leading-relaxed italic">
                        {data.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* INDUSTRIAL BASEBAR */}
                <div className="h-8 w-full bg-slate-50 dark:bg-white/2 flex items-center px-6 border-t border-slate-100 dark:border-white/5 rounded-b-2xl">
                  <span className="font-mono text-[7px] text-slate-400 dark:text-white/10 uppercase tracking-[0.5em]">
                    Terminal_ID: {data.id}_M{selectedIdx} // Mode:{" "}
                    {typeof window !== "undefined" &&
                    document.documentElement.classList.contains("dark")
                      ? "Opaque"
                      : "Transparent"}
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <footer className="py-40">
          <HeartMindTechnology />
        </footer>
      </main>
    </div>
  );
}
