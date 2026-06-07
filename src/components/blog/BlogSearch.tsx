'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { BlogCard } from './BlogCard';
import { BlogPost } from '@/types/content';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogSearchProps {
  posts: BlogPost[];
  allTags: string[];
  locale: string;
  searchPlaceholder: string;
  readMoreLabel: string;
  minReadLabel: string;
  allLabel?: string;
}

export default function BlogSearch({
  posts,
  allTags,
  locale,
  searchPlaceholder,
  readMoreLabel,
  minReadLabel,
  allLabel = 'All',
}: BlogSearchProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((post) => {
      const matchesSearch =
        !q ||
        post.frontmatter.title.toLowerCase().includes(q) ||
        post.frontmatter.description.toLowerCase().includes(q);

      const matchesTag =
        !activeTag || post.frontmatter.tags.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="pl-9"
        />
      </div>

      {/* Tag filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={cn(
            'inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
            activeTag === null
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
          )}
        >
          {allLabel}
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={cn(
              'inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              activeTag === tag
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No posts found.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              locale={locale}
              readMoreLabel={readMoreLabel}
              minReadLabel={minReadLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
