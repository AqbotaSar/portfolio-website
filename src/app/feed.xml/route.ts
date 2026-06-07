import { getAllPosts } from '@/lib/mdx';
import { NextResponse } from 'next/server';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://akbota.dev';

export async function GET() {
  const posts = getAllPosts();

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Akbota — AI Automator &amp; Web Developer</title>
    <link>${BASE_URL}</link>
    <description>AI chatbots, automation, and web development blog</description>
    <language>ru</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${BASE_URL}/ru/blog/${post.slug}</link>
      <guid>${BASE_URL}/ru/blog/${post.slug}</guid>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      ${post.frontmatter.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`).join('')}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
