'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

const SHIPPING_THRESHOLD = 15000

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCartStore()
  const subtotal = totalPrice()
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : 899
  const total = subtotal + shipping
  const remaining = SHIPPING_THRESHOLD - subtotal

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={72} strokeWidth={1} className="text-gold-200 mx-auto mb-6" />
        <h1
          className="text-3xl text-stone-700 mb-3"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Your cart is empty
        </h1>
        <p className="text-stone-400 text-sm mb-8">
          You haven&apos;t added any items yet. Browse our collection to find the perfect christening garment.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors tracking-widest uppercase"
        >
          <ArrowLeft size={15} />
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-stone-100">
        <h1
          className="text-4xl text-stone-800"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          Shopping Cart
        </h1>
        <button
          onClick={clearCart}
          className="text-xs text-stone-400 hover:text-red-500 transition-colors underline"
        >
          Clear cart
        </button>
      </div>

      {/* Free shipping progress */}
      {subtotal < SHIPPING_THRESHOLD && (
        <div className="mb-6 p-4 bg-gold-50 border border-gold-100">
          <p className="text-sm text-gold-700 mb-2">
            Add <strong>{formatPrice(remaining)}</strong> more for <strong>free shipping!</strong>
          </p>
          <div className="h-0.5 bg-gold-100 overflow-hidden">
            <div
              className="h-full bg-gold-500 transition-all duration-500"
              style={{ width: `${Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)}%` }}
            />
          </div>
        </div>
      )}
      {subtotal >= SHIPPING_THRESHOLD && (
        <div className="mb-6 p-4 bg-green-50 border border-green-100">
          <p className="text-sm text-green-700 font-medium">
            🎉 You&apos;ve unlocked free shipping!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="flex gap-5 p-5 bg-white border border-stone-100 hover:border-gold-200 transition-colors"
            >
              <div className="w-24 h-28 bg-cream-100 flex items-center justify-center shrink-0">
                <ShoppingBag size={28} strokeWidth={1} className="text-gold-300" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-base font-medium text-stone-800 hover:text-gold-600 transition-colors leading-snug"
                      style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-stone-400 mt-1">Size: {item.sizeLabel}</p>
                    <p className="text-xs text-stone-400 capitalize">
                      {item.product.gender === 'girl' ? 'Girls' : item.product.gender === 'boy' ? 'Boys' : 'Unisex'}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    className="p-1.5 text-stone-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center border border-stone-200 overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-stone-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-stone-400 hover:bg-stone-100 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-semibold text-stone-800">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-xs text-stone-400">{formatPrice(item.product.price)} each</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors mt-2"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream-50 border border-gold-100 p-6 sticky top-28">
            <h2
              className="text-xl text-stone-800 mb-5"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
            >
              Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium text-stone-800">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium text-stone-800'}>
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm text-stone-400">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-gold-100 pt-4 mb-5">
              <div className="flex justify-between">
                <span className="font-semibold text-stone-700">Estimated Total</span>
                <span className="font-bold text-stone-800 text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 w-full py-4 bg-gold-500 text-white font-semibold hover:bg-gold-600 active:scale-[0.98] transition-all text-sm tracking-widest uppercase"
            >
              Proceed to Checkout
              <ArrowRight size={15} />
            </Link>

            <p className="text-center text-xs text-stone-400 mt-3">
              Secure checkout powered by Stripe
            </p>

            <div className="flex justify-center gap-2 mt-4">
              {['VISA', 'MC', 'AMEX', '🍎 Pay'].map(card => (
                <span key={card} className="px-2 py-1 bg-white border border-stone-100 text-[10px] text-stone-400 font-medium">
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
