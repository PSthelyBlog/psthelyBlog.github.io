// src/content.config.ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum(['article', 'tool', 'guide', 'case-study']),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      heroImage: image().optional(),
      author: z.string().default('Philippe'),
      readingTime: z.string().optional(),
      featured: z.boolean().default(false),
      toolRating: z.number().min(1).max(10).optional(),
    }),
});

export const collections = { posts };
