"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

const stats = [
  { key: "experience" as const, value: "15+" },
  { key: "delivery" as const, value: "%100" },
];

export function Intro({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 md:py-32 border-b border-white/5">
      <div className="container-x grid gap-16 md:grid-cols-12 md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="md:col-span-7"
        >
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.intro.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg">
            {dict.intro.title}
          </h2>
          <p className="mt-8 text-fg/75 text-base md:text-lg max-w-xl text-pretty">
            {dict.intro.body}
          </p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="md:col-span-5 grid grid-cols-2 gap-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.key}
              className="border-l-2 border-bronze/40 pl-5 py-2"
            >
              <dt className="text-xs tracking-wider text-fg-muted uppercase">
                {dict.intro.stats[stat.key]}
              </dt>
              <dd className="font-display text-3xl md:text-4xl text-bronze mt-2">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
