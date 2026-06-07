import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';
import { BlogPost } from '@/types/content';
import { Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  locale: string;
  readMoreLabel: string;
  minReadLabel: string;
}

export function BlogCard({ post, locale, readMoreLabel, minReadLabel }: BlogCardProps) {
  const { frontmatter, slug } = post;
  const { title, description, date, tags, readTime } = frontmatter;

  const formattedDate = new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
    new Date(date)
  );

  return (
    <Link href={`/blog/${slug}`} className="block group">
      <Card className="h-full hover:shadow-md transition-all duration-200 group-hover:border-primary/30">
        <CardContent className="p-5 flex flex-col h-full">
          {/* Date + read time */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {formattedDate}
            </span>
            {readTime && (
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {readTime} {minReadLabel}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base leading-tight mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs h-5">
                  {tag}
                </Badge>
              ))}
              {tags.length > 4 && (
                <Badge variant="outline" className="text-xs h-5">
                  +{tags.length - 4}
                </Badge>
              )}
            </div>
          )}

          {/* Read more */}
          <span className="mt-4 text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            {readMoreLabel} →
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
