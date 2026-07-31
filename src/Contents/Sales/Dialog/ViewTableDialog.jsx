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
import { useEffect, useState } from 'react'
import { getTableDetailAPI } from '~/apis'

function ViewTableDialog({ open, onClose, selectedTable}) {

  const [tableDetail, setTableDetail] = useState([])
  useEffect(() => {
    if (!open || !selectedTable?.TableId) return

    const fetchTableDetail = async () => {
      try {
        const data = await getTableDetailAPI(selectedTable.TableId)
        setTableDetail(data)
      } catch (error) {
        toast.error('Không thể lấy thông tin bàn')
      }
    }
    fetchTableDetail()
  }, [open, selectedTable?.TableId])

  const customer = tableDetail[0] || {}

  const bookingTimes = customer.BookingTime ? new Date(customer.BookingTime) : null

  {bookingTimes ? bookingTimes.toLocaleDateString('vi-VN') : '---'}

  const totalPrice = tableDetail.reduce( (total, product) => total + Number(product.Price) * Number(product.Quantity), 0)
  const totalQuantity = tableDetail.reduce((total, item) => total + item.Quantity, 0)

  return (
    <Dialog
        open={open}
        onClose={onClose}
        
        maxWidth={false}
        slotProps={{ paper: { sx: { width: 760, maxWidth: '90vw', borderRadius: 3, overflow: 'hidden' } } }}
    >
      <DialogTitle  sx={{ pt: 5, px: 3, py: 2, bgcolor: 'primary.main', color: '#ffffff' }} >
        Thông tin bàn{' '}
        {selectedTable ? String(selectedTable.TableNumber).padStart(2, '0') : ''}
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: '#f7f9fc' }}>
        <Box sx ={{ px: 3, pt:3, pb: 3 }}>
        <Stack spacing={2}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#ffffff' }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 1.5 }}>
              Thông tin khách hàng
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1.3fr 1fr 0.8fr 0.7fr' }, gap: 1.5 }}>
              <Box>
                <Typography sx={{ mb: 1.25 }} variant="body1"  color="text.secondary">Tên khách hàng</Typography>
                <Typography fontWeight={600}>{customer?.CustomerName}</Typography>
              </Box>
              <Box>
                <Typography sx={{ mb: 1.25 }} variant="body1" color="text.secondary">Số điện thoại</Typography>
                <Typography fontWeight={600}>{customer?.PhoneNumber}</Typography>
              </Box>
              <Box>
                <Typography sx={{ mb: 1.25 }} variant="body1" color="text.secondary">Ngày đặt</Typography>
                <Typography fontWeight={600}>{bookingTimes ? bookingTimes.toLocaleDateString('vi-VN') : '---'}</Typography>
              </Box>
              <Box>
                <Typography sx={{ mb: 1.25 }} variant="body1" color="text.secondary">Giờ đặt</Typography>
                <Typography fontWeight={600}>{bookingTimes ? bookingTimes.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : '---'}</Typography>
              </Box>
              <Box>
                <Typography sx={{ mb: 1.25 }} variant="body1" color="text.secondary">Số người</Typography>
                <Typography sx={{ textAlign:'center'}} fontWeight={600}>{customer?.PeopleCount}</Typography>
              </Box>
            </Box>
          </Paper>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: '#ffffff' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
              <Typography variant="h6" fontWeight={700}>
                Danh sách món
              </Typography>
            </Stack>

            <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 80px 1fr', px: 1.5, py: 1, bgcolor: '#f1f5f9', borderRadius: 1 }}>
              <Typography fontWeight={700}>Tên món</Typography>
              <Typography fontWeight={700} textAlign="right">Đơn giá</Typography>
              <Typography fontWeight={700} textAlign="center">SL</Typography>
              <Typography fontWeight={700} textAlign="right">Thành tiền</Typography>
            </Box>

            <Divider />

            {tableDetail.map((item, index) => (
              <Box
                key={item.ProductId || index}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 80px 1fr',
                  alignItems: 'center',
                  px: 1.5,
                  py: 1.25,
                  borderBottom: index !== tableDetail.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider'
                }}
              >
                <Typography>{item.ProductName}</Typography>

                <Typography textAlign="right">
                  {Number(item.Price).toLocaleString('vi-VN')}đ
                </Typography>

                <Typography textAlign="center" fontWeight={600}>
                  {item.Quantity}
                </Typography>

                <Typography textAlign="right" fontWeight={600}>
                  {(Number(item.Price) * Number(item.Quantity)).toLocaleString('vi-VN')}đ
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 1 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1.5 }}>
              <Typography variant="h6" fontWeight={700}>
                Tổng số lượng: {totalQuantity}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  Tổng tiền
                </Typography>
                <Typography variant="h5" fontWeight={700} color="error.main">
                  {totalPrice.toLocaleString('vi-VN')}đ
                </Typography>
              </Box>
            </Box>
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