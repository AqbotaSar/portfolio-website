import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getLatestPosts } from '@/lib/mdx';
import { BlogCard } from '@/components/blog/BlogCard';
import { ArrowRight } from 'lucide-react';

interface LatestPostsProps {
  locale: string;
}

export default async function LatestPosts({ locale }: LatestPostsProps) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tBlog = await getTranslations({ locale, namespace: 'blog' });
  const latestPosts = getLatestPosts(2);

  if (latestPosts.length === 0) return null;

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-start justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{t('latest_title')}</h2>
            <p className="text-muted-foreground mt-1">{t('latest_subtitle')}</p>
          </div>
          <Link
            href="/blog"
            className="shrink-0 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t('latest_all')}
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {latestPosts.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              readMoreLabel={tBlog('read_more')}
              minReadLabel={tBlog('min_read')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
