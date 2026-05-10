import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutValues } from "@/components/about/about-values";
import { AboutFounders } from "@/components/about/about-founders";
import { AboutProcess } from "@/components/about/about-process";
import { CtaBanner } from "@/components/home/cta-banner";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.about.meta.title,
    description: dict.about.meta.description,
    alternates: {
      canonical: `/${lang}/kurumsal`,
      languages: { tr: "/tr/kurumsal", en: "/en/kurumsal" },
    },
    openGraph: {
      title: dict.about.meta.title,
      description: dict.about.meta.description,
      url: `/${lang}/kurumsal`,
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <AboutHero dict={dict} />
      <AboutStory dict={dict} />
      <AboutValues dict={dict} />
      <AboutFounders dict={dict} />
      <AboutProcess dict={dict} />
      <CtaBanner dict={dict} />
    </>
  );
}
