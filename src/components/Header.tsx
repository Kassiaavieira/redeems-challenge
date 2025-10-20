import { AppBar, Toolbar, Typography, Box } from '@mui/material'
export default function Header() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <div style={{ width: 36, height: 36, background: '#4B2BD3', borderRadius: 8, marginRight: 12 }} />
          <Typography variant="h6">Redeems - Teste Frontend</Typography>
        </Box>
        <Typography variant="caption">Teste técnico - Lobby</Typography>
      </Toolbar>
    </AppBar>
  )
}
