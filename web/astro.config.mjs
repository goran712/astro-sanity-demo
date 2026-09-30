// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // Deployed in a sub-folder of the main domain; `base` prefixes every generated URL.
  site: 'https://gorandjordjevic.com',
  base: '/sanity-demo',
  trailingSlash: 'always',
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
    // Redirect targets are used verbatim, so the base must be written out here.
    '/': '/sanity-demo/en/',
  },
});
