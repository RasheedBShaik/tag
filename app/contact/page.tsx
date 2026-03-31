"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactComponent() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative min-h-screen bg-[#F9F9F8] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <header className="mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-blue-600 mb-8"
          >
            <div className="h-px w-12 bg-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Initiate_Connection</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-[7vw] font-black tracking-tighter uppercase italic leading-[0.85] mb-10">
            Let's Start a <br /> 
            <span className="text-zinc-400 dark:text-zinc-800 transition-colors hover:text-blue-600 duration-500 italic">Conversation.</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed">
            Whether you're a founder with a bold idea or an enterprise leader driving transformation, we're here to architect the next phase of your evolution.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT: CONTACT DETAILS */}
          <aside className="lg:col-span-4 flex flex-col justify-between py-4">
            <div className="space-y-12">
              <ContactItem 
                label="Registry_Email" 
                value="TheTAG.Partners@outlook.com" 
                icon={<Mail size={18} />} 
                isEmail 
              />
              <ContactItem 
                label="Secure_Line" 
                value="+1 408 657 9877" 
                icon={<Phone size={18} />} 
              />
              <ContactItem 
                label="Physical_Node" 
                value={<>574 Rita Blanca Dr, <br /> Webster, TX 77598</>} 
                icon={<MapPin size={18} />} 
              />
            </div>

            <div className="hidden lg:block pt-12 border-t border-zinc-200 dark:border-white/5 mt-12">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Availability: 09:00 - 18:00 CST</p>
            </div>
          </aside>

          {/* RIGHT: THE INTERACTIVE FORM */}
          {/* Light Theme: Pure white, crisp border, elegant shadow */}
          <div className="lg:col-span-8 bg-white dark:bg-white/2 p-8 md:p-16 rounded-4xl border border-zinc-200 dark:border-white/10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-none">
            
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <InputField label="Full Name *" type="text" required />
                  <InputField label="Work Email *" type="email" required />
                </div>

                <div className="relative group border-b border-zinc-200 dark:border-white/10 focus-within:border-blue-600 transition-all duration-300">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-blue-600">Inquiry Type *</label>
                  <select required className="w-full bg-transparent py-4 outline-none text-lg font-bold uppercase appearance-none cursor-pointer text-zinc-900 dark:text-white">
                    <option className="bg-white dark:bg-zinc-950">Technology Advisory</option>
                    <option className="bg-white dark:bg-zinc-950">Strategic Ventures</option>
                    <option className="bg-white dark:bg-zinc-950">Design Studio</option>
                    <option className="bg-white dark:bg-zinc-950">General Inquiry</option>
                  </select>
                  <div className="absolute right-0 bottom-6 pointer-events-none text-zinc-300 group-focus-within:text-blue-600 transition-colors">
                    <ArrowRight className="rotate-90" size={16} />
                  </div>
                </div>

                <div className="relative group border-b border-zinc-200 dark:border-white/10 focus-within:border-blue-600 transition-all duration-300">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-blue-600">Message *</label>
                  <textarea required rows={4} className="w-full bg-transparent py-4 outline-none text-lg font-medium resize-none text-zinc-900 dark:text-white placeholder:text-zinc-300" placeholder="HOW CAN WE ASSIST?" />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="group flex items-center gap-6 bg-zinc-900 dark:bg-white text-white dark:text-black px-10 py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                >
                  Send_Inquiry <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </motion.button>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-100 flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-black uppercase italic tracking-tighter">Transmission Sent.</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto font-medium">Your data packet has been successfully received. Our team will respond within 24 cycles.</p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="text-[10px] font-black uppercase tracking-widest text-blue-600 border-b-2 border-blue-600 pb-1 hover:opacity-70 transition-opacity"
                >
                  New Transmission
                </button>
              </motion.div>
            )}

            {/* DECORATIVE BACKGROUND GRID - Lowered opacity for cleaner light mode */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05]" 
              style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function ContactItem({ label, value, icon, isEmail = false }: any) {
  return (
    <div className="group cursor-pointer">
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 block group-hover:text-blue-600 transition-colors">{label}</span>
      <div className="flex items-start gap-4 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">
        <div className="mt-1 text-zinc-300 dark:text-zinc-700 group-hover:text-blue-600 transition-colors">
          {icon}
        </div>
        <span className={`text-lg font-bold tracking-tight uppercase leading-snug ${isEmail ? 'underline underline-offset-8 decoration-zinc-200 dark:decoration-zinc-800 group-hover:decoration-blue-600' : ''}`}>
          {value}
        </span>
      </div>
    </div>
  );
}

function InputField({ label, ...props }: any) {
  return (
    <div className="relative group border-b border-zinc-200 dark:border-white/10 focus-within:border-blue-600 transition-all duration-300">
      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-blue-600 transition-colors">
        {label}
      </label>
      <input 
        {...props}
        className="w-full bg-transparent py-4 outline-none text-lg font-bold uppercase transition-all text-zinc-900 dark:text-white placeholder:text-zinc-200" 
      />
    </div>
  );
}