"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

export function AboutStory({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 md:py-32 border-y border-white/5 bg-bg-soft">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <Image
            src="/projects/dogan-yasam-evleri/renders/exterior-day-1.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.about.story.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg">
            {dict.about.story.title}
          </h2>
          <div className="mt-8 space-y-5 text-fg/75 leading-relaxed text-pretty">
            <p>{dict.about.story.p1}</p>
            <p>{dict.about.story.p2}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
