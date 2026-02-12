/* src/config.ts - The Single Source of Truth */

export const SITE_METADATA = {
  title: 'Digital Old Masters',
  description: 'A fusion of classical art and digital structure.',
  siteUrl: 'https://digital-old-masters.github.io/digital-old-masters/',
};

/* The Creator Identity */
/* この情報が全ての記事の JSON-LD に #identity として埋め込まれます */
export const CREATOR_IDENTITY = {
  name: 'Digital Old Masters', // 作家名
  jobTitle: 'Digital Old Master / Researcher',
  url: SITE_METADATA.siteUrl,
  image: `${SITE_METADATA.siteUrl}/images/avatar.jpg`, // プロフィール画像のパス
  sameAs: [
    'https://twitter.com/DigiOldMasters', // X (Twitter)
    'https://www.youtube.com/@DigiOldMasters', // YouTube
    // 将来的には情報を追加
  ],
  knowsAbout: [
    'Classical Art',
    'Oil Painting',
    'Digital Archiving',
    'Drawing',
    'Art Technology',
    'Fine Art',
    'Gesture Drawing'
  ]
};

/* ナビゲーション設定 (変更なし) */
export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/category/sketches', label: 'Sketches' },
  { href: '/category/essays', label: 'Essays' },
  { href: '/archives', label: 'Archives' },
  { href: '#search', label: '🔍', isIcon: true },
];

/* SNSリンク設定 (変更なし) */
export const SOCIAL_LINKS = [
  { 
    label: 'X (Twitter)', 
    href: 'https://twitter.com/DigiOldMasters', 
    icon: 'twitter'
  },
  { 
    label: 'YouTube', 
    href: 'https://www.youtube.com/@DigiOldMasters', 
    icon: 'youtube'
  },
];