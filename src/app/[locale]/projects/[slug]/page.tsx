import { getProjectBySlug, getAllProjects } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Code, ExternalLink, ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';

const typeLabels: Record<string, string> = {
  chatbot: 'Chatbot',
  website: 'Website',
  ai_tool: 'AI Tool',
  scraper: 'Scraper',
};

const typeColors: Record<string, string> = {
  chatbot:
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  website:
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  ai_tool:
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  scraper:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
};

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: 'projects' });
  const { frontmatter, content } = project;
  const { title, description, type, stack, github, demo } = frontmatter;

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      {/* Back button */}
      <div className="mb-8">
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'gap-1.5 inline-flex items-center'
          )}
        >
          <ArrowLeft className="size-4" />
          {t('title')}
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start gap-3 mb-3 flex-wrap">
          <h1 className="text-3xl font-bold leading-tight">{title}</h1>
          <span
            className={cn(
              'inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-sm font-medium mt-1',
              typeColors[type] ?? typeColors.chatbot
            )}
          >
            {typeLabels[type] ?? type}
          </span>
        </div>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {stack.map((tech) => (
          <Badge key={tech} variant="outline">
            {tech}
          </Badge>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 mb-12">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'gap-2 inline-flex items-center'
            )}
          >
            <Code className="size-4" />
            {t('view_code')}
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'gap-2 inline-flex items-center'
            )}
          >
            <ExternalLink className="size-4" />
            {t('view_demo')}
          </a>
        )}
      </div>

      {/* MDX content */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
