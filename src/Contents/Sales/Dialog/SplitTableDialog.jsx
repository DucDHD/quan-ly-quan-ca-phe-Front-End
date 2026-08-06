import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getInfoSplitTable, splitTableAPI } from '~/apis'
import { toast } from 'react-toastify'
import Alert from '@mui/material/Alert'

function SplitTableDialog({ open, selectedTable, getTableEmpty, onClose, handleUpdateTable }) {
  const [targetTableId, setTargetTableId] = useState('')
  const [splitQuantities, setSplitQuantities] = useState({})
  const [productInfo, setProductInfo] = useState([])
  const [splitPeopleCount, setSplitPeopleCount] = useState(0)
  const [peopleCount, setPeopleCount] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (!open || !selectedTable?.TableId) return
    
      const fetchProductInfo = async () => {
        try {
          const data = await getInfoSplitTable(selectedTable?.TableId)
          setProductInfo(data.products)
          setPeopleCount(data.PeopleCount)
          setSplitPeopleCount(data.PeopleCount > 1 ? 1 : 0)
        } catch (error) {
          toast.error('Không thể lấy thông tin bàn')
        }
      }
      fetchProductInfo()
  }, [open, selectedTable?.TableId])

  const handleSplitTable = async () => {
    try {
      setIsSubmitted(true)

      if (!targetTableId) return 


      const products = []
      for ( const product of productInfo) {
        const quantity = splitQuantities[product.ProductId]
        
        if (quantity > 0) {
          products.push({
            ProductId: product.ProductId,
            Quantity: quantity
          })
        }
      }

      const data = {
        oldTableId: selectedTable.TableId,
        newTableId: targetTableId,
        PeopleCount: Number(splitPeopleCount),
        products
      }
      const result = await splitTableAPI(data)
      handleUpdateTable( result.updatedStatusTable)
      handleClose()
      toast.success('Tách bàn thành công.')
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Không thể tách bàn')
    }
  }

  let isSplitAllProducts = true

  for (const item of productInfo) {
    const splitQuantity = Number(splitQuantities[item.ProductId] || 0)

    if (splitQuantity !== item.Quantity) {
      isSplitAllProducts = false
      break
    }
  }

  const handleQuantityChange = (productId, value, maxQuantity) => {
    const quantity = Math.max(0, Math.min(Number(value), maxQuantity))

    setSplitQuantities(previous => ({
      ...previous,
      [productId]: quantity
    }))
  }
  const handlePeopleCountChange = (event) => {
    const value = Number(event.target.value)
    setSplitPeopleCount(value)
  }

  const handleClose = () => {
    setTargetTableId('')
    setSplitQuantities({})
    setIsSubmitted(false)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      {peopleCount <= 1 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Bàn hiện tại chỉ có 1 người nên không thể thực hiện tách bàn.
        </Alert>
      )}
      {isSplitAllProducts &&
       <Alert severity="warning" sx={{ mb: 2 }}>
          Không thể tách toàn bộ món. Vui lòng sử dụng chức năng Chuyển bàn.
        </Alert>
      }
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
              {productInfo.map(item => (
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
             
             {peopleCount > 1 && (
              <TextField
                fullWidth
                type="number"
                label="Số người cần tách"
                value={splitPeopleCount}
                error={
                  splitPeopleCount < 1 ||
                  splitPeopleCount > peopleCount - 1
                }
                helperText={
                  splitPeopleCount < 1
                    ? 'Vui lòng nhập số người cần tách.'
                    : splitPeopleCount > peopleCount - 1
                      ? `Số người cần tách phải nhỏ hơn ${peopleCount} người`
                      : ''
                }
                onChange={handlePeopleCountChange}
                slotProps={{
                  htmlInput: {
                    min: 1,
                    max: peopleCount - 1
                  }
                }}
              />
            )}
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
              disabled={peopleCount <= 1}
              value={targetTableId}
              error={isSubmitted && !targetTableId}
              onChange={event => setTargetTableId(event.target.value)}
              helperText={ isSubmitted && !targetTableId ? 'Vui lòng chọn bàn cần tách đến' : '' }
            >
              {getTableEmpty.map(table => (
                <MenuItem key={table.TableId} value={table.TableId}>
                  Bàn {String(table.TableNumber).padStart(2, '0')}
                </MenuItem>
              ))}
            </TextField>
            <Box sx={{ mt: 3, p: 2, bgcolor: '#f1f5f9', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Bàn hiện tại</Typography>
                <Typography fontWeight={700}>Bàn {selectedTable?.TableNumber}</Typography>
              </Box>

              <Box textAlign="right">
                <Typography variant="body2" color="text.secondary">Số người</Typography>
                <Typography fontWeight={700}> {peopleCount} người</Typography>
              </Box>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Chuyển đến
            </Typography>

            <Typography fontWeight={700}>
              {targetTableId
                ? `Bàn ${getTableEmpty.find(table => table.TableId === targetTableId)?.TableNumber}`
                : 'Chưa chọn bàn'}
            </Typography>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
        <Button variant="contained"  disabled={peopleCount <= 1 || isSplitAllProducts} onClick={handleSplitTable}>Tách bàn</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SplitTableDialog