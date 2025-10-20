import axios, { AxiosResponse } from 'axios';
import { RedeemFormData, RedeemPage, RedeemPagesResponse } from '../types';

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

export const createRedeem = (redeemPageId: string, data: RedeemFormData): Promise<AxiosResponse<void>> =>
  api.post(`/api/v1/redeem_pages/${redeemPageId}/redeem`, data);

export const getRedeemPages = (): Promise<AxiosResponse<RedeemPagesResponse>> =>
  api.get('/api/v1/redeem_pages');

export const getRedeemPageById = (redeemPageId: string): Promise<AxiosResponse<RedeemPage>> =>
  api.get(`/api/v1/redeem_pages/${redeemPageId}`);
