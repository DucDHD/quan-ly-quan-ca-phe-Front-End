import { useMemo, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, TextField, Typography } from '@mui/material'

const ORDER_ITEMS = [
  { ProductId: 1, ProductName: 'Cà phê sữa', Price: 30000, Quantity: 2 },
  { ProductId: 2, ProductName: 'Trà đào', Price: 35000, Quantity: 1 },
  { ProductId: 3, ProductName: 'Pepsi', Price: 20000, Quantity: 3 }
]

function PaymentDialog({ open, selectedTable, onClose }) {
  const [customerPayment, setCustomerPayment] = useState('')

  const totalPrice = useMemo(() => ORDER_ITEMS.reduce((total, item) => total + item.Price * item.Quantity, 0), [])
  const changeAmount = Math.max(Number(customerPayment || 0) - totalPrice, 0)

  const formatCurrency = value => new Intl.NumberFormat('vi-VN').format(value) + ' đ'

  const handleClose = () => {
    setCustomerPayment('')
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
        Thanh toán bàn {selectedTable?.TableNumber}
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: '#f7f9fc' }}>
        <Box sx={{ p: 3 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>Danh sách món</Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 80px 140px', px: 1.5, py: 1, bgcolor: '#f1f5f9', borderRadius: 1 }}>
              <Typography fontWeight={700}>Tên món</Typography>
              <Typography fontWeight={700} textAlign="center">SL</Typography>
              <Typography fontWeight={700} textAlign="right">Thành tiền</Typography>
            </Box>

            <Box sx={{ maxHeight: 260, overflowY: 'auto', overflowX: 'hidden' }}>
              {ORDER_ITEMS.map(item => (
                <Box key={item.ProductId} sx={{ display: 'grid', gridTemplateColumns: '1fr 80px 140px', alignItems: 'center', px: 1.5, py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography>{item.ProductName}</Typography>
                  <Typography textAlign="center">{item.Quantity}</Typography>
                  <Typography textAlign="right" fontWeight={600}>{formatCurrency(item.Price * item.Quantity)}</Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontWeight={700}>Tổng tiền</Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">{formatCurrency(totalPrice)}</Typography>
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2, mt: 2, borderRadius: 2 }}>
            <TextField
              fullWidth
              type="number"
              label="Khách đưa"
              value={customerPayment}
              onChange={event => setCustomerPayment(event.target.value)}
              slotProps={{ htmlInput: { min: 0 } }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1.5, bgcolor: '#f1f5f9', borderRadius: 1 }}>
              <Typography>Tiền thừa</Typography>
              <Typography fontWeight={700}>{formatCurrency(changeAmount)}</Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
        <Button variant="contained" disabled={Number(customerPayment) < totalPrice}>Thanh toán</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PaymentDialog