'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { PRODUCTS } from '@/lib/products'
import { Product } from '@/types'

const CATEGORY_OPTIONS = [
  { value: 'all',   label: 'All Products' },
  { value: 'girls', label: "Girls' Gowns" },
  { value: 'boys',  label: "Boys' Outfits" },
]

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'newest',     label: 'New Arrivals' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
]

const PRICE_RANGES = [
  { value: 'all',     label: 'Any Price' },
  { value: '0-100',   label: 'Under $100' },
  { value: '100-175', label: '$100 – $175' },
  { value: '175-999', label: 'Over $175' },
]

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'all'

  const [category, setCategory]       = useState(initialCategory)
  const [sort, setSort]               = useState('featured')
  const [priceRange, setPriceRange]   = useState('all')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const filtered = useMemo<Product[]>(() => {
    let list = [...PRODUCTS]
    if (category !== 'all') {
      if (category === 'girls')     list = list.filter(p => p.gender === 'girl')
      else if (category === 'boys') list = list.filter(p => p.gender === 'boy')
      else                          list = list.filter(p => p.category === category)
    }
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      list = list.filter(p => { const d = p.price / 100; return d >= min && d <= max })
    }
    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'newest':     list.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0)); break
      default:           list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }
    return list
  }, [category, sort, priceRange])

  const activeFilters = [
    category !== 'all' && CATEGORY_OPTIONS.find(c => c.value === category)?.label,
    priceRange !== 'all' && PRICE_RANGES.find(p => p.value === priceRange)?.label,
  ].filter(Boolean) as string[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 border-b border-stone-100 pb-6">
        <h1
          className="text-4xl text-stone-800 mb-1"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          {CATEGORY_OPTIONS.find(c => c.value === category)?.label ?? 'All Products'}
        </h1>
        <p className="text-stone-400 text-sm">{filtered.length} products</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className={`lg:w-52 shrink-0 ${filtersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="space-y-8 sticky top-28">
            <div>
              <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
                Category
              </h3>
              <ul className="space-y-0 border border-stone-100">
                {CATEGORY_OPTIONS.map(opt => (
                  <li key={opt.value}>
                    <button
                      onClick={() => setCategory(opt.value)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-stone-100 last:border-0 ${
                        category === opt.value
                          ? 'bg-gold-500 text-white font-medium'
                          : 'text-stone-600 hover:bg-gold-50 hover:text-gold-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">
                Price Range
              </h3>
              <ul className="space-y-0 border border-stone-100">
                {PRICE_RANGES.map(opt => (
                  <li key={opt.value}>
                    <button
                      onClick={() => setPriceRange(opt.value)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-stone-100 last:border-0 ${
                        priceRange === opt.value
                          ? 'bg-gold-500 text-white font-medium'
                          : 'text-stone-600 hover:bg-gold-50 hover:text-gold-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-stone-200 text-sm text-stone-600 hover:border-gold-400 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>

            <div className="flex flex-wrap gap-2 flex-1">
              {activeFilters.map(f => (
                <span
                  key={f}
                  className="flex items-center gap-1 px-3 py-1 bg-gold-50 text-gold-700 text-xs font-medium border border-gold-200"
                >
                  {f}
                  <button
                    onClick={() => {
                      if (CATEGORY_OPTIONS.some(c => c.label === f)) setCategory('all')
                      if (PRICE_RANGES.some(p => p.label === f)) setPriceRange('all')
                    }}
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>

            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="px-3 py-2 border border-stone-200 text-sm text-stone-600 bg-white focus:outline-none focus:border-gold-400 cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-400 text-lg mb-3" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                No products found
              </p>
              <button
                onClick={() => { setCategory('all'); setPriceRange('all') }}
                className="text-sm text-gold-600 hover:text-gold-700 underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
