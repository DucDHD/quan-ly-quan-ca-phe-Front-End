import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, TextField, Typography } from '@mui/material'

const ORDER_ITEMS = [
  { ProductId: 1, ProductName: 'Cà phê sữa', Quantity: 3 },
  { ProductId: 2, ProductName: 'Sinh tố bơ', Quantity: 2 },
  { ProductId: 3, ProductName: 'Pepsi', Quantity: 4 },
  { ProductId: 4, ProductName: 'Trà Lipton', Quantity: 1 }
]

function SplitTableDialog({ open, selectedTable, availableTables, onClose }) {
  const [targetTableId, setTargetTableId] = useState('')
  const [splitQuantities, setSplitQuantities] = useState({})

  const hasSelectedProduct = Object.values(splitQuantities).some(quantity => Number(quantity) > 0)

  const handleQuantityChange = (productId, value, maxQuantity) => {
    const quantity = Math.max(0, Math.min(Number(value), maxQuantity))

    setSplitQuantities(previous => ({
      ...previous,
      [productId]: quantity
    }))
  }

  const handleClose = () => {
    setTargetTableId('')
    setSplitQuantities({})
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
        Tách bàn {selectedTable?.TableNumber}
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: '#f7f9fc' }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' }, gap: 2, p: 3 }}>
          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Chọn món cần tách
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px', px: 1.5, py: 1, bgcolor: '#f1f5f9', borderRadius: 1 }}>
              <Typography fontWeight={700}>Tên món</Typography>
              <Typography fontWeight={700} textAlign="center">Đang có</Typography>
              <Typography fontWeight={700} textAlign="center">SL tách</Typography>
            </Box>

            <Box sx={{ maxHeight: 280, overflowY: 'auto' }}>
              {ORDER_ITEMS.map(item => (
                <Box key={item.ProductId} sx={{ display: 'grid', gridTemplateColumns: '1fr 100px 120px', alignItems: 'center', px: 1.5, py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography>{item.ProductName}</Typography>
                  <Typography textAlign="center">{item.Quantity}</Typography>

                  <TextField
                    size="small"
                    type="number"
                    value={splitQuantities[item.ProductId] || 0}
                    onChange={event => handleQuantityChange(item.ProductId, event.target.value, item.Quantity)}
                    slotProps={{ htmlInput: { min: 0, max: item.Quantity } }}
                  />
                </Box>
              ))}
            </Box>
          </Paper>

          <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Bàn nhận món
            </Typography>

            <TextField
              select
              fullWidth
              label="Chọn bàn tách đến"
              value={targetTableId}
              onChange={event => setTargetTableId(event.target.value)}
            >
              {availableTables.map(table => (
                <MenuItem key={table.TableId} value={table.TableId}>
                  Bàn {String(table.TableNumber).padStart(2, '0')}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ mt: 3, p: 2, bgcolor: '#f1f5f9', borderRadius: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Bàn hiện tại
              </Typography>

              <Typography fontWeight={700}>
                Bàn {selectedTable?.TableNumber}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Chuyển đến
              </Typography>

              <Typography fontWeight={700}>
                {targetTableId
                  ? `Bàn ${availableTables.find(table => table.TableId === targetTableId)?.TableNumber}`
                  : 'Chưa chọn bàn'}
              </Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
        <Button variant="contained" disabled={!targetTableId || !hasSelectedProduct}>Tách bàn</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SplitTableDialog