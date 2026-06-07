'use client';

import { useState, useMemo } from 'react';
import { Project } from '@/types/content';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: projects.length };
    for (const project of projects) {
      const type = project.frontmatter.type;
      result[type] = (result[type] ?? 0) + 1;
    }
    return result;
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.frontmatter.type === activeFilter);
  }, [projects, activeFilter]);

  return (
    <div>
      <div className="mb-8">
        <ProjectFilter
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">
          No projects found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
