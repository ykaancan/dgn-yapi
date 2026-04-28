"use client";

import { usePathname } from "next/navigation";
import en from "@/dictionaries/en.json";
import tr from "@/dictionaries/tr.json";
import { StatusScreen } from "@/components/error/status-screen";

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname?.startsWith("/en") ? "en" : "tr";
  const dict = lang === "en" ? en : tr;
  const t = dict.errors.notFound;

  return (
    <StatusScreen
      code={t.code}
      title={t.title}
      body={t.body}
      cta={{ label: t.cta, href: `/${lang}` }}
      ctaSecondary={{ label: t.ctaSecondary, href: `/${lang}/projeler` }}
    />
  );
}
