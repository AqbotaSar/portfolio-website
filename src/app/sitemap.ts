import { MetadataRoute } from 'next';
import { getAllPosts, getAllProjects } from '@/lib/mdx';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://akbota.dev';
const locales = ['kk', 'ru', 'en'];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const projects = getAllProjects();

  const staticPages = ['', '/projects', '/blog', '/about', '/contact'];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      });
    }
  }

  // Blog posts
  for (const post of posts) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.frontmatter.date),
        changeFrequency: 'never',
        priority: 0.6,
      });
    }
  }

  // Projects
  for (const project of projects) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  }

  return entries;
}
