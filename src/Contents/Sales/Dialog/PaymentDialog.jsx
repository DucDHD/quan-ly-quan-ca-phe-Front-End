import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getPaymentInfoAPI, paymentAPI } from '~/apis'
import { toast } from 'react-toastify'

function PaymentDialog({ open, selectedTable, onClose, handleUpdateTable }) {

  const [productInfo, setProductInfo] = useState([])

   useEffect(() => {
    if (!open || !selectedTable?.TableId) return
      const fetchProductInfo = async () => {
        try {
          const data = await getPaymentInfoAPI(selectedTable.TableId)
          setProductInfo(data)
        } catch (error) {
          toast.error('Không thể lấy thông tin bàn')
        }
      }
      fetchProductInfo()
    }, [open, selectedTable?.TableId])

  const totalPrice = productInfo.reduce( (total, product) => total + Number(product.Price) * Number(product.Quantity), 0)
  const formatCurrency = value => new Intl.NumberFormat('vi-VN').format(value) + ' đ'


  const handlePayment = async () => {
    try {
      const result = await paymentAPI(selectedTable.TableId)
      handleUpdateTable(result.updateStatusTable)
      toast.success('Thanh toán thành công')
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Thanh toán thất bại')
    }
  }

  const handleClose = () => {
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

            <Box sx={{ maxHeight: 260, overflowY: 'auto', overflowX: 'hidden', mb: 2 }}>
              {productInfo.map(item => (
                <Box key={item.ProductId} sx={{ display: 'grid', gridTemplateColumns: '1fr 80px 140px', alignItems: 'center', px: 1.5, py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography>{item.ProductName}</Typography>
                  <Typography textAlign="center">{item.Quantity}</Typography>
                  <Typography textAlign="right" fontWeight={600}>{formatCurrency(item.Price * item.Quantity)}</Typography>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography fontWeight={700}>Tổng tiền</Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">{formatCurrency(totalPrice)}</Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
        <Button variant="contained" onClick={handlePayment} >Thanh toán</Button>
      </DialogActions>
    </Dialog>
  )
}

export default PaymentDialog