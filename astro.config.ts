import { defineConfig, type AstroUserConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import vercel from "@astrojs/vercel/serverless";
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import fs from 'fs/promises';

const getBlogRoutesRedirect = async () => {
  const blogRoutesOldSlug = await fs.readdir('./src/content/blog');
  const blogRoutes = blogRoutesOldSlug.map((route) => [
    `/${route.replace('.md', '')}`,
    `/blog/${route.replace('.md', '')}`,
  ]);

  return Object.fromEntries(blogRoutes);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://placeholder.dev',
  integrations: [
    sitemap(),
    react(),
  ],
  output: "static",
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [
      remarkMath
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: 'github-light',
          keepBackground: false,
        },
      ],
    ],
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  redirects: {
    ...await getBlogRoutesRedirect(),
  }
});
