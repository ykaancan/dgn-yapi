"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Eye, Compass } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

const items = [
  { key: "trust" as const, Icon: ShieldCheck },
  { key: "quality" as const, Icon: Sparkles },
  { key: "transparency" as const, Icon: Eye },
  { key: "vision" as const, Icon: Compass },
];

export function AboutValues({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl mb-14">
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.about.values.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg">
            {dict.about.values.title}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ key, Icon }, idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="p-7 rounded-xl border border-white/5 hover:border-bronze/40 transition-colors space-y-4"
            >
              <div className="w-11 h-11 rounded-lg border border-bronze/30 bg-bronze/5 flex items-center justify-center text-bronze">
                <Icon size={20} strokeWidth={1.6} />
              </div>
              <h3 className="font-display text-xl text-fg">
                {dict.about.values.items[key].title}
              </h3>
              <p className="text-fg/70 text-sm leading-relaxed">
                {dict.about.values.items[key].body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
