import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { getProject, projects } from "@/content/projects";
import { ProjectHero } from "@/components/project/project-hero";
import { ProjectOverview } from "@/components/project/project-overview";
import { ProjectGallery } from "@/components/project/project-gallery";
import { ProjectFloorplans } from "@/components/project/project-floorplans";
import { ProjectVideo } from "@/components/project/project-video";
import { ProjectCta } from "@/components/project/project-cta";

export async function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.map((project) => ({ lang, slug: project.slug })),
  );
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

  const facts: { label: string; value: string }[] = [
    { label: dict.project.factLabels.location, value: meta.location },
    {
      label: dict.project.factLabels.status,
      value: dict.projects.status[project.status],
    },
    { label: dict.project.factLabels.delivery, value: detail.delivery },
    { label: dict.project.factLabels.blocks, value: detail.blocks },
    { label: dict.project.factLabels.units, value: detail.units },
    { label: dict.project.factLabels.types, value: detail.types },
  ];

  if ("area" in detail && detail.area) {
    facts.push({ label: dict.project.factLabels.area, value: detail.area });
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
          eyebrow={dict.project.santiye}
          images={project.santiye}
          alt={`${meta.name} şantiye`}
        />
      )}

      <ProjectCta dict={dict} />
    </>
  );
}
