import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Box, Checkbox, Chip, Divider, IconButton, Paper, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { getAllProductAPI } from '~/apis'
import { toast } from 'react-toastify'
import { orderProductAPI } from '~/apis'

function ChooseProductDialog({open, onClose, selectedTable, handleUpdateTable }) {

    const [productList, setProductList] = useState([])
    //const [selectedProducts, setSelectedProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
            const products = await getAllProductAPI()
            setProductList(products)
            } catch (error) { console.error(error) }
        }
        fetchProducts()
    }, [])

    const handleOrderProduct = async () => {
      try {
        const products = productList.filter(product => productQuantities[product.ProductId] > 0).map( product => ({
            ProductId: product.ProductId,
            Quantity: productQuantities[product.ProductId]
          }))

        const data = {
          TableId: selectedTable.TableId,
          Products: products
        }

        const result = await orderProductAPI(data)
        if (result.updateStatusTable) {
          handleUpdateTable(result.updateStatusTable)
        }

        toast.success('Chọn món thành công')
        setProductQuantities({})
        onClose()
      } catch (error) {
        toast.error(error.response?.data?.message || 'Có lỗi xảy ra')
      }
    }

    const [productQuantities, setProductQuantities] = useState({})

    const handleIncreaseQuantity = (productId) => {
        setProductQuantities(previous => ({
            ...previous,
            [productId]: (previous[productId] || 0) + 1
        }))
    }
    const handleDecreaseQuantity = (productId) => {
        setProductQuantities(previous => ({
            ...previous,
            [productId]: Math.max((previous[productId] || 0) - 1, 0)
        }))
    }

    const handleToggleProduct = (productId) => {
        setProductQuantities(previous => ({
            ...previous,
            [productId]: previous[productId] > 0 ? 0 : 1
        }))
    }

    const formatCurrency = price => {
        return new Intl.NumberFormat('vi-VN').format(price) + ' đ'
    }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Chọn món - Bàn {selectedTable?.TableNumber}
      </DialogTitle>
      <DialogContent sx={{ p: 0, bgcolor: '#f7f9fc' }}>
        <Box sx={{ p: 3 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
                Danh sách món
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: '50px 1fr 130px 160px', alignItems: 'center', px: 1.5, py: 1, bgcolor: '#f1f5f9', borderRadius: 1 }}>
                <Typography />
                <Typography fontWeight={700}>Tên món</Typography>
                <Typography fontWeight={700} textAlign="right">Giá bán</Typography>
                <Typography fontWeight={700} textAlign="center">Số lượng</Typography>
            </Box>

            <Divider />

            <Box sx={{ maxHeight: 360, overflowY: 'auto', overflowX: 'hidden' }}>
                {productList.map(product => (
                    <Box
                    key={product.ProductId}
                    sx={{ display: 'grid', gridTemplateColumns: '50px 1fr 130px 160px', alignItems: 'center', px: 1.5, py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}
                    >
                    <Checkbox
                        checked={(productQuantities[product.ProductId] || 0) > 0}
                        onChange={() => handleToggleProduct(product.ProductId)}
                    />

                    <Typography fontWeight={600}>
                        {product.ProductName}
                    </Typography>

                    <Typography textAlign="right" fontWeight={600}>
                        {formatCurrency(product.Price)}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                        <IconButton
                        size="small"
                        disabled={(productQuantities[product.ProductId] || 0) === 0}
                        onClick={() => handleDecreaseQuantity(product.ProductId)}
                        >
                        <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography sx={{ minWidth: 28, textAlign: 'center', fontWeight: 700 }}>
                        {productQuantities[product.ProductId] || 0}
                        </Typography>

                        <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleIncreaseQuantity(product.ProductId)}
                        >
                        <AddIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    </Box>
                ))}
                </Box>
            </Paper>
          </Box>
        </DialogContent>
      <DialogActions>
        <Button  variant="outlined"  onClick={onClose} >
          Hủy
        </Button>

        <Button variant="contained" onClick={handleOrderProduct} >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChooseProductDialog