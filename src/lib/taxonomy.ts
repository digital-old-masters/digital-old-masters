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
    url?: string;      // 
    mediumName?: string;
}

// 画材のマスター辞書
export const TOOL_DICTIONARY: Record<string, ToolData> = {
    'ipad-pro': {
        id: 'ipad-pro',
        name: 'iPad Pro 11',
        brand: 'Apple',
        schemaType: 'Product',
        description: 'Digital canvas for sketching.',
        url: 'https://www.apple.com/ipad-pro/',
        mediumName: 'Digital Painting (iPad)'
    },
    'apple-pencil': {
        id: 'apple-pencil',
        name: 'Apple Pencil (2nd Gen)',
        brand: 'Apple',
        schemaType: 'Product',
        url: 'https://www.apple.com/apple-pencil/'
    },
    'tayasui-sketch': {
        id: 'tayasui-sketch',
        name: 'Tayasui Sketches Pro',
        brand: 'Tayasui',
        schemaType: 'SoftwareApplication',
        url: 'https://tayasui.com/sketches/',
        mediumName: 'Digital Application'
    },

    // --- Fountain Pens (万年筆) ---
    'pelikan-m800': {
        id: 'pelikan-m800',
        name: 'Souverän M800',
        brand: 'Pelikan',
        schemaType: 'IndividualProduct',
        description: 'The classic fountain pen with a brass piston mechanism.',
        url: 'https://www.pelikan.com',
        mediumName: 'Fountain Pen'
    },
    'pilot-elabo': {
        id: 'pilot-elabo',
        name: 'Pilot Elabo (SF, 14K)', // 海外名: Namiki Falcon
        brand: 'Pilot',
        schemaType: 'Product',
        description: 'Flexible nib fountain pen suitable for sketching.',
        url: 'https://www.pilot.co.jp/products/pen/fountain/fountain/elabo/',
        mediumName: 'Fountain Pen'
    },

    // --- Inks (インク) ---
    'montblanc-toffee': {
        id: 'montblanc-toffee',
        name: 'Montblanc Toffee Brown',
        brand: 'Montblanc',
        schemaType: 'Product',
        url: 'https://www.montblanc.com/',
        mediumName: 'Fountain Pen Ink'
    },

    // --- Colored Pencils (色鉛筆) ---
    'faber-polychromos': {
        id: 'faber-polychromos',
        name: 'Polychromos Artists\' Color Pencils',
        brand: 'Faber-Castell',
        schemaType: 'Product',
        url: 'https://www.faber-castell.com/products/art-and-graphic/polychromos',
        mediumName: 'Colored Pencil' // 油性
    },
    'carandache-pablo': {
        id: 'carandache-pablo',
        name: 'Pablo Colored Pencils',
        brand: 'Caran d\'Ache',
        schemaType: 'Product',
        url: 'https://www.carandache.com/us/en/pablo-s-1097.htm',
        mediumName: 'Colored Pencil' // 油性/耐水性
    },
    'carandache-supracolor': {
        id: 'carandache-supracolor',
        name: 'Supracolor Soft II',
        brand: 'Caran d\'Ache',
        schemaType: 'Product',
        url: 'https://www.carandache.com/us/en/supracolor-aquarelle-s-1103.htm',
        mediumName: 'Watercolor Pencil' // 水溶性
    },

    // --- Brush Pens (ブラッシュペン) ---
    'kuretake-zig': {
        id: 'kuretake-zig',
        name: 'ZIG Clean Color Real Brush',
        brand: 'Kuretake',
        schemaType: 'Product',
        url: 'https://www.kuretake.co.jp/product/art-graphic/zig-clean-color-real-brush',
        mediumName: 'Watercolor Brush Pen'
    },
    
    'holbein-oil': {
        id: 'holbein-oil',
        name: 'Holbein Vernét',
        brand: 'Holbein',
        schemaType: 'Product',
        description: 'High quality oil paint.',
        mediumName: 'Oil on Canvas'
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
    'atelier': {
        id: 'atelier',
        name: 'Private Studio, Japan', // 公開される名称
        public: false // ★ GPS隠蔽フラグ (絶対に座標を出さない)
    },
    // 1. オランダ国立美術館 (Rijksmuseum)
    'rijksmuseum': {
        id: 'rijksmuseum',
        name: 'Rijksmuseum',
        address: 'Museumstraat 1, Amsterdam',
        geo: { latitude: 52.3600, longitude: 4.8852 },
        public: true
    },
    // 2. メトロポリタン美術館 (The Met)
    'the-met': {
        id: 'the-met',
        name: 'The Metropolitan Museum of Art',
        address: '1000 Fifth Avenue, New York',
        geo: { latitude: 40.7794, longitude: -73.9632 },
        public: true
    },
    // 3. ゲティ・センター (The Getty)
    'the-getty': {
        id: 'the-getty',
        name: 'The Getty Center',
        address: '1200 Getty Center Dr, Los Angeles',
        geo: { latitude: 34.0775, longitude: -118.4750 },
        public: true
    },
    // 4. ナショナル・ギャラリー (National Gallery of Art, DC)
    'national-gallery-dc': {
        id: 'national-gallery-dc',
        name: 'National Gallery of Art',
        address: 'Constitution Ave. NW, Washington, DC',
        geo: { latitude: 38.8914, longitude: -77.0200 }, // West Building
        public: true
    },
    // 5. クリーブランド美術館 (Cleveland Museum of Art)
    'cleveland-art': {
        id: 'cleveland-art',
        name: 'The Cleveland Museum of Art',
        address: '11150 East Blvd, Cleveland',
        geo: { latitude: 41.5089, longitude: -81.6117 },
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