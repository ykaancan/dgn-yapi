import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { FeaturedProject } from "@/components/home/featured-project";
import { ProjectsStrip } from "@/components/home/projects-strip";
import { Pillars } from "@/components/home/pillars";
import { CtaBanner } from "@/components/home/cta-banner";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <Intro dict={dict} />
      <FeaturedProject lang={lang} dict={dict} />
      <ProjectsStrip lang={lang} dict={dict} />
      <Pillars dict={dict} />
      <CtaBanner dict={dict} />
    </>
  );
}
