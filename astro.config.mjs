// @ts-check
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// O script inline que aplica o tema antes da pintura (evita o "flash") não passa pelo bundler,
// então o hash dele entra na CSP manualmente. Ele é lido do mesmo arquivo que o layout renderiza.
const themeInit = readFileSync(new URL('./src/scripts/theme-init.js', import.meta.url), 'utf8');
/** @param {string} s @returns {`sha256-${string}`} */
const sha256 = (s) => `sha256-${createHash('sha256').update(s).digest('base64')}`;

export default defineConfig({
  site: 'https://stuaninauts.com',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', pt: 'pt-BR' } },
    }),
  ],
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: { hashes: [sha256(themeInit)] },
    },
  },
});
