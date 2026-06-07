'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function handleLocaleChange(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Language switcher">
      {routing.locales.map((loc) => (
        <Button
          key={loc}
          variant="ghost"
          size="sm"
          onClick={() => handleLocaleChange(loc)}
          className={`h-8 px-2 text-xs font-medium cursor-pointer transition-colors duration-200 ${
            locale === loc
              ? 'text-blue-500 font-semibold'
              : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label={`Switch to ${loc.toUpperCase()}`}
          aria-pressed={locale === loc}
        >
          {loc.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}
