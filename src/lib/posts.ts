// src/lib/posts.ts
import { getCollection } from 'astro:content';

export type Category = 'article' | 'tool' | 'guide' | 'case-study';

/** Fetch all published (non-draft) posts, sorted newest first. */
export async function getPublishedPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
}

/** Fetch published posts filtered by category. */
export async function getPostsByCategory(category: Category) {
  const posts = await getPublishedPosts();
  return posts.filter(post => post.data.category === category);
}

/** Collect all unique tags with their post counts from published posts. */
export async function getAllTags() {
  const posts = await getPublishedPosts();
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    }
  }
  // Sort alphabetically
  return Array.from(tagMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([tag, count]) => ({ tag, count }));
}
