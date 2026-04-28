import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { projects } from "@/content/projects";

export default async function ProjectsListPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <section className="pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="container-x">
        <p className="text-xs tracking-[0.3em] text-bronze mb-6">
          {dict.projects.eyebrow}
        </p>
        <h1 className="font-display text-4xl md:text-6xl text-balance leading-[1.05] text-fg max-w-3xl">
          {dict.projects.title}
        </h1>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const meta = dict.projects.list[project.dictKey];
            return (
              <Link
                key={project.slug}
                href={`/${lang}/projeler/${project.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-bg-soft">
                  <Image
                    src={project.cover}
                    alt={meta.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-bronze/95 text-bg text-[10px] tracking-[0.15em] rounded-full">
                    {dict.projects.status[project.status].toUpperCase()}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="font-display text-2xl text-fg leading-tight">
                      {meta.name}
                    </h2>
                    <p className="text-fg-muted text-sm mt-1">{meta.location}</p>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-bronze text-sm">
                      <span>{dict.projects.viewProject}</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
