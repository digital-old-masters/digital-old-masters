import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Cloudinary URL生成オプション
 * マエストロがMDXから自由に指定できるパラメータ群
 */
interface CloudinaryOptions {
  width?: number;
  height?: number;
  crop?: string;
  gravity?: string;
  format?: string;   // 'webp', 'jpg', 'png', 'auto'
  quality?: number | string; // 80, 90, 'auto'
  keepMetadata?: boolean; // trueならメタデータを保持
}

export function getCloudinaryUrl(publicId: string, options: CloudinaryOptions = {}) {
  // IDのクリーニング
  const cleanId = publicId.replace(/^\/?images\//, '').replace(/\.[^/.]+$/, "");

  // デフォルト値の設定 (The Standard)
  const format = options.format || 'webp'; // 基本はWebP
  const quality = options.quality || 80;   // 基本は画質80
  const crop = options.crop || 'limit';

  // メタデータ保持フラグの構築
  // keepMetadataがtrue、または指定なしの場合どうするか？
  // 今回は「明示的に指定された場合」のみ強力に保持するロジックにします
  let flags: string[] = [];
  if (options.keepMetadata) {
    flags.push('keep_iptc');
  }

  return cloudinary.url(cleanId, {
    format: format,
    quality: quality,
    width: options.width,
    height: options.height,
    crop: crop,
    gravity: options.gravity,
    secure: true,
    flags: flags.length > 0 ? flags : undefined
  });
}

// ... (getImageMetadata関数は変更なしのため省略可能です。必要なら前のまま残してください) ...
// ※ ここではスペース節約のため省略しますが、以前のコードのままでOKです。
export async function getImageMetadata(publicId: string) {
    // (以前と同じコード)
    try {
    const cleanId = publicId.replace(/^\/?images\//, '').replace(/\.[^/.]+$/, "");
    const result = await cloudinary.api.resource(cleanId, {
      image_metadata: true,
      colors: true,
    });
    return {
      id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      metadata: {
        title: result.image_metadata?.Title || result.image_metadata?.Headline || '',
        description: result.image_metadata?.Caption_Abstract || result.image_metadata?.Description || '',
        artist: result.image_metadata?.By_line || result.image_metadata?.Artist || 'Digital Old Masters',
        copyright: result.image_metadata?.Copyright || '',
        credit: result.image_metadata?.Credit || '',
        dateCreated: result.image_metadata?.Date_Created || result.created_at,
        gps: {
          latitude: result.image_metadata?.GPSLatitude,
          longitude: result.image_metadata?.GPSLongitude
        }
      },
      tags: result.tags || [],
      colors: result.colors || [],
    };
  } catch (error) {
    const errorMessage = (error as Error).message || String(error);
    console.warn(`⚠️ Metadata Fetch Warning for [${publicId}]:`, errorMessage);
    return {
      id: publicId,
      url: getCloudinaryUrl(publicId),
      metadata: {},
      fallback: true
    };
  }
}