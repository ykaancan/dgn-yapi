"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

export function AboutProcess({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 md:py-32">
      <div className="container-x">
        <div className="max-w-3xl mb-14">
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.about.process.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg">
            {dict.about.process.title}
          </h2>
        </div>

        <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative">
          {dict.about.process.steps.map((step, idx) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className="relative pl-6 border-l border-bronze/30"
            >
              <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-bronze" />
              <h3 className="font-display text-xl text-bronze tracking-wide">
                {step.title}
              </h3>
              <p className="mt-4 text-fg/75 text-sm leading-relaxed">
                {step.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
