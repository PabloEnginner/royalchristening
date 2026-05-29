import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <Image
          src="/logo.png"
          alt="Royal Christening"
          width={50}
          height={75}
          className="mx-auto mb-8 opacity-30"
        />
        <p className="text-gold-500 text-xs font-semibold tracking-[0.25em] uppercase mb-4">404</p>
        <h1
          className="text-4xl lg:text-5xl text-stone-800 mb-4"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          Page Not Found
        </h1>
        <p className="text-stone-500 text-base leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors text-sm tracking-widest uppercase"
          >
            Shop Collection
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-gold-300 text-gold-700 font-semibold hover:bg-gold-50 transition-colors text-sm tracking-widest uppercase"
          >
            Go Home
          </Link>
        </div>
        <blockquote className="mt-10 border-l-2 border-gold-300 pl-5 text-left max-w-sm mx-auto">
          <p
            className="text-lg text-gold-700 italic"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            &ldquo;For I know the plans I have for you&rdquo;
          </p>
          <cite className="text-gold-400 text-xs not-italic">— Jeremiah 29:11</cite>
        </blockquote>
      </div>
    </div>
  )
}
