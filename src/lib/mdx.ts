import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ProjectFrontmatter, Project, BlogFrontmatter, BlogPost } from '@/types/content';

const projectsDir = path.join(process.cwd(), 'src/content/projects');
const blogDir = path.join(process.cwd(), 'src/content/blog');

// ── Projects ──────────────────────────────────────────────

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) return [];
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.mdx'));
  return files
    .map(filename => {
      const slug = filename.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(projectsDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as ProjectFrontmatter, content };
    })
    .filter(p => p.frontmatter.published)
    .sort((a, b) => a.frontmatter.order - b.frontmatter.order);
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as ProjectFrontmatter, content };
}

export function getFeaturedProjects(count = 3): Project[] {
  return getAllProjects()
    .filter(p => p.frontmatter.featured)
    .slice(0, count);
}

// ── Blog ──────────────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
  return files
    .map(filename => {
      const slug = filename.replace('.mdx', '');
      const raw = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      return { slug, frontmatter: data as BlogFrontmatter, content };
    })
    .filter(p => p.frontmatter.published)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { slug, frontmatter: data as BlogFrontmatter, content };
}

export function getLatestPosts(count = 2): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  posts.forEach(p => p.frontmatter.tags.forEach(t => tagSet.add(t)));
  return Array.from(tagSet).sort();
}
