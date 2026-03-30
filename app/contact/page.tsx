"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactComponent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Add logic for form submission here
  };

  return (
    <section className="relative min-h-screen bg-white dark:bg-bg-dark text-zinc-900 dark:text-zinc-100 py-32 px-8 md:px-24">
      <div className="max-w-350 mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-blue-600 mb-6"
          >
            <div className="h-px w-10 bg-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Initiate_Connection</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-[8vw] font-black tracking-tighter uppercase italic leading-[0.8] mb-8">
            Let's Start a <br /> 
            <span className="text-zinc-200 dark:text-zinc-800 transition-colors">Conversation.</span>
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed">
            Whether you're a founder with a bold idea or an enterprise leader driving transformation, we're here to architect the next phase.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* LEFT: CONTACT DETAILS & DATA */}
          <aside className="lg:col-span-4 space-y-16">
            <div className="space-y-12">
              <div className="group cursor-pointer">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-4 block">Registry_Email</span>
                <div className="flex items-center gap-4 group-hover:text-blue-600 transition-colors">
                  <Mail size={20} className="opacity-40" />
                  <span className="text-lg font-bold tracking-tight uppercase underline underline-offset-8 decoration-zinc-200 dark:decoration-zinc-800 group-hover:decoration-blue-600 transition-all">
                    TheTAG.Partners@outlook.com
                  </span>
                </div>
              </div>

              <div className="group cursor-pointer">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-4 block">Secure_Line</span>
                <div className="flex items-center gap-4 group-hover:text-blue-600 transition-colors">
                  <Phone size={20} className="opacity-40" />
                  <span className="text-lg font-bold tracking-tight uppercase">+1 408 657 9877</span>
                </div>
              </div>

              <div className="group cursor-pointer">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-40 mb-4 block">Physical_Node</span>
                <div className="flex items-start gap-4 group-hover:text-blue-600 transition-colors">
                  <MapPin size={20} className="opacity-40 mt-1" />
                  <span className="text-lg font-bold tracking-tight uppercase leading-snug">
                    574 Rita Blanca Dr, <br /> Webster, TX 77598
                  </span>
                </div>
              </div>
            </div>
            
          </aside>

          {/* RIGHT: THE INTERACTIVE FORM */}
          <div className="lg:col-span-8 bg-zinc-50 dark:bg-white/2 p-8 md:p-16 rounded-[3rem] border border-zinc-100 dark:border-white/5 relative overflow-hidden">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <label className="text-[9px] font-black uppercase tracking-widest opacity-40 group-focus-within:text-blue-600 transition-colors">Full Name *</label>
                    <input required type="text" className="w-full bg-transparent border-b border-zinc-200 dark:border-white/10 py-4 focus:border-blue-600 outline-none transition-all text-lg font-medium" />
                  </div>
                  <div className="relative group">
                    <label className="text-[9px] font-black uppercase tracking-widest opacity-40 group-focus-within:text-blue-600 transition-colors">Work Email *</label>
                    <input required type="email" className="w-full bg-transparent border-b border-zinc-200 dark:border-white/10 py-4 focus:border-blue-600 outline-none transition-all text-lg font-medium" />
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[9px] font-black uppercase tracking-widest opacity-40 group-focus-within:text-blue-600 transition-colors">Inquiry Type *</label>
                  <select className="w-full bg-transparent border-b border-zinc-200 dark:border-white/10 py-4 focus:border-blue-600 outline-none transition-all text-lg font-medium appearance-none">
                    <option className="bg-white dark:bg-black">Technology Advisory & Consulting</option>
                    <option className="bg-white dark:bg-black">Strategic Ventures & Partnerships</option>
                    <option className="bg-white dark:bg-black">Design Studio</option>
                    <option className="bg-white dark:bg-black">General Inquiry</option>
                  </select>
                </div>

                <div className="relative group">
                  <label className="text-[9px] font-black uppercase tracking-widest opacity-40 group-focus-within:text-blue-600 transition-colors">Message *</label>
                  <textarea rows={4} className="w-full bg-transparent border-b border-zinc-200 dark:border-white/10 py-4 focus:border-blue-600 outline-none transition-all text-lg font-medium resize-none" />
                </div>

                <button type="submit" className="group flex items-center gap-6 bg-zinc-900 dark:bg-white text-white dark:text-black px-12 py-6 rounded-full text-xs font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all shadow-xl shadow-blue-500/0 hover:shadow-blue-500/20">
                  Send_Inquiry <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-125 flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter">Transmission Sent.</h3>
                <p className="text-zinc-500 max-w-xs font-medium">Your data packet has been successfully received. Our team will decrypt and respond within 24 cycles.</p>
                <button onClick={() => setSubmitted(false)} className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">New Transmission</button>
              </motion.div>
            )}

            {/* DECORATIVE BACKGROUND GRID */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]" 
              style={{ backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`, backgroundSize: '30px 30px' }} 
            />
          </div>

        </div>
      </div>
    </section>
  );
}