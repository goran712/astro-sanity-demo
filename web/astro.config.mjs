// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: true,
      // Astro's automatic "/" redirect needs a placeholder src/pages/index.astro, which
      // triggers a build warning. An explicit redirect below does the same job cleanly.
      redirectToDefaultLocale: false,
    },
  },
  redirects: {
    '/': '/en/',
  },
});
