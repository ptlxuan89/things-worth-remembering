import { defineConfig } from 'astro/config';
import remarkCallouts from './remark-callouts.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://ptlxuan89.github.io',
  base: '/things-worth-remembering',
  markdown: {
    remarkPlugins: [remarkCallouts],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
});
