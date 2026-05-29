export type Gender = 'girl' | 'boy' | 'unisex'
export type Category = 'gowns' | 'sets' | 'accessories' | 'shoes'

export interface SizeOption {
  label: string   // e.g. "0-3M"
  value: string   // e.g. "0-3m"
  available: boolean
}

export interface Product {
  id: string
  slug: string
  name: string
  price: number          // USD cents
  compareAtPrice?: number
  description: string
  details: string[]
  gender: Gender
  category: Category
  sizes: SizeOption[]
  images: string[]       // paths under /images/products/
  featured: boolean
  newArrival: boolean
  tags: string[]
}

export interface CartItem {
  product: Product
  size: string
  sizeLabel: string
  quantity: number
}

export interface SizeChartRow {
  size: string
  age: string
  chest: string   // inches
  waist: string
  length: string
  weight: string  // lbs
}

export interface OrderEmailData {
  orderNumber: string
  customerName: string
  customerEmail: string
  items: CartItem[]
  total: number
  shipping: ShippingAddress
}

export interface ShippingAddress {
  name: string
  address: string
  city: string
  state: string
  zip: string
  country: string
}
