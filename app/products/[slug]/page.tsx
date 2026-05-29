import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug } from '@/lib/products'
import ProductDetailClient from './ProductDetailClient'

export function generateStaticParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return notFound()

  const related = PRODUCTS
    .filter(p => p.gender === product.gender && p.id !== product.id)
    .slice(0, 4)

  return <ProductDetailClient product={product} related={related} />
}
