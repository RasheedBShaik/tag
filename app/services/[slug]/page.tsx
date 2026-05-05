"use client";

import React, { use, useRef, useMemo, useState, useEffect, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft } from "lucide-react"; // Added ArrowLeft
import { notFound, useRouter } from "next/navigation"; // Added useRouter
import Link from "next/link"; // Added Link
import { SERVICES_DATA } from "./data";
import HeartMindTechnology from "@/app/components/HeartMindTechnology";

/* ===========================
   1. GPU ACCELERATED ENGINE (Shader-Based)
   =========================== */
const BackgroundEngine = memo(({ color }: { color: string }) => {
  const { viewport } = useThree();
  const count = 120;

  // GPU Uniforms
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(color).multiplyScalar(2.5) },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uViewport: { value: new THREE.Vector2(viewport.width, viewport.height) }
  }), [color, viewport]);

  // Update time and mouse every frame (Cheap)
  useFrame((state) => {
    uniforms.uTime.value = state.clock.getElapsedTime();
    uniforms.uMouse.value.set(state.mouse.x, state.mouse.y);
  });

  // Pre-calculate random distributions
  const [offsets, speeds] = useMemo(() => {
    const off = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      off[i * 3] = (Math.random() - 0.5) * 40;
      off[i * 3 + 1] = (Math.random() - 0.5) * 22;
      off[i * 3 + 2] = (Math.random() - 0.5) * 5;
      spd[i] = 0.4 + Math.random() * 0.6;
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
            
            // Movement math on GPU
            float t = uTime * aSpeed * 0.3;
            pos.x += cos(t + aOffset.y) * 2.0;
            pos.y += sin(t + aOffset.x) * 2.0;

            // Mouse interaction
            vec2 mouseWorld = uMouse * uViewport.xy * 0.5;
            float dist = distance(pos.xy, mouseWorld);
            if(dist < 12.0) {
              pos.xy += normalize(pos.xy - mouseWorld) * (1.0 - dist/12.0) * 1.5;
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            float pulse = 1.0 + sin(uTime * 4.0 + aOffset.z) * 0.4;
            mvPosition.xyz += position * pulse * 0.12; 
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
            gl_FragColor = vec4(uColor, alpha * 0.7);
          }
        `}
      />
    </instancedMesh>
  );
});

BackgroundEngine.displayName = "BackgroundEngine";

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
      className="relative w-full min-h-screen bg-(--background) text-(--foreground) overflow-x-hidden selection:bg-(--accent) selection:text-white"
      style={{
        "--accent": themeColor,
        "--accent-glow": `${themeColor}66`,
      } as React.CSSProperties}
    >
      {/* BACKGROUND - Optimized with dpr limits */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
        <Canvas 
          camera={{ position: [0, 0, 20], fov: 40 }}
          dpr={[1, 2]} 
          gl={{ antialias: false, powerPreference: "high-performance" }}
        >
          <BackgroundEngine color={themeColor} />
        </Canvas>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_90%)]" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32">
        {/* BACK BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            href="/services" 
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-(--border) bg-(--card) hover:border-(--accent) transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_-5px_var(--accent-glow)]"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">View All Services</span>
          </Link>
        </motion.div>

        {/* HERO */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-3 w-3 rounded-full bg-(--accent) shadow-[0_0_15px_var(--accent)]" />
            <span className="font-mono text-[10px] tracking-[0.5em] font-black uppercase">
              Service {data.id}
            </span>
          </motion.div>

          <h1 className="text-[clamp(3rem,10vw,7rem)] font-black uppercase leading-[0.85] tracking-tighter mb-10">
            <span className="block">{data.title}</span>
          </h1>

          <p
            className="text-xl md:text-2xl font-bold max-w-3xl border-l-8 pl-8 py-2"
            style={{ borderColor: "var(--accent)" }}
          >
            {data.description}
          </p>
        </section>

        {/* GRID */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.outcomes.map((outcome, i) => (
            <motion.div
              layoutId={`card-${i}`}
              key={i}
              onClick={() => setSelectedIdx(i)}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ willChange: "transform" }}
              className="group relative p-10 rounded-[3rem] bg-(--card) border border-(--border) cursor-pointer overflow-hidden transition-colors hover:border-(--accent) hover:shadow-[0_0_40px_-15px_var(--accent-glow)]"
            >
              <div className="relative z-10 space-y-12">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-(--background) shadow-lg group-hover:bg-(--accent) transition-colors">
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

        {/* MODAL */}
        <AnimatePresence mode="wait">
          {selectedIdx !== null && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedIdx(null)}
                className="fixed inset-0 bg-slate-200/40 dark:bg-black/90 backdrop-blur-xl z-0"
              />

              <motion.div
                layoutId={`card-${selectedIdx}`}
                style={{ willChange: "transform" }}
                className="relative w-full max-w-2xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl z-10 flex flex-col overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-(--accent) to-transparent" />

                <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-(--accent) animate-pulse" />
                    <span className="font-mono text-[10px] font-black tracking-widest opacity-40 uppercase">
                      Node_0{selectedIdx + 1}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedIdx(null)}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <X size={20} className="opacity-50 hover:opacity-100 transition-opacity" />
                  </button>
                </div>

                <div className="p-10 space-y-8">
                  <div className="space-y-4">
                    <span className="text-(--accent) font-mono text-[10px] font-black uppercase tracking-widest">
                      Diagnostic_Summary
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-tight tracking-tighter">
                      {data.outcomes[selectedIdx]}
                    </h2>
                  </div>

                  <p className="text-lg md:text-xl font-medium text-slate-600 dark:text-white/70 leading-relaxed border-l-4 border-(--accent) pl-6">
                    {data.description}
                  </p>
                  
                  <div className="pt-8 font-mono text-[8px] opacity-20 uppercase tracking-[0.4em]">
                    Terminal_ID: {data.id} // SHADER_ACTIVE: TRUE // STATUS: OPTIMIZED
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <footer className="py-40">
        </footer>
      </main>
    </div>
  );
}