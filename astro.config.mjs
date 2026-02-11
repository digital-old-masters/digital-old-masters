// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
/* 【追加】Sitemapインテグレーション */
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub URLのドメイン部分
  site: 'https://digital-old-masters.github.io',

  // リポジトリ名（サブディレクトリ）
  base: '/digital-old-masters',

  integrations: [
    mdx(),
    /* ビルド時に sitemap-index.xml を生成 */
    sitemap(),
  ],
});