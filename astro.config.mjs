// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // あなたのGitHub URLのドメイン部分
  site: 'https://digital-old-masters.github.io',

  // あなたのリポジトリ名（サブディレクトリ）
  base: '/digital-old-masters',

  integrations: [mdx()],
});