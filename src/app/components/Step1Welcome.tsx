import Image from 'next/image';
import { Box, Typography, Button } from '@mui/material';

type Props = { onNext: () => void };

export default function Step1Welcome({ onNext }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      minHeight="100vh"
      pt={8}
      px={2}
    >
      <Box mb={3}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={180}
          height={70}
          style={{ marginBottom: 12, objectFit: 'contain' }}
          priority
        />
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Bem-vindo!
      </Typography>

      <Box mb={3}>
        <Typography color="text.secondary">
          Estamos muito felizes em ter você em nossa equipe!
        </Typography>
        <Typography color="text.secondary">
          Preencha as perguntinhas a seguir para escolher o seu presente! 🎁
        </Typography>
      </Box>

      <Button
        variant="contained"
        onClick={onNext}
        sx={{
          borderRadius: 8,
          px: 5,
          py: 1.3,
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Começar!
      </Button>

      <Typography
        color="text.secondary"
        variant="body2"
        sx={{ position: 'absolute', bottom: 16 }}
      >
        © 2025 . Empresa X em parceria com a Lobby
      </Typography>
    </Box>
  );
}
