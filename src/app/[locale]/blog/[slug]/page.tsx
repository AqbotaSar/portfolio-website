import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/utils';
import TableOfContents from '@/components/blog/TableOfContents';
import PostNavigation from '@/components/blog/PostNavigation';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'blog' });
  const { frontmatter, content } = post;
  const { title, description, date, tags, readTime } = frontmatter;

  // Get prev/next posts
  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  const formattedDate = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
    new Date(date)
  );

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
        <div>
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'gap-1.5 inline-flex items-center'
              )}
            >
              <ArrowLeft className="size-4" />
              {t('title')}
            </Link>
          </div>

          {/* Mobile ToC — renders before article content */}
          <TableOfContents content={content} title="Contents" />

          <article>
            {/* Header */}
            <div className="mb-8">
              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {formattedDate}
                </span>
                {readTime && (
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {readTime} {t('min_read')}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold leading-tight mb-3">{title}</h1>
              <p className="text-muted-foreground text-lg">{description}</p>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* MDX content */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <MDXRemote
                source={content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypePrettyCode, { theme: 'github-dark' }],
                    ],
                  },
                }}
              />
            </div>

            {/* Prev/Next navigation */}
            <PostNavigation prev={prevPost} next={nextPost} />
          </article>
        </div>

        {/* Desktop ToC sidebar */}
        <aside className="hidden lg:block">
          <TableOfContents content={content} title="Contents" />
        </aside>
      </div>
    </div>
  );
}
