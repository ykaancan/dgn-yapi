import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
import type { Dictionary, Locale } from "@/lib/i18n";

type Props = { lang: Locale; dict: Dictionary };

export function SiteFooter({ lang, dict }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-bg-soft">
      <div className="container-x py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 space-y-5">
          <Image
            src="/brand/dgn-logo.png"
            alt="DGN Yapı"
            width={140}
            height={60}
            className="h-9 w-auto"
          />
          <p className="text-fg-muted max-w-sm">{dict.footer.tagline}</p>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs tracking-[0.2em] text-bronze mb-5">
            {dict.footer.nav.toUpperCase()}
          </h4>
          <ul className="space-y-3 text-fg/80">
            <li>
              <Link href={`/${lang}`} className="hover:text-bronze transition-colors">
                {dict.nav.home}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/kurumsal`} className="hover:text-bronze transition-colors">
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/projeler`} className="hover:text-bronze transition-colors">
                {dict.nav.projects}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}/iletisim`} className="hover:text-bronze transition-colors">
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs tracking-[0.2em] text-bronze mb-5">
            {dict.footer.contact.toUpperCase()}
          </h4>
          <div className="flex gap-3 text-fg/80">
            <MapPin size={18} className="shrink-0 mt-1 text-bronze" />
            <p className="whitespace-pre-line">{dict.footer.address}</p>
          </div>
          <a
            href={`tel:${dict.footer.phone.replace(/\s/g, "")}`}
            className="flex gap-3 text-fg/80 hover:text-bronze transition-colors"
          >
            <Phone size={18} className="shrink-0 text-bronze" />
            {dict.footer.phone}
          </a>
          <a
            href={`tel:${dict.footer.companyPhone.replace(/\s/g, "")}`}
            className="flex gap-3 text-fg/80 hover:text-bronze transition-colors"
          >
            <Phone size={18} className="shrink-0 text-bronze" />
            {dict.footer.companyPhone}
          </a>
          {dict.about.founders.people
            .filter((p) => p.role && !/kurucu|founder/i.test(p.role))
            .map((p) => (
              <a
                key={p.phone}
                href={`tel:${p.phone.replace(/\s/g, "")}`}
                className="flex gap-3 text-fg/80 hover:text-bronze transition-colors"
              >
                <Phone size={18} className="shrink-0 text-bronze" />
                <span className="flex flex-col">
                  <span>{p.phone}</span>
                  <span className="text-xs text-fg-muted">
                    {p.name} · {p.role}
                  </span>
                </span>
              </a>
            ))}
          <a
            href={`mailto:${dict.footer.email}`}
            className="flex gap-3 text-fg/80 hover:text-bronze transition-colors"
          >
            <Mail size={18} className="shrink-0 text-bronze" />
            {dict.footer.email}
          </a>
          <div className="pt-2 flex gap-3">
            <a
              href="https://instagram.com/dgnyapiinsaat"
              target="_blank"
              rel="noreferrer"
              className="p-2 border border-white/10 rounded-full hover:border-bronze hover:text-bronze transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-x py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-fg-muted">
          <p>
            © {year} DGN Yapı. {dict.footer.rights}
          </p>
          <p>İzmir, Türkiye</p>
        </div>
      </div>
    </footer>
  );
}
