'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, size: string, sizeLabel: string) => void
  removeItem: (productId: string, size: string) => void
  updateQuantity: (productId: string, size: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, size, sizeLabel) => {
        set(state => {
          const existing = state.items.find(
            i => i.product.id === product.id && i.size === size
          )
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id && i.size === size
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }
          return { items: [...state.items, { product, size, sizeLabel, quantity: 1 }] }
        })
        get().openCart()
      },

      removeItem: (productId, size) => {
        set(state => ({
          items: state.items.filter(
            i => !(i.product.id === productId && i.size === size)
          ),
        }))
      },

      updateQuantity: (productId, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId && i.size === size
              ? { ...i, quantity }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [] }),

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: 'royal-christening-cart' }
  )
)
