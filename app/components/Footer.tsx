import React from 'react'
import Link from 'next/link'
import { 
  FaPhone, 
  FaEnvelope, 
  FaLocationDot, 
  FaLinkedin, 
  FaXTwitter, 
  FaGithub,
  FaArrowUpRightFromSquare,
  FaCartShopping 
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-12 md:py-20 px-6 border-t border-zinc-200 dark:border-white/5 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden text-zinc-900 dark:text-white">
      {/* Background accent - subtle glow */}
      <div className="absolute top-0 right-0 w-[200px] md:w-75 h-50 md:h-75 bg-blue-600/5 blur-[80px] md:blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* TOP SECTION: VISION STATEMENT */}
        <div className="mb-12 md:mb-16 border-b border-zinc-100 dark:border-white/5 pb-8 md:pb-12 text-center sm:text-left">
          <h2 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tighter ">
            The Future is <span className="text-blue-600">Heart</span> + Mind + <br className="sm:hidden" />
            <span className="text-zinc-400 dark:text-zinc-600">Technology</span>
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16">
          
          {/* COLUMN 1: BRAND & CONTACT */}
          <div className="flex flex-col items-center sm:items-start space-y-6">
            <h4 className="font-black uppercase tracking-tighter text-xl italic">
              TAG<span className="text-blue-600">VENTURES</span>
            </h4>
            <div className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400 font-medium text-center sm:text-left">
              <a href="tel:+14086579877" className="flex items-center justify-center sm:justify-start gap-3 hover:text-blue-600 transition-colors">
                <FaPhone size={14} className="opacity-70" /> +1 408 657 9877
              </a>
              <a href="mailto:TheTAG.Partners@outlook.com" className="flex items-center justify-center sm:justify-start gap-3 hover:text-blue-600 transition-colors">
                <FaEnvelope size={14} className="opacity-70" /> TheTAG.Partners@outlook.com
              </a>
              <p className="flex items-start justify-center sm:justify-start gap-3 leading-relaxed">
                <FaLocationDot size={14} className="mt-1 opacity-70 shrink-0" /> 
                <span>574 Rita Blanca Dr, <br />Webster, TX 77598</span>
              </p>
            </div>
          </div>

          {/* COLUMN 2: SERVICES */}
          <div className="text-center sm:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-400 dark:text-zinc-600">
              Specialized Services
            </h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 uppercase font-bold tracking-tight">
              <li><Link href="/services/advisory" className="hover:text-blue-600 transition-colors">Technology Advisory</Link></li>
              <li><Link href="/services/strategic" className="hover:text-blue-600 transition-colors">Strategic Ventures</Link></li>
              <li><Link href="/services/design" className="hover:text-blue-600 transition-colors">Design Studio</Link></li>
              <li><Link href="/services/arts" className="hover:text-blue-600 transition-colors">Culinary Arts & Culture</Link></li>
              <li><Link href="/services/health" className="hover:text-blue-600 transition-colors">Health & Wellness</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: QUICK LINKS */}
          <div className="text-center sm:text-left">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-zinc-400 dark:text-zinc-600">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 font-bold uppercase tracking-tight">
              <li><Link href="/who-we-are" className="hover:text-blue-600 transition-colors">Who We Are</Link></li>
              <li><Link href="/approach" className="hover:text-blue-600 transition-colors">Our Approach</Link></li>
              <li><Link href="/insights" className="hover:text-blue-600 transition-colors">Insights</Link></li>
              <li><Link href="/portfolio" className="hover:text-blue-600 transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: CONNECT */}
          <div className="flex flex-col items-center sm:items-start space-y-8">
            <div className="text-center sm:text-left">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-zinc-400 dark:text-zinc-600">
                Connect
              </h4>
              <div className="flex gap-4 text-zinc-600 dark:text-zinc-400 justify-center sm:justify-start">
                <a 
                  href="https://www.linkedin.com/in/amithindurthi" 
                  className="p-2.5 rounded-lg bg-zinc-100 dark:bg-white/5 hover:text-blue-600 transition-all border border-transparent hover:border-blue-600/20" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={18} />
                </a>
                <a href="#" className="p-2.5 rounded-lg bg-zinc-100 dark:bg-white/5 hover:text-blue-600 transition-all border border-transparent hover:border-blue-600/20">
                  <FaXTwitter size={18} />
                </a>
                <a href="#" className="p-2.5 rounded-lg bg-zinc-100 dark:bg-white/5 hover:text-blue-600 transition-all border border-transparent hover:border-blue-600/20">
                  <FaGithub size={18} />
                </a>
              </div>
            </div>
            <Link 
              href="/contact" 
              className="group inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              Start a Venture <FaArrowUpRightFromSquare size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-8 border-t border-zinc-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest text-center">
            © {currentYear} TAGVENTURES. ALL SYSTEMS OPERATIONAL.
          </p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em]">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer