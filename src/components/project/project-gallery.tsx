"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";

type Props = {
  eyebrow: string;
  images: string[];
  alt: string;
  variant?: "grid" | "masonry";
};

export function ProjectGallery({ eyebrow, images, alt, variant = "grid" }: Props) {
  const [active, setActive] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <section className="py-24 md:py-32 border-b border-white/5">
      <div className="container-x">
        <p className="text-xs tracking-[0.3em] text-bronze mb-10">
          {eyebrow.toUpperCase()}
        </p>

        <div
          className={
            variant === "masonry"
              ? "columns-2 md:columns-3 gap-4 [&>*]:mb-4 [&>*]:break-inside-avoid"
              : "grid grid-cols-2 md:grid-cols-3 gap-4"
          }
        >
          {images.map((src, idx) => (
            <motion.button
              key={src}
              type="button"
              onClick={() => setActive(idx)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (idx % 6) * 0.05 }}
              className={`group relative ${
                variant === "masonry" ? "block w-full" : "aspect-[4/3]"
              } overflow-hidden rounded-lg bg-bg-soft cursor-zoom-in`}
            >
              <Image
                src={src}
                alt={`${alt} ${idx + 1}`}
                width={1200}
                height={900}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {active !== null && (
        <Lightbox
          images={images}
          alt={alt}
          startIndex={active}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}

function Lightbox({
  images,
  alt,
  startIndex,
  onClose,
}: {
  images: string[];
  alt: string;
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);

  return (
    <div
      className="fixed inset-0 z-[100] bg-bg/95 backdrop-blur-md flex flex-col"
      onClick={onClose}
    >
      <div className="flex justify-end p-6">
        <button
          onClick={onClose}
          className="text-fg/80 hover:text-bronze p-2"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>
      <div
        className="flex-1 flex items-center justify-center px-4 pb-12"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[idx]}
          alt={`${alt} ${idx + 1}`}
          width={1800}
          height={1200}
          className="max-h-[80vh] w-auto h-auto object-contain"
          priority
        />
      </div>
      <div
        className="flex justify-center gap-3 pb-8 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
          className="px-5 py-2 border border-white/15 rounded-full text-fg/80 hover:border-bronze hover:text-bronze transition-colors"
        >
          ←
        </button>
        <span className="px-4 py-2 text-fg-muted text-sm">
          {idx + 1} / {images.length}
        </span>
        <button
          onClick={() => setIdx((i) => (i + 1) % images.length)}
          className="px-5 py-2 border border-white/15 rounded-full text-fg/80 hover:border-bronze hover:text-bronze transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}
