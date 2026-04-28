"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

export function CtaBanner({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl border border-bronze/20 bg-gradient-to-br from-bronze/10 via-bg-soft to-bg p-10 md:p-16"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-bronze/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/8 rounded-full blur-3xl" />

          <div className="relative grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 className="font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg">
                {dict.ctaBanner.title}
              </h2>
              <p className="mt-5 text-fg/75 max-w-xl text-pretty">
                {dict.ctaBanner.body}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <a
                href={`tel:${dict.footer.phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-3 px-7 py-4 bg-bronze text-bg font-medium rounded-full hover:bg-bronze-light transition-colors"
              >
                <Phone size={18} />
                <span>{dict.footer.phone}</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
