"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; 
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  Brain,
  Cpu,
  Heart,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { client } from "@/sanity/lib/client";

/* ---------------------- TYPES & INTERFACES ---------------------- */

interface SanityService {
  _id: string;
  title: string;
  id?: string;
  description?: string;
  slug?: {
    current: string;
  };
  processTimeline?: Array<{
    frameworkNode?: string;
  }>;
  portfolioTiers?: Array<{
    benchmarks?: string[];
  }>;
  caseStudies?: Array<{
    activeNodes?: string[];
  }>;
}

/* ------------------- DATA HELPER STRATEGY ------------------- */

const getPillarMetadata = (frameworkNode?: string): { category: string; Icon: LucideIcon } => {
  const node = frameworkNode?.toLowerCase().trim() || "";
  if (node.includes("mind")) return { category: "Mind-led", Icon: Brain };
  if (node.includes("tech")) return { category: "Technology-led", Icon: Cpu };
  if (node.includes("heart")) return { category: "Heart-led", Icon: Heart };
  return { category: "All Three Pillars", Icon: ShieldCheck };
};

/* ------------------- COMPONENT ENTRY ------------------- */

export default function ServicesPage() {
  const [services, setServices] = useState<SanityService[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const query = `*[_type == "service"] | order(id asc) {
          _id,
          title,
          id,
          description,
          slug { current },
          processTimeline[] { frameworkNode },
          portfolioTiers[] { benchmarks },
          caseStudies[] { activeNodes }
        }`;
        const data = await client.fetch(query, {}, { next: { revalidate: 0 } });
        setServices(data || []);
      } catch (error) {
        console.error("CRITICAL ERROR: Failed to pipeline Sanity services:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchServices();
  }, []);

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
              From high-level strategy to hands-on implementation, our engine service areas span the full transformation lifecycle. Every engagement is shaped by the Heart · Mind · Technology framework — ensuring the human, strategic, and technical dimensions are addressed together, never in silos.
              <br />
              <br />
              We operate as true partners: sharing risk, transferring capability, and measuring our success by yours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* SECTION DIVIDER MARQUEE */}
      <div className="relative py-10 overflow-hidden border-y border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-white/[0.02] backdrop-blur-sm">
        <div className="flex w-max min-w-full">
          <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] whitespace-nowrap">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-blue-600/20 px-8">
                Heart • Mind • Technology • Strategy • Design • Scale •
              </span>
            ))}
          </div>
          <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] whitespace-nowrap" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <span key={`dup-${i}`} className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-blue-600/20 px-8">
                Heart • Mind • Technology • Strategy • Design • Scale •
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DYNAMIC CMS SERVICES GRID */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
            <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
              No service nodes published inside Sanity Studio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8">
            {services.map((service, i) => {
              const firstNode = service.processTimeline?.[0]?.frameworkNode || "All Three Pillars";
              const { category, Icon } = getPillarMetadata(firstNode);

              const benchmarks = service.portfolioTiers?.flatMap((t) => t.benchmarks || []) || [];
              const activeNodes = service.caseStudies?.flatMap((c) => c.activeNodes || []) || [];
              const combinedOutcomes = [...new Set([...benchmarks, ...activeNodes])].slice(0, 6);

              const outcomesList = combinedOutcomes.length > 0 
                ? combinedOutcomes 
                : ["Digital Infrastructure", "Growth Strategy", "Operational Design"];

              // Compute deep-link route based on the sanity document slug
              const serviceSlug = service.slug?.current || service.title.toLowerCase().replace(/\s+/g, "-");
              const targetUrl = `/services/${serviceSlug}`;

              return (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.1 }}
                  className={`${i % 2 !== 0 ? "lg:mt-24" : ""} group`}
                >
                  <div className="relative h-full min-h-[520px] rounded-[3.5rem] border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/40 p-10 md:p-14 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-600/5">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full group-hover:bg-blue-600/10 transition-colors" />

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-12">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 bg-blue-50 dark:bg-blue-600/10 px-4 py-2 rounded-full">
                          <Icon size={12} />
                          {category}
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                        {service.title}
                      </h3>

                      <p className="text-zinc-500 dark:text-zinc-400 font-normal text-sm md:text-lg max-w-sm leading-snug mb-6">
                        {service.description || "Detailed overview coming soon."}
                      </p>

                      {/* NEWLY ADDED DEEP LINK LEARN MORE BUTTON */}
                      <Link 
                        href={targetUrl}
                        className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                      >
                        Learn More 
                        <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    <div className="relative z-10 mt-12">
                      <div className="flex flex-wrap gap-2">
                        {outcomesList.map((outcome, idx) => (
                          <span
                            key={`${outcome}-${idx}`}
                            className="px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/5 rounded-full text-[9px] font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-300"
                          >
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

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
        )}
      </section>
    </div>
  );
}