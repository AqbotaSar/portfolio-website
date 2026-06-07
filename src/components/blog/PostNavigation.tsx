import { Link } from '@/i18n/navigation';
import { BlogPost } from '@/types/content';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PostNavigationProps {
  prev: BlogPost | null;
  next: BlogPost | null;
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null;

  return (
    <nav className="flex items-center justify-between gap-4 pt-8 mt-8 border-t">
      <div className="flex-1">
        {prev && (
          <Link
            href={`/blog/${prev.slug}`}
            className="group flex flex-col gap-1 text-sm hover:text-primary transition-colors"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5" />
              Previous
            </span>
            <span className="font-medium line-clamp-2 group-hover:text-primary">
              {prev.frontmatter.title}
            </span>
          </Link>
        )}
      </div>

      <div className="flex-1 text-right">
        {next && (
          <Link
            href={`/blog/${next.slug}`}
            className="group flex flex-col gap-1 text-sm hover:text-primary transition-colors items-end"
          >
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              Next
              <ArrowRight className="size-3.5" />
            </span>
            <span className="font-medium line-clamp-2 group-hover:text-primary">
              {next.frontmatter.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
