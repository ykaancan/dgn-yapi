import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  code: string;
  title: string;
  body: string;
  cta: { label: string; onClick?: () => void; href?: string };
  ctaSecondary?: { label: string; href: string };
};

export function StatusScreen({ code, title, body, cta, ctaSecondary }: Props) {
  return (
    <section className="min-h-[80svh] flex items-center justify-center pt-32 pb-24">
      <div className="container-x max-w-2xl text-center">
        <p className="font-display text-7xl md:text-9xl text-bronze/40 select-none">
          {code}
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-5xl text-balance leading-[1.1] text-fg">
          {title}
        </h1>
        <p className="mt-6 text-fg/70 text-pretty max-w-lg mx-auto">{body}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {cta.href ? (
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-bg font-medium rounded-full hover:bg-bronze-light transition-colors"
            >
              {cta.label}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <button
              onClick={cta.onClick}
              className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-bg font-medium rounded-full hover:bg-bronze-light transition-colors"
            >
              {cta.label}
              <ArrowRight size={16} />
            </button>
          )}
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-fg rounded-full hover:border-bronze hover:text-bronze transition-colors"
            >
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
