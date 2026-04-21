/**
 * 模拟农产品数据（毕设演示，可替换为真实接口）
 */
export interface Product {
  id: string
  name: string
  price: number
  unit: string
  origin: string
  cover: string
  desc: string
  stock: number
}

export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: '有机西红柿',
    price: 12.8,
    unit: '斤',
    origin: '山东寿光',
    cover: 'https://images.unsplash.com/photo-1592924357228-91a4daadcabc?w=400&q=80',
    desc: '沙瓤多汁，适合鲜食与烹饪。采用有机肥种植，农残检测合格。',
    stock: 200,
  },
  {
    id: 'p2',
    name: '高山小土豆',
    price: 5.5,
    unit: '斤',
    origin: '云南昭通',
    cover: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=80',
    desc: '口感绵密，适合炖煮与烤制，产地直发。',
    stock: 500,
  },
  {
    id: 'p3',
    name: '精品富士苹果',
    price: 8.9,
    unit: '斤',
    origin: '陕西洛川',
    cover: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&q=80',
    desc: '脆甜爽口，果径 80mm+，冷链运输锁鲜。',
    stock: 120,
  },
  {
    id: 'p4',
    name: '新鲜生菜',
    price: 4.2,
    unit: '斤',
    origin: '本地基地',
    cover: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&q=80',
    desc: '即摘即配，适合沙拉与轻食搭配。',
    stock: 80,
  },
]

export function findProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id)
}
