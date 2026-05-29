'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingBag, Lock, Truck, ChevronRight } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import type { ShippingRate } from '@/lib/easypost'

type Step = 'address' | 'shipping' | 'review'

interface AddressForm {
  email:   string
  name:    string
  street1: string
  city:    string
  state:   string
  zip:     string
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore()
  const subtotal = totalPrice()

  const [step, setStep]             = useState<Step>('address')
  const [address, setAddress]       = useState<AddressForm>({ email: '', name: '', street1: '', city: '', state: '', zip: '' })
  const [loadingRates, setLoadingRates] = useState(false)
  const [ratesError, setRatesError]     = useState<string | null>(null)
  const [shipmentId, setShipmentId]     = useState<string>('')
  const [rates, setRates]               = useState<ShippingRate[]>([])
  const [selectedRate, setSelectedRate] = useState<ShippingRate | null>(null)
  const [loadingCheckout, setLoadingCheckout] = useState(false)
  const [checkoutError, setCheckoutError]     = useState<string | null>(null)

  const shippingCost = selectedRate ? Math.round(parseFloat(selectedRate.rate) * 100) : 0
  const total = subtotal + shippingCost

  // ── EMPTY CART ──────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <ShoppingBag size={64} strokeWidth={1} className="text-gold-200 mx-auto mb-6" />
        <h1 className="text-3xl text-stone-700 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          Your cart is empty
        </h1>
        <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-colors tracking-widest uppercase">
          <ArrowLeft size={14} /> Browse Products
        </Link>
      </div>
    )
  }

  // ── GET RATES ────────────────────────────────────────────────────────────────
  async function handleGetRates(e: React.FormEvent) {
    e.preventDefault()
    setLoadingRates(true)
    setRatesError(null)
    try {
      const res = await fetch('/api/shipping/rates', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name: address.name, street1: address.street1, city: address.city, state: address.state, zip: address.zip }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Could not get rates')
      setShipmentId(data.shipmentId)
      setRates(data.rates)
      setSelectedRate(data.rates[0] ?? null)
      setStep('shipping')
    } catch (err: unknown) {
      setRatesError(err instanceof Error ? err.message : 'Could not calculate shipping. Please check your address.')
    } finally {
      setLoadingRates(false)
    }
  }

  // ── PROCEED TO PAYMENT ───────────────────────────────────────────────────────
  async function handleProceedToPayment() {
    if (!selectedRate || !shipmentId) return
    setLoadingCheckout(true)
    setCheckoutError(null)
    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          items,
          customerEmail: address.email,
          shippingCost:  Math.round(parseFloat(selectedRate.rate) * 100),
          shippingLabel: `${selectedRate.carrier} ${selectedRate.service}`,
          shipmentId,
          rateId:        selectedRate.id,
          shippingAddress: {
            name:    address.name,
            street1: address.street1,
            city:    address.city,
            state:   address.state,
            zip:     address.zip,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Something went wrong')
      window.location.href = data.url
    } catch (err: unknown) {
      setCheckoutError(err instanceof Error ? err.message : 'Unable to start checkout. Please try again.')
      setLoadingCheckout(false)
    }
  }

  function carrierLogo(carrier: string) {
    const c = carrier.toUpperCase()
    if (c === 'USPS') return '🇺🇸 USPS'
    if (c === 'UPS')  return '🟤 UPS'
    if (c.includes('FEDEX')) return '🟣 FedEx'
    if (c === 'DHL')  return '🟡 DHL'
    return carrier
  }

  function deliveryText(rate: ShippingRate) {
    if (rate.deliveryDays) return `${rate.deliveryDays} business day${rate.deliveryDays === 1 ? '' : 's'}`
    return 'Estimated delivery varies'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      {/* Header */}
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-stone-100">
        <Link href="/cart" className="p-2 text-stone-400 hover:text-gold-600 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-4xl text-stone-800" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}>
          Checkout
        </h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8 text-xs font-semibold tracking-widest uppercase">
        {(['address', 'shipping', 'review'] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <span className={step === s ? 'text-gold-600' : (step === 'shipping' && s === 'address') || (step === 'review') ? 'text-stone-400' : 'text-stone-300'}>
              {i + 1}. {s === 'address' ? 'Address' : s === 'shipping' ? 'Shipping' : 'Payment'}
            </span>
            {i < 2 && <ChevronRight size={12} className="text-stone-300" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
        <div className="lg:col-span-3 space-y-6">

          {/* STEP 1: Address */}
          <div className={`bg-white border ${step === 'address' ? 'border-gold-300' : 'border-stone-100'} p-6`}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl text-stone-700" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
                1. Contact & Shipping Address
              </h2>
              {step !== 'address' && (
                <button onClick={() => setStep('address')} className="text-xs text-gold-600 hover:underline">Edit</button>
              )}
            </div>

            {step !== 'address' ? (
              <div className="text-sm text-stone-500 space-y-0.5">
                <p className="font-medium text-stone-700">{address.name}</p>
                <p>{address.email}</p>
                <p>{address.street1}</p>
                <p>{address.city}, {address.state} {address.zip}</p>
              </div>
            ) : (
              <form onSubmit={handleGetRates} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input
                    type="email" required value={address.email}
                    onChange={e => setAddress(a => ({ ...a, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-stone-200 text-sm focus:outline-none focus:border-gold-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input
                    type="text" required value={address.name}
                    onChange={e => setAddress(a => ({ ...a, name: e.target.value }))}
                    placeholder="First and Last Name"
                    className="w-full px-4 py-3 border border-stone-200 text-sm focus:outline-none focus:border-gold-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">Street Address</label>
                  <input
                    type="text" required value={address.street1}
                    onChange={e => setAddress(a => ({ ...a, street1: e.target.value }))}
                    placeholder="123 Main St, Apt 4B"
                    className="w-full px-4 py-3 border border-stone-200 text-sm focus:outline-none focus:border-gold-500 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">City</label>
                    <input
                      type="text" required value={address.city}
                      onChange={e => setAddress(a => ({ ...a, city: e.target.value }))}
                      placeholder="City"
                      className="w-full px-4 py-3 border border-stone-200 text-sm focus:outline-none focus:border-gold-500 transition-all"
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-auto grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">State</label>
                      <select
                        required value={address.state}
                        onChange={e => setAddress(a => ({ ...a, state: e.target.value }))}
                        className="w-full px-3 py-3 border border-stone-200 text-sm focus:outline-none focus:border-gold-500 bg-white transition-all"
                      >
                        <option value="">—</option>
                        {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-400 uppercase tracking-widest mb-1.5">ZIP</label>
                      <input
                        type="text" required value={address.zip}
                        onChange={e => setAddress(a => ({ ...a, zip: e.target.value }))}
                        placeholder="00000"
                        maxLength={10}
                        className="w-full px-4 py-3 border border-stone-200 text-sm focus:outline-none focus:border-gold-500 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {ratesError && (
                  <div className="p-3 bg-red-50 border border-red-100 text-xs text-red-600">{ratesError}</div>
                )}

                <button
                  type="submit" disabled={loadingRates}
                  className="w-full py-3.5 bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-all tracking-widest uppercase flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Truck size={15} />
                  {loadingRates ? 'Calculating Rates…' : 'Get Shipping Rates'}
                </button>
              </form>
            )}
          </div>

          {/* STEP 2: Shipping Rates */}
          {(step === 'shipping' || step === 'review') && (
            <div className={`bg-white border ${step === 'shipping' ? 'border-gold-300' : 'border-stone-100'} p-6`}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl text-stone-700" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
                  2. Shipping Method
                </h2>
                {step === 'review' && (
                  <button onClick={() => setStep('shipping')} className="text-xs text-gold-600 hover:underline">Edit</button>
                )}
              </div>

              {step === 'review' && selectedRate ? (
                <div className="text-sm text-stone-600">
                  <span className="font-medium">{carrierLogo(selectedRate.carrier)} {selectedRate.service}</span>
                  {' · '}{deliveryText(selectedRate)}
                  {' · '}<span className="font-semibold text-stone-800">${selectedRate.rate}</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {rates.map(rate => (
                    <label
                      key={rate.id}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                        selectedRate?.id === rate.id
                          ? 'border-gold-500 bg-gold-50'
                          : 'border-stone-200 hover:border-gold-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio" name="rate" value={rate.id}
                          checked={selectedRate?.id === rate.id}
                          onChange={() => setSelectedRate(rate)}
                          className="accent-gold-500"
                        />
                        <div>
                          <p className="text-sm font-semibold text-stone-700">{carrierLogo(rate.carrier)} · {rate.service}</p>
                          <p className="text-xs text-stone-400 mt-0.5">{deliveryText(rate)}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-stone-800">${rate.rate}</span>
                    </label>
                  ))}

                  <button
                    onClick={() => { if (selectedRate) setStep('review') }}
                    disabled={!selectedRate}
                    className="w-full mt-2 py-3.5 bg-gold-500 text-white text-sm font-semibold hover:bg-gold-600 transition-all tracking-widest uppercase disabled:opacity-40"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Payment */}
          {step === 'review' && (
            <div className="bg-gold-50 border border-gold-100 p-6">
              <div className="flex items-start gap-3 mb-5">
                <Lock size={16} className="text-gold-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-stone-700 mb-1">3. Secure Payment via Stripe</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    You&apos;ll be redirected to Stripe&apos;s secure checkout to enter your card details.
                    We accept all major credit cards, Apple Pay, and Google Pay.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Visa', 'Mastercard', 'Amex', 'Discover', 'Apple Pay', 'Google Pay'].map(m => (
                  <span key={m} className="px-3 py-1 bg-white border border-gold-100 text-xs text-stone-500 font-medium">{m}</span>
                ))}
              </div>

              {checkoutError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 text-xs text-red-600">{checkoutError}</div>
              )}

              <button
                onClick={handleProceedToPayment}
                disabled={loadingCheckout}
                className="w-full py-4 bg-gold-500 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gold-600 active:scale-[0.98] transition-all tracking-widest uppercase disabled:opacity-60"
              >
                <Lock size={14} />
                {loadingCheckout ? 'Redirecting…' : `Pay ${formatPrice(total)} Securely`}
              </button>

              <p className="text-center text-xs text-stone-400 mt-3">
                By continuing you agree to our{' '}
                <Link href="/terms" className="text-gold-600 hover:underline">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-gold-600 hover:underline">Privacy Policy</Link>
              </p>
            </div>
          )}
        </div>

        {/* ── ORDER SUMMARY ────────────────────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="bg-cream-50 border border-gold-100 p-6 sticky top-28">
            <h2 className="text-xl text-stone-800 mb-5" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
              Order Summary
            </h2>

            <ul className="space-y-4 mb-5 pb-5 border-b border-gold-100">
              {items.map(item => (
                <li key={`${item.product.id}-${item.size}`} className="flex items-start gap-3">
                  <div className="relative w-14 h-16 shrink-0 overflow-hidden bg-cream-100">
                    {item.product.images[0] ? (
                      <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                    ) : (
                      <ShoppingBag size={16} strokeWidth={1} className="text-gold-300 m-auto" />
                    )}
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gold-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-stone-800 leading-tight">{item.product.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5">Size: {item.sizeLabel}</p>
                  </div>
                  <span className="text-sm font-medium text-stone-700 shrink-0">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal</span>
                <span className="font-medium text-stone-800">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping</span>
                <span className="font-medium text-stone-800">
                  {selectedRate ? `$${selectedRate.rate}` : '—'}
                </span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Tax</span>
                <span>Calculated at Stripe</span>
              </div>
              <div className="border-t border-gold-100 pt-3 flex justify-between font-bold">
                <span className="text-stone-700">Total</span>
                <span className="text-gold-600 text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Trust */}
            <div className="mt-5 pt-4 border-t border-gold-100 space-y-2">
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Lock size={11} className="text-gold-400" /> Secure SSL checkout
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-400">
                <Truck size={11} className="text-gold-400" /> Ships from the USA 🇺🇸
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
