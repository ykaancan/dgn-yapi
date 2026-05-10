import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { projects } from "@/content/projects";

const SITE_URL = "https://dgnyapi.tr";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/kurumsal", "/projeler", "/iletisim", "/aydinlatma-metni"];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of staticRoutes) {
    const alternates = Object.fromEntries(
      locales.map((l) => [l, `${SITE_URL}/${l}${route}`]),
    );
    for (const lang of locales) {
      entries.push({
        url: `${SITE_URL}/${lang}${route}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  for (const project of projects) {
    const alternates = Object.fromEntries(
      locales.map((l) => [l, `${SITE_URL}/${l}/projeler/${project.slug}`]),
    );
    for (const lang of locales) {
      entries.push({
        url: `${SITE_URL}/${lang}/projeler/${project.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: project.featured ? 0.9 : 0.6,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
