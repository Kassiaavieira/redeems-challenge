'use client';

import { useState, useEffect } from 'react';
import { getRedeemPages } from '../lib/api';
import { AxiosError } from 'axios';
import Step1Welcome from './components/Step1Welcome';
import Step2ChooseProduct from './components/Step2ChooseProduct';
import Step3Form from './components/Step3Form';
import Step4Success from './components/Step4Success';
import { RedeemItem } from '../types';

export default function HomePage() {
  const [step, setStep] = useState<number>(1);
  const [products, setProducts] = useState<RedeemItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null); 
  const [redeemPageId, setRedeemPageId] = useState<string | null>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getRedeemPages();
        const items = res.data.redeem_pages
          .filter(page => page.status === 'ACTIVE')
          .flatMap(page =>
            page.items
              .filter(item => item.quantity > 0)
              .map(item => ({
                ...item,
                redeem_page_id: page.id,
              }))
          );
        setProducts(items);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Erro ao buscar produtos:', error.message);
        }
      }
    };
    fetchProducts();
  }, []);
  
  const handleProductSelect = (productId: string | null, pageId: string | null) => {
    setSelectedProductId(productId);
    setRedeemPageId(pageId);
  }

  return (
    <div style={{ padding: 24 }}>
      {step === 1 && <Step1Welcome onNext={() => setStep(2)} />}
      {step === 2 && (
        <Step2ChooseProduct
          products={products}
          onNext={() => setStep(3)}
          onBack={() => setStep(1)}
          onSelect={handleProductSelect}
        />
      )}
      {step === 3 && selectedProductId && redeemPageId && (
        <Step3Form
          onNext={() => setStep(4)}
          onBack={() => setStep(2)}
          redeemId={redeemPageId}
          selectedProductId={selectedProductId}
        />
      )}
      {step === 4 && <Step4Success />}
    </div>
  );
}