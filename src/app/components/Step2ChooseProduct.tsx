'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { RedeemItem } from '@/types';

type Props = {
  products: (RedeemItem & { redeem_page_id: string })[];
  onNext: () => void;
  onBack: () => void;
  onSelect: (productId: string | null, redeemPageId: string | null) => void;
};

export default function Step2ChooseProduct({ products, onNext, onBack, onSelect }: Props) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const selectProduct = (product: RedeemItem & { redeem_page_id: string }) => {
    const isSelected = selectedProductId === product.customer_product_id;
    const newSelectedProductId = isSelected ? null : product.customer_product_id;
    setSelectedProductId(newSelectedProductId);

    onSelect(
      newSelectedProductId ? product.customer_product_id : null,
      newSelectedProductId ? product.redeem_page_id : null
    );
  };

  return (
    <Box textAlign="center" minHeight="80vh" display="flex" flexDirection="column" justifyContent="center">
      <Typography variant="h6" mb={4}>
        Escolha o seu presente! 🎁
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {products.slice(0, 3).map((product, index) => (
          <Grid key={`${product.redeem_page_id}-${index}`} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                position: 'relative',
                border: selectedProductId === product.customer_product_id ? '2px solid blue' : '1px solid gray',
                cursor: 'pointer',
              }}
              onClick={() => selectProduct(product)}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  p: 2,
                }}
              >
                <Box position="relative" width="100%" height={150} sx={{ mb: 2 }}>
                  <Image
                    src={product.image_url}
                    alt={product.name ?? 'Produto'}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>

                <Typography textAlign="center" mb={2}>
                  {product.name}
                </Typography>

                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: selectedProductId === product.customer_product_id ? 'blue' : 'grey.400',
                    backgroundColor: selectedProductId === product.customer_product_id ? 'blue' : 'transparent',
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="space-between" mt={4} px={4}>
        <Button
          variant="contained"
          onClick={onBack}
          sx={{
            borderRadius: '50px',
            backgroundColor: 'grey.400',
            color: 'white',
            px: 4,
            textTransform: 'none',
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 400,
          }}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={onNext}
          sx={{
            borderRadius: '50px',
            px: 4,
            textTransform: 'none',
            fontFamily: '"Roboto", sans-serif',
            fontWeight: 'bold',
          }}
          disabled={!selectedProductId}
        >
          Continuar
        </Button>
      </Box>

      <Box mt={6}>
        <Typography variant="caption" color="text.secondary">
          © 2025 . Empresa X em parceria com a Lobby
        </Typography>
      </Box>
    </Box>
  );
}