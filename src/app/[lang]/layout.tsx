import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: {
      default: dict.meta.title,
      template: "%s | DGN Yapı",
    },
    description: dict.meta.description,
    metadataBase: new URL("https://dgnyapi.tr"),
    alternates: {
      canonical: `/${lang}`,
      languages: {
        tr: "/tr",
        en: "/en",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      type: "website",
      siteName: "DGN Yapı",
      locale: lang === "tr" ? "tr_TR" : "en_US",
      url: `/${lang}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://dgnyapi.tr/#org",
    name: "DGN Yapı",
    alternateName: "DGN Doğan Yapı",
    url: "https://dgnyapi.tr",
    logo: "https://dgnyapi.tr/brand/dgn-logo.png",
    image: "https://dgnyapi.tr/opengraph-image.png",
    description: dict.meta.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Esenlik Mh. 9035 Sk. No: 2/A",
      addressLocality: "Karabağlar",
      addressRegion: "İzmir",
      addressCountry: "TR",
    },
    telephone: "+90 232 430 23 46",
    email: "bilgi@dgnyapi.tr",
    openingHours: "Mo-Sa 09:00-19:00",
    sameAs: ["https://instagram.com/dgnyapiinsaat"],
    areaServed: { "@type": "City", name: "İzmir" },
  };

  return (
    <html
      lang={lang}
      className={`${geist.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <SiteHeader lang={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <SiteFooter lang={lang} dict={dict} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
