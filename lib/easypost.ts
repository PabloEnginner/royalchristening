import EasyPost from '@easypost/api'

export function getEasyPost() {
  return new EasyPost(process.env.EASYPOST_API_KEY!)
}

export const DEFAULT_PARCEL = {
  weight: 32,  // oz (2 lbs)
  length: 14,  // inches
  width:  12,
  height: 4,
}

export function getFromAddress() {
  return {
    name:    process.env.SHIP_FROM_NAME   ?? 'Royal Christening',
    street1: process.env.SHIP_FROM_STREET ?? '',
    city:    process.env.SHIP_FROM_CITY   ?? '',
    state:   process.env.SHIP_FROM_STATE  ?? '',
    zip:     process.env.SHIP_FROM_ZIP    ?? '',
    country: 'US',
    phone:   process.env.SHIP_FROM_PHONE  ?? '',
  }
}

export interface ShippingRate {
  id:             string
  carrier:        string
  service:        string
  rate:           string   // e.g. "8.50"
  currency:       string
  deliveryDays:   number | null
  deliveryDate:   string | null
}

export async function getShippingRates(toAddress: {
  name:    string
  street1: string
  city:    string
  state:   string
  zip:     string
}) {
  const client = getEasyPost()

  const shipment = await client.Shipment.create({
    from_address: getFromAddress(),
    to_address: {
      name:    toAddress.name,
      street1: toAddress.street1,
      city:    toAddress.city,
      state:   toAddress.state,
      zip:     toAddress.zip,
      country: 'US',
    },
    parcel: DEFAULT_PARCEL,
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rates: ShippingRate[] = (shipment.rates ?? []).map((r: any) => ({
    id:           r.id as string,
    carrier:      r.carrier as string,
    service:      r.service as string,
    rate:         r.rate as string,
    currency:     r.currency as string,
    deliveryDays: (r.delivery_days ?? null) as number | null,
    deliveryDate: (r.delivery_date ?? null) as string | null,
  }))

  // Sort by price ascending
  rates.sort((a, b) => parseFloat(a.rate) - parseFloat(b.rate))

  return { shipmentId: shipment.id, rates }
}

export async function buyShippingLabel(shipmentId: string, rateId: string) {
  const client = getEasyPost()
  const shipment = await client.Shipment.buy(shipmentId, rateId)
  return {
    trackingCode: shipment.tracking_code ?? '',
    labelUrl:     shipment.postage_label?.label_url ?? '',
    carrier:      shipment.selected_rate?.carrier ?? '',
    service:      shipment.selected_rate?.service ?? '',
  }
}
