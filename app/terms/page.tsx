import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions governing your use of Royal Christening and purchases made through our store.',
}

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <p className="text-gold-600 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Legal</p>
        <h1
          className="text-4xl text-stone-800 mb-2"
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400 }}
        >
          Terms of Service
        </h1>
        <p className="text-stone-400 text-sm">Last updated: January 2025</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed">

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            1. Acceptance of Terms
          </h2>
          <p className="text-stone-500">
            By accessing or using the Royal Christening website (royalchristening.com) and placing orders,
            you agree to be bound by these Terms of Service. If you do not agree, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            2. Products & Pricing
          </h2>
          <ul className="space-y-2 text-stone-500">
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> All prices are listed in US dollars (USD) and are subject to change without notice.</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> We reserve the right to limit quantities or discontinue products at any time.</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Product images are for illustrative purposes and may vary slightly from the actual item.</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> We make every effort to display accurate color and detail, but cannot guarantee your screen accurately reflects the product.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            3. Orders & Payment
          </h2>
          <ul className="space-y-2 text-stone-500">
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Orders are confirmed upon receipt of payment through Stripe.</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> We reserve the right to refuse or cancel any order for any reason, including errors in pricing or availability.</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> You must be 18 years or older to place an order.</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> All payment information is processed securely by Stripe. We do not store payment card details.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            4. Shipping
          </h2>
          <ul className="space-y-2 text-stone-500">
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> We ship within the United States only.</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Shipping costs and delivery times are displayed at checkout before completing your order.</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> We are not responsible for delays caused by the carrier or circumstances beyond our control.</li>
            <li className="flex gap-2"><span className="text-gold-400 shrink-0">·</span> Risk of loss and title for products passes to you upon delivery to the carrier.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            5. Intellectual Property
          </h2>
          <p className="text-stone-500">
            All content on this website — including text, images, logos, and designs — is the property
            of Royal Christening and is protected by applicable copyright and trademark laws. You may not
            reproduce, distribute, or use any content without our written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            7. Limitation of Liability
          </h2>
          <p className="text-stone-500">
            To the fullest extent permitted by law, Royal Christening shall not be liable for any indirect,
            incidental, special, or consequential damages arising from your use of our website or products.
            Our total liability shall not exceed the amount you paid for the order in question.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            8. Governing Law
          </h2>
          <p className="text-stone-500">
            These Terms of Service are governed by the laws of the United States. Any disputes shall be
            resolved in the courts of the applicable jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            9. Changes to Terms
          </h2>
          <p className="text-stone-500">
            We reserve the right to update these Terms at any time. Changes will be posted on this page.
            Continued use of our website after changes constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-stone-700 mb-3" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500 }}>
            10. Contact
          </h2>
          <p className="text-stone-500">
            Questions about these Terms?{' '}
            <a href="mailto:hello@royalchristening.com" className="text-gold-600 hover:underline">
              hello@royalchristening.com
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
