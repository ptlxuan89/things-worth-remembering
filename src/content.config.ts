import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    category: z.enum(['tech', 'life', 'notes']),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['en', 'vi']).default('en'),
  }),
});

export const collections = { posts };
