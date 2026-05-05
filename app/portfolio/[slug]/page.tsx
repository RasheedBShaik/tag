import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
// Corrected Imports
import { FiArrowLeft, FiGlobe, FiGithub, FiCalendar, FiUser, FiTarget } from "react-icons/fi";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProject(slug: string) {
  const query = `*[_type == "projects" && slug.current == $slug][0] {
    title,
    client,
    year,
    impact,
    description,
    "image": coalesce(mainImage.asset->url, mainImage.externalUrl),
    projectUrl,
    githubUrl,
    tags,
    content
  }`;
  return await client.fetch(query, { slug });
}

export default async function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) notFound();

  return (
    <article className="min-h-screen bg-(--background) text-(--foreground) pb-32 selection:bg-blue-500/30">
      
      {/* 1. DYNAMIC HERO SECTION */}
      <section className="relative h-[85vh] mt-16 w-full overflow-hidden">
        {/* BACK BUTTON */}
        <Link 
          href="/portfolio" 
          className="absolute top-8 left-8 md:left-24 z-30 flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-full border border-white/20 group-hover:border-white/50 transition-all">
            <FiArrowLeft size={20} />
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Back to Portfolio</span>
        </Link>

        <img
          src={project.image || "/api/placeholder/1920/1080"}
          alt={project.title}
          className="w-full h-full object-cover scale-105 animate-slow-pan brightness-40"
        />
        
        
        <div className="absolute inset-0 z-10 bg-white/10 dark:bg-zinc-950/40 transition-all duration-700" />

        <div className="absolute inset-0 flex flex-col justify-end px-8 md:px-24 pb-16 max-w-7xl mx-auto w-full">

          <h1 className="text-4xl md:text-7xl font-black leading-[0.8] mb-12">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-blue-500 to-indigo-400 dark:from-blue-500 dark:to-zinc-400">
              {project.title}
            </span>
          </h1>

          <div className="flex flex-wrap gap-8 items-center border-t border-white/10 pt-8 mt-4">
             <div className="flex items-center gap-3">
                <FiUser size={16} className="text-blue-500" />
                <span className="tracking-widest text-xs font-bold opacity-80 text-white">{project.client ||"Confidential"}</span>
             </div>
             <div className="flex items-center gap-3">
                <FiCalendar size={16} className="text-blue-500" />
                <span className="uppercase tracking-widest text-xs font-bold opacity-80 text-white">{project.year || "Year"}</span>
             </div>
          </div>
        </div>
      </section>

      {/* 2. PROJECT INFO GRID */}
      <section className="px-8 md:px-24 grid lg:grid-cols-12 gap-16 mt-24 max-w-7xl mx-auto">
        
        <div className="lg:col-span-8 space-y-16">
          <div className="space-y-6">
            <h3 className="text-blue-600 font-mono text-sm uppercase tracking-widest">Overview</h3>
            <p className="text-3xl md:text-4xl leading-tight font-medium text-(--foreground)">
              {project.description}
            </p>
          </div>

          <div className="prose prose-invert prose-blue max-w-none 
            prose-p:text-xl prose-p:leading-relaxed prose-p:text-(--muted)
            prose-headings:text-3xl prose-headings:italic prose-headings:font-bold
            prose-strong:text-blue-400 prose-li:text-lg">
             <PortableText value={project.content} />
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-10">
          <div className="relative group p-8 rounded-4xl bg-linear-to-br from-(--card) to-(--background) border border-(--border) overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FiTarget size={80} />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] opacity-40 mb-4 font-bold">Key Impact</p>
            <p className="text-4xl font-black text-blue-500 italic tracking-tight leading-none">
                {project.impact}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {project.projectUrl && (
              <a 
                href={project.projectUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-500 hover:translate-x-1"
              >
                <span className="font-bold uppercase tracking-widest text-sm">Launch Project</span>
                <FiGlobe size={20} />
              </a>
            )}
            
          </div>

          <div className="space-y-4">
             <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">Technologies</p>
             <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-(--card) text-[11px] border border-(--border) uppercase tracking-widest font-bold hover:border-blue-500/50 transition-colors">
                    {tag}
                  </span>
                ))}
             </div>
          </div>
        </aside>
      </section>
    </article>
  );
}