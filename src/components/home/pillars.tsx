"use client";

import { motion } from "framer-motion";
import { Building2, Gem, Compass, CalendarCheck2 } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

const items = [
  { key: "safety" as const, Icon: Building2 },
  { key: "materials" as const, Icon: Gem },
  { key: "architecture" as const, Icon: Compass },
  { key: "delivery" as const, Icon: CalendarCheck2 },
];

export function Pillars({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 md:py-32 bg-bg-soft border-y border-white/5">
      <div className="container-x">
        <div className="max-w-2xl mb-16">
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.pillars.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg">
            {dict.pillars.title}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon }, idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="space-y-4 p-6 rounded-xl border border-white/5 hover:border-bronze/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-lg border border-bronze/30 bg-bronze/5 flex items-center justify-center text-bronze">
                <Icon size={20} strokeWidth={1.6} />
              </div>
              <h3 className="font-display text-xl text-fg">
                {dict.pillars.items[key].title}
              </h3>
              <p className="text-fg/70 text-sm leading-relaxed">
                {dict.pillars.items[key].body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
