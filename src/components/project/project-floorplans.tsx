"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FloorPlan } from "@/content/projects";

type Props = {
  eyebrow: string;
  plans: FloorPlan[];
};

export function ProjectFloorplans({ eyebrow, plans }: Props) {
  const [active, setActive] = useState(plans[0]?.type);
  const [imgIdx, setImgIdx] = useState(0);
  const current = plans.find((p) => p.type === active);

  if (!current) return null;

  return (
    <section className="py-24 md:py-32 bg-bg-soft border-y border-white/5">
      <div className="container-x">
        <p className="text-xs tracking-[0.3em] text-bronze mb-10">
          {eyebrow.toUpperCase()}
        </p>

        <div className="flex gap-2 mb-10">
          {plans.map((plan) => (
            <button
              key={plan.type}
              onClick={() => {
                setActive(plan.type);
                setImgIdx(0);
              }}
              className={`px-6 py-3 rounded-full text-sm tracking-wide transition-all ${
                active === plan.type
                  ? "bg-bronze text-bg"
                  : "border border-white/10 text-fg/80 hover:border-bronze hover:text-bronze"
              }`}
            >
              {plan.type}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.type}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-8"
          >
            <div className="lg:col-span-8 relative aspect-[4/3] overflow-hidden rounded-xl bg-bg">
              {current.photos[imgIdx] && (
                <Image
                  key={current.photos[imgIdx]}
                  src={current.photos[imgIdx]}
                  alt={`${current.type} ${imgIdx + 1}`}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-contain"
                />
              )}
            </div>

            <div className="lg:col-span-4">
              <p className="text-fg-muted text-sm mb-4">
                {imgIdx + 1} / {current.photos.length}
              </p>
              <div className="grid grid-cols-4 lg:grid-cols-3 gap-2 max-h-[26rem] overflow-y-auto pr-1">
                {current.photos.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setImgIdx(i)}
                    className={`relative aspect-square overflow-hidden rounded transition-all ${
                      i === imgIdx
                        ? "ring-2 ring-bronze opacity-100"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
