"use client";

import { motion } from "framer-motion";

type Props = {
  src: string;
  poster?: string;
  eyebrow?: string;
};

export function ProjectVideo({ src, poster, eyebrow }: Props) {
  return (
    <section className="py-24 md:py-32 border-b border-white/5">
      <div className="container-x">
        {eyebrow && (
          <p className="text-xs tracking-[0.3em] text-bronze mb-10">
            {eyebrow.toUpperCase()}
          </p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="aspect-video rounded-2xl overflow-hidden bg-bg-soft"
        >
          <video
            controls
            preload="metadata"
            poster={poster}
            className="w-full h-full object-cover"
          >
            <source src={src} type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}
