'use client';

import { useState, useEffect } from 'react';
import { CustomerProduct } from '../types';
import { getCustomerProducts } from '../lib/api';
import { AxiosError } from 'axios';
import Step1Welcome from './components/Step1Welcome';
import Step2ChooseProduct from './components/Step2ChooseProduct';
import Step3Form from './components/Step3Form';
import Step4Success from './components/Step4Success';

export default function HomePage() {
  const [step, setStep] = useState<number>(1);
  const [products, setProducts] = useState<CustomerProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getCustomerProducts();
        setProducts(res.data.customer_products);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error('Erro ao buscar produtos:', error.message);
        }
      }
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      {step === 1 && <Step1Welcome onNext={() => setStep(2)} />}
      {step === 2 && <Step2ChooseProduct products={products} onNext={() => setStep(3)} />}
      {step === 3 && <Step3Form onNext={() => setStep(4)} />}
      {step === 4 && <Step4Success />}
    </div>
  );
}
