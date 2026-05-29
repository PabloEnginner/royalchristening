import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Shield, Truck } from 'lucide-react'
import ProductCard from '@/components/products/ProductCard'
import { getFeaturedProducts, getNewArrivals } from '@/lib/products'
import NewsletterForm from '@/components/layout/NewsletterForm'

const CATEGORIES = [
  {
    label: "Girls' Gowns",
    href: '/products?category=girls',
    description: 'Elegant lace & embroidered christening gowns',
    color: 'bg-rose-50',
    border: 'border-rose-100',
    textColor: 'text-rose-700',
    image: '/images/products/ninas/aurora-1.jpg',
  },
  {
    label: "Boys' Outfits",
    href: '/products?category=boys',
    description: 'Rompers, suits & traditional christening sets',
    color: 'bg-blue-50',
    border: 'border-blue-100',
    textColor: 'text-blue-700',
    image: '/images/products/ninos/andrew-1.png',
  },
]

const FEATURES = [
  { icon: Shield, title: 'Premium Quality', desc: 'Handcrafted with the finest fabrics' },
  { icon: Truck,  title: 'Ships Nationwide', desc: 'Fast delivery anywhere in the USA' },
  { icon: Star,   title: 'Made with Love',  desc: 'Every piece crafted for your blessing' },
]

const TESTIMONIALS = [
  {
    name: 'Sarah M.',
    location: 'Dallas, TX',
    text: 'The gown was absolutely stunning. My daughter looked like a little angel at her baptism. The quality is exceptional and it arrived quickly.',
    rating: 5,
  },
  {
    name: 'Maria G.',
    location: 'Miami, FL',
    text: 'I ordered the Pearl Grace set and it was perfect. Everything was so well made and the packaging was beautiful — felt like a true luxury gift.',
    rating: 5,
  },
  {
    name: 'Jennifer K.',
    location: 'Chicago, IL',
    text: "My son wore the Gentleman's Baptism Suit and everyone at the church was asking where I got it. So elegant and well-fitted. Highly recommend!",
    rating: 5,
  },
]

export default function HomePage() {
  const featured = getFeaturedProducts()
  const newArrivals = getNewArrivals()

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-cream-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div className="fade-in">
              <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-5 border-l-2 border-gold-400 pl-3">
                Christian · Handcrafted · USA
              </p>
              <h1
                className="text-5xl lg:text-7xl text-stone-800 leading-tight mb-6"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
              >
                Dress Your
                <br />
                <em className="text-gold-600">Little Blessing</em>
                <br />
                Royally
              </h1>
              <p className="text-stone-500 text-lg leading-relaxed mb-8 max-w-md">
                Exquisite christening gowns and baptism outfits crafted with devotion,
                celebrating the sacred sacrament of your newborn&apos;s faith.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-white font-semibold hover:bg-gold-600 active:scale-95 transition-all text-sm tracking-widest uppercase"
                >
                  Shop Collection
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/#about"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-gold-400 text-gold-700 font-semibold hover:bg-gold-50 transition-all text-sm tracking-widest uppercase"
                >
                  Our Story
                </Link>
              </div>

              <div className="flex items-center gap-2 mt-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-sm text-stone-500">
                  <span className="font-semibold text-stone-700">4.9/5</span> · Trusted by 500+ families
                </p>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/products/ninos/andrew-1.png"
                  alt="Christening set"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/products/ninas/sophia-1.jpg"
                    alt="Christening set"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    priority
                  />
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src="/images/products/ninos/andrew-vela.png"
                    alt="Baptism candle"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="border-y border-stone-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {FEATURES.map(feat => (
              <div key={feat.title} className="flex items-start gap-3">
                <div className="p-2 bg-gold-50 shrink-0">
                  <feat.icon size={18} className="text-gold-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-700">{feat.title}</p>
                  <p className="text-xs text-stone-400 mt-0.5 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Browse By</p>
            <h2
              className="text-4xl text-stone-800"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Shop by Category
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.href}
                href={cat.href}
                className={`group relative ${cat.color} border ${cat.border} hover:border-gold-300 hover:shadow-sm transition-all duration-300 p-6`}
              >
                <div className="relative aspect-square mb-4 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <h3
                  className={`${cat.textColor} font-semibold mb-1`}
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem' }}
                >
                  {cat.label}
                </h3>
                <p className="text-stone-500 text-xs">{cat.description}</p>
                <ArrowRight
                  size={14}
                  className={`${cat.textColor} mt-3 group-hover:translate-x-1 transition-transform`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-2">Hand-picked</p>
              <h2
                className="text-4xl text-stone-800"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
              >
                Featured Collection
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-gold-600 hover:text-gold-700 transition-colors tracking-wide"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW ARRIVALS ─────────────────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="py-20 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-2">Just in</p>
              <h2
                className="text-4xl text-stone-800"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
              >
                New Arrivals
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {newArrivals.slice(0, 3).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ABOUT ────────────────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-gold-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Product strip */}
          <div className="flex justify-center gap-2 mb-10 overflow-hidden">
            {[
              '/images/products/ninas/emma-1.jpg',
              '/images/products/ninos/noah-1.png',
              '/images/products/ninas/lily-1.jpg',
            ].map((src, i) => (
              <div key={i} className="relative w-28 h-36 shrink-0 overflow-hidden opacity-70">
                <Image src={src} alt="Christening set" fill className="object-cover" sizes="112px" />
              </div>
            ))}
          </div>
          <h2
            className="text-4xl lg:text-5xl text-gold-100 mb-6 leading-tight"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
          >
            A Blessing Deserves the Finest
          </h2>
          <p className="text-gold-300 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            Royal Christening was born from a deep faith and a desire to honor one of life&apos;s
            most sacred milestones. Every gown we craft is a prayer, a blessing woven in
            fabric — made with devotion for families across the United States.
          </p>
          <p className="text-gold-400 text-base leading-relaxed max-w-xl mx-auto mb-10">
            We believe your child&apos;s baptism day deserves garments as pure and beautiful
            as the sacrament itself. That&apos;s why we use only premium fabrics, and every
            piece is crafted with the same love and care we would give our own children.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-white font-semibold hover:bg-gold-400 transition-colors text-sm tracking-widest uppercase"
          >
            Explore Our Collection
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-2">Reviews</p>
            <h2
              className="text-4xl text-stone-800"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
            >
              Families Love Us
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.name} className="bg-cream-50 p-6 border border-gold-100">
                <div className="flex mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={13} className="fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="text-stone-800 font-semibold text-sm">{t.name}</p>
                  <p className="text-stone-400 text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────── */}
      <section className="py-16 bg-cream-100 border-t border-gold-100">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2
            className="text-3xl text-stone-800 mb-3"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
          >
            Stay Connected
          </h2>
          <p className="text-stone-500 text-sm mb-6">
            Join our community for new arrivals, baptism inspiration, and exclusive offers.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
