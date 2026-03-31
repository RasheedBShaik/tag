"use client";

import React, { useState, useEffect } from "react";
import { FaChevronDown, FaSun, FaMoon, FaBars, FaXmark } from "react-icons/fa6"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    { name: "Technology Advisory", slug: "/services/advisory" },
    { name: "Strategic Ventures", slug: "/services/strategic" },
    { name: "Design Studio", slug: "/services/design" },
    { name: "Culinary Arts", slug: "/services/arts" },
    { name: "Health & Wellness", slug: "/services/health" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Who We Are", href: "/who-we-are" },
    { name: "Insights", href: "/insights" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  if (!mounted) return <div className="h-20" />;

  return (
    <nav className="fixed top-0 w-full z-100 pb-4">
      <div className="px-6 py-3 border dark:bg-zinc-950/80 bg-white/80 backdrop-blur-xl border-zinc-200 dark:border-white/10 shadow-lg transition-all duration-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* LOGO */}
          <Link href="/" className="group flex items-center gap-2 outline-none">
            <span className="text-lg md:text-xl font-black uppercase tracking-tighter dark:text-zinc-50 text-zinc-950 italic">
              TAG<span className="text-blue-600 group-hover:text-blue-500 transition-colors">VENTURES</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2" onMouseLeave={() => setHoveredPath(null)}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={`relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-300 outline-none
                    ${isActive ? "text-blue-600" : "dark:text-zinc-400 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
                >
                  <span className="relative z-10">{link.name}</span>
                  
                  {/* HOVER EFFECT: Sliding background capsule */}
                  {hoveredPath === link.href && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-zinc-100 dark:bg-white/5 rounded-lg z-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  {/* ACTIVE EFFECT: Glowing underline */}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active-line"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]" 
                    />
                  )}
                </Link>
              );
            })}

            {/* SERVICES DROPDOWN */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] flex items-center gap-2 outline-none transition-colors 
                ${pathname.includes('/services') ? "text-blue-600" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}>
                <span>Services</span>
                <FaChevronDown className={`w-2 h-2 transition-transform duration-300 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-0 pt-2 w-72"
                  >
                    <div className="bg-white dark:bg-zinc-900 border dark:border-white/10 border-zinc-200 rounded-xl shadow-2xl p-2 overflow-hidden">
                      {services.map((service) => (
                        <Link
                          key={service.name}
                          href={service.slug}
                          className="group block px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 hover:bg-zinc-50 dark:hover:bg-white/5 rounded-lg transition-all"
                        >
                          <span className="flex items-center justify-between">
                            {service.name}
                            <motion.span 
                              initial={{ x: -5, opacity: 0 }}
                              whileHover={{ x: 0, opacity: 1 }}
                            >→</motion.span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="flex items-center gap-2 md:gap-4">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center w-10 h-10 rounded-full border dark:border-white/10 border-zinc-200 dark:bg-white/5 bg-white hover:border-blue-500 transition-all shadow-sm"
            >
              {theme === "dark" ? <FaSun size={14} className="text-amber-400" /> : <FaMoon size={14} className="text-blue-600" />}
            </motion.button>

            <button 
              className="lg:hidden p-2.5 rounded-xl dark:bg-white/5 bg-white border dark:border-white/10 border-zinc-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <FaXmark size={18} /> : <FaBars size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (Enhanced with slide-in items) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-0 w-full h-screen dark:bg-zinc-950 bg-white lg:hidden z-99 pt-24 px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                >
                  <Link 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className={`text-3xl font-black uppercase tracking-tighter ${
                      pathname === link.href ? "text-blue-600" : "dark:text-zinc-50 text-zinc-950"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;