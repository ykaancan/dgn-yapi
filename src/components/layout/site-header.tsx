"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";

type Props = { lang: Locale; dict: Dictionary };

export function SiteHeader({ lang, dict }: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      const goingDown = y > lastY.current;
      const past = y > 240;
      setHidden(goingDown && past);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const swapped = otherLocale(lang);
  const otherPath = pathname.replace(/^\/(tr|en)/, `/${swapped}`) || `/${swapped}`;

  const nav = [
    { href: `/${lang}`, label: dict.nav.home, exact: true },
    { href: `/${lang}/kurumsal`, label: dict.nav.about },
    { href: `/${lang}/projeler`, label: dict.nav.projects },
    { href: `/${lang}/iletisim`, label: dict.nav.contact },
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled || open
          ? "bg-bg/85 backdrop-blur-md border-b border-white/5"
          : "bg-gradient-to-b from-bg/30 to-transparent"
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

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm tracking-wide px-4 py-2 transition-colors ${
                  active ? "text-bronze" : "text-fg/80 hover:text-fg"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute left-4 right-4 -bottom-px h-px bg-bronze" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={otherPath}
            className="hidden md:inline-flex items-center gap-1.5 text-[10px] tracking-[0.25em] px-3 py-1.5 border border-white/10 rounded-full text-fg-muted hover:text-bronze hover:border-bronze/40 transition-colors"
          >
            <span className="text-bronze">{lang.toUpperCase()}</span>
            <span className="text-fg-muted/50">/</span>
            <span>{swapped.toUpperCase()}</span>
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 -mr-2 text-fg"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-bg">
          <nav className="container-x py-6 flex flex-col gap-1">
            {nav.map((item) => {
              const active = isActive(item.href, item.exact);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-base py-3 px-2 rounded-lg ${
                    active ? "text-bronze bg-bronze/5" : "text-fg/90"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={otherPath}
              className="text-xs tracking-[0.2em] text-bronze pt-4 mt-2 border-t border-white/5 px-2"
            >
              {swapped.toUpperCase()} →
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
