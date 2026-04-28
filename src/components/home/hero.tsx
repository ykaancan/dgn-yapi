"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";

export function Hero({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = () => v.play().catch(() => {});
    tryPlay();
    v.addEventListener("canplay", tryPlay, { once: true });
    return () => v.removeEventListener("canplay", tryPlay);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/video/dogan-yasam-evleri-hero-poster.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/video/dogan-yasam-evleri-hero-loop.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/30 to-bg" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent" />

      <div className="relative z-10 h-full container-x flex flex-col justify-end pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-xs md:text-sm tracking-[0.3em] text-bronze mb-6">
            {dict.hero.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-balance leading-[1.05] text-fg">
            {dict.hero.title}
          </h1>
          <p className="mt-6 text-base md:text-lg text-fg/75 max-w-xl text-pretty">
            {dict.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={`/${lang}/projeler`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-bg font-medium rounded-full hover:bg-bronze-light transition-colors"
            >
              {dict.hero.cta_primary}
              <ArrowRight size={16} />
            </Link>
            <Link
              href={`/${lang}/iletisim`}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-fg rounded-full hover:border-bronze hover:text-bronze transition-colors"
            >
              {dict.hero.cta_secondary}
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-fg-muted"
      >
        <ChevronDown size={20} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
