"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

export function AboutHero({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/projects/dogan-yasam-evleri/santiye/photo-1.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/85 to-bg" />
      </div>

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.about.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-balance leading-[1.05] text-fg">
            {dict.about.title}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-fg/75 max-w-2xl text-pretty leading-relaxed">
            {dict.about.lead}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
