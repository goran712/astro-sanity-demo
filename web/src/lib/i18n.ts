// Mirrors the i18n block in astro.config.mjs (config values aren't importable at runtime).
export const locales = ['en', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Site chrome that doesn't come from Sanity (no site-settings document yet).
export const siteName = 'Courseline';

export const ui: Record<Locale, { skipToContent: string; language: string }> = {
  en: { skipToContent: 'Skip to content', language: 'Language' },
  de: { skipToContent: 'Zum Inhalt springen', language: 'Sprache' },
};
