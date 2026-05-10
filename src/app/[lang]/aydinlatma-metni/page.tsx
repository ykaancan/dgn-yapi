import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.kvkk.meta.title,
    description: dict.kvkk.meta.description,
    alternates: {
      canonical: `/${lang}/aydinlatma-metni`,
      languages: {
        tr: "/tr/aydinlatma-metni",
        en: "/en/aydinlatma-metni",
      },
    },
    openGraph: {
      title: dict.kvkk.meta.title,
      description: dict.kvkk.meta.description,
      url: `/${lang}/aydinlatma-metni`,
    },
  };
}

export default async function KvkkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const k = dict.kvkk;

  return (
    <article className="pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="container-x max-w-3xl">
        <p className="text-xs tracking-[0.3em] text-bronze mb-6">
          {k.subtitle.toUpperCase()}
        </p>
        <h1 className="font-display text-4xl md:text-5xl text-balance leading-[1.1] text-fg">
          {k.title}
        </h1>
        <p className="mt-6 text-fg/75 text-base md:text-lg text-pretty">
          {k.intro}
        </p>
        <p className="mt-3 text-xs text-fg-muted">
          {k.lastUpdatedLabel}: {k.lastUpdated}
        </p>

        <div className="mt-12 space-y-10">
          {k.sections.map((section) => (
            <section key={section.heading} className="space-y-3">
              <h2 className="font-display text-2xl text-fg">
                {section.heading}
              </h2>
              {section.body && (
                <p className="text-fg/85 leading-relaxed whitespace-pre-line">
                  {section.body}
                </p>
              )}
              {section.items.length > 0 && (
                <ul className="list-disc pl-5 text-fg/85 space-y-1.5 marker:text-bronze">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
