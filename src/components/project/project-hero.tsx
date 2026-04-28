"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = {
  lang: Locale;
  dict: Dictionary;
  hero: string;
  name: string;
  location: string;
  tagline: string;
  status: string;
};

export function ProjectHero({
  lang,
  dict,
  hero,
  name,
  location,
  tagline,
  status,
}: Props) {
  return (
    <section className="relative h-[88svh] min-h-[600px] w-full overflow-hidden">
      <Image
        src={hero}
        alt={name}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-bg/30 to-bg" />

      <div className="relative z-10 h-full container-x flex flex-col">
        <div className="pt-24 md:pt-28">
          <Link
            href={`/${lang}/projeler`}
            className="inline-flex items-center gap-2 text-fg/70 hover:text-bronze transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            {dict.project.back}
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-auto pb-16 md:pb-20 max-w-3xl"
        >
          <span className="inline-block px-3 py-1.5 bg-bronze/95 text-bg text-xs tracking-[0.15em] rounded-full mb-5">
            {status.toUpperCase()}
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-balance leading-[1.05] text-fg">
            {name}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-fg/80 text-pretty">
            {tagline}
          </p>
          <p className="mt-3 inline-flex items-center gap-2 text-fg-muted">
            <MapPin size={16} className="text-bronze" />
            {location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
