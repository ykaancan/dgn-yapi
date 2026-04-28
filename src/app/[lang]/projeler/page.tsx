import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { ProjectsList } from "@/components/projects/projects-list";

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
