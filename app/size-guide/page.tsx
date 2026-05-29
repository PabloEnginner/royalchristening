import { Metadata } from 'next'
import SizeChart from '@/components/products/SizeChart'

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Christening garment size chart to help you find the perfect fit for your baby.',
}

export default function SizeGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Sizing</p>
        <h1
          className="text-4xl lg:text-5xl text-stone-800 mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          Size Guide
        </h1>
        <p className="text-stone-500 text-base max-w-xl mx-auto leading-relaxed">
          Measure your baby and compare with the chart below.
          When between sizes, we recommend sizing up for comfort and room to grow.
        </p>
      </div>

      {/* How to measure */}
      <div className="bg-cream-50 border border-gold-100 p-6 mb-8">
        <h2
          className="text-xl text-stone-700 mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
        >
          How to Measure
        </h2>
        <ul className="space-y-3 text-sm text-stone-600">
          <li className="flex items-start gap-3">
            <span className="text-gold-500 font-semibold shrink-0">Chest</span>
            Measure around the fullest part of the chest, keeping the tape parallel to the floor.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-gold-500 font-semibold shrink-0">Waist</span>
            Measure around the natural waistline — the narrowest part of the torso.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-gold-500 font-semibold shrink-0">Length</span>
            Measure from the top of the shoulder down to the desired hem length.
          </li>
          <li className="flex items-start gap-3">
            <span className="text-gold-500 font-semibold shrink-0">Weight</span>
            Use your baby&apos;s current weight as a secondary reference if measurements fall between sizes.
          </li>
        </ul>
      </div>

      {/* Chart */}
      <SizeChart />

      {/* Note */}
      <div className="mt-8 text-center">
        <p className="text-stone-400 text-sm leading-relaxed">
          Still unsure about sizing? Email us at{' '}
          <a href="mailto:hello@royalchristening.com" className="text-gold-600 hover:underline">
            hello@royalchristening.com
          </a>{' '}
          — we&apos;re happy to help you find the perfect fit.
        </p>
      </div>
    </div>
  )
}
