'use client'
import { ReactNode } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Container } from '@mui/material';

type Props = {
  children: ReactNode;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#22007F',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default function RootLayout({ children }: Props) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Redeems Challenge</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth="md" sx={{ py: 4 }}>
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
