import { getAllProjects } from '@/lib/mdx';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return { title: t('title') };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const projects = getAllProjects();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>
      <ProjectsGrid projects={projects} />
    </div>
  );
}
