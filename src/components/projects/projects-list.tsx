"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { projects, type ProjectStatus } from "@/content/projects";

type Filter = "all" | ProjectStatus;

const filters: Filter[] = ["all", "active", "completed", "upcoming"];

export function ProjectsList({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [active, setActive] = useState<Filter>("all");

  const visible = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.status === active)),
    [active],
  );

  return (
    <section className="pb-24 md:pb-32">
      <div className="container-x">
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {filters.map((filter) => {
            const isActive = active === filter;
            const label =
              filter === "all" ? dict.projects.filterAll : dict.projects.status[filter];
            const count =
              filter === "all"
                ? projects.length
                : projects.filter((p) => p.status === filter).length;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActive(filter)}
                className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-bronze text-bg"
                    : "border border-white/10 text-fg/70 hover:border-bronze hover:text-bronze"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] tracking-widest px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-bg/20 text-bg" : "bg-white/5 text-fg-muted"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          <span className="ml-auto text-xs tracking-[0.2em] text-fg-muted hidden md:inline">
            {visible.length} {dict.projects.countLabel.toUpperCase()}
          </span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 lg:grid-cols-2"
          >
            {visible.map((project, idx) => {
              const meta = dict.projects.list[project.dictKey];
              const detail = dict.project[project.dictKey];
              return (
                <motion.article
                  key={project.slug}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.06 }}
                >
                  <Link
                    href={`/${lang}/projeler/${project.slug}`}
                    className="group block relative overflow-hidden rounded-2xl bg-bg-soft"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.cover}
                        alt={meta.name}
                        fill
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                      <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-bronze/95 text-bg text-[10px] tracking-[0.18em] rounded-full">
                          {dict.projects.status[project.status].toUpperCase()}
                        </span>
                      </div>
                    </div>

                    <div className="p-7 md:p-9 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="font-display text-2xl md:text-3xl text-fg leading-tight">
                            {meta.name}
                          </h2>
                          <p className="text-fg-muted text-sm mt-1.5 inline-flex items-center gap-1.5">
                            <MapPin size={13} className="text-bronze" />
                            {meta.location}
                          </p>
                        </div>
                        <ArrowUpRight
                          size={20}
                          className="shrink-0 text-fg-muted group-hover:text-bronze group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                        />
                      </div>

                      <p className="text-fg/70 text-sm leading-relaxed line-clamp-2">
                        {detail.tagline}
                      </p>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {visible.length === 0 && (
          <div className="py-16 text-center text-fg-muted">{dict.projects.noResults}</div>
        )}
      </div>
    </section>
  );
}
