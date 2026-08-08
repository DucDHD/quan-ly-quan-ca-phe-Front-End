import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import SaveOutlined from '@mui/icons-material/SaveOutlined'
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { createEquipmentAPI } from '~/apis'

const formEquipmentData = {
  EquipmentName: '',
  PurchaseDate: '',
  Quantity: '',
  UnitPrice: ''
}

function EquipmentCreate() {
  const navigate = useNavigate()

  const { register,handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: formEquipmentData
  })

  const handleCreateEquipment = async data => {
    const equipmentData = {
      EquipmentName: data.EquipmentName.trim(),
      EquipmentDate: data.EquipmentDate,
      Quantity: Number(data.Quantity),
      Price: Number(data.Price)
    }

    try {
      await createEquipmentAPI(equipmentData)
      toast.success('Thêm thiết bị thành công.')
      navigate('/equipments')
    } catch (error) {
      toast.error(  error.response?.data?.message || 'Thêm thiết bị thất bại.' )
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Thêm thiết bị
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Nhập đầy đủ thông tin để thêm thiết bị mới.
        </Typography>
      </Box>

      <Paper
        component="form"
        onSubmit={handleSubmit(handleCreateEquipment)}
        variant="outlined"
        sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, minmax(0, 1fr))'
            },
            gap: 2.5
          }}
        >
          <TextField
            fullWidth
            label="Tên thiết bị"
            error={Boolean(errors.EquipmentName)}
            helperText={errors.EquipmentName?.message}
            {...register('EquipmentName', {
              required: 'Vui lòng nhập tên thiết bị.',
              validate: value =>
                value.trim() !== '' ||
                'Vui lòng nhập tên thiết bị.',
              maxLength: {
                value: 100,
                message:
                  'Tên thiết bị không được vượt quá 100 ký tự.'
              }
            })}
          />

          <TextField
            fullWidth
            type="number"
            label="Số lượng"
            error={Boolean(errors.Quantity)}
            helperText={errors.Quantity?.message}
            inputProps={{ min: 1 }}
            {...register('Quantity', {
              required: 'Vui lòng nhập số lượng.',
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'Số lượng phải lớn hơn 0.'
              },
              validate: value =>
                Number.isInteger(value) ||
                'Số lượng phải là số nguyên.'
            })}
          />

         <TextField
            fullWidth
            type="date"
            label="Ngày mua"
            error={Boolean(errors.EquipmentDate)}
            helperText={errors.EquipmentDate?.message}
            slotProps={{ inputLabel: { shrink: true } }}
            {...register('EquipmentDate', {
              required: 'Vui lòng chọn ngày mua.',
              validate: value =>
                new Date(value) <= new Date() ||
                'Ngày mua không được lớn hơn ngày hiện tại.'
            })}
        />

          <TextField
            fullWidth
            type="number"
            label="Đơn giá"
            error={Boolean(errors.Price)}
            helperText={errors.Price?.message}
            inputProps={{ min: 1 }}
            {...register('Price', {
              required: 'Vui lòng nhập đơn giá.',
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'Đơn giá phải lớn hơn 0.'
              },
              validate: value =>
                !Number.isNaN(value) ||
                'Đơn giá phải là số hợp lệ.'
            })}
          />
        </Box>

        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="flex-end"
          sx={{ mt: 4 }}
        >
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            startIcon={<RestartAltOutlined />}
            onClick={() => reset(formEquipmentData)}
            sx={{ textTransform: 'none' }}
          >
            Nhập lại
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveOutlined />}
            sx={{ textTransform: 'none' }}
          >
            Lưu thiết bị
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default EquipmentCreate