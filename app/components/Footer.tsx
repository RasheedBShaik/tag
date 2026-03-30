import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div>
      {/* 6. MINIMAL FOOTER */}
      <footer className="py-16 px-6 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-black uppercase mb-6 text-blue-600 dark:text-blue-500">
              Contact
            </h4>
            <div className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4" /> +1 408 657 9877
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4" /> TheTAG.Partners@outlook.com
              </p>
              <p className="flex items-center gap-3 leading-relaxed">
                <MapPin className="w-4 h-4" /> 574 Rita Blanca Dr, Webster, TX
                77598
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase mb-6">Services</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Technology Advisory
              </span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Strategic Ventures
              </span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Design Studio
              </span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Culinary Arts
              </span>
            </div>
          </div>
          <div className="md:text-right flex flex-col justify-between">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
              © 2026 Tagventures.
            </p>
            <p className="text-[10px] text-zinc-400 mt-4 underline underline-offset-4 cursor-pointer">
              Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

{/* 6. MINIMAL FOOTER */}
      <footer className="py-16 px-6 border-t border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-black uppercase mb-6 text-blue-600 dark:text-blue-500">
              Contact
            </h4>
            <div className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
              <p className="flex items-center gap-3">
                <Phone className="w-4 h-4" /> +1 408 657 9877
              </p>
              <p className="flex items-center gap-3">
                <Mail className="w-4 h-4" /> TheTAG.Partners@outlook.com
              </p>
              <p className="flex items-center gap-3 leading-relaxed">
                <MapPin className="w-4 h-4" /> 574 Rita Blanca Dr, Webster, TX
                77598
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-black uppercase mb-6">Services</h4>
            <div className="grid grid-cols-1 gap-2 text-sm text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter">
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Technology Advisory
              </span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Strategic Ventures
              </span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Design Studio
              </span>
              <span className="hover:text-blue-600 cursor-pointer transition-colors">
                Culinary Arts
              </span>
            </div>
          </div>
          <div className="md:text-right flex flex-col justify-between">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
              © 2026 Tagventures.
            </p>
            <p className="text-[10px] text-zinc-400 mt-4 underline underline-offset-4 cursor-pointer">
              Privacy Policy | Terms of Service
            </p>
          </div>
        </div>
      </footer>
      export default Footer
