import { Product, SizeChartRow } from '@/types'

export const SIZE_CHART: SizeChartRow[] = [
  { size: 'NB',    age: 'Newborn',      chest: '14"', waist: '14"', length: '18"', weight: '5–8 lbs'  },
  { size: '0-3M',  age: '0–3 months',   chest: '16"', waist: '16"', length: '20"', weight: '8–12 lbs' },
  { size: '3-6M',  age: '3–6 months',   chest: '17"', waist: '17"', length: '22"', weight: '12–16 lbs'},
  { size: '6-12M', age: '6–12 months',  chest: '18"', waist: '18"', length: '24"', weight: '14–18 lbs'},
  { size: '12-18M',age: '12–18 months', chest: '20"', waist: '20"', length: '28"', weight: '22–26 lbs'},
  { size: '18-24M',age: '18–24 months', chest: '21"', waist: '21"', length: '30"', weight: '26–30 lbs'},
]

const GIRL_DIR = '/images/products/ninas'
const BOY_DIR  = '/images/products/ninos'

const CHRISTENING_SIZES = [
  { label: '6-12M',  value: '6-12m',  available: true },
  { label: '12-18M', value: '12-18m', available: true },
  { label: '18-24M', value: '18-24m', available: true },
]

export const PRODUCTS: Product[] = [

  // ── GIRLS ────────────────────────────────────────────────────────────────

  {
    id: 'aurora',
    slug: 'aurora',
    name: 'Aurora',
    price: 23000,
    description:
      'The Aurora gown is made from fine guipure lace with a beautiful floral pattern that covers the entire dress. It features a bow with champagne-colored details and comes with a matching headband and bonnet to complement the look. Includes two dresses — one short and one long — ideal for adapting to different moments of the event.',
    details: [
      'Short dress worn on top',
      'Long dress worn underneath (sleeveless for comfort)',
      'Matching bonnet',
      'Matching headband',
      'Fine guipure lace with champagne bow detail',
      'Dry clean recommended',
    ],
    gender: 'girl',
    category: 'gowns',
    sizes: CHRISTENING_SIZES,
    images: [
      `${GIRL_DIR}/aurora-1.jpg`,
      `${GIRL_DIR}/aurora-2.jpg`,
      `${GIRL_DIR}/aurora-3.jpg`,
    ],
    featured: true,
    newArrival: false,
    tags: ['guipure lace', 'floral', 'detachable', 'bonnet', 'headband'],
  },

  {
    id: 'scarlett',
    slug: 'scarlett',
    name: 'Scarlett',
    price: 23000,
    description:
      'The Scarlett gown stands out for its 3D flowers that highlight the beautiful ivory-tone guipure lace, adorned with delicate pearls and a floral embellishment at the center. It includes a matching bonnet and features two dresses — one short and one long — ideal for adapting to different moments of the event.',
    details: [
      'Short dress worn on top',
      'Long dress worn underneath (sleeveless for comfort)',
      'Matching bonnet',
      '3D flowers over ivory guipure lace',
      'Hand-applied pearl accents',
      'Dry clean recommended',
    ],
    gender: 'girl',
    category: 'gowns',
    sizes: CHRISTENING_SIZES,
    images: [
      `${GIRL_DIR}/scarlett-1.jpg`,
      `${GIRL_DIR}/scarlet-2.jpg`,
      `${GIRL_DIR}/scarlett-3.jpg`,
    ],
    featured: true,
    newArrival: false,
    tags: ['guipure lace', '3D flowers', 'pearls', 'detachable', 'bonnet'],
  },

  {
    id: 'sophia',
    slug: 'sophia',
    name: 'Sophia',
    price: 23000,
    description:
      'The Sophia gown is crafted exclusively in white with a beautiful design of flowers and branches over embroidered tulle, adorned with pearls distributed throughout. A touch of blush color adds a sweet and delicate accent. Includes two dresses — one short and one long — plus a matching bonnet and headband.',
    details: [
      'Short dress worn on top',
      'Long dress worn underneath (sleeveless for comfort)',
      'Matching bonnet',
      'Matching headband',
      'Flowers and branches over embroidered tulle',
      'Pearl accents with blush color details',
      'Dry clean recommended',
    ],
    gender: 'girl',
    category: 'gowns',
    sizes: CHRISTENING_SIZES,
    images: [
      `${GIRL_DIR}/sophia-1.jpg`,
      `${GIRL_DIR}/sophia-2.jpg`,
      `${GIRL_DIR}/sophia-3.jpg`,
    ],
    featured: false,
    newArrival: true,
    tags: ['white', 'tulle', 'pearls', 'blush', 'detachable', 'bonnet', 'headband'],
  },

  {
    id: 'emma',
    slug: 'emma',
    name: 'Emma',
    price: 22000,
    description:
      'The Emma gown is characterized by its layered floral embroidery and appliqués of beadwork and small scattered pearls. It features a blush-colored belt decorated with small flowers and dangling details. A matching bonnet is included. It comes with two dresses — one short and one long — ideal for adapting to different moments of the event.',
    details: [
      'Short dress worn on top',
      'Long dress worn underneath (sleeveless for comfort)',
      'Matching bonnet',
      'Layered floral embroidery with beadwork appliqués',
      'Blush belt with floral and dangling details',
      'Scattered pearl accents',
      'Dry clean recommended',
    ],
    gender: 'girl',
    category: 'gowns',
    sizes: CHRISTENING_SIZES,
    images: [
      `${GIRL_DIR}/emma-1.jpg`,
      `${GIRL_DIR}/emma-2.jpg`,
      `${GIRL_DIR}/emma-3.jpg`,
    ],
    featured: false,
    newArrival: true,
    tags: ['floral embroidery', 'beadwork', 'pearls', 'blush', 'detachable', 'bonnet'],
  },

  {
    id: 'juliet',
    slug: 'juliet',
    name: 'Juliet',
    price: 25000,
    description:
      'The Juliet gown is made with beautiful, high-quality embroidered lace featuring blush-colored details. It includes two dresses — one short and one long — ideal for adapting to different moments of the event, along with a matching bonnet and headband to complete the perfect look.',
    details: [
      'Short dress worn on top',
      'Long dress worn underneath (sleeveless for comfort)',
      'Matching bonnet',
      'Matching headband',
      'High-quality embroidered lace with blush details',
      'Dry clean recommended',
    ],
    gender: 'girl',
    category: 'gowns',
    sizes: CHRISTENING_SIZES,
    images: [
      `${GIRL_DIR}/juliet-1.jpg`,
      `${GIRL_DIR}/juliet-2.jpg`,
      `${GIRL_DIR}/juliet-3.jpg`,
    ],
    featured: true,
    newArrival: false,
    tags: ['embroidered lace', 'blush', 'detachable', 'bonnet', 'headband'],
  },

  {
    id: 'lily',
    slug: 'lily',
    name: 'Lily',
    price: 18000,
    description:
      'The Lily gown is crafted from beautiful fabric featuring floral lace on the skirt and hand-embroidered beadwork on the bodice, making it truly unique. It features a decorative arrangement of flowers and pearl garlands, and includes a bonnet. It comes with two dresses — one short and one long — ideal for adapting to different moments of the event.',
    details: [
      'Short dress worn on top',
      'Long dress worn underneath (sleeveless for comfort)',
      'Matching bonnet',
      'Floral lace skirt with hand-embroidered bodice',
      'Decorative pearl garland arrangement',
      'Dry clean recommended',
    ],
    gender: 'girl',
    category: 'gowns',
    sizes: CHRISTENING_SIZES,
    images: [
      `${GIRL_DIR}/lily-1.jpg`,
      `${GIRL_DIR}/lily-2.jpg`,
      `${GIRL_DIR}/lily-3.jpg`,
    ],
    featured: false,
    newArrival: false,
    tags: ['floral lace', 'beadwork', 'pearls', 'detachable', 'bonnet'],
  },

  // ── BOYS ─────────────────────────────────────────────────────────────────

  {
    id: 'andrew',
    slug: 'andrew',
    name: 'Andrew',
    price: 17000,
    description:
      'The Andrew set features a stole with pearl and crystal beads hand-applied, along with a delicate cross-shaped embroidery. This 6-piece set includes everything you need for the ceremony. Bloomer-style pants with elastic waistband and adjustable suspenders ensure comfort, while the elegant hat and matching sheet and candle complete the perfect baptism look.',
    details: [
      'Elegant hat',
      'Embroidered shirt with buttons on the back',
      'Pants with elastic waistband and suspenders',
      'Hand-embroidered stole with crystals and pearls',
      'Matching embroidered baptism sheet (37" × 26")',
      'Baptism candle with a cross',
      'Handkerchief and decorated shell for the ceremony',
      'Dry clean recommended',
    ],
    gender: 'boy',
    category: 'sets',
    sizes: CHRISTENING_SIZES,
    images: [
      `${BOY_DIR}/andrew-1.png`,
      `${BOY_DIR}/andrew-2.png`,
      `${BOY_DIR}/andrew-3.png`,
      `${BOY_DIR}/andrew-4.png`,
      `${BOY_DIR}/andrew-vela.png`,
    ],
    featured: true,
    newArrival: false,
    tags: ['6-piece set', 'crystals', 'pearls', 'cross', 'stole', 'candle'],
  },

  {
    id: 'aron',
    slug: 'aron',
    name: 'Aron',
    price: 17000,
    description:
      'The Aron set features a stole decorated with pearls and crystals hand-applied over a beautiful embroidered cross and wavy lines symbolizing water — representing the sacrament of baptism. This complete 6-piece set includes everything needed for the ceremony, with bloomer-style pants, adjustable suspenders, and a matching sheet and candle.',
    details: [
      'Elegant hat',
      'Embroidered shirt with buttons on the back',
      'Pants with elastic waistband and suspenders',
      'Hand-embroidered stole with crystals and pearls',
      'Matching embroidered baptism sheet (37" × 26")',
      'Baptism candle with a cross',
      'Handkerchief and decorated shell for the ceremony',
      'Dry clean recommended',
    ],
    gender: 'boy',
    category: 'sets',
    sizes: CHRISTENING_SIZES,
    images: [
      `${BOY_DIR}/aron-1.png`,
      `${BOY_DIR}/aron-2.png`,
      `${BOY_DIR}/aron-3.png`,
      `${BOY_DIR}/aron-4.png`,
      `${BOY_DIR}/aron-vela.png`,
    ],
    featured: false,
    newArrival: false,
    tags: ['6-piece set', 'crystals', 'pearls', 'cross', 'stole', 'water symbolism'],
  },

  {
    id: 'mauro',
    slug: 'mauro',
    name: 'Mauro',
    price: 17500,
    description:
      'The Mauro set features a stole with fine guipure lace decorated with pearls and crystals hand-embroidered, accompanied by a 3D cross that stands out for its shine and elegance. This complete 6-piece set includes everything for the ceremony, with bloomer-style pants, adjustable suspenders, and a matching sheet and candle.',
    details: [
      'Elegant hat',
      'Embroidered shirt with buttons on the back',
      'Pants with elastic waistband and suspenders',
      'Hand-embroidered stole with crystals and pearls',
      'Matching embroidered baptism sheet (37" × 26")',
      'Baptism candle with a cross',
      'Handkerchief and decorated shell for the ceremony',
      'Dry clean recommended',
    ],
    gender: 'boy',
    category: 'sets',
    sizes: CHRISTENING_SIZES,
    images: [
      `${BOY_DIR}/mauro-1.png`,
      `${BOY_DIR}/mauro-2.png`,
      `${BOY_DIR}/mauro-3.png`,
      `${BOY_DIR}/mauro-4.png`,
      `${BOY_DIR}/mauro-vela.png`,
    ],
    featured: true,
    newArrival: false,
    tags: ['6-piece set', 'guipure lace', 'crystals', 'pearls', '3D cross', 'stole'],
  },

  {
    id: 'noah',
    slug: 'noah',
    name: 'Noah',
    price: 16000,
    description:
      'The Noah set features a delicate embroidery of a cross and a dove representing the Holy Spirit, adorned with small pearls and crystals hand-applied. This complete 6-piece set includes everything for the ceremony, with bloomer-style pants, adjustable suspenders, and a matching sheet and candle.',
    details: [
      'Elegant hat',
      'Embroidered shirt with buttons on the back',
      'Pants with elastic waistband and suspenders',
      'Hand-embroidered stole with crystals and pearls',
      'Matching embroidered baptism sheet (37" × 26")',
      'Baptism candle with a cross',
      'Handkerchief and decorated shell for the ceremony',
      'Dry clean recommended',
    ],
    gender: 'boy',
    category: 'sets',
    sizes: CHRISTENING_SIZES,
    images: [
      `${BOY_DIR}/noah-1.png`,
      `${BOY_DIR}/noah-2.png`,
      `${BOY_DIR}/noah-3.png`,
      `${BOY_DIR}/noah-4.png`,
      `${BOY_DIR}/noah-vela.png`,
    ],
    featured: false,
    newArrival: true,
    tags: ['6-piece set', 'dove', 'Holy Spirit', 'cross', 'crystals', 'pearls', 'stole'],
  },

  {
    id: 'sebastian',
    slug: 'sebastian',
    name: 'Sebastian',
    price: 16000,
    description:
      'The Sebastian set features beautiful, detailed embroidery with different appliqués in warm tones, highlighted by crosses formed with pearls, giving it a unique and distinctive touch. This complete 6-piece set includes everything for the ceremony, with bloomer-style pants, adjustable suspenders, and a matching sheet and candle.',
    details: [
      'Elegant hat',
      'Embroidered shirt with buttons on the back',
      'Pants with elastic waistband and suspenders',
      'Hand-embroidered stole with crystals and pearls',
      'Matching embroidered baptism sheet (37" × 26")',
      'Baptism candle with a cross',
      'Handkerchief and decorated shell for the ceremony',
      'Dry clean recommended',
    ],
    gender: 'boy',
    category: 'sets',
    sizes: CHRISTENING_SIZES,
    images: [
      `${BOY_DIR}/sebastian-1.png`,
      `${BOY_DIR}/sebastian-2.png`,
      `${BOY_DIR}/sebastian-3.png`,
      `${BOY_DIR}/sebastian-4.png`,
      `${BOY_DIR}/sebastian-vela.png`,
    ],
    featured: false,
    newArrival: true,
    tags: ['6-piece set', 'pearl crosses', 'appliqués', 'stole', 'candle'],
  },

  {
    id: 'manuel',
    slug: 'manuel',
    name: 'Manuel',
    price: 16000,
    description:
      'The Manuel set features a stole with detailed embroidery that adds texture to the design, along with a large cross embellished with beadwork, adding shine and sophistication. This complete 6-piece set includes everything for the ceremony, with bloomer-style pants, adjustable suspenders, and a matching sheet and candle.',
    details: [
      'Elegant hat',
      'Embroidered shirt with buttons on the back',
      'Pants with elastic waistband and suspenders',
      'Hand-embroidered stole with crystals and pearls',
      'Matching embroidered baptism sheet (37" × 26")',
      'Baptism candle with a cross',
      'Handkerchief and decorated shell for the ceremony',
      'Dry clean recommended',
    ],
    gender: 'boy',
    category: 'sets',
    sizes: CHRISTENING_SIZES,
    images: [
      `${BOY_DIR}/manuel-1.png`,
      `${BOY_DIR}/manuel-2.png`,
      `${BOY_DIR}/manuel-3.png`,
      `${BOY_DIR}/manuel-4.png`,
      `${BOY_DIR}/manuel-vela.png`,
    ],
    featured: false,
    newArrival: false,
    tags: ['6-piece set', 'beadwork', 'cross', 'embroidery', 'stole'],
  },

  {
    id: 'fernando',
    slug: 'fernando',
    name: 'Fernando',
    price: 12000,
    description:
      'The Fernando set combines elegance and tenderness, making it ideal for baptisms, weddings, birthdays, or photo sessions. Balloon-style pants with adjustable suspenders and elastic waistband, a light beige shirt, a bow tie, and a distinguished hat — a timeless look that will make your little one the center of all attention.',
    details: [
      'Elegant hat',
      'Embroidered shirt with buttons on the back',
      'Balloon-style pants with elastic waistband and suspenders',
      'Bow tie',
      'Dry clean recommended',
    ],
    gender: 'boy',
    category: 'sets',
    sizes: [
      { label: '12-18M', value: '12-18m', available: true },
    ],
    images: [
      `${BOY_DIR}/fernando-1.png`,
      `${BOY_DIR}/fernando-2.png`,
      `${BOY_DIR}/fernando-3.png`,
    ],
    featured: false,
    newArrival: false,
    tags: ['3-piece set', 'bow tie', 'hat', 'suspenders', 'classic'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.featured)
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter(p => p.newArrival)
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS
  if (category === 'girls') return PRODUCTS.filter(p => p.gender === 'girl')
  if (category === 'boys')  return PRODUCTS.filter(p => p.gender === 'boy')
  return PRODUCTS.filter(p => p.category === category)
}
