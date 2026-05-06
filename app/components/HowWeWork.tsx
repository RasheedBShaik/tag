"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Heart, Brain, Cpu, Zap, ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link"; // Note: lowercase 'link' is standard for Next.js

interface Step {
    id: string;
    label: string;
    title: string;
    text: string;
    Icon: LucideIcon; // Store the component reference here
    color: string;
    iconColorClass: string;
}

const steps: Step[] = [
    {
        id: "01",
        label: "Heart",
        title: "Discovery & Alignment",
        text: "We start by listening. Understanding your people, pressures, values, and ambitions before we look at a single system diagram.",
        Icon: Heart,
        color: "bg-rose-500/10",
        iconColorClass: "text-rose-500",
    },
    {
        id: "02",
        label: "Mind",
        title: "Strategy & Roadmap",
        text: "Discovery findings become a clear, prioritized roadmap with defined outcomes, investment levels, and decision criteria.",
        Icon: Brain,
        color: "bg-blue-500/10",
        iconColorClass: "text-blue-500",
    },
    {
        id: "03",
        label: "Technology",
        title: "Design & Implementation",
        text: "Architecture design, vendor selection, and hands-on implementation — with your team, not beside it.",
        Icon: Cpu,
        color: "bg-emerald-500/10",
        iconColorClass: "text-emerald-500",
    },
    {
        id: "04",
        label: "All Three",
        title: "Handoff & Evolution",
        text: "A structured transition using the No-Dependency Handover Protocol™, leaving your team fully equipped to own what we built.",
        Icon: Zap,
        color: "bg-amber-500/10",
        iconColorClass: "text-amber-500",
    },
];

const HowWeWork = () => {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <section ref={containerRef} className="relative py-32 bg-white dark:bg-zinc-950 transition-colors duration-500 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* HEADER SECTION */}
                <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <div className="h-px w-8 bg-blue-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">The Process</span>
                        </motion.div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] text-zinc-900 dark:text-white mb-8">
                            HOW WE <br />
                            WORK
                        </h2>
                    </div>
                    <div className="lg:pt-12">
                        <p className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 font-medium max-w-sm leading-tight">
                            From first conversation to <span className="text-zinc-900 dark:text-white italic">lasting impact.</span>
                        </p>
                    </div>
                </div>

                {/* TIMELINE SECTION */}
                <div className="relative">
                    <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2" />
                    <motion.div
                        style={{ scaleY, originY: 0 }}
                        className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-blue-600 -translate-x-1/2 z-10"
                    />

                    <div className="space-y-24 lg:space-y-40">
                        {steps.map((step, index) => {
                            // Destructure the component reference
                            const { Icon } = step; 
                            
                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`relative flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12 lg:gap-24`}
                                >
                                    <div className="w-full lg:w-1/2 pl-12 lg:pl-0">
                                        <div className="group relative p-8 md:p-12 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className={`p-3 rounded-2xl ${step.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                                                    {/* Render naturally with props */}
                                                    <Icon size={24} className={step.iconColorClass} />
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 group-hover:text-blue-600 transition-colors">
                                                    Stage {step.id} — {step.label}
                                                </span>
                                            </div>

                                            <h3 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">
                                                {step.title}
                                            </h3>
                                            <p className="text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">
                                                {step.text}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Node */}
                                    <div className="absolute left-4 lg:left-1/2 w-10 h-10 -translate-x-1/2 flex items-center justify-center z-20">
                                        <div className="w-4 h-4 rounded-full bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800" />
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            className="absolute w-2 h-2 rounded-full bg-blue-600"
                                        />
                                    </div>
                                    <div className="hidden lg:block lg:w-1/2" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* BOTTOM CTA */}
                <div className="mt-40 text-center">
                    <Link href="/contact" className="inline-block p-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 transition-transform hover:scale-105 active:scale-95">
                        <span className="block px-10 py-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-black uppercase tracking-widest rounded-full shadow-sm hover:bg-blue-600 hover:text-white transition-all">
                            Book Your Session
                        </span>
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default HowWeWork;