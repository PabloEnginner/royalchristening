import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/layout/CartDrawer'

export const metadata: Metadata = {
  title: {
    default: 'Royal Christening | Handcrafted Baptism Garments',
    template: '%s | Royal Christening',
  },
  description:
    'Beautiful handcrafted christening gowns and baptism outfits for boys and girls. Ships across the USA. Free shipping on orders over $150.',
  keywords: [
    'christening gowns', 'baptism outfits', 'christening dress',
    'baby baptism', 'christening clothes', 'baptism gown USA',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Royal Christening',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
