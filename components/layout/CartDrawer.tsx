'use client'

import Link from 'next/link'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCartStore()
  const total = totalPrice()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <h2
            className="text-2xl text-stone-800"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
          >
            Your Cart
          </h2>
          <button
            onClick={closeCart}
            className="p-2 text-stone-400 hover:text-stone-700 transition-colors hover:bg-stone-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-gold-200" />
              <div>
                <p
                  className="text-xl text-stone-600 mb-1"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  Your cart is empty
                </p>
                <p className="text-sm text-stone-400">
                  Add some beautiful pieces for your little one
                </p>
              </div>
              <button
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 bg-gold-500 text-white text-sm font-medium hover:bg-gold-600 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map(item => (
                <li
                  key={`${item.product.id}-${item.size}`}
                  className="flex gap-4 pb-5 border-b border-stone-100 last:border-0"
                >
                  {/* Product image */}
                  <div className="w-20 h-24 bg-cream-100 overflow-hidden shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-gold-300">
                      <ShoppingBag size={24} />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="text-sm font-medium text-stone-800 hover:text-gold-600 transition-colors line-clamp-2 leading-snug"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="p-1 text-stone-300 hover:text-red-400 transition-colors shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-xs text-stone-400 mt-1">Size: {item.sizeLabel}</p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty control */}
                      <div className="flex items-center border border-stone-200 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-sm font-medium text-stone-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-stone-800">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-5 space-y-4">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Subtotal</span>
              <span className="font-medium text-stone-800">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-stone-400 text-center">
              Shipping calculated at checkout · Free over $150
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full py-3.5 bg-gold-500 text-white text-center text-sm font-semibold hover:bg-gold-600 active:scale-[0.98] transition-all tracking-wide"
            >
              Proceed to Checkout
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full py-2.5 text-center text-sm text-gold-600 font-medium hover:text-gold-700 transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
