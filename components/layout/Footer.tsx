import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gold-900 text-gold-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="Royal Christening"
                width={180}
                height={120}
                className="object-contain brightness-200 opacity-80"
              />
            </Link>
            <p className="text-gold-400 text-sm leading-relaxed">
              Handcrafted christening garments celebrating life&apos;s most sacred milestone. Made with love for your little blessing.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3
              className="text-gold-100 text-base mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
            >
              Shop
            </h3>
            <ul className="space-y-2 text-sm text-gold-400">
              {[
                { href: '/products?category=girls', label: "Girls' Gowns" },
                { href: '/products?category=boys',  label: "Boys' Outfits" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3
              className="text-gold-100 text-base mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
            >
              Help
            </h3>
            <ul className="space-y-2 text-sm text-gold-400">
              {[
                { href: '/size-guide',         label: 'Size Guide' },
                { href: '/faq',                label: 'FAQ' },
                { href: '/care-guide',         label: 'Care Instructions' },
                { href: '/contact',            label: 'Contact Us' },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold-200 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-gold-100 text-base mb-4"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600 }}
            >
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-gold-400">
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 shrink-0 text-gold-500" />
                <a href="mailto:hello@royalchristening.com" className="hover:text-gold-200 transition-colors">
                  hello@royalchristening.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 shrink-0 text-gold-500" />
                <span>+1 (800) 000-0000</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0 text-gold-500" />
                <span>United States · Ships nationwide</span>
              </li>
            </ul>
            <div className="mt-5 text-xs text-gold-500 leading-relaxed">
              Mon–Fri 9 am – 5 pm CT<br />
              Response within 24 hours
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gold-500 text-xs">
            © {new Date().getFullYear()} Royal Christening · All rights reserved
          </p>
          <div className="flex items-center gap-5 text-xs text-gold-500">
            <Link href="/privacy" className="hover:text-gold-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms"   className="hover:text-gold-300 transition-colors">Terms of Service</Link>
          </div>
          <p className="text-gold-600 text-xs">Visa · Mastercard · Amex · Apple Pay</p>
        </div>
      </div>
    </footer>
  )
}
