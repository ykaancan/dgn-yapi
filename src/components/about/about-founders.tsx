"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

export function AboutFounders({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 md:py-32 bg-bg-soft border-y border-white/5">
      <div className="container-x">
        <div className="max-w-3xl mb-14">
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.about.founders.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg">
            {dict.about.founders.title}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {dict.about.founders.people.map((person, idx) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="group rounded-xl border border-white/5 hover:border-bronze/40 transition-colors overflow-hidden"
            >
              <div className="aspect-[16/9] md:aspect-[4/5] bg-gradient-to-br from-bronze/15 via-bg-soft to-bg flex items-center justify-center">
                <span className="font-display text-6xl md:text-8xl text-bronze/60 group-hover:text-bronze/80 transition-colors">
                  {person.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </span>
              </div>
              <div className="p-7 space-y-3">
                <h3 className="font-display text-2xl text-fg">{person.name}</h3>
                <p className="text-bronze text-sm tracking-wide">{person.role}</p>
                <p className="text-fg/70 text-sm leading-relaxed pt-2">
                  {person.bio}
                </p>
                <a
                  href={`tel:${person.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-fg-muted hover:text-bronze transition-colors text-sm pt-3"
                >
                  <Phone size={14} />
                  {person.phone}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
