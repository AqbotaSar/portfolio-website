'use client';

import Image from 'next/image';
import { Code, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { Project } from '@/types/content';
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

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { frontmatter, slug } = project;
  const { title, description, type, stack, github, demo, image } = frontmatter;

  const visibleStack = stack.slice(0, 4);
  const extraStack = stack.length > 4 ? stack.length - 4 : 0;

  return (
    <Card className="group hover:shadow-md transition-all duration-200 overflow-hidden h-full flex flex-col">
      {/* Cover image / placeholder */}
      <Link href={`/projects/${slug}`} className="block">
        <div className="aspect-video bg-muted relative overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <span className="text-4xl opacity-20 select-none">
                {type === 'chatbot' && '💬'}
                {type === 'website' && '🌐'}
                {type === 'ai_tool' && '🤖'}
                {type === 'scraper' && '🔍'}
              </span>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-5 flex flex-col flex-1">
        {/* Title + type badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link href={`/projects/${slug}`} className="hover:underline">
            <h3 className="font-semibold text-base leading-tight">{title}</h3>
          </Link>
          <span
            className={cn(
              'inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium',
              typeColors[type] ?? typeColors.chatbot
            )}
          >
            {typeLabels[type] ?? type}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>

        {/* Stack badges */}
        <div className="flex flex-wrap gap-1 mb-auto">
          {visibleStack.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs h-5">
              {tech}
            </Badge>
          ))}
          {extraStack > 0 && (
            <Badge variant="outline" className="text-xs h-5">
              +{extraStack} more
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          {github && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                window.open(github, '_blank', 'noopener,noreferrer');
              }}
            >
              <Code className="size-3.5" />
              Code
            </Button>
          )}
          {demo && (
            <Button
              size="sm"
              className="gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                window.open(demo, '_blank', 'noopener,noreferrer');
              }}
            >
              <ExternalLink className="size-3.5" />
              Demo
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
