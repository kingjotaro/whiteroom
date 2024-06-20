import { defineConfig, type AstroUserConfig } from 'astro/config';
import vercelStatic from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
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
  site: 'https://whiteroom.vercel.app/',
  integrations: [
    sitemap(),
    react(),
  ],
  output: "static",
  adapter: vercelStatic(),
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
