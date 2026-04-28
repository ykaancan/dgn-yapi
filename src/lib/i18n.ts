const dictionaries = {
  tr: () => import("@/dictionaries/tr.json").then((m) => m.default),
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
} as const;

export const locales = ["tr", "en"] as const;
export const defaultLocale = "tr" as const;

export type Locale = keyof typeof dictionaries;
export type Dictionary = Awaited<ReturnType<typeof dictionaries.tr>>;

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]();

export const otherLocale = (locale: Locale): Locale =>
  locale === "tr" ? "en" : "tr";
