import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import SaveOutlined from '@mui/icons-material/SaveOutlined'
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
//import { createInventoryAPI } from '~/apis'

const formInventoryData = {
  CategoryId: '',
  Unit: '',
  Price: '',
  StockQuantity: '',
  ConversionQuantity: 1
}

function InventoryCreate() {
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: formInventoryData
  })

  const handleCreateInventory = async data => {
    const inventoryData = {
      CategoryId: Number(data.CategoryId),
      Unit: data.Unit.trim(),
      Price: Number(data.Price),
      StockQuantity: Number(data.StockQuantity),
      ConversionQuantity: Number(data.ConversionQuantity)
    }

    // try {
    //   await createInventoryAPI(inventoryData)
    //   toast.success('Nhập hàng hóa thành công.')
    //   navigate('/inventory')
    // } catch (error) {
    //   toast.error(error?.response?.data?.message || 'Nhập hàng hóa thất bại.')
    // }
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Nhập hàng hóa</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>Nhập thông tin hàng hóa vào kho.</Typography>
      </Box>

      <Paper component="form" onSubmit={handleSubmit(handleCreateInventory)} variant="outlined" sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2.5 }}>
          <TextField
            fullWidth
            type="number"
            label="Mã loại hàng"
            error={Boolean(errors.CategoryId)}
            helperText={errors.CategoryId?.message}
            {...register('CategoryId', {
              required: 'Vui lòng nhập mã loại hàng.',
              valueAsNumber: true,
              min: { value: 1, message: 'Mã loại hàng không hợp lệ.' }
            })}
          />

          <TextField
            fullWidth
            label="Đơn vị"
            error={Boolean(errors.Unit)}
            helperText={errors.Unit?.message}
            {...register('Unit', {
              required: 'Vui lòng nhập đơn vị.',
              validate: value => value.trim() !== '' || 'Vui lòng nhập đơn vị.'
            })}
          />

          <TextField
            fullWidth
            type="number"
            label="Số lượng nhập"
            error={Boolean(errors.StockQuantity)}
            helperText={errors.StockQuantity?.message}
            {...register('StockQuantity', {
              required: 'Vui lòng nhập số lượng.',
              valueAsNumber: true,
              min: { value: 1, message: 'Số lượng phải lớn hơn 0.' }
            })}
          />

          <TextField
            fullWidth
            type="number"
            label="Đơn giá"
            error={Boolean(errors.Price)}
            helperText={errors.Price?.message}
            {...register('Price', {
              required: 'Vui lòng nhập đơn giá.',
              valueAsNumber: true,
              min: { value: 1, message: 'Đơn giá phải lớn hơn 0.' }
            })}
          />

          <TextField
            fullWidth
            type="number"
            label="Số lượng quy đổi"
            error={Boolean(errors.ConversionQuantity)}
            helperText={errors.ConversionQuantity?.message}
            {...register('ConversionQuantity', {
              required: 'Vui lòng nhập số lượng quy đổi.',
              valueAsNumber: true,
              min: { value: 1, message: 'Số lượng quy đổi phải lớn hơn 0.' }
            })}
          />
        </Box>

        <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button type="button" variant="outlined" color="inherit" startIcon={<RestartAltOutlined />} onClick={() => reset(formInventoryData)} sx={{ textTransform: 'none' }}>
            Nhập lại
          </Button>

          <Button type="submit" variant="contained" startIcon={<SaveOutlined />} sx={{ textTransform: 'none' }}>
            Lưu hàng hóa
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default InventoryCreate