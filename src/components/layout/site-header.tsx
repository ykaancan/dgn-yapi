"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";

type Props = { lang: Locale; dict: Dictionary };

export function SiteHeader({ lang, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const swapped = otherLocale(lang);
  const otherPath = pathname.replace(/^\/(tr|en)/, `/${swapped}`) || `/${swapped}`;

  const nav = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/kurumsal`, label: dict.nav.about },
    { href: `/${lang}/projeler`, label: dict.nav.projects },
    { href: `/${lang}/iletisim`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-bg/85 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2 shrink-0"
          aria-label="DGN Yapı"
        >
          <Image
            src="/brand/dgn-logo.png"
            alt="DGN Yapı"
            width={120}
            height={50}
            className="h-7 md:h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition-colors ${
                  active ? "text-bronze" : "text-fg/80 hover:text-fg"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={otherPath}
            className="hidden md:inline-flex text-xs tracking-[0.2em] text-fg-muted hover:text-bronze transition-colors px-2 py-1 border border-white/10 rounded-full"
          >
            {dict.nav.lang}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 -mr-2 text-fg"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-bg">
          <nav className="container-x py-6 flex flex-col gap-4">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base text-fg/90 py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={otherPath}
              className="text-xs tracking-[0.2em] text-bronze pt-3 border-t border-white/5"
            >
              {dict.nav.lang}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
