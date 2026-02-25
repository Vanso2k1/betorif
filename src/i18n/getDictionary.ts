export type Lang = "fr" | "es" | "en" | "ar";

export const LANGS: Lang[] = ["fr", "es", "en", "ar"];

export async function getDictionary(lang: Lang) {
  return (await import(`./dictionaries/${lang}.json`)).default;
}
