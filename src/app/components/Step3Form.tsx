import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { approveRedeem } from '../../lib/api';
import { RedeemFormData } from '../../types';
import { AxiosError } from 'axios';

type Props = { onNext: () => void };

export default function Step3Form({ onNext }: Props) {
  const [form, setForm] = useState<RedeemFormData>({
    id: '1',
    redeemer_name: '',
    redeemer_email: '',
    redeemer_document_number: '',
    redeemer_zipcode: '',
    redeemer_street: '',
    redeemer_number: '',
    redeemer_complement: '',
    redeemer_neighborhood: '',
    redeemer_city: '',
    redeemer_state: '',
    redeemer_country: '',
    redeemer_phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await approveRedeem(form.id, form);
      onNext();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Erro ao aprovar resgate:', error.message);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h6">Preencha seus dados</Typography>
      {(Object.keys(form) as (keyof RedeemFormData)[]).map(key => (
        <TextField
          key={key}
          label={key.replace('redeemer_', '').replace('_', ' ')}
          name={key}
          value={form[key]}
          onChange={handleChange}
          fullWidth
        />
      ))}
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>Resgatar</Button>
    </Box>
  );
}
