"use client";

import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    { name: "Tech Advisory & Consulting", slug: "/services/advisory" },
    { name: "Strategic Ventures & Partnership", slug: "/services/strategic" },
    { name: "Design Studio", slug: "/services/design" },
    { name: "Culinary Arts & Culture", slug: "/services/arts" },
    { name: "Health & Wellness", slug: "/services/health" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who We Are", href: "/who-we-are" },
    { name: "Our Approach", href: "/approach" },
    { name: "Insights", href: "/insights" },
    { name: "Portfolio", href: "/portfolio" },
  ];

  if (!mounted) return <div className="h-20" />;

  return (
    <nav className="fixed top-0 w-full z-100 transition-all duration-500">
      <div className="px-6 py-4 dark:bg-zinc-950/80 bg-white/80 backdrop-blur-xl border-b dark:border-white/10 border-zinc-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* 1. LOGO */}
          <Link href="/" className="group flex items-center gap-2">
            <span className="text-xl font-black uppercase tracking-tighter dark:text-zinc-50 text-zinc-950">
              The TAG <span className="text-blue-600 group-hover:text-blue-500 transition-colors">V.P.</span>
            </span>
          </Link>

          {/* 2. DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8 mr-8">
            {navLinks.slice(0, 3).map((link) => (
              <Link key={link.name} href={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}

            {/* SERVICES DROPDOWN */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="nav-link flex items-center gap-1.5 cursor-default">
                Our Services 
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full -left-4 pt-4 w-72"
                  >
                    <div className="bg-white dark:bg-zinc-900 border dark:border-white/10 border-zinc-200 rounded-2xl shadow-2xl p-2">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.slug}
                          className="block px-4 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-zinc-50 dark:hover:bg-white/5 rounded-xl transition-all"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(3).map((link) => (
              <Link key={link.name} href={link.href} className="nav-link">
                {link.name}
              </Link>
            ))}
          </div>

          {/* 3. CONTROLS */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-10 h-10 rounded-full border dark:border-white/10 border-zinc-200 dark:bg-white/5 bg-zinc-100 hover:border-blue-500 transition-all active:scale-90"
            >
              {theme === "dark" ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-blue-600" />}
            </button>

            <button 
              className="lg:hidden p-2.5 rounded-full dark:bg-white/5 bg-zinc-100 border dark:border-white/10 border-zinc-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="fixed inset-0 top-18.25 w-full dark:bg-zinc-950 bg-white lg:hidden overflow-y-auto"
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.05 } }
              }}
              className="p-8 flex flex-col gap-8"
            >
              {navLinks.slice(0, 3).map((link) => (
                <motion.div key={link.name} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="mobile-nav-link">
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600">Our Services</p>
                <div className="grid grid-cols-1 gap-5 pl-4 border-l-2 border-zinc-100 dark:border-white/5">
                  {services.map((service) => (
                    <Link 
                      key={service.name} 
                      href={service.slug} 
                      onClick={() => setIsOpen(false)} 
                      className="text-xl font-bold dark:text-zinc-400 text-zinc-600 hover:text-blue-500 transition-colors"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.slice(3).map((link) => (
                <motion.div key={link.name} variants={{ hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0 } }}>
                  <Link href={link.href} onClick={() => setIsOpen(false)} className="mobile-nav-link">
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .nav-link {
          @apply text-[10px] font-black uppercase tracking-[0.3em] dark:text-zinc-400 text-zinc-500 hover:text-blue-600 dark:hover:text-blue-500 transition-all relative;
        }
        .mobile-nav-link {
          @apply text-3xl font-black uppercase tracking-tighter dark:text-zinc-50 text-zinc-950;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;