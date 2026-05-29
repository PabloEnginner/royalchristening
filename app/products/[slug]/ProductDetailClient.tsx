'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Star, Shield, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Product } from '@/types'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import SizeChartModal from '@/components/products/SizeChartModal'
import ProductCard from '@/components/products/ProductCard'

interface Props {
  product: Product
  related: Product[]
}

export default function ProductDetailClient({ product, related }: Props) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [sizeError, setSizeError]       = useState(false)
  const [addedToCart, setAddedToCart]   = useState(false)
  const [activeImage, setActiveImage]   = useState(0)
  const { addItem } = useCartStore()

  function handleAddToCart() {
    if (!selectedSize) { setSizeError(true); return }
    const sizeOption = product.sizes.find(s => s.value === selectedSize)
    addItem(product, selectedSize, sizeOption?.label ?? selectedSize)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  const images = product.images
  const prevImage = () => setActiveImage(i => (i - 1 + images.length) % images.length)
  const nextImage = () => setActiveImage(i => (i + 1) % images.length)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-400 mb-8">
        <Link href="/" className="hover:text-gold-600 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-gold-600 transition-colors">Products</Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.gender === 'girl' ? 'girls' : 'boys'}`}
          className="hover:text-gold-600 transition-colors"
        >
          {product.gender === 'girl' ? 'Girls' : 'Boys'}
        </Link>
        <span>/</span>
        <span className="text-stone-600">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">

        {/* ── IMAGE GALLERY ── */}
        <div className="space-y-3">
          <div className="relative aspect-[3/4] bg-cream-100 overflow-hidden border border-gold-100 group">
            {images[activeImage] && (
              <Image
                src={images[activeImage]}
                alt={`${product.name} - photo ${activeImage + 1}`}
                fill
                className="object-cover transition-opacity duration-300"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={activeImage === 0}
              />
            )}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center text-stone-600 hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 flex items-center justify-center text-stone-600 hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={18} />
                </button>
                <div className="absolute bottom-3 right-3 bg-black/40 text-white text-[10px] px-2 py-1 font-medium tracking-wide">
                  {activeImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-20 shrink-0 overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-gold-500' : 'border-transparent hover:border-gold-200'
                  }`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── PRODUCT INFO ── */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold text-gold-500 uppercase tracking-widest">
              {product.gender === 'girl' ? 'Girls' : 'Boys'} · Christening Set
            </span>
            {product.newArrival && (
              <span className="px-2 py-0.5 bg-gold-100 text-gold-700 text-[10px] font-bold uppercase tracking-widest">
                New Arrival
              </span>
            )}
          </div>

          <h1
            className="text-4xl lg:text-5xl text-stone-800 leading-tight mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
          >
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-5">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} className="fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-xs text-stone-400">5.0 · 8 reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-stone-100">
            <span className="text-3xl font-bold text-stone-800">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-stone-400 line-through">{formatPrice(product.compareAtPrice)}</span>
                <span className="px-2 py-0.5 bg-stone-800 text-white text-xs font-bold">
                  Save {formatPrice(product.compareAtPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="text-stone-500 text-sm leading-relaxed mb-6">{product.description}</p>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest">Select Size</h3>
              <SizeChartModal />
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size.value}
                  disabled={!size.available}
                  onClick={() => { setSelectedSize(size.value); setSizeError(false) }}
                  className={`min-w-[52px] px-3 py-2 border text-sm font-medium transition-all
                    ${!size.available
                      ? 'border-stone-100 text-stone-300 cursor-not-allowed line-through bg-stone-50'
                      : selectedSize === size.value
                        ? 'border-gold-500 bg-gold-500 text-white'
                        : 'border-stone-200 text-stone-600 hover:border-gold-400 hover:text-gold-700 bg-white'
                    }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
            {sizeError && (
              <p className="mt-2 text-xs text-red-500">Please select a size before adding to cart</p>
            )}
          </div>

          {/* Add to cart */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold tracking-widest uppercase transition-all ${
                addedToCart
                  ? 'bg-green-500 text-white'
                  : 'bg-gold-500 text-white hover:bg-gold-600 active:scale-[0.98]'
              }`}
            >
              <ShoppingBag size={16} />
              {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              className="p-4 border border-stone-200 text-stone-400 hover:border-gold-400 hover:text-gold-500 transition-colors"
              aria-label="Save to wishlist"
            >
              <Heart size={18} />
            </button>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 pt-4 border-t border-stone-100">
            <Shield size={13} className="text-gold-500 shrink-0" />
            <span className="text-xs text-stone-500">Secure checkout · Handcrafted with love · Ships from USA</span>
          </div>
        </div>
      </div>

      {/* ── WHAT'S INCLUDED TAB ── */}
      <div className="border-t border-stone-100 mb-16">
        <div className="py-8">
          <h3
            className="text-xl text-stone-700 mb-5"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
          >
            What&apos;s Included
          </h3>
          <ul className="space-y-3">
            {product.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-stone-600">
                <span className="w-1.5 h-1.5 bg-gold-400 mt-1.5 shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── RELATED ── */}
      {related.length > 0 && (
        <section>
          <h2
            className="text-3xl text-stone-800 mb-8"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
          >
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  )
}
