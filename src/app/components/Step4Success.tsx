import { Box, Typography } from '@mui/material';
import Image from 'next/image'; 

export default function Step4Success() {
  return (
    <Box
      sx={{
        maxWidth: 600, 
        width: '100%',
        padding: 6, 
        borderRadius: 2,
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: 'white', 
      }}
    >
      <Box 
        display="flex" 
        justifyContent="center" 
        sx={{ mb: 5 }} 
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={250} 
          height={100} 
          style={{ objectFit: 'contain' }}
          priority
        />
      </Box>

      <Typography 
        variant="h4" 
        fontWeight="medium"
        sx={{ 
          mt: 3, 
          mb: 2,
          color: 'text.primary', 
        }}
      >
        Presente resgatado! 🥳
      </Typography>

      <Typography 
        variant="h6" 
        color="text.secondary" 
        sx={{ 
          mb: 1.5,
        }} 
      >
        Seu pedido está em andamento!
      </Typography>

      <Typography 
        variant="body1" 
        color="text.secondary" 
        sx={{ 
          mt: 0,
          mb: 6,
          lineHeight: 1.5,
          px: 2,
        }}
      >
        E não se preocupe, as alterações de status do envio chegam em seu e-mail!
      </Typography>

      <Typography variant="caption" color="text.disabled" sx={{ display: 'block' }}>
        © 2025 Empresa X em parceria com a **Lobby**
      </Typography>
    </Box>
  );
}