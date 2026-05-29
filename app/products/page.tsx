import { Suspense } from 'react'
import ProductsClient from './ProductsClient'

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-stone-400 text-sm">Loading products…</p>
      </div>
    }>
      <ProductsClient />
    </Suspense>
  )
}
