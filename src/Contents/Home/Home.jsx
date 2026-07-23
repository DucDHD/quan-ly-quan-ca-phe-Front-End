import {
  AssessmentOutlined,
  BadgeOutlined,
  PointOfSaleOutlined,
} from '@mui/icons-material'

import {
  Box,
  Paper,
  Typography,
} from '@mui/material'

function Home() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700}>
        Xin chào, Admin!
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        Chào mừng bạn quay trở lại hệ thống quản lý quán cà phê.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          mt: 4,
        }}
      >
        <SummaryCard
          title="Nhân viên"
          value="12"
          description="Đang hoạt động"
          icon={<BadgeOutlined />}
        />

        <SummaryCard
          title="Đơn hàng hôm nay"
          value="48"
          description="Đã tiếp nhận"
          icon={<PointOfSaleOutlined />}
        />

        <SummaryCard
          title="Doanh thu hôm nay"
          value="8.500.000đ"
          description="Tạm tính"
          icon={<AssessmentOutlined />}
        />
      </Box>
    </Box>
  )
}

function SummaryCard({ title, value, description, icon }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2.5,
        borderRadius: 2.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 48,
            height: 48,
            flexShrink: 0,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'rgba(25, 118, 210, 0.12)',
            color: 'primary.main',
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>

          <Typography variant="h6" fontWeight={700}>
            {value}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {description}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default Home