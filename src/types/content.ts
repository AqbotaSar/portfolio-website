export interface ProjectFrontmatter {
  title: string;
  description: string;
  type: 'chatbot' | 'website' | 'ai_tool' | 'scraper';
  stack: string[];
  featured: boolean;
  order: number;
  github?: string;
  demo?: string;
  image?: string;
  published: boolean;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;       // ISO date string e.g. "2024-01-15"
  tags: string[];
  image?: string;
  published: boolean;
  readTime?: number;  // minutes
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}
