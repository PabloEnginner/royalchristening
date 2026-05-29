import { SIZE_CHART } from '@/lib/products'

export default function SizeChart() {
  return (
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
              className={`border-b border-stone-100 last:border-0 ${
                i % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
              }`}
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
      <p className="px-4 py-3 text-xs text-stone-400 bg-stone-50/50 border-t border-stone-100">
        * Measurements are approximate. When between sizes, we recommend sizing up for comfort.
        All measurements in inches unless noted.
      </p>
    </div>
  )
}
