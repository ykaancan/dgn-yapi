"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/lib/i18n";

type Props = {
  dict: Dictionary;
  overview: string;
  longBody?: string;
  facts: { label: string; value: string }[];
};

export function ProjectOverview({ dict, overview, longBody, facts }: Props) {
  const hasFacts = facts.length > 0;

  return (
    <section className="py-24 md:py-32 border-b border-white/5">
      <div
        className={
          hasFacts
            ? "container-x grid gap-16 lg:grid-cols-12"
            : "container-x"
        }
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className={hasFacts ? "lg:col-span-7" : "max-w-3xl"}
        >
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.project.overview.toUpperCase()}
          </p>
          <p className="text-lg md:text-xl text-fg/85 leading-relaxed text-pretty">
            {overview}
          </p>
          {longBody && (
            <p className="mt-6 text-fg/70 leading-relaxed text-pretty">
              {longBody}
            </p>
          )}
        </motion.div>

        {hasFacts && (
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="rounded-xl border border-white/5 bg-bg-soft p-7">
              <p className="text-xs tracking-[0.3em] text-bronze mb-6">
                {dict.project.facts.toUpperCase()}
              </p>
              <dl className="space-y-5">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-start justify-between gap-6 pb-5 border-b border-white/5 last:border-0 last:pb-0"
                  >
                    <dt className="text-fg-muted text-sm">{fact.label}</dt>
                    <dd className="text-fg text-right font-medium">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.aside>
        )}
      </div>
    </section>
  );
}
