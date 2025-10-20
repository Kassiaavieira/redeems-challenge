import { useState } from 'react';
import Image from 'next/image';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { CustomerProduct } from '../../types';

type Props = {
  products: CustomerProduct[];
  onNext: () => void;
};

export default function Step2ChooseProduct({ products, onNext }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Box>
      <Typography variant="h6" mb={2}>Escolha seu presente</Typography>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              onClick={() => setSelected(product.id)}
              sx={{ border: selected === product.id ? '2px solid blue' : '1px solid gray', cursor: 'pointer' }}
            >
              <CardContent>
                <Box position="relative" width="100%" height={150} sx={{ mb: 1 }}>
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
                <Typography>{product.full_name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" sx={{ mt: 3 }} disabled={!selected} onClick={onNext}>Próximo</Button>
    </Box>
  );
}
