"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Zap, Loader2 } from "lucide-react";
import { client } from "../../sanity/lib/client"; // Adjust path to your sanity client

/* ---------------------- TYPES ---------------------- */

interface Insight {
  title: string;
  slug: { current: string };
  publishedAt: string;
  summary: string;
  tags: string[];
  coverImage: string;
  readTime: string; // Calculated locally
}

/* ---------------------- HELPERS ---------------------- */

const calculateReadTime = (body: any[]) => {
  if (!body) return "5 min";
  // Rough estimate based on block text content
  const words = body
    .filter((block) => block._type === "block")
    .map((block) => block.children.map((c: any) => c.text).join(" "))
    .join(" ").split(/\s+/).length;
  return `${Math.ceil(words / 200) + 2} min`; 
};

/* ---------------------- MAIN COMPONENT ---------------------- */

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [filter, setFilter] = useState("All");
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
          title,
          slug,
          publishedAt,
          summary,
          tags,
          "coverImage": coverImage.asset->url,
          body
        }`;
        
        const data = await client.fetch(query);
        
        const formattedData = data.map((item: any) => ({
          ...item,
          readTime: calculateReadTime(item.body)
        }));

        setInsights(formattedData);

        // Extract unique tags for filters
        const allTags = data.flatMap((item: any) => item.tags || []);
        const uniqueTags = ["All", ...Array.from(new Set(allTags))];
        setCategories(uniqueTags as string[]);

      } catch (err) {
        console.error("Sanity Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#0a0a0a]" />;

  const filteredArticles = insights.filter(
    (a) => filter === "All" || (a.tags && a.tags.includes(filter))
  );

  return (
    <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 transition-colors duration-700">
      
      {/* HERO */}
      <section className="relative min-h-[80vh] md:h-[90vh] flex flex-col justify-end overflow-hidden border-b border-zinc-200 dark:border-white/10">
        <div className="absolute inset-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-75">
            <source src="/insights/insights.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-10 px-6 sm:px-12 md:px-24 pb-12 md:pb-24 max-w-7xl"
        >
          <h1 className="text-5xl sm:text-7xl md:text-[clamp(4rem,10vw,9rem)] font-black leading-[0.9] uppercase text-white">
            Heart Mind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-400 to-indigo-300">
              Technology
            </span>
          </h1>
          <p className="max-w-md mt-6 text-white/70 text-base md:text-lg font-light">
            Curated perspectives on the intersection of human empathy, ethical
            strategy, and hyper-innovation.
          </p>
        </motion.div>
      </section>

      {/* FILTER BAR */}
      <div className="sticky top-0 z-40 bg-[#fcfcfc]/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl border-b border-zinc-200 dark:border-zinc-800 py-4 md:py-6 overflow-x-auto">
        <div className="flex justify-center md:justify-start md:px-24 items-center min-w-max">
          <div className="flex gap-6 md:gap-10 px-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all ${
                  filter === cat
                    ? "text-blue-600 scale-110"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ARTICLES */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 md:px-24 py-16 md:py-32">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-sm font-mono text-zinc-500 uppercase tracking-widest">Accessing Knowledge Base...</p>
          </div>
        ) : (
          <div className="space-y-24 md:space-y-40">
            <AnimatePresence mode="wait">
              {filteredArticles.map((article, index) => (
                <motion.div
                  key={article.slug.current}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`flex flex-col ${
                    index % 2 ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-8 md:gap-20 items-center`}
                >
                  {/* IMAGE */}
                  <div className="w-full md:w-1/2 aspect-4/3 rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 hover:scale-105 transition duration-700"
                    />
                  </div>

                  {/* TEXT */}
                  <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
                    <div className="text-[10px] md:text-xs uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
                      {article.tags?.[0] || "Insight"} • {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {article.readTime}
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic leading-[1.1] hover:text-blue-600 transition cursor-pointer">
                      {article.title}
                    </h2>

                    <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                      {article.summary}
                    </p>
                    
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group">
                      Read Entry <div className="h-px w-8 bg-zinc-400 group-hover:w-12 group-hover:bg-blue-600 transition-all" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* SUBSCRIBE SECTION */}
      <section className="px-6 md:px-24 pb-24">
        <div className="max-w-6xl mx-auto rounded-[3rem] md:rounded-[4rem] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-16 md:py-32 px-6 md:px-12 text-center">
          <Zap className="mx-auto text-blue-600 mb-6" size={32} />
          <h2 className="text-4xl md:text-6xl font-black italic mb-6 leading-none">
            Join the <br className="sm:hidden" /> <span className="opacity-30">Inner Circle</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-lg mb-10 max-w-lg mx-auto font-light">
            Receive monthly strategy briefs on building technology with conscience.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full flex-1 bg-white dark:bg-[#0a0a0a] border border-zinc-300 dark:border-zinc-800 rounded-full px-8 py-4 outline-none text-sm focus:border-blue-600 transition-colors"
            />
            <button className="w-full sm:w-auto px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-full uppercase text-[10px] md:text-xs font-black tracking-widest hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}