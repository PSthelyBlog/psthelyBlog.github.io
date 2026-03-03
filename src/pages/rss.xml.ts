// src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts } from '@lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: 'DevLog by Philippe',
    description: 'Practical developer content — web dev, AI, Rust, DevOps, design systems, and career reflections.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>en-us</language>',
    trailingSlash: false,
  });
}
