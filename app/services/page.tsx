"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  Brain,
  Cpu,
  Heart,
  ShieldCheck,
} from "lucide-react";

const SERVICES_DATA = {
  "strategic-advisory": {
    category: "Mind-led",
    title: "Strategic Advisory & Digital Transformation",
    tagline: "We help leadership teams define, fund, and execute technology transformations that create real competitive advantage. From vision workshops to transformation office setup, we are with you from blank page to first delivery — and we stay accountable to outcomes.",
    outcomes: ["Digital Strategy", "CTO Advisory", "Portfolio rationalization", "Operating Model Design", "Board readiness", "M&A tech due diligence"],
  },
  "cloud-infrastructure": {
    category: "Technology-led",
    title: "Cloud Infrastructure & Enterprise Architecture",
    tagline: "Scalable, secure, cost-efficient infrastructure is the foundation everything else depends on. We design and migrate cloud architectures that reduce operational overhead, increase resilience, and are built to remain vendor-neutral by design.",
    outcomes: ["Multi-cloud", "Cloud migration", "Enterprise architecture", "DevSecOps", "Cost Optimization", "Vendor selection"],
  },
  "data-ai-trust": {
    category: "All Three Pillars",
    title: "Data, AI & Digital Trust",
    tagline: "Data is only as valuable as the decisions it enables and the trust it earns. We help organizations build data foundations, AI capabilities, and governance frameworks to leverage intelligence responsibly — turning data into a strategic asset while protecting the people it touches.",
    outcomes: ["Data strategy & governance", "AI/ML Roadmap", "Privacy-first architecture", "Analytics platforms", "Ethical AI review", "MLOps / LLMOps"],
  },
  "cybersecurity": {
    category: "Technology-led",
    title: "Cybersecurity & Digital Sovereignty",
    tagline: "Security is not a feature — it is a posture. We design zero-trust architectures, assess your current threat surface, and build governance frameworks that protect your people, your data, and your operational independence. Compliance-ready from day one.",
    outcomes: ["Zero-trust architecture", "Identity & access management", "Threat modeling", "SOC 2 / ISO 27001", "GDPR / HIPAA readiness", "Data residency strategy"],
  },
  "ai-readiness": {
    category: "All Three Pillars",
    title: "AI Readiness & Governance",
    tagline: "Every board is asking the same question: how do we adopt AI without creating new risks? We help organizations assess AI readiness, build governance policies for responsible adoption, and design implementation roadmaps that realize AI's potential without compromising ethics or control.",
    outcomes: ["AI readiness assessment", "AI policy design", "EU AI Act compliance", "Generative AI adoption", "Responsible AI canvas", "AI risk frameworks"],
  },
  "fractional-leadership": {
    category: "Heart-led",
    title: "Fractional Technology Leadership",
    tagline: "Access senior technology leadership precisely when you need it — without the overhead of a full-time hire. Our fractional CTO, CISO, and Chief Data Officer engagements are structured to provide strategic direction, build internal capability, and make the decisions that protect your trajectory.",
    outcomes: ["Fractional CTO", "Fractional CISO", "Fractional CDO", "Interim leadership", "Board technology counsel", "Investment committee support"],
  },
  "due-diligence": {
    category: "Mind-led",
    title: "Technology Due Diligence",
    tagline: "For investors, acquirers, and boards evaluating a technology asset. Our due diligence goes beyond code review — we assess architecture soundness, team capability, technical debt, security posture, scalability headroom, and organizational readiness. The Heart/Mind/Technology lens surfaces risks that purely technical reviews miss.",
    outcomes: ["Architecture review", "Technical debt assessment", "Team capability audit", "Security posture review", "Scalability analysis", "M&A integration risk"],
  },
  "staff-augmentation": {
    category: "Heart-led",
    title: "Staff Augmentation & Emerging Tech",
    tagline: "Embed experienced practitioners into your teams for specific initiatives. We also help you evaluate and responsibly adopt emerging technologies — generative AI, spatial computing, IoT — ensuring every new capability is introduced with appropriate governance and a clear path to sustainable operation.",
    outcomes: ["Senior tech talent", "Team augmentation", "Innovation sprints", "Emerging tech pilots", "Tech literacy programs", "Vendor evaluation"],
  },
};

export default function ServicesPage() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-blue-600 selection:text-white transition-colors duration-500 overflow-hidden">

      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* HERO / HEADER */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link
                href="/"
                className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md hover:border-blue-600 transition-all duration-300 shadow-sm"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform text-blue-600" />
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em]">Back to Home</span>
              </Link>
            </motion.div>

            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black"
            >
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight size={10} className="text-zinc-300" />
              <span className="text-blue-600">Services</span>
            </motion.nav>
          </div>

          <div className="relative">

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-12"
            >
              Transformation <br />
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                LifeCycle
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl text-sm md:text-lg text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed border-l-2 border-blue-600 pl-6"
            >
              From high-level strategy to hands-on implementation, our eight service areas span the full transformation lifecycle. Every engagement is shaped by the Heart · Mind · Technology framework — ensuring the human, strategic, and technical dimensions are addressed together, never in silos.
              <br />
              <br />
              We operate as true partners: sharing risk, transferring capability, and measuring our success by yours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER */}
      <div className="relative py-10 overflow-hidden border-y border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] backdrop-blur-sm">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-blue-600/20 px-8">
              Heart • Mind • Technology • Strategy • Design • Scale •
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES GRID */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
          {Object.entries(SERVICES_DATA).map(([slug, service], i) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className={`${i % 2 !== 0 ? "lg:mt-24" : ""} group`}
            >
              <div className="relative h-full min-h-[480px] rounded-[3.5rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/40 p-10 md:p-14 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/5">

                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-colors" />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 dark:bg-blue-600/10 px-4 py-2 rounded-full">
                      {service.category === "Mind-led" && <Brain size={12} />}
                      {service.category === "Technology-led" && <Cpu size={12} />}
                      {service.category === "Heart-led" && <Heart size={12} />}
                      {service.category === "All Three Pillars" && <ShieldCheck size={12} />}
                      {service.category}
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                    {service.title}
                  </h3>

                  <p className="text-zinc-500 dark:text-zinc-400 font-normal text-sm md:text-lg max-w-sm leading-snug">
                    {service.tagline}
                  </p>
                </div>

                <div className="relative z-10 mt-12">
                  <div className="flex flex-wrap gap-2">
                    {service.outcomes.map((outcome) => (
                      <span
                        key={outcome}
                        className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/5 rounded-full text-[9px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300"
                      >
                        {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* FINAL CTA CARD */}
          <Link href="/contact" className="lg:col-span-2 group mt-20">
            <motion.div
              whileHover={{ scale: 0.99 }}
              className="h-80 rounded-[3.5rem] bg-zinc-950 flex flex-col items-center justify-center text-center p-12 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="absolute w-[500px] h-[500px] border border-blue-600/20 rounded-full animate-[spin_20s_linear_infinite]" />

              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6">
                  Ready to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 italic font-serif lowercase">
                    Partner?
                  </span>
                </h2>
                <div className="inline-flex flex-col items-center gap-4">
                  <p className="text-zinc-500 text-[10px] uppercase tracking-[0.6em] font-black group-hover:text-blue-400 transition-colors">
                    Initialize Partnership Sequence
                  </p>
                  <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}