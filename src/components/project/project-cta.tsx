"use client";

import { motion } from "framer-motion";
import { Phone, FileDown } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

export function ProjectCta({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl border border-bronze/20 bg-bg-soft p-10 md:p-16 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-bronze/10 via-transparent to-accent/5" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg max-w-2xl mx-auto">
              {dict.ctaBanner.title}
            </h2>
            <p className="mt-5 text-fg/75 max-w-xl mx-auto text-pretty">
              {dict.ctaBanner.body}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${dict.footer.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-bronze text-bg font-medium rounded-full hover:bg-bronze-light transition-colors"
              >
                <Phone size={16} />
                {dict.project.contactCta}
              </a>
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/15 text-fg/60 rounded-full cursor-not-allowed"
              >
                <FileDown size={16} />
                {dict.project.brochure}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
