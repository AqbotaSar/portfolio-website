import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getFeaturedProjects } from '@/lib/mdx';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ArrowRight } from 'lucide-react';

interface FeaturedProjectsProps {
  locale: string;
}

export default async function FeaturedProjects({ locale }: FeaturedProjectsProps) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const featuredProjects = getFeaturedProjects(3);

  if (featuredProjects.length === 0) return null;

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{t('featured_title')}</h2>
            <p className="text-muted-foreground mt-1">{t('featured_subtitle')}</p>
          </div>
          <Link
            href="/projects"
            className="shrink-0 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('featured_all')}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
