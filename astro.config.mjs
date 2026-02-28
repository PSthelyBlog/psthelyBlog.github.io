// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';

export default defineConfig({
  site: 'https://psthelyBlog.github.io',

  integrations: [
    mdx(),
    sitemap(),
  ],

  markdown: {
    syntaxHighlight: false, // Disable built-in — rehype-pretty-code handles it
    remarkPlugins: [
      remarkGfm,
    ],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, {
        theme: {
          dark: 'github-dark',
          light: 'github-light',
        },
        keepBackground: true,
      }],
    ],
  },

  prefetch: {
    defaultStrategy: 'viewport',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
