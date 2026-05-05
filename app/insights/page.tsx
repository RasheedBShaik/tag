"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// 1. Added ArrowRight to imports
import { Zap, Loader2, Search, X, ChevronDown, FilterX, ArrowRight } from "lucide-react";
// 2. Added Link import from Next.js
import Link from "next/link";
import { client } from "../../sanity/lib/client"; 

/* ---------------------- TYPES ---------------------- */

interface Insight {
  title: string;
  slug: { current: string };
  publishedAt: string;
  summary: string;
  sector: string;
  tags: string[];
  coverImage: string;
  readTime: string;
}

const SECTOR_LABELS: Record<string, string> = {
  "All": "All Sectors",
  "technology-advisory": "Technology Advisory",
  "strategic-ventures": "Strategic Ventures",
  "design-studio": "Design Studio",
  "culinary-arts": "Culinary Arts",
  "health-wellness": "Health and Wellness",
  "research-development": "Research & Development",
  "other": "Other / General",
};

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 500], [0, -100]);
  const headerOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  useEffect(() => {
    setMounted(true);
    const fetchInsights = async () => {
      try {
        const query = `*[_type == "insights"] | order(publishedAt desc) {
          title, slug, publishedAt, summary, sector, tags,
          "coverImage": coverImage.asset->url,
          body
        }`;
        const data = await client.fetch(query);
        
        const formattedData = data.map((item: any) => {
          const rawSector = item.sector || "other";
          const cleanSector = rawSector
            .replace(/[^a-zA-Z0-9-]/g, '') 
            .trim()
            .toLowerCase();

          return {
            ...item,
            sector: cleanSector,
            readTime: `${Math.ceil((JSON.stringify(item.body || "").length / 5) / 200) + 2} min`
          };
        });

        setInsights(formattedData);
      } catch (err) {
        console.error("Sanity Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, []);

  const filteredArticles = useMemo(() => {
    return insights.filter((article) => {
      const activeFilter = filter.replace(/[^a-zA-Z0-9-]/g, '').trim();
      const matchesSector = activeFilter === "All" || article.sector === activeFilter;
      const normalizedSearch = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        normalizedSearch === "" ||
        article.title.toLowerCase().includes(normalizedSearch) ||
        article.summary.toLowerCase().includes(normalizedSearch);
      
      return matchesSector && matchesSearch;
    });
  }, [insights, filter, searchQuery]);

  if (!mounted) return <div className="min-h-screen bg-[#0a0a0a]" />;

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-700">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] md:min-h-[78vh] flex flex-col justify-end overflow-hidden border-b border-zinc-200 dark:border-white/10">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover brightness-50"
          >
            <source src="/insights/insights.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10" />
        </div>

        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }} 
          className="relative z-20 px-6 md:px-24 pb-16 max-w-7xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-9xl font-black uppercase text-white leading-[0.85] tracking-tighter">
              Perspective <br/>
              <span className="text-blue-500 inline-block mt-2">& Insights</span>
            </h1>
            <div className="mt-8 h-1 w-24 bg-blue-600 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* FILTER CONTROLS */}
      <div className="sticky top-0 z-50 bg-[#fcfcfc]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 md:px-24 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text"
                placeholder="Search perspectives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl py-3 pl-12 pr-10 outline-none focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="relative w-full md:w-72">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-5 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase"
              >
                <span className="truncate">{SECTOR_LABELS[filter] || filter}</span>
                <ChevronDown size={16} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-[55]" onClick={() => setIsDropdownOpen(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-2xl overflow-hidden z-[60]"
                    >
                      {Object.entries(SECTOR_LABELS).map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => {
                            setFilter(value);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
                            filter === value ? "text-blue-600 bg-blue-50/50" : "text-zinc-500"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ARTICLES FEED */}
      <main className="max-w-7xl mx-auto px-6 md:px-24 py-20">
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 gap-32">
            <AnimatePresence mode="popLayout">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, index) => (
                  <motion.div
                    key={article.slug.current}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`flex flex-col ${index % 2 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 md:gap-20 items-center`}
                  >
                    <div className="w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                      <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-1000" />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {SECTOR_LABELS[article.sector] || article.sector}
                        </span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-black uppercase leading-[1.1]">{article.title}</h2>
                      <p className="text-zinc-500 dark:text-zinc-400 font-light text-lg leading-relaxed">{article.summary}</p>
                      
                      {/* FUNCTIONAL BUTTON START */}
                      <Link 
                        href={`/insights/${article.slug.current}`} 
                        className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] w-fit"
                      >
                        <span className="group-hover:text-blue-500 transition-colors duration-300">
                          Read More
                        </span>
                        
                        <div className="relative flex items-center">
                          {/* The Animated Line */}
                          <div className="h-[2px] w-10 bg-zinc-400 group-hover:w-20 group-hover:bg-blue-600 transition-all duration-500 ease-out" />
                          
                          {/* The Arrow Head */}
                          <ArrowRight 
                            size={14} 
                            className="absolute -right-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-2 text-blue-600 transition-all duration-500 ease-out" 
                          />
                        </div>
                      </Link>
                      {/* FUNCTIONAL BUTTON END */}

                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div className="text-center py-20">
                  <FilterX className="mx-auto text-zinc-300 mb-4" size={48} />
                  <p className="text-zinc-500 italic">No entries match the "{SECTOR_LABELS[filter]}" filter.</p>
                  <button onClick={() => setFilter("All")} className="mt-4 text-blue-600 font-bold uppercase text-[10px]">Clear Filters</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}