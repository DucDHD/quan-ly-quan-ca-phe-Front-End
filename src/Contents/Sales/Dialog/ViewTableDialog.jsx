import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'


function ViewTableDialog({ open, onClose, selectedTable}) {

    const bookingInfo = {
        CustomerName: 'Nguyễn Văn A',
        PhoneNumber: '0905123456',
        BookingDate: '28/07/2026',
        BookingTime: '19:00',
        PeopleCount: 4
    }

  const orderProducts = [
    {
      ProductName: 'Cà phê sữa',
      Quantity: 2,
      Price: 30000
    },
    {
      ProductName: 'Trà đào',
      Quantity: 1,
      Price: 45000
    },
    {
      ProductName: 'Bánh tiramisu',
      Quantity: 2,
      Price: 55000
    }
  ]
   const totalQuantity = orderProducts.reduce(
    (total, item) => total + item.Quantity,
    0
  )

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" slotProps={{ paper: {sx: { borderRadius: 3,overflow: 'hidden' } } }}>
      <DialogTitle  sx={{ pt: 5, px: 3, py: 2, bgcolor: 'primary.main', color: '#ffffff' }} >
        Thông tin bàn{' '}
        {selectedTable ? String(selectedTable.TableNumber).padStart(2, '0') : ''}
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: '#f7f9fc' }}>
        <Box sx ={{ px: 3, pt:3, pb: 3 }}>
        <Stack spacing={2}>
          <Paper variant="outlined" sx={{  p: 2, borderRadius: 2, bgcolor: '#ffffff'}} >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 1.5 }}
            >
              Thông tin khách hàng
            </Typography>

            <Box sx={{ display:'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)'}, gap: 1.5 }} >
              <Box>
                <Typography variant="caption" color="text.secondary">
                  Tên khách hàng
                </Typography>
                <Typography fontWeight={600}>
                  {bookingInfo.CustomerName}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" >
                  Số điện thoại
                </Typography>
                <Typography fontWeight={600}>
                  {bookingInfo.PhoneNumber}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" >
                  Ngày đặt
                </Typography>
                <Typography fontWeight={600}>
                  {bookingInfo.BookingDate}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption"color="text.secondary">
                  Giờ đặt
                </Typography>
                <Typography fontWeight={600}>
                  {bookingInfo.BookingTime}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" >
                  Số người
                </Typography>
                <Typography fontWeight={600}>
                  {bookingInfo.PeopleCount}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: '#ffffff'
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1.5 }}
            >
              <Typography variant="subtitle1" fontWeight={700}>
                Danh sách món
              </Typography>

              <Typography variant="body2"color="text.secondary">
                Tổng số lượng: {totalQuantity}
              </Typography>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px',
                px: 1.5,
                py: 1,
                bgcolor: '#f1f5f9',
                borderRadius: 1
              }}
            >
              <Typography fontWeight={700}>
                Tên món
              </Typography>

              <Typography fontWeight={700}textAlign="center">
                Số lượng
              </Typography>
            </Box>
            <Divider />
            {orderProducts.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px',
                  alignItems: 'center',
                  px: 1.5,
                  py: 1.25,
                  borderBottom: index !== orderProducts.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider'
                }}
              >
                <Typography>
                  {item.ProductName}
                </Typography>

                <Typography textAlign="center" fontWeight={600} >
                  {item.Quantity}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Stack>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button  variant="outlined" onClick={onClose} >
          Đóng
        </Button>
      </DialogActions>
      
    </Dialog>
  )
}

export default ViewTableDialog