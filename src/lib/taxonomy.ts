/**
 * src/lib/taxonomy.ts
 * "The Dictionary of Things" (Ver 0.3.1: Sanctuary & Field)
 */

// --- Domain: Tool (Product) ---
export interface ToolData {
    id: string;
    name: string;      // 表示名
    brand: string;     // ブランド名
    schemaType: string; // 'Product' | 'IndividualProduct' | 'SoftwareApplication'
    description?: string;
    url?: string;      // 公式サイトや購入リンク
}

// 画材のマスター辞書
export const TOOL_DICTIONARY: Record<string, ToolData> = {
    'ipad-pro': {
        id: 'ipad-pro',
        name: 'iPad Pro 11"',
        brand: 'Apple',
        schemaType: 'Product',
        description: 'Digital canvas for sketching.'
    },
    'apple-pencil': {
        id: 'apple-pencil',
        name: 'Apple Pencil (2nd Gen)',
        brand: 'Apple',
        schemaType: 'Product'
    },
    'tayasui-sketch': {
        id: 'tayasui-sketch',
        name: 'Tayasui Sketches Pro',
        brand: 'Tayasui',
        schemaType: 'SoftwareApplication',
        url: 'https://tayasui.com/sketches/'
    },
    'pelikan-m800': {
        id: 'pelikan-m800',
        name: 'Souverän M800',
        brand: 'Pelikan',
        schemaType: 'IndividualProduct',
        description: 'The classic fountain pen with a brass piston mechanism.',
        url: 'https://www.pelikan.com'
    },
    'holbein-oil': {
        id: 'holbein-oil',
        name: 'Holbein Vernét',
        brand: 'Holbein',
        schemaType: 'Product',
        description: 'High quality oil paint.'
    }
};

// --- Domain: Place (Place) ---
export interface PlaceData {
    id: string;
    name: string;
    address?: string;
    geo?: {
        latitude: number;
        longitude: number;
    };
    public: boolean; // ★重要: falseならGPSを隠蔽する
}



// 場所のマスター辞書
export const PLACE_DICTIONARY: Record<string, PlaceData> = {
    // 聖域 (The Sanctuary)
    'atelier': {
        id: 'atelier',
        name: 'Private Studio, Japan', // 公開される名称
        public: false // ★ GPS隠蔽フラグ (絶対に座標を出さない)
    },
    // フィールド (The Field)
    'rijksmuseum': {
        id: 'rijksmuseum',
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        geo: { latitude: 52.3600, longitude: 4.8852 },
        public: true // GPS公開
    },

    // PLACE_DICTIONARY に追加
    'the-met': {
        id: 'the-met',
        name: 'The Metropolitan Museum of Art',
        address: '1000 Fifth Avenue, New York',
        geo: { latitude: 40.7794, longitude: -73.9632 },
        public: true
    }
};

// --- Helper Functions ---

export function getToolById(id: string): ToolData | undefined {
    if (!id || id === 'unknown') return undefined;
    return TOOL_DICTIONARY[id];
}

export function getPlaceById(id: string): PlaceData | undefined {
    if (!id || id === 'unknown') return undefined;
    return PLACE_DICTIONARY[id];
}