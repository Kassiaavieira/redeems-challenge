export type PageInfo = {
  current_page: number
  total_pages: number
  total_items: number
  per_page: number
}

export type ShippingOrder = {
  id: string
  status: string
  created_at: string
  updated_at: string
}

export type CustomerProduct = {
  id: string
  name: string
  points: number
  image_url?: string
}

export type Redeem = {
  id: string
  status: 'pending' | 'approved' | 'refused'
  created_at: string
  product: CustomerProduct
}
