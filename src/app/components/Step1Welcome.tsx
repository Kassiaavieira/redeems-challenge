import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';

type Props = { onNext: () => void };

export default function Step1Welcome({ onNext }: Props) {
  return (
    <Box textAlign="center">
      <Image 
        src="/logo.png" 
        alt="Logo" 
        width={120} 
        height={120} 
        style={{ marginBottom: 16 }}
        priority
      />
      <Typography variant="h5" gutterBottom>Bem-vindo!</Typography>
      <Typography gutterBottom>
        Estamos muito felizes em ter você em nossa equipe! Preencha as perguntinhas a seguir para escolher o seu presente! 🎁
      </Typography>
      <Button variant="contained" onClick={onNext} sx={{ mt: 3 }}>Começar</Button>
    </Box>
  );
}
