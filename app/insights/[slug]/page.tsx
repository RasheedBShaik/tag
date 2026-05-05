import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // ✅ added
import { notFound } from "next/navigation";

// Initialize the image builder
const builder = urlBuilder(client);

/* ---------------------- PORTABLE TEXT COMPONENTS ---------------------- */

const components = {
  types: {
    image: ({ value }: any) => {
      const imgUrl = builder.image(value).width(1200).url();
      return (
        <div className="my-12 w-full">
          <div className="overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900">
            <img
              src={imgUrl}
              alt="Insight visual"
              className="w-full h-full object-cover scale-105 animate-slow-pan brightness-40"
              loading="lazy"
            />
          </div>
          {value.caption && (
            <p className="mt-3 text-center text-xs font-mono uppercase tracking-widest text-zinc-500">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-black italic mt-16 mb-6 leading-tight">
        {children}
      </h2>
    ),
    normal: ({ children }: any) => (
      <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed mb-6 font-light break-words">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-600 pl-6 md:pl-8 my-12 text-xl md:text-2xl italic font-light text-zinc-800 dark:text-zinc-200">
        {children}
      </blockquote>
    ),
  },
};

/* ---------------------- DATA FETCHING ---------------------- */

async function getInsight(slug: string) {
  const query = `*[_type == "insights" && slug.current == $slug][0] {
    title,
    publishedAt,
    summary,
    tags,
    "coverImage": coverImage.asset->url, 
    body,
    "author": author->name
  }`;
  return await client.fetch(query, { slug });
}

export default async function InsightDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getInsight(slug);

  if (!article) notFound();

  return (
    <article className="min-h-screen bg-[#fcfcfc] dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-100 pb-32 overflow-x-hidden">
      {/* HERO HEADER */}
      <header className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden flex flex-col justify-between mt-16">
        
        {/* ✅ FIXED IMAGE FOR LARGE SCREENS */}
        <div className="absolute inset-0 z-0">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-fit animate-slow-pan brightness-40"
            sizes="100vw"
          />          
          
        </div>

        {/* TOP CONTENT */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-24 pt-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-blue-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] hover:gap-4 transition-all group bg-black/20 backdrop-blur-sm p-2 rounded-md w-fit"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Back to insights
          </Link>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-24 pb-16 md:pb-24">
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags?.map((t: string) => (
              <span
                key={t}
                className="px-3 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full"
              >
                {t}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-8xl font-black  leading-[0.9] text-white uppercase drop-shadow-2xl max-w-5xl">
            {article.title}
          </h1>
        </div>
      </header>

      {/* METADATA */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row gap-8 border-b border-zinc-200 dark:border-zinc-800 mb-16 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-blue-600 uppercase text-sm border border-zinc-300 dark:border-zinc-700">
            {article.author?.charAt(0) || "I"}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
              Insight By
            </p>
            <p className="text-sm font-bold">
              {article.author || "Global Strategy"}
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-1">
            <Calendar size={10} /> Updated
          </span>
          <span className="text-sm font-bold">
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 w-full">
        <div className="prose prose-zinc dark:prose-invert max-w-none w-full break-words selection:bg-blue-500/30">
          <PortableText value={article.body} components={components} />
        </div>
      </main>
    </article>
  );
}