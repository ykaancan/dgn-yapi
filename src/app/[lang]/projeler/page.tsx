import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { ProjectsList } from "@/components/projects/projects-list";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.projects.meta.title,
    description: dict.projects.meta.description,
    alternates: {
      canonical: `/${lang}/projeler`,
      languages: { tr: "/tr/projeler", en: "/en/projeler" },
    },
    openGraph: {
      title: dict.projects.meta.title,
      description: dict.projects.meta.description,
      url: `/${lang}/projeler`,
    },
  };
}

export default async function ProjectsListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="container-x">
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.projects.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-balance leading-[1.05] text-fg max-w-3xl">
            {dict.projects.title}
          </h1>
        </div>
      </section>

      <ProjectsList lang={lang} dict={dict} />
    </>
  );
}
