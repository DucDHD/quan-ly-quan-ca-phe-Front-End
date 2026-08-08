import { useEffect, useState } from 'react'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import SaveOutlined from '@mui/icons-material/SaveOutlined'
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { getEquipmentDetailAPI, updateEquipmentAPI } from '~/apis'

const formEquipmentData = {
  EquipmentName: '',
  EquipmentDate: '',
  Quantity: '',
  Price: ''
}

function EquipmentEdit() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [Equipment, setEquipment] = useState(formEquipmentData)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: formEquipmentData
  })

  useEffect(() => {
    const fetchEquipmentDetail = async () => {
        try {
        const data = await getEquipmentDetailAPI(id)
        console.log('data', data)

        const equipmentData = {
            EquipmentName: data.EquipmentName || '',
            EquipmentDate: data.EquipmentDate?.split('T')[0] || '',
            Quantity: data.Quantity ?? '',
            Price: data.Price ?? ''
        }
        setEquipment(equipmentData)
        reset(equipmentData)
        setLoading(false)
        
        } catch (error) {
        toast.error('Không thể lấy thông tin thiết bị.')
        }
    }
    fetchEquipmentDetail()
  }, [id, reset])

  const handleUpdateEquipment = async (data) => {
    const equipmentData = {
      EquipmentName: data.EquipmentName.trim(),
      EquipmentDate: data.EquipmentDate,
      Quantity: Number(data.Quantity),
      Price: Number(data.Price)
    }

    try {
      await updateEquipmentAPI(id, equipmentData)
      toast.success('Cập nhật thiết bị thành công.')
      navigate('/equipments')
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Cập nhật thiết bị thất bại.')
    }
  }

  const handleResetForm = () => {
    reset(Equipment)
  }

  if (loading) {
    return (
      <Typography color="text.secondary">
        Đang tải thông tin thiết bị...
      </Typography>
    )
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>Cập nhật thiết bị</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Chỉnh sửa thông tin thiết bị.
        </Typography>
      </Box>

      <Paper component="form" variant="outlined" sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' }, gap: 2.5 }}>
          <TextField
            fullWidth
            label="Tên thiết bị"
            error={Boolean(errors.EquipmentName)}
            helperText={errors.EquipmentName?.message}
            {...register('EquipmentName', {
              required: 'Vui lòng nhập tên thiết bị.',
              validate: value => value.trim() !== '' || 'Vui lòng nhập tên thiết bị.',
              maxLength: { value: 100, message: 'Tên thiết bị không được vượt quá 100 ký tự.' }
            })}
          />

          <TextField
            fullWidth
            type="number"
            label="Số lượng"
            error={Boolean(errors.Quantity)}
            helperText={errors.Quantity?.message}
            {...register('Quantity', {
              required: 'Vui lòng nhập số lượng.',
              valueAsNumber: true,
              min: { value: 1, message: 'Số lượng phải lớn hơn 0.' },
              validate: value => Number.isInteger(value) || 'Số lượng phải là số nguyên.'
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
              validate: value => new Date(value) <= new Date() || 'Ngày mua không được lớn hơn ngày hiện tại.'
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
        </Box>

        <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button type="button" variant="outlined" color="inherit" startIcon={<RestartAltOutlined />} onClick={handleResetForm} sx={{ textTransform: 'none' }}>
            Khôi phục
          </Button>

          <Button type="submit" variant="contained" onClick={handleSubmit(handleUpdateEquipment)} startIcon={<SaveOutlined />} sx={{ textTransform: 'none' }}>
            Cập nhật thiết bị
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default EquipmentEdit