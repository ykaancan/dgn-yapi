import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { getProject, projects } from "@/content/projects";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectOverview } from "@/components/project/project-overview";
import { ProjectGallery } from "@/components/project/project-gallery";
import { ProjectFloorplans } from "@/components/project/project-floorplans";
import { ProjectVideo } from "@/components/project/project-video";
import { ProjectLocation } from "@/components/project/project-location";
import { ProjectCta } from "@/components/project/project-cta";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((project) => ({ lang, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const project = getProject(slug);
  if (!project) return {};
  const dict = await getDictionary(lang);
  const detail = dict.project[project.dictKey];
  return {
    title: detail.meta.title,
    description: detail.meta.description,
    alternates: {
      canonical: `/${lang}/projeler/${slug}`,
      languages: {
        tr: `/tr/projeler/${slug}`,
        en: `/en/projeler/${slug}`,
      },
    },
    openGraph: {
      title: detail.meta.title,
      description: detail.meta.description,
      url: `/${lang}/projeler/${slug}`,
      images: [{ url: project.hero, width: 1920, height: 1080, alt: detail.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: detail.meta.title,
      description: detail.meta.description,
      images: [project.hero],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const project = getProject(slug);
  if (!project) notFound();

  const dict = await getDictionary(lang);
  const meta = dict.projects.list[project.dictKey];
  const detail = dict.project[project.dictKey];

  const hasKunye = "blocks" in detail || "units" in detail || "types" in detail;
  const facts: { label: string; value: string }[] = [];
  if (hasKunye) {
    facts.push(
      { label: dict.project.factLabels.location, value: meta.location },
      {
        label: dict.project.factLabels.status,
        value: dict.projects.status[project.status],
      },
    );
    if ("blocks" in detail && detail.blocks) {
      facts.push({ label: dict.project.factLabels.blocks, value: detail.blocks });
    }
    if ("units" in detail && detail.units) {
      facts.push({ label: dict.project.factLabels.units, value: detail.units });
    }
    if ("types" in detail && detail.types) {
      facts.push({ label: dict.project.factLabels.types, value: detail.types });
    }
    if ("commercial" in detail && detail.commercial) {
      facts.push({
        label: dict.project.factLabels.commercial,
        value: detail.commercial,
      });
    }
  }

  return (
    <>
      <ProjectHero
        lang={lang}
        dict={dict}
        hero={project.hero}
        name={meta.name}
        location={meta.location}
        tagline={detail.tagline}
        status={dict.projects.status[project.status]}
      />

      <ProjectOverview
        dict={dict}
        overview={detail.overview}
        longBody={"longBody" in detail ? detail.longBody : undefined}
        facts={facts}
      />

      {project.renders && project.renders.length > 0 && (
        <ProjectGallery
          eyebrow={dict.project.renders}
          images={project.renders}
          alt={`${meta.name} render`}
        />
      )}

      {project.floorplans && project.floorplans.length > 0 && (
        <ProjectFloorplans
          eyebrow={dict.project.floorplans}
          plans={project.floorplans}
        />
      )}

      {project.video && (
        <ProjectVideo src={project.video} poster={project.cover} />
      )}

      {project.santiye && project.santiye.length > 0 && (
        <ProjectGallery
          eyebrow={
            project.status === "completed"
              ? dict.project.gallery
              : dict.project.santiye
          }
          images={project.santiye}
          alt={`${meta.name} galeri`}
        />
      )}

      {project.map && (
        <ProjectLocation dict={dict} map={project.map} name={meta.name} />
      )}

      {!project.noSales && <ProjectCta dict={dict} />}
    </>
  );
}
