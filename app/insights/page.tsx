"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search, Zap, Filter } from "lucide-react";
import Link from "next/link";

const ARTICLES = [
  {
    slug: "ai-strategy-guide",
    category: "AI Strategy",
    title: "A C-Suite Guide to De-Risking AI Innovation",
    date: "Sep 12, 2026",
    readTime: "8 min",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    description:
      "Discover the critical ethical and operational risks that many enterprise AI strategies overlook in the race to automate.",
  },
  {
    slug: "founders-ethical-stack",
    category: "Founders",
    title: "The Playbook for Building an Ethical Tech Stack",
    date: "Aug 30, 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    description:
      "A step-by-step blueprint for selecting tools and guardrails that scale responsibly with your startup's growth.",
  },
  {
    slug: "human-centric-transformation",
    category: "Transformation",
    title: "Beyond the Buzzword: Human-Centric Outcomes",
    date: "Jul 18, 2026",
    readTime: "9 min",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    description:
      "Learn the specific operating changes that translate empathy into measurable, high-performance business outcomes.",
  },
];

export default function InsightsPage() {
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 500], [0, -150]);
  const headerOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  if (!mounted) return <div className="min-h-screen bg-(--background)" />;

  return (
    <div className="min-h-screen bg-(--background) text-(--foreground) transition-colors duration-700">
      
      {/* HERO */}
      <section className="relative h-[90vh] flex flex-col justify-end overflow-hidden border-b border-white/10">
  {/* Background video */}
  <div className="absolute inset-0">
    <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-75">
      <source src="/insights/insights.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/40 transition-all duration-700" />
  </div>

  {/* Hero text */}
  <motion.div
    style={{ y: headerY, opacity: headerOpacity }}
    className="relative z-10 px-8 md:px-24 pb-24 max-w-7xl"
  >
    <h1 className="text-7xl md:text-[10vw] font-black italic leading-[0.8] uppercase text-white">
      Heart Mind <br />
      <span className="opacity-30">Technology</span>
    </h1>

    <p className="max-w-md mt-6 text-white/70 text-lg">
      Curated perspectives on the intersection of human empathy, ethical
      strategy, and hyper-innovation.
    </p>
  </motion.div>
</section>

      {/* FILTER BAR */}
      <div className="sticky top-0 z-40 bg-(--background)/80 backdrop-blur-2xl border-b border-(--border) px-8 md:px-24 py-6">
        <div className="flex justify-between items-center">
          <div className="flex gap-8">
            {["All", "AI Strategy", "Founders", "Transformation"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-xs uppercase tracking-widest ${
                  filter === cat
                    ? "text-blue-600"
                    : "text-(--muted) hover:text-(--foreground)"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ARTICLES */}
      <main className="px-8 md:px-24 py-24 space-y-32">
        {ARTICLES.filter((a) => filter === "All" || a.category === filter).map(
          (article, index) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${
                index % 2 ? "md:flex-row-reverse" : "md:flex-row"
              } gap-16 items-center`}
            >
              {/* IMAGE */}
              <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-(--card)">
                <img
                  src={article.image}
                  className="w-full h-full object-cover hover:scale-105 transition duration-700"
                />
              </div>

              {/* TEXT */}
              <div className="w-full md:w-1/2 space-y-6">
                <div className="text-xs uppercase tracking-widest text-[var(--muted)]">
                  {article.category} • {article.date} • {article.readTime}
                </div>

                <h2 className="text-4xl md:text-5xl font-black italic leading-tight hover:text-blue-600 transition">
                  {article.title}
                </h2>

                <p className="text-[var(--muted)] text-lg">
                  {article.description}
                </p>

              </div>
            </motion.div>
          )
        )}
      </main>

      {/* SUBSCRIBE */}
      <section className="mx-8 md:mx-24 mb-24 rounded-[3rem] bg-[var(--card)] border border-[var(--border)] py-24 px-8 text-center">
        <Zap className="mx-auto text-blue-600 mb-6" size={36} />

        <h2 className="text-5xl font-black italic mb-6">
          Join the <span className="opacity-30">Inner Circle</span>
        </h2>

        <p className="text-[var(--muted)] mb-10">
          Receive monthly strategy briefs on building technology with conscience.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            placeholder="Your Email"
            className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-full px-6 py-4 outline-none"
          />
          <button className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full uppercase text-xs tracking-widest hover:bg-blue-600 transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}