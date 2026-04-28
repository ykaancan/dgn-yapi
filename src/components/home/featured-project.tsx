"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { featuredProject } from "@/content/projects";

export function FeaturedProject({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const project = featuredProject;

  return (
    <section className="py-24 md:py-32 bg-bg-soft">
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-[0.3em] text-bronze mb-6"
        >
          {dict.featured.eyebrow}
        </motion.p>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-2xl"
          >
            <Image
              src={project.cover}
              alt={dict.featured.title}
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-6 left-6 px-3 py-1.5 bg-bronze/95 text-bg text-xs tracking-wider rounded-full">
              {dict.featured.status}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-3xl md:text-5xl text-fg leading-[1.05] text-balance">
              {dict.featured.title}
            </h2>
            <p className="mt-3 inline-flex items-center gap-2 text-fg-muted text-sm">
              <MapPin size={14} className="text-bronze" />
              {dict.featured.location}
            </p>
            <p className="mt-6 text-fg/75 text-pretty leading-relaxed">
              {dict.featured.body}
            </p>

            <Link
              href={`/${lang}/projeler/${project.slug}`}
              className="mt-10 inline-flex items-center gap-2 group text-bronze hover:text-bronze-light transition-colors"
            >
              <span className="border-b border-bronze/40 group-hover:border-bronze pb-1 tracking-wide">
                {dict.featured.cta}
              </span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
