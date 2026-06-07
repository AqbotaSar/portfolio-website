import { getAllPosts, getAllTags } from '@/lib/mdx';
import { getTranslations } from 'next-intl/server';
import BlogSearch from '@/components/blog/BlogSearch';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  return { title: t('title') };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{t('title')}</h1>
        <p className="text-muted-foreground">{t('subtitle')}</p>
      </div>
      <BlogSearch
        posts={posts}
        allTags={tags}
        locale={locale}
        searchPlaceholder={t('search_placeholder')}
        readMoreLabel={t('read_more')}
        minReadLabel={t('min_read')}
      />
    </div>
  );
}
