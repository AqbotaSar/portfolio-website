'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

function extractHeadings(content: string): Heading[] {
  const regex = /^#{2,3}\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[0].startsWith('###') ? 3 : 2;
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9а-яёәіңғүұқөһ\s]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    headings.push({ id, text, level });
  }
  return headings;
}

interface TableOfContentsProps {
  content: string;
  title?: string;
}

export default function TableOfContents({ content, title = 'Contents' }: TableOfContentsProps) {
  const headings = extractHeadings(content);
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -70% 0%' }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const TocList = () => (
    <ul className="space-y-1">
      {headings.map((heading) => (
        <li key={heading.id}>
          <button
            onClick={() => handleClick(heading.id)}
            className={cn(
              'w-full text-left text-sm leading-snug py-1 transition-colors rounded px-2',
              heading.level === 3 && 'pl-5',
              activeId === heading.id
                ? 'text-primary font-medium bg-primary/5'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            {heading.text}
          </button>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block sticky top-24">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 px-2">
          {title}
        </p>
        <TocList />
      </div>

      {/* Mobile: collapsible accordion at top of article */}
      <div className="lg:hidden mb-6 border rounded-lg overflow-hidden">
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium bg-muted/50 hover:bg-muted transition-colors"
        >
          <span className="flex items-center gap-2">
            <List className="size-4" />
            {title}
          </span>
          <span
            className={cn(
              'transition-transform duration-200',
              mobileOpen ? 'rotate-180' : ''
            )}
          >
            ▾
          </span>
        </button>
        {mobileOpen && (
          <div className="px-2 py-3">
            <TocList />
          </div>
        )}
      </div>
    </>
  );
}
