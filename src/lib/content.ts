/**
 * src/lib/content.ts
 * "The Central Water Plant" (Ver 0.3.1: Constellation Ready)
 */

export interface Post {
  url: string;
  frontmatter: {
    title: string;
    artDate: string;
    description?: string;
    image?: string;      // メイン作品のID
    tags?: string[];
    category?: string;

    // --- Dimension 1: The Authority (Updated) ---
    art_type?: 'study' | 'anchor' | 'ref' | 'witness';
    tools?: string[];     // 画材ID (例: ['ipad-pro'])
    location?: string;    // 場所ID (例: 'atelier', 'rijksmuseum')

    // --- The Constellation Model (複数画像・役割分担) ---
    gallery?: {
      // A. 内部画像 (Cloudinary ID)
      id?: string;
      
      // B. 外部画像 (Remote URL)
      url?: string;
      credit?: string; // 例: "The Met Collection"

      // C. 共通
      role: 'reference' | 'process' | 'detail' | 'witness';
      description?: string;

      // D. 手動メタデータ (外部画像用)
      meta?: {
        dateCreated?: string;
        lat?: number;
        lng?: number;
      };
    }[];

    // --- Dimension 1.5: Dialogue ---
    faq_content?: {
        q: string;
        a: string;
    }[];

    // --- Future Dimensions ---
    physical_dimensions?: { width: number; height: number; unit: 'cm' };
    process_video?: string;
  };
  file: string; // ファイルの絶対パス
}

// 全記事を取得・加工して返す関数 (既存ロジック維持)
export function getAllPosts(): Post[] {
  const matches = import.meta.glob('../pages/posts/*.{md,mdx}', { eager: true });
  const posts = Object.values(matches) as any[];

  return posts
    .sort((a, b) => new Date(b.frontmatter.artDate).getTime() - new Date(a.frontmatter.artDate).getTime())
    .map((post) => {
      const rawImage = post.frontmatter.image || '';
      
      const imageId = rawImage
        .replace(/^\/?images\//, '')
        .replace(/^\/?public\//, '')
        .replace(/\.[^/.]+$/, "");

      return {
        ...post,
        frontmatter: {
          ...post.frontmatter,
          image: imageId,
          originalPath: rawImage
        },
        url: post.url
      };
    });
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => post.frontmatter.tags && post.frontmatter.tags.includes(tag));
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(post => post.frontmatter.category === category);
}