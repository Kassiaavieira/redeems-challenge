import axios from 'axios'
import type { PageInfo, ShippingOrder, CustomerProduct, Redeem } from './types'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
})

export async function listShippingOrders(page = 1): Promise<{ page_info: PageInfo; shipping_orders: ShippingOrder[] }> {
  const { data } = await api.get(`/api/v1/shipping_orders`, { params: { page } })
  return data
}

export async function getShippingOrder(id: string): Promise<ShippingOrder> {
  const { data } = await api.get(`/api/v1/shipping_orders/${id}`)
  return data
}

export async function listCustomerProducts(): Promise<{ page_info: PageInfo; customer_products: CustomerProduct[] }> {
  const { data } = await api.get(`/api/v1/customer_products`)
  return data
}

export async function getRedeem(id: string): Promise<Redeem> {
  const { data } = await api.get(`/api/v1/redeems/${id}`)
  return data
}

export async function approveRedeem(id: string): Promise<void> {
  await api.post(`/api/v1/redeems/${id}/approve`)
}

export async function refuseRedeem(id: string): Promise<void> {
  await api.post(`/api/v1/redeems/${id}/refuse`)
}
