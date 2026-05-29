'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/products',               label: 'All Products' },
  { href: '/products?category=girls',label: 'Girls' },
  { href: '/products?category=boys', label: 'Boys' },
  { href: '/products?category=accessories', label: 'Accessories' },
  { href: '/#about',                 label: 'About Us' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { toggleCart, totalItems } = useCartStore()
  const count = totalItems()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gold-100">
      {/* Announcement bar */}
      {/*<div className="bg-gold-500 text-white text-center text-xs py-2 tracking-wider font-medium">
        FREE SHIPPING ON ORDERS OVER $150 · SHIPS FROM USA 🇺🇸
      </div>*/}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Mobile menu btn */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gold-700 hover:text-gold-500"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Royal Christening"
              width={180}
              height={120}
              className="object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-gold-600 transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="p-2 text-stone-500 hover:text-gold-600 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </Link>

            <button
              onClick={toggleCart}
              className="relative p-2 text-stone-500 hover:text-gold-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden border-t border-gold-100 bg-white overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <nav className="px-4 py-4 space-y-1">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 px-4 text-sm font-medium text-stone-600 hover:text-gold-600 hover:bg-gold-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
