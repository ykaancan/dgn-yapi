"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { projects } from "@/content/projects";

export function ProjectsStrip({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="py-24 md:py-32 border-b border-white/5">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] text-bronze mb-6">
              {dict.projects.eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg max-w-2xl">
              {dict.projects.title}
            </h2>
          </div>
          <Link
            href={`/${lang}/projeler`}
            className="inline-flex items-center gap-2 text-bronze hover:text-bronze-light transition-colors group"
          >
            <span className="border-b border-bronze/40 pb-0.5">
              {dict.projects.viewAll}
            </span>
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, idx) => {
            const meta = dict.projects.list[project.dictKey];
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <Link
                  href={`/${lang}/projeler/${project.slug}`}
                  className="block group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bg-soft">
                    <Image
                      src={project.cover}
                      alt={meta.name}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-bronze/95 text-bg text-[10px] tracking-[0.15em] rounded-full">
                      {dict.projects.status[project.status].toUpperCase()}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-2xl text-fg leading-tight">
                        {meta.name}
                      </h3>
                      <p className="text-fg-muted text-sm mt-1">
                        {meta.location}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-bronze text-sm">
                        <span>{dict.projects.viewProject}</span>
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
