import axios, { AxiosResponse } from 'axios';
import { RedeemFormData, CustomerProductsResponse } from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const encodedKey = Buffer.from(`${API_KEY}:`).toString('base64');

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Authorization': `Basic ${encodedKey}`,
    'Content-Type': 'application/json',
  },
});

export const approveRedeem = (id: string, data: RedeemFormData): Promise<AxiosResponse<void>> =>
  api.post(`api/v1/redeems/${id}/approve`, data);

export const refuseRedeem = (id: string, data: RedeemFormData): Promise<AxiosResponse<void>> =>
  api.post(`api/v1/redeems/${id}/refuse`, data);

export const getCustomerProducts = (): Promise<AxiosResponse<CustomerProductsResponse>> =>
  api.get('api/v1/customer_products');
