"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Cpu, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    id: "01",
    title: "Neuro-Sync Platform",
    client: "HealthTech Global",
    category: "AI Strategy & UX",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200",
    description:
      "Architecting a human-in-the-loop AI system for neurological diagnostic precision.",
    impact: "40% faster diagnosis",
  },
  {
    id: "02",
    title: "Eco-Stream Venture",
    client: "GreenFoundry",
    category: "Strategic Partnership",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=1200",
    description:
      "Building the digital infrastructure for a carbon-negative supply chain ecosystem.",
    impact: "Carbon Neutrality 2024",
  },
  {
    id: "03",
    title: "Aura Design System",
    client: "Core Systems",
    category: "Design Studio",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    description:
      "Defining a visual language connecting biometrics to digital environments.",
    impact: "Adopted across 12 sectors",
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-(--background) text-(--foreground) transition-colors duration-700">
      {/* HEADER */}
      <section className="pt-56 pb-32 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 text-blue-600 mb-8">
            <div className="h-px w-12 bg-current" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Index_Selected_Works
            </span>
          </div>

          <h1 className="text-[10vw] md:text-[8vw] font-black italic leading-[0.8] mb-12">
            The <span className="opacity-30">Portfolio</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 border-t border-(--border) pt-12">
            <p className="text-xl text-(--muted) leading-snug">
              Intersection of{" "}
              <span className="text-(--foreground) font-medium">
                Heart, Mind, and Technology
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <main className="px-8 md:px-24 pb-48 space-y-48 max-w-7xl mx-auto">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${
              index % 2 ? "lg:flex-row-reverse" : "lg:flex-row"
            } gap-16 items-start`}
          >
            {/* IMAGE */}
            <div className="w-full lg:w-2/3 rounded-4xl overflow-hidden bg-(--card)">
              <div className="relative aspect-16/10 group">
                <img
                  src={project.image}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-105"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition" />

                {/* TAGS */}
                <div className="absolute top-6 right-6 flex gap-2">
                  <div className="flex items-center gap-2 bg-black/30 text-white px-3 py-1 rounded-full text-[10px]">
                    <Globe size={12} /> Global
                  </div>
                  <div className="flex items-center gap-2 bg-black/30 text-white px-3 py-1 rounded-full text-[10px]">
                    <Cpu size={12} /> Tech
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-blue-600 font-mono text-sm">
                  {project.id}
                </span>
                <div className="h-px flex-1 bg-(--border)" />
                <span className="text-xs opacity-40">{project.year}</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold italic leading-tight hover:text-blue-600 transition">
                {project.title}
              </h2>

              <p className="text-(--muted)">{project.description}</p>

              {/* IMPACT */}
              <div className="p-6 rounded-2xl bg-(--card) border border-(--border)">
                <div className="flex justify-between text-xs opacity-40 mb-2">
                  <span>Impact</span>
                  <ArrowUpRight size={14} />
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {project.impact}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs opacity-40">Partner</div>
                  <div className="font-semibold">{project.client}</div>
                </div>

                <Link
                  href={`/portfolios/${project.id}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-(--foreground) text-(--background) text-xs uppercase tracking-widest hover:bg-blue-600 transition"
                >
                  View <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </main>

      {/* CTA */}
      <section className="py-40 px-8 text-center bg-(--card) border-t border-(--border)">
        <h2 className="text-[8vw] font-black italic leading-none mb-6">
          Ready to <span className="text-blue-600">Transform?</span>
        </h2>

        <p className="text-(--muted) mb-10 max-w-xl mx-auto">
          We are accepting new strategic partnerships.
        </p>
        <Link href="/contact">
          <button className="px-10 py-5 rounded-full bg-(--foreground) text-(--background) text-xs uppercase tracking-widest hover:bg-blue-600 transition">
            Initialize Discovery
          </button>
        </Link>
      </section>
    </div>
  );
}
