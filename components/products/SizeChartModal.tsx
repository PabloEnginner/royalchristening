'use client'

import { useState } from 'react'
import { X, Ruler } from 'lucide-react'
import { SIZE_CHART } from '@/lib/products'

interface Props {
  trigger?: React.ReactNode
}

export default function SizeChartModal({ trigger }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger ?? (
          <button className="text-xs text-gold-600 hover:text-gold-700 underline transition-colors">
            Size Guide
          </button>
        )}
      </span>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        >
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-auto border border-gold-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gold-100 bg-cream-50">
              <div className="flex items-center gap-2">
                <Ruler size={16} className="text-gold-500" />
                <h2
                  className="text-xl text-stone-800"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
                >
                  Size Guide
                </h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-stone-500 mb-5 leading-relaxed">
                Measure your baby and compare with the chart below. When between sizes, we recommend sizing up for comfort.
              </p>

              <div className="overflow-x-auto border border-stone-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gold-50 border-b border-gold-100">
                      {['Size', 'Age', 'Chest', 'Waist', 'Length', 'Weight'].map(h => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-semibold text-gold-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SIZE_CHART.map((row, i) => (
                      <tr
                        key={row.size}
                        className={`border-b border-stone-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'}`}
                      >
                        <td className="px-4 py-3 font-semibold text-gold-700 whitespace-nowrap">{row.size}</td>
                        <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{row.age}</td>
                        <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{row.chest}</td>
                        <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{row.waist}</td>
                        <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{row.length}</td>
                        <td className="px-4 py-3 text-stone-600 whitespace-nowrap">{row.weight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-xs text-stone-400 leading-relaxed">
                * All measurements in inches unless noted. Measurements are approximate.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
