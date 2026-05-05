"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactComponent() {
  const [submitted, setSubmitted] = useState(false);

  // Google Maps URL for the specific address
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=574+Rita+Blanca+Dr,+Webster,+TX+77598";

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
          
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter uppercase mb-10">
            Let's Start a <br /> 
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-blue-500 to-indigo-400 dark:from-blue-500 dark:to-zinc-400">
              conversation
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed">
            Whether you're a founder with a bold idea or an enterprise leader driving transformation, we're here to architect the next phase of your evolution.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* LEFT: CONTACT DETAILS & MAP */}
          <aside className="lg:col-span-4 space-y-12 py-4">
            <div className="space-y-12">
              <ContactItem 
                label="Registry_Email" 
                value="TheTAG.Partners@outlook.com" 
                icon={<Mail size={18} />} 
                isEmail 
                href="mailto:TheTAG.Partners@outlook.com"
              />
              <ContactItem 
                label="Secure_Line" 
                value="+1 408 657 9877" 
                icon={<Phone size={18} />} 
                href="tel:+14086579877"
              />
              <ContactItem 
                label="Physical_Node" 
                value={<>574 Rita Blanca Dr, <br /> Webster, TX 77598</>} 
                icon={<MapPin size={18} />} 
                href={mapUrl}
              />
            </div>

            {/* INTERACTIVE MINI MAP PREVIEW */}
            <motion.a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="relative block w-full h-48 md:h-64 rounded-3xl overflow-hidden border border-zinc-200 dark:border-white/10 group md:grayscale hover:grayscale-0 transition-all duration-700"
            >
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.6375046200216!2d-95.1235123!3d29.5413146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86409ba555555555%3A0x1d4a0a0a0a0a0a0a!2s574%20Rita%20Blanca%20Dr%2C%20Webster%2C%20TX%2077598!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
                className="w-full h-full border-0 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 bg-white dark:bg-zinc-900 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 group-hover:bg-blue-600 group-hover:text-white transition-all">
                Open Maps <ArrowRight size={12} />
              </div>
            </motion.a>

            <div className="hidden lg:block pt-12 border-t border-zinc-200 dark:border-white/5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Availability: 09:00 - 18:00 CST</p>
            </div>
          </aside>

          {/* RIGHT: THE INTERACTIVE FORM */}
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

            <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.05]" 
              style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ label, value, icon, isEmail = false, href }: any) {
  const Wrapper = href ? "a" : "div";
  
  return (
    <Wrapper 
      href={href} 
      target={href?.startsWith('http') ? "_blank" : undefined}
      className="group cursor-pointer block"
    >
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4 block group-hover:text-blue-600 transition-colors">{label}</span>
      <div className="flex items-start gap-4 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 transition-colors">
        <div className="mt-1 text-zinc-300 dark:text-zinc-700 group-hover:text-blue-600 transition-colors">
          {icon}
        </div>
        <span className={`text-lg font-bold tracking-tight uppercase leading-snug ${isEmail || href ? 'underline underline-offset-8 decoration-zinc-200 dark:decoration-zinc-800 group-hover:decoration-blue-600' : ''}`}>
          {value}
        </span>
      </div>
    </Wrapper>
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