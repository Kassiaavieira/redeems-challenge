import './globals.css'
import { ReactNode } from 'react'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Header from '../components/Header'

const theme = createTheme({
  palette: {
    primary: { main: '#4B2BD3' },
    secondary: { main: '#00C2A8' }
  },
  shape: { borderRadius: 12 }
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <main style={{ padding: '40px 24px' }}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}
