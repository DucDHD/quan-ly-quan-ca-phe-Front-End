import { CoffeeOutlined } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'

function Header() {
  return (
    <Box sx={{ height: 72, px: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <CoffeeOutlined fontSize="large" />

        <Box>
          <Typography variant="h6" fontWeight={700}>Phần mềm quản lý quán cà phê</Typography>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>Hệ thống quản lý Bonsai Coffee</Typography>
        </Box>
      </Box>

      <Typography variant="body2" sx={{ opacity: 0.9 }}>
        Phiên bản 1.0
      </Typography>
    </Box>
  )
}

export default Header