"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, ChevronDown } from "lucide-react";

interface EngagementCardProps {
  badge: string;
  title: string;
  description: string;
  actionText: string;
  href: string;
}

interface ContactItemProps {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  isEmail?: boolean;
  href?: string;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function ContactComponent() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedInquiry, setSelectedInquiry] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const mapUrl = "https://www.google.com/maps/search/?api=1&query=574+Rita+Blanca+Dr,+Webster,+TX+77598";

  const inquiryTypes = [
    { id: "tech-advisory", name: "Technology Advisory" },
    { id: "strategic-ventures", name: "Strategic Ventures" },
    { id: "design-studio", name: "Design Studio" },
    { id: "general", name: "General Inquiry" },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Web3Forms Asynchronous Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // Hardcoded Access Key as requested
    formData.append("access_key", "6135fd65-d59d-4833-8748-097c2213dce7");
    
    // Appending the Inquiry Type from custom dropdown state if selected
    const currentInquiry = inquiryTypes.find(p => p.id === selectedInquiry)?.name || "Not Specified";
    formData.append("inquiry_type", currentInquiry);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        // Clear inquiry type state on success
        setSelectedInquiry(""); 
      } else {
        console.error("Web3Forms submission error:", data);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form network error:", error);
      alert("Network error. Please verify your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#F9F9F8] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col justify-between overflow-x-hidden select-none">
      <div className="w-full max-w-[1400px] mx-auto space-y-24">
        
        {/* LAYER 1: TOP BRAND IDENTIFICATION */}
        <header className="max-w-4xl space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-blue-600 dark:text-blue-500"
          >
            <div className="h-px w-12 bg-current" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Initiate Connection</span>
          </motion.div>
          
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            Start a <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 dark:from-blue-500 dark:to-zinc-400">
              conversation
            </span>
          </h1>
          
          <p className="text-md md:text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed max-w-3xl">
            No pitch decks. No intake forms. No CRM sequence. A founding principal reads every message, responds within 48 hours, and gives you an honest read on whether and how we can help.
          </p>
        </header>

        {/* LAYER 2: INTERACTIVE FORM & LOGISTICS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-stretch border-t border-zinc-200 dark:border-zinc-900 pt-16">
          
          {/* LEFT: COMMUNICATIONS & MAP EMBED */}
          <aside className="lg:col-span-5 flex flex-col justify-between space-y-12">
            <div className="space-y-10">
              <ContactItem 
                label="Registry_Email" 
                value="partners@th3tag.com" 
                icon={<Mail size={18} />} 
                isEmail 
                href="mailto:partners@th3tag.com"
              />
              <ContactItem 
                label="Secure_Line" 
                value="+1 408 657 9877" 
                icon={<Phone size={18} />} 
                href="tel:+14086579877"
              />
              <ContactItem 
                label="Physical_Node" 
                value={<>574 Rita Blanca Dr, <br /> Webster TX 77598</>} 
                icon={<MapPin size={18} />} 
                href={mapUrl}
              />
            </div>

            {/* INTERACTIVE MINI MAP PREVIEW */}
            <motion.a 
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative block w-full h-48 md:h-56 rounded-[2rem] overflow-hidden border border-zinc-200 dark:border-zinc-900 group md:grayscale hover:grayscale-0 transition-all duration-700 shadow-sm"
            >
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.6375046200216!2d-95.1235123!3d29.5413146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86409ba555555555%3A0x1d4a0a0a0a0a0a0a!2s574%20Rita%20Blanca%20Dr%2C%20Webster%2C%20TX%2077598!5e0!3m2!1sen!2sus!4v1715000000000!5m2!1sen!2sus"
                className="w-full h-full border-0 pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2 group-hover:bg-blue-600 group-hover:text-white transition-all">
                Open Maps <ArrowRight size={11} />
              </div>
            </motion.a>

            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-900/60">
              <div>
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-0.5">Response Latency</span>
                <p className="text-[11px] font-bold uppercase text-zinc-800 dark:text-zinc-200">Within 48 hours</p>
              </div>
              <div>
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-0.5">Availability</span>
                <p className="text-[11px] font-bold uppercase text-blue-600 dark:text-blue-400">Booking Q3 2026</p>
              </div>
            </div>
          </aside>

          {/* RIGHT: DYNAMIC INPUT MODULE */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900/40 backdrop-blur-md p-8 md:p-12 xl:p-14 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-900 relative overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.015)] dark:shadow-none flex flex-col justify-center">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10 w-full">
                
                {/* Honeypot Spam Protection for Web3Forms */}
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 border-b border-zinc-100 dark:border-zinc-900 pb-4">
                  Project Parameter Inbound
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <InputField label="Full Name *" type="text" name="name" required />
                  <InputField label="Work Email *" type="email" name="email" required />
                </div>

                {/* PREMIUM CUSTOM ANCHORED SELECT */}
                <div ref={dropdownRef} className="relative border-b border-zinc-200 dark:border-zinc-900 focus-within:border-blue-600 transition-all duration-300">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block mb-1">
                    Inquiry Type *
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-transparent py-4 text-left text-lg font-bold uppercase flex items-center justify-between text-zinc-900 dark:text-white"
                  >
                    <span className={selectedInquiry ? "text-zinc-900 dark:text-white" : "text-zinc-300 dark:text-zinc-700"}>
                      {selectedInquiry ? inquiryTypes.find(p => p.id === selectedInquiry)?.name : "Select one..."}
                    </span>
                    <ChevronDown size={16} className={`text-zinc-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 left-0 right-0 top-full mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
                      >
                        {inquiryTypes.map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => {
                              setSelectedInquiry(type.id);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full text-left px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            {type.name}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative group border-b border-zinc-200 dark:border-zinc-900 focus-within:border-blue-600 transition-all duration-300">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 group-focus-within:text-blue-600 transition-colors">Message *</label>
                  <textarea name="message" required rows={3} className="w-full bg-transparent py-4 outline-none text-lg font-medium resize-none text-zinc-900 dark:text-white placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:placeholder:opacity-0 transition-all" placeholder="HOW CAN WE ASSIST?" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-2">
                  <motion.button 
                    whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                    type="submit" 
                    disabled={isSubmitting}
                    className="group flex items-center justify-center gap-6 bg-zinc-900 dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-md whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending..." : "Send Inquiry"} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                  
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium max-w-xs leading-relaxed">
                    Information routed into encrypted founding architectures. Identity values remain fully private.
                  </p>
                </div>
              </form>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-[400px] flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white dark:text-zinc-950 rounded-full flex items-center justify-center shadow-md">
                  <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Message Sent.</h3>
                  <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto text-xs font-medium">Your data packet has been successfully received. Response sequence active within 24 cycles.</p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 pb-0.5 hover:opacity-75 transition-all"
                >
                  New Message
                </button>
              </motion.div>
            )}

            {/* BG RADIAL LAYER GRID */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]" 
              style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '32px 32px' }} 
            />
          </div>
        </div>

        {/* LAYER 3: THREE WAYS TO ENGAGE SYSTEM ARTIFACTS */}
        <div className="space-y-8 border-t border-zinc-200 dark:border-zinc-900 pt-16">
          <div className="flex flex-col space-y-1">
            <span className="text-3xl   font-black uppercase tracking-[0.4em] dark:text-white block">
              Three Ways to Start
            </span>
            <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Choose the path that fits where you are.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            <EngagementCard 
              badge="Free · 30 Minutes"
              title="Discovery Call"
              description="We listen to the actual problem and give you an honest read on fit, model, and timeline. No pitch — from either side."
              actionText="Book a call"
              href="#"
            />
            <EngagementCard 
              badge="2–4 Week Sprint · Fixed Fee"
              title="Rapid Diagnostic"
              description="A scoped assessment of one domain — technology spend, venture readiness, brand, or program design. Findings and prioritized recommendations."
              actionText="Request a diagnostic"
              href="#"
            />
            <EngagementCard 
              badge="Direct Access"
              title="Email the Principals"
              description="Read directly by a founding principal. No assistant, no auto-reply workflow, no complex intake sequence parameters."
              actionText="partners@th3tag.com"
              href="mailto:partners@th3tag.com"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

function EngagementCard({ badge, title, description, actionText, href }: EngagementCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-zinc-900 rounded-[2rem] p-6 flex flex-col justify-between space-y-6 shadow-[0_4px_25px_rgba(0,0,0,0.005)] hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 w-full group">
      <div className="space-y-3">
        <span className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-md inline-block">
          {badge}
        </span>
        <h3 className="text-sm font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-tight">{title}</h3>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium leading-relaxed">{description}</p>
      </div>
      <a 
        href={href} 
        className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 underline-offset-4 w-fit pt-2"
      >
        {actionText} <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  );
}

function ContactItem({ label, value, icon, isEmail = false, href }: ContactItemProps) {
  const Wrapper = href ? "a" : "div";
  
  return (
    <Wrapper 
      href={href} 
      target={href?.startsWith('http') ? "_blank" : undefined}
      rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
      className="group cursor-pointer block"
    >
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500 mb-2 block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{label}</span>
      <div className="flex items-start gap-4 text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        <div className="mt-1 text-zinc-300 dark:text-zinc-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {icon}
        </div>
        <span className={`text-lg font-bold tracking-tight uppercase leading-snug ${isEmail || href ? 'underline underline-offset-8 decoration-zinc-200 dark:decoration-zinc-900 group-hover:decoration-blue-600 dark:group-hover:decoration-blue-400' : ''}`}>
          {value}
        </span>
      </div>
    </Wrapper>
  );
}

function InputField({ label, ...props }: InputFieldProps) {
  return (
    <div className="relative group border-b border-zinc-200 dark:border-zinc-900 focus-within:border-blue-600 dark:focus-within:border-blue-500 transition-all duration-300 w-full">
      <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 group-focus-within:text-blue-600 dark:group-focus-within:text-blue-500 transition-colors">
        {label}
      </label>
      <input 
        {...props}
        className="w-full bg-transparent py-3 outline-none text-lg font-bold uppercase transition-all text-zinc-900 dark:text-white placeholder:text-zinc-200 dark:placeholder:text-zinc-800 focus:outline-none" 
      />
    </div>
  );
}