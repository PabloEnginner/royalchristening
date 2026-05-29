import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Care Instructions',
  description: 'How to care for your Royal Christening garments to preserve their beauty for generations.',
}

const CARE_SECTIONS = [
  {
    title: 'General Care Guidelines',
    icon: '✦',
    items: [
      'Dry cleaning is strongly recommended for all embroidered and beaded christening capes and mantles.',
      'Always test any cleaning method on a hidden area first.',
      'Handle garments with clean, dry hands to avoid transferring oils to delicate fabrics.',
      'Never wring or twist the fabric — gently press out excess water if hand-washing is necessary.',
      'Store garments in a cool, dry place away from direct sunlight to prevent discoloration.',
    ],
  },
  {
    title: 'Washing by Fabric Type',
    icon: '◇',
    items: [
      'Organza & Brocade blends: Dry clean only. These fabrics lose their structure and sheen when machine washed.',
      'Cotton rompers & shirts: Machine wash on delicate/gentle cycle in cold water. Lay flat to dry.',
      'Lace trim & overlays: Hand wash with mild detergent in lukewarm water. Do not wring — press between clean towels.',
      'Silk & satin accents: Dry clean only or spot clean with a damp cloth and mild detergent.',
      'Charro vests & embroidered pieces: Dry clean only to preserve the metallic thread embroidery.',
    ],
  },
  {
    title: 'Stain Removal',
    icon: '◈',
    items: [
      'Act quickly — blot (do not rub) any spills immediately with a clean white cloth.',
      'For water-based stains: gently dab with cold water and a drop of mild dish soap.',
      'For oil-based stains: apply a small amount of cornstarch or baby powder, let sit 15 minutes, then brush off gently.',
      'For candle wax: allow to harden completely, then gently chip off. Treat any residue with dry-cleaning solvent.',
      'When in doubt, take the garment to a professional dry cleaner and identify the type of stain.',
    ],
  },
  {
    title: 'Pressing & Ironing',
    icon: '◻',
    items: [
      'Always iron on the reverse side of the fabric or use a pressing cloth to protect embroidery and beading.',
      'Organza: Use a very low heat setting with a pressing cloth. Never iron directly.',
      'Cotton: Medium heat is safe. Iron while slightly damp for best results.',
      'Lace: Do not iron directly. Lay flat and allow to air dry — the weight of the fabric will release most wrinkles.',
      'Avoid steam near pearls, crystals, or metallic threads as moisture can cause tarnishing.',
    ],
  },
  {
    title: 'Storage & Preservation',
    icon: '◯',
    items: [
      'Clean the garment before long-term storage — even invisible stains can set over time and attract insects.',
      'Store in an acid-free box or cotton garment bag — never in plastic, which traps moisture.',
      'Add acid-free tissue paper inside folds to prevent permanent creasing.',
      'Keep in a cool, dark, and well-ventilated area. Avoid attics (too hot) and basements (too humid).',
      'For heirloom preservation, consider professional textile conservation for museum-quality archival storage.',
    ],
  },
  {
    title: 'Candle & Accessories Care',
    icon: '✧',
    items: [
      'Baptismal candle (vela): Keep upright in a cool, dry place. Do not expose to direct sunlight or heat.',
      'Baptismal shell (concha): Rinse with fresh water after use. Polish gently with a soft cloth.',
      'Baptismal manta: Dry clean recommended. Store flat or loosely rolled to avoid creasing.',
      'Accessories with lace: Hand wash gently and lay flat to dry on a clean towel.',
    ],
  },
]

export default function CareGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Garment Care</p>
        <h1
          className="text-4xl lg:text-5xl text-stone-800 mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          Care Instructions
        </h1>
        <p className="text-stone-500 text-base max-w-xl mx-auto leading-relaxed">
          Your christening garment is a treasured keepsake. With proper care, it can be preserved
          for generations as a reminder of your child&apos;s sacred day.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {CARE_SECTIONS.map(section => (
          <div key={section.title} className="border border-gold-100">
            <div className="bg-cream-50 px-6 py-4 border-b border-gold-100 flex items-center gap-3">
              <span className="text-gold-400 text-lg">{section.icon}</span>
              <h2
                className="text-xl text-stone-700"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}
              >
                {section.title}
              </h2>
            </div>
            <ul className="p-6 space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-600 leading-relaxed">
                  <span className="w-1.5 h-1.5 bg-gold-400 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-10 bg-gold-50 border border-gold-100 p-6 text-center">
        <p
          className="text-lg text-gold-700 italic mb-2"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          &ldquo;Handle with prayer&rdquo;
        </p>
        <p className="text-stone-500 text-sm">
          Questions about caring for your garment?{' '}
          <a href="mailto:hello@royalchristening.com" className="text-gold-600 hover:underline">
            Contact us
          </a>{' '}
          and we&apos;ll be happy to help.
        </p>
      </div>
    </div>
  )
}
