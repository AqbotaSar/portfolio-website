import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  locale: string;
}

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const tHome = await getTranslations({ locale, namespace: 'home' });

  return (
    <section
      className="relative min-h-[80vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at top, rgba(59,130,246,0.08) 0%, transparent 50%)',
      }}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl">
        {/* Available badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-600 dark:text-green-400">
          <span className="size-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
          {tHome('available')}
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
          <span className="text-muted-foreground text-3xl sm:text-4xl md:text-5xl font-normal block mb-1">
            {t('greeting')}
          </span>
          <span className="text-blue-500">{t('name')}</span>
        </h1>

        {/* Title */}
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-xl">
          {t('title')}
        </p>

        {/* Description */}
        <p className="text-muted-foreground max-w-lg text-base leading-relaxed">
          {t('description')}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <Link
            href="/projects"
            className={cn(
              buttonVariants({ variant: 'default', size: 'lg' }),
              'gap-2'
            )}
          >
            {t('cta_projects')}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            {t('cta_contact')}
          </Link>
        </div>
      </div>
    </section>
  );
}
