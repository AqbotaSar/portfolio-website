import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['kk', 'ru', 'en'] as const,
  defaultLocale: 'ru'
});

export type Locale = (typeof routing.locales)[number];
