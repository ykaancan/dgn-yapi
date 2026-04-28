"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import en from "@/dictionaries/en.json";
import tr from "@/dictionaries/tr.json";
import { StatusScreen } from "@/components/error/status-screen";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const pathname = usePathname();
  const lang = pathname?.startsWith("/en") ? "en" : "tr";
  const dict = lang === "en" ? en : tr;
  const t = dict.errors.general;

  return (
    <StatusScreen
      code={t.code}
      title={t.title}
      body={t.body}
      cta={{ label: t.cta, onClick: reset }}
      ctaSecondary={{ label: t.ctaSecondary, href: `/${lang}` }}
    />
  );
}
