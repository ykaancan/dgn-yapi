"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import type { ProjectMap } from "@/content/projects";

type Props = {
  dict: Dictionary;
  map: ProjectMap;
  name: string;
};

export function ProjectLocation({ dict, map, name }: Props) {
  const embed = `https://maps.google.com/maps?q=${map.lat},${map.lng}&z=16&output=embed`;

  return (
    <section className="py-24 md:py-32 border-b border-white/5">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <p className="text-xs tracking-[0.3em] text-bronze">
            {dict.project.location.toUpperCase()}
          </p>
          <a
            href={map.shareUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-bronze hover:text-bronze-light transition-colors text-sm"
          >
            <ExternalLink size={14} />
            {dict.iletisim.directions}
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl overflow-hidden border border-white/5 aspect-[16/9] md:aspect-[21/9]"
        >
          <iframe
            src={embed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale-[0.6] contrast-110"
            title={`${name} konumu`}
          />
        </motion.div>
      </div>
    </section>
  );
}
