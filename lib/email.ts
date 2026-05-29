import nodemailer from 'nodemailer'
import { OrderEmailData } from '@/types'
import { formatPrice } from './utils'

function createTransport() {
  return nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT ?? 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  })
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@royalchristening.com'
const FROM        = `"Royal Christening" <${process.env.SMTP_USER ?? 'orders@royalchristening.com'}>`

const BRAND_DARK  = '#3e342b'
const BRAND_MID   = '#ad9b83'
const BRAND_LIGHT = '#ece7da'

function itemsHtml(data: OrderEmailData): string {
  return data.items.map(item => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND_LIGHT};">
        <strong>${item.product.name}</strong><br/>
        <small style="color:#888;">Size: ${item.sizeLabel} &nbsp;·&nbsp; Qty: ${item.quantity}</small>
      </td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND_LIGHT};text-align:right;">
        ${formatPrice(item.product.price * item.quantity)}
      </td>
    </tr>
  `).join('')
}

export async function sendAdminOrderEmail(data: OrderEmailData & { trackingCode?: string; labelUrl?: string }) {
  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <div style="background:${BRAND_DARK};padding:24px;text-align:center;">
        <h1 style="color:${BRAND_LIGHT};margin:0;font-size:22px;font-weight:400;letter-spacing:2px;text-transform:uppercase;">New Order Received</h1>
        <p style="color:${BRAND_MID};margin:6px 0 0;font-size:13px;">Order ${data.orderNumber}</p>
      </div>
      <div style="background:#fdf8f2;padding:24px;border:1px solid ${BRAND_LIGHT};border-top:none;">
        <h3 style="color:${BRAND_DARK};font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px;">Customer</h3>
        <p style="margin:0;font-size:14px;">
          <strong>${data.customerName}</strong><br/>
          <a href="mailto:${data.customerEmail}" style="color:${BRAND_MID};">${data.customerEmail}</a>
        </p>

        <h3 style="color:${BRAND_DARK};font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:20px 0 10px;">Ship To</h3>
        <p style="margin:0;font-size:14px;color:#555;">
          ${data.shipping.name}<br/>
          ${data.shipping.address}<br/>
          ${data.shipping.city}, ${data.shipping.state} ${data.shipping.zip}
        </p>

        ${data.trackingCode ? `
        <h3 style="color:${BRAND_DARK};font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:20px 0 10px;">Shipping Label</h3>
        <p style="margin:0;font-size:14px;">
          Tracking: <strong>${data.trackingCode}</strong><br/>
          ${data.labelUrl ? `<a href="${data.labelUrl}" style="color:${BRAND_MID};">Download Label →</a>` : ''}
        </p>` : ''}

        <h3 style="color:${BRAND_DARK};font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:20px 0 10px;">Items</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${itemsHtml(data)}
          <tr>
            <td style="padding-top:12px;font-weight:bold;">Total</td>
            <td style="padding-top:12px;text-align:right;font-weight:bold;font-size:16px;color:${BRAND_MID};">
              ${formatPrice(data.total)}
            </td>
          </tr>
        </table>
      </div>
      <div style="text-align:center;padding:14px;font-size:11px;color:#aaa;">
        Royal Christening · hello@royalchristening.com
      </div>
    </div>
  `

  await createTransport().sendMail({
    from: FROM,
    to:      ADMIN_EMAIL,
    subject: `New Order ${data.orderNumber} — ${formatPrice(data.total)}`,
    html,
  })
}

export async function sendCustomerOrderEmail(data: OrderEmailData & { trackingCode?: string; shippingCarrier?: string }) {
  const firstName = data.customerName.split(' ')[0]
  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <div style="background:${BRAND_DARK};padding:28px 24px;text-align:center;">
        <h1 style="color:${BRAND_LIGHT};margin:0;font-size:26px;font-weight:400;">Thank You, ${firstName}!</h1>
        <p style="color:${BRAND_MID};margin:8px 0 0;font-size:13px;">Your order has been received and is being prepared with love.</p>
      </div>
      <div style="background:#fdf8f2;padding:24px;border:1px solid ${BRAND_LIGHT};border-top:none;">
        <p style="font-size:13px;color:#888;text-align:center;margin:0 0 24px;">
          Order number: <strong style="color:#1a1a1a;">${data.orderNumber}</strong>
        </p>

        <h3 style="color:${BRAND_DARK};font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px;">Your Order</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${itemsHtml(data)}
          <tr>
            <td style="padding-top:12px;font-weight:bold;">Total Paid</td>
            <td style="padding-top:12px;text-align:right;font-weight:bold;font-size:16px;color:${BRAND_MID};">
              ${formatPrice(data.total)}
            </td>
          </tr>
        </table>

        <div style="background:#fff;border:1px solid ${BRAND_LIGHT};padding:16px;margin:20px 0 0;">
          <h3 style="color:${BRAND_DARK};font-size:11px;text-transform:uppercase;letter-spacing:2px;margin:0 0 10px;">Shipping To</h3>
          <p style="margin:0;font-size:14px;color:#555;">
            ${data.shipping.name}<br/>
            ${data.shipping.address}<br/>
            ${data.shipping.city}, ${data.shipping.state} ${data.shipping.zip}
          </p>
          ${data.trackingCode ? `
          <p style="margin:10px 0 0;font-size:13px;color:#555;">
            Carrier: <strong>${data.shippingCarrier ?? ''}</strong> · Tracking: <strong>${data.trackingCode}</strong>
          </p>` : `
          <p style="margin:10px 0 0;font-size:12px;color:#aaa;">
            You will receive a tracking number once your order ships (1–2 business days).
          </p>`}
        </div>

        <p style="font-size:12px;color:#aaa;margin:20px 0 0;text-align:center;line-height:1.6;">
          Questions? Email <a href="mailto:hello@royalchristening.com" style="color:${BRAND_MID};">hello@royalchristening.com</a>
        </p>
      </div>
      <div style="background:${BRAND_DARK};padding:16px;text-align:center;">
        <p style="color:${BRAND_MID};margin:0;font-size:13px;font-style:italic;">
          &ldquo;Let the little children come to me&rdquo; — Matthew 19:14
        </p>
      </div>
    </div>
  `

  await createTransport().sendMail({
    from: FROM,
    to:      data.customerEmail,
    subject: `Your Royal Christening Order ${data.orderNumber} ✓`,
    html,
  })
}

export async function sendReviewRequestEmail(data: {
  customerName: string
  customerEmail: string
  orderNumber: string
  productNames: string[]
}) {
  const firstName = data.customerName.split(' ')[0]
  const productList = data.productNames.map(p => `<li style="margin-bottom:4px;">${p}</li>`).join('')
  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <div style="background:${BRAND_DARK};padding:28px 24px;text-align:center;">
        <h1 style="color:${BRAND_LIGHT};margin:0;font-size:24px;font-weight:400;">How Are You Loving It?</h1>
        <p style="color:${BRAND_MID};margin:8px 0 0;font-size:13px;">We'd love to hear about your little one's special day</p>
      </div>
      <div style="background:#fdf8f2;padding:28px 24px;border:1px solid ${BRAND_LIGHT};border-top:none;">
        <p style="font-size:15px;color:#444;margin:0 0 16px;">Dear ${firstName},</p>
        <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 16px;">
          We hope your little blessing's christening day was everything you dreamed of.
          Your recent order included:
        </p>
        <ul style="font-size:14px;color:#555;margin:0 0 20px;padding-left:20px;">
          ${productList}
        </ul>
        <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 24px;">
          Would you take a moment to share your experience? Your review helps other families
          find the perfect garment for their sacred day.
        </p>
        <div style="text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_BASE_URL}/products" style="display:inline-block;background:${BRAND_MID};color:#fff;padding:14px 32px;font-size:13px;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">
            Leave a Review
          </a>
        </div>
        <p style="font-size:12px;color:#aaa;margin:24px 0 0;text-align:center;">
          Order ${data.orderNumber} · <a href="mailto:hello@royalchristening.com" style="color:${BRAND_MID};">Contact Us</a>
        </p>
      </div>
      <div style="background:${BRAND_DARK};padding:16px;text-align:center;">
        <p style="color:${BRAND_MID};margin:0;font-size:13px;font-style:italic;">
          &ldquo;Children are a heritage from the Lord&rdquo; — Psalm 127:3
        </p>
      </div>
    </div>
  `

  await createTransport().sendMail({
    from: FROM,
    to:      data.customerEmail,
    subject: `${firstName}, how did you love your Royal Christening order? 💛`,
    html,
  })
}

export async function sendNewsletterWelcomeEmail(email: string) {
  const html = `
    <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1a1a1a;">
      <div style="background:${BRAND_DARK};padding:28px 24px;text-align:center;">
        <h1 style="color:${BRAND_LIGHT};margin:0;font-size:24px;font-weight:400;">Welcome to Our Community</h1>
        <p style="color:${BRAND_MID};margin:8px 0 0;font-size:13px;">Royal Christening</p>
      </div>
      <div style="background:#fdf8f2;padding:28px 24px;border:1px solid ${BRAND_LIGHT};border-top:none;text-align:center;">
        <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 20px;">
          Thank you for joining our community! You'll be the first to know about new arrivals,
          baptism inspiration, and exclusive offers for your little blessing.
        </p>
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/products" style="display:inline-block;background:${BRAND_MID};color:#fff;padding:14px 32px;font-size:13px;text-decoration:none;letter-spacing:1.5px;text-transform:uppercase;font-weight:bold;">
          Shop Collection
        </a>
      </div>
      <div style="background:${BRAND_DARK};padding:16px;text-align:center;">
        <p style="color:${BRAND_MID};margin:0;font-size:13px;font-style:italic;">
          &ldquo;I can do all things through Christ who strengthens me&rdquo; — Philippians 4:13
        </p>
      </div>
    </div>
  `

  await createTransport().sendMail({
    from: FROM,
    to:      email,
    subject: 'Welcome to Royal Christening ✨',
    html,
  })
}

export async function sendNewsletterAdminNotification(email: string) {
  await createTransport().sendMail({
    from: FROM,
    to:      ADMIN_EMAIL,
    subject: `New Newsletter Subscriber: ${email}`,
    html:    `<p style="font-family:Georgia,serif;font-size:14px;">New subscriber: <strong>${email}</strong></p>`,
  })
}
