/**
 * src/lib/content.ts
 * "The Central Water Plant" (データ浄水場)
 * * 責務:
 * 1. 記事ファイル(.md/.mdx)の一括取得
 * 2. 日付順のソート (新しい順)
 * 3. 画像パスの正規化 (パス → ID変換)
 */

// 投稿データの型定義 (TypeScriptの恩恵)
export interface Post {
  url: string;
  frontmatter: {
    title: string;
    artDate: string;
    description?: string;
    image?: string;      // Cloudinary ID (例: aoiro-001)
    tags?: string[];
    category?: string;
    location?: string;
    // Legacy support (移行期間用)
    originalPath?: string; // 元のパス (例: /images/aoiro-001.jpg)
  };
  file: string; // ファイルの絶対パス
}

// 全記事を取得・加工して返す関数
export function getAllPosts(): Post[] {
  // 1. globで全記事を取得 (eager: true で即座に読み込む)
  const matches = import.meta.glob('../pages/posts/*.{md,mdx}', { eager: true });
  
  // 2. 配列に変換
  const posts = Object.values(matches) as any[];

  // 3. ソートと加工 (The Filtration Process)
  return posts
    .sort((a, b) => {
      // 日付順 (新しい順)
      return new Date(b.frontmatter.artDate).getTime() - new Date(a.frontmatter.artDate).getTime();
    })
    .map((post) => {
      const rawImage = post.frontmatter.image || '';
      
      // 画像パスからIDを抽出 (The ID Extraction)
      // 例: "/images/aoiro-001.jpg" -> "aoiro-001"
      // 例: "aoiro-001" -> "aoiro-001" (すでにIDの場合)
      const imageId = rawImage
        .replace(/^\/?images\//, '') // 先頭の /images/ を削除
        .replace(/^\/?public\//, '') // 万が一 public/ があっても削除
        .replace(/\.[^/.]+$/, "");   // 拡張子(.jpgなど)を削除

      return {
        ...post,
        frontmatter: {
          ...post.frontmatter,
          // ここでデータを上書き！
          // 今後、全てのコンポーネントは "image" を呼べば "ID" が返ってくる
          image: imageId,
          
          // 念のため元のパスも保存しておく (デバッグ用)
          originalPath: rawImage
        },
        url: post.url
      };
    });
}

// 特定のタグを持つ記事だけを取得するヘルパー関数
export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(post => 
    post.frontmatter.tags && post.frontmatter.tags.includes(tag)
  );
}

// 特定のカテゴリーを持つ記事だけを取得するヘルパー関数
export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter(post => 
    post.frontmatter.category === category
  );
}

console.log("✅ The Water Plant is running: Content pipeline established.");