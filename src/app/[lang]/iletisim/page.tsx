import { notFound } from "next/navigation";
import { Clock, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { ContactForm } from "@/components/ui/contact-form";

const ADDRESS_QUERY = "Esenlik Mh. 9035 Sk. No:2/A, Karabağlar, İzmir";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS_QUERY)}`;

  return (
    <>
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="container-x">
          <p className="text-xs tracking-[0.3em] text-bronze mb-6">
            {dict.contact.title.toUpperCase()}
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-balance leading-[1.05] text-fg max-w-3xl">
            {dict.ctaBanner.title}
          </h1>
          <p className="mt-6 text-fg/75 text-base md:text-lg max-w-2xl text-pretty">
            {dict.iletisim.lead}
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <div className="rounded-xl border border-white/5 bg-bg-soft p-7 space-y-5">
              <p className="text-xs tracking-[0.2em] text-bronze">
                {dict.iletisim.officeTitle.toUpperCase()}
              </p>
              <div className="flex gap-4 text-fg/85">
                <MapPin size={20} className="shrink-0 mt-1 text-bronze" />
                <p className="whitespace-pre-line leading-relaxed">
                  {dict.footer.address}
                </p>
              </div>
              <a
                href={`tel:${dict.footer.phone.replace(/\s/g, "")}`}
                className="flex gap-4 text-fg/85 hover:text-bronze transition-colors"
              >
                <Phone size={20} className="shrink-0 mt-0.5 text-bronze" />
                <span>{dict.footer.phone}</span>
              </a>
              <a
                href={`tel:${dict.footer.companyPhone.replace(/\s/g, "")}`}
                className="flex gap-4 text-fg/85 hover:text-bronze transition-colors"
              >
                <Phone size={20} className="shrink-0 mt-0.5 text-bronze" />
                <span className="flex flex-col">
                  <span>{dict.footer.companyPhone}</span>
                  <span className="text-xs text-fg-muted mt-0.5">
                    {dict.footer.companyPhoneNote}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${dict.footer.email}`}
                className="flex gap-4 text-fg/85 hover:text-bronze transition-colors"
              >
                <Mail size={20} className="shrink-0 mt-0.5 text-bronze" />
                <span>{dict.footer.email}</span>
              </a>
              <a
                href={directions}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-bronze hover:text-bronze-light transition-colors text-sm pt-2 border-t border-white/5 mt-5 w-full"
              >
                <ExternalLink size={14} />
                {dict.iletisim.directions}
              </a>
            </div>

            <div className="rounded-xl border border-white/5 bg-bg-soft p-7 space-y-3">
              <p className="text-xs tracking-[0.2em] text-bronze">
                {dict.iletisim.hoursTitle.toUpperCase()}
              </p>
              <div className="flex gap-4 text-fg/85">
                <Clock size={20} className="shrink-0 mt-1 text-bronze" />
                <p className="whitespace-pre-line leading-relaxed">
                  {dict.iletisim.hours}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-white/5 bg-bg-soft p-7 md:p-9">
              <ContactForm dict={dict} />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <div className="rounded-2xl overflow-hidden border border-white/5 aspect-[16/9] md:aspect-[21/9]">
            <iframe
              src={mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[0.6] contrast-110"
              title="DGN Yapı satış ofisi konumu"
            />
          </div>
        </div>
      </section>
    </>
  );
}
