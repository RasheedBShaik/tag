import React from "react";
// Import the client (adjust the path to your sanity/lib/client.ts)
import { client } from "@/sanity/lib/client"; 
import { Globe, Cpu, ArrowRight, ArrowUpRight, ArrowUp } from "lucide-react";
import Link from "next/link";
// We move motion to a separate client component or use a simple wrapper
// import ProjectCard from "./components/ProjectCard"; 

export const revalidate = 30;
async function getProjects() {
  const query = `*[_type == "projects"] | order(_createdAt desc) {
    "id": _id,
    title,
    "client": client,
    "category": tags[0], 
    "year": year,
    // Note the path change here:
    "image": coalesce(mainImage.asset->url, mainImage.externalUrl),
    description,
    "impact": impact,
    "tags": tags,
    "slug": slug.current
  }`;
  return await client.fetch(query);
}
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="bg-(--background) text-(--foreground) transition-colors duration-700">
      {/* HEADER */}
      <section id="top" className="py-24 px-8 md:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 text-blue-600 mb-8">
            <div className="h-px w-12 bg-current" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">
              Index Selected Works
            </span>
          </div>

          <h1 className="text-[10vw] md:text-[8vw] font-black leading-[0.8] mb-12">
            <span className="uppercase text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-blue-500 to-indigo-400 dark:from-blue-500 dark:to-zinc-400">
              portfolio
            </span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 border-t border-(--border) pt-12">
            <p className="text-xl text-(--muted) leading-snug">
              Intersection of{" "}
              <span className="text-(--foreground) font-medium">
                Heart, Mind, and Technology
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <main className="px-8 md:px-24 pb-48 space-y-48 max-w-7xl mx-auto">
        {projects.map((project: any, index: number) => (
          <div
            key={project.id}
            className={`flex flex-col ${
              index % 2 ? "lg:flex-row-reverse" : "lg:flex-row"
            } gap-16 items-start`}
          >
            {/* IMAGE */}
            <div className="w-full lg:w-2/3 rounded-4xl overflow-hidden bg-(--card)">
              <div className="relative aspect-16/10 group">
                <img
                  src={project.image || "/api/placeholder/1200/800"}
                  className="w-full h-full object-cover grayscale-0 md:grayscale group-hover:grayscale-0 transition duration-700 group-hover:scale-105"
                  alt={project.title}
                />
                <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition" />

                {/* TAGS (Mapping from Sanity Array) */}
                <div className="absolute top-6 right-6 flex gap-2">
                  {project.tags?.slice(0, 2).map((tag: string) => (
                    <div key={tag} className="flex items-center gap-2 bg-black/30 text-white px-3 py-1 rounded-full text-[10px]">
                       {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="flex items-center gap-4">
                <span className="text-blue-600 font-mono text-sm">
                  0{index + 1}
                </span>
                <div className="h-px flex-1 bg-(--border)" />
                <span className="text-xs opacity-40">
                    {project.year}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold italic leading-tight hover:text-blue-600 transition">
                {project.title}
              </h2>

              <p className="text-(--muted)">{project.description}</p>

              {/* IMPACT */}
              <div className="p-6 rounded-2xl bg-(--card) border border-(--border)">
                <div className="flex justify-between text-xs opacity-40 mb-2">
                  <span>Impact</span>
                  <ArrowUpRight size={14} />
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {project.impact || "N/A"}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-xs opacity-40">Partner</div>
                  <div className="font-semibold">{project.client || "Confidential"}</div>
                </div>

                <Link
                  href={`/portfolio/${project.slug}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-(--foreground) text-(--background) text-xs uppercase tracking-widest hover:bg-blue-600 transition"
                >
                  View <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* BACK TO TOP */}
        <div className="flex justify-center pt-20">
          <a href="#top" className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
            <ArrowUp size={24} className="text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Back to Top</span>
          </a>
        </div>
      </main>
    </div>
  );
}