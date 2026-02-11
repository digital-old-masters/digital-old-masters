/* src/config.ts - The Single Source of Truth */

export const SITE_METADATA = {
  title: 'Digital Old Masters',
  description: 'A fusion of classical art and digital structure.',
  author: 'Digital Old Masters', 
  
  /* サイトのベースURL (SEO/JSON-LD用) */
  siteUrl: 'https://digital-old-masters.github.io/digital-old-masters',
};

/* ナビゲーション設定 */
export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/category/sketches', label: 'Sketches' },
  { href: '/category/essays', label: 'Essays' },
  { href: '/archives', label: 'Archives' },
  /* 検索などは特殊扱いするため、ここには含めずコンポーネントで追加、またはisIconフラグで管理 */
  { href: '#search', label: '🔍', isIcon: true },
];

/* SNSリンク設定 (Footer用) */
export const SOCIAL_LINKS = [
  { 
    label: 'X (Twitter)', 
    href: 'https://twitter.com/DigiOldMasters', // あなたのIDに変更してください
    icon: 'twitter' // 将来的にアイコンコンポーネントで分岐可能
  },
  { 
    label: 'YouTube', 
    href: 'https://www.youtube.com/@DigiOldMasters', 
    icon: 'youtube'
  },
];