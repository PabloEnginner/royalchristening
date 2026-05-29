'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props {
  product: Product
  className?: string
}

export default function ProductCard({ product, className = '' }: Props) {
  const mainImage = product.images[0]

  return (
    <article
      className={`group relative bg-white overflow-hidden border border-stone-100 hover:border-gold-300 hover:shadow-md transition-all duration-300 ${className}`}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.newArrival && (
          <span className="px-2.5 py-1 bg-gold-500 text-white text-[10px] font-semibold tracking-widest uppercase">
            New
          </span>
        )}
        {product.compareAtPrice && (
          <span className="px-2.5 py-1 bg-stone-800 text-white text-[10px] font-semibold tracking-widest uppercase">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        className="absolute top-3 right-3 z-10 p-1.5 bg-white/90 text-stone-300 hover:text-gold-500 transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Add to wishlist"
      >
        <Heart size={16} />
      </button>

      {/* Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[3/4] bg-cream-100 overflow-hidden">
          {mainImage ? (
            <Image
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gold-200">
              <span className="text-sm text-gold-400">No image</span>
            </div>
          )}
          {/* Quick view */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
            <span className="px-5 py-2 bg-white text-stone-800 text-xs font-semibold shadow-md tracking-wide">
              View Details
            </span>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4 border-t border-stone-100">
        <p className="text-xs text-gold-500 font-medium uppercase tracking-widest mb-1">
          {product.gender === 'girl' ? 'Girls' : product.gender === 'boy' ? 'Boys' : 'Unisex'}
        </p>
        <Link href={`/products/${product.slug}`}>
          <h3
            className="text-stone-800 text-lg leading-snug hover:text-gold-600 transition-colors mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
          >
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-stone-800 font-semibold text-sm">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-stone-400 text-xs line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="text-xs text-gold-600 font-medium hover:text-gold-700 transition-colors tracking-wide underline underline-offset-2"
          >
            View →
          </Link>
        </div>
      </div>
    </article>
  )
}
