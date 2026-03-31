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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

  const leftLinks = [
    { name: "Home", href: "/" },
    { name: "Who We Are", href: "/who-we-are" },
    { name: "our approach", href: "/approach" },
  ];
  const rightLinks = [
    { name: "Insights", href: "/insights" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  if (!mounted) return <div className="h-20" />;

  return (
    <nav className="fixed top-0 w-full z-200 pb-4"> {/* increased z-index */}
      <div className="px-6 py-3 border dark:bg-zinc-950/80 bg-white/80 backdrop-blur-xl border-zinc-200 dark:border-white/10 shadow-lg transition-all duration-500">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <Link href="/" className="group flex items-center gap-2 outline-none">
            <span className="text-lg md:text-xl font-black uppercase tracking-tighter dark:text-zinc-50 text-zinc-950 italic">
              TAG<span className="text-blue-600 group-hover:text-blue-500 transition-colors">VENTURES</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1" onMouseLeave={() => setHoveredPath(null)}>
            {leftLinks.map((link) => (
              <NavLink 
                key={link.name} 
                link={link} 
                pathname={pathname} 
                hoveredPath={hoveredPath} 
                setHoveredPath={setHoveredPath} 
              />
            ))}

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
                            <motion.span initial={{ x: -5, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }}>→</motion.span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {rightLinks.map((link) => (
              <NavLink 
                key={link.name} 
                link={link} 
                pathname={pathname} 
                hoveredPath={hoveredPath} 
                setHoveredPath={setHoveredPath} 
              />
            ))}
          </div>

          {/* Controls always above */}
          <div className="relative z-300 flex items-center gap-2 md:gap-4">
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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-150 lg:hidden"
            onClick={() => setIsOpen(false)} // click anywhere closes
          >
            {/* Overlay */}
            <div className="absolute inset-0 mt-20" />

            {/* Menu panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
              className="absolute right-0 top-15 w-full h-full dark:bg-zinc-950 bg-white pt-8 px-8"
            >
              <div className="flex flex-col gap-4 max-w-md ">
                {leftLinks.map((link) => (
                  <MobileNavLink key={link.name} link={link} pathname={pathname} setIsOpen={setIsOpen} />
                ))}

                <div className="flex flex-col border-y border-zinc-100 dark:border-white/5 py-2">
                  <button 
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between text-2xl font-semibold uppercase tracking-tighter py-2 dark:text-zinc-50 text-zinc-950"
                  >
                    Services
                    <FaChevronDown className={`transition-transform duration-300 text-blue-600 ${mobileServicesOpen ? "rotate-180" : ""}`} size={20} />
                  </button>
                  
                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-3 pl-4 pt-2 pb-4"
                      >
                        {services.map((service) => (
                          <Link 
                            key={service.name} 
                            href={service.slug} 
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 active:text-blue-600"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {rightLinks.map((link) => (
                  <MobileNavLink key={link.name} link={link} pathname={pathname} setIsOpen={setIsOpen} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* Helper Components */

const NavLink = ({ link, pathname, hoveredPath, setHoveredPath }: any) => {
  const isActive = pathname === link.href;
  return (
    <Link 
      href={link.href} 
      onMouseEnter={() => setHoveredPath(link.href)}
      className={`relative px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] transition-colors duration-300 outline-none
        ${isActive ? "text-blue-600" : "dark:text-zinc-400 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"}`}
    >
      <span className="relative z-10">{link.name}</span>
      {hoveredPath === link.href && (
        <motion.div
          layoutId="nav-hover"
          className="absolute inset-0 bg-zinc-100 dark:bg-white/5 rounded-lg z-0"
        />
      )}
      {isActive && (
        <motion.div 
          layoutId="nav-active-line"
          className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600" 
        />
      )}
    </Link>
  );
};

const MobileNavLink = ({ link, pathname, setIsOpen }: any) => (
  <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
    <Link 
      href={link.href} 
      onClick={() => setIsOpen(false)} 
      className={`text-2xl font-semibold uppercase tracking-tighter py-2 block ${
        pathname === link.href ? "text-blue-600" : "dark:text-zinc-50 text-zinc-950"
      }`}
    >
      {link.name}
    </Link>
  </motion.div>
);

export default Navbar;