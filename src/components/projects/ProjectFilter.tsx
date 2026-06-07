'use client';

import { cn } from '@/lib/utils';

export interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}

const filters = [
  { key: 'all', label: 'All' },
  { key: 'chatbot', label: 'Chatbot' },
  { key: 'website', label: 'Website' },
  { key: 'ai_tool', label: 'AI Tool' },
  { key: 'scraper', label: 'Scraper' },
];

export function ProjectFilter({
  activeFilter,
  onFilterChange,
  counts,
}: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ key, label }) => {
        const count = counts[key] ?? 0;
        const isActive = activeFilter === key;
        return (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-blue-500 text-white shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
            )}
          >
            {label}
            <span
              className={cn(
                'text-xs',
                isActive ? 'text-blue-100' : 'text-muted-foreground'
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
