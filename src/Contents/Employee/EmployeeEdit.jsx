import { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography, FormHelperText } from '@mui/material'
import SaveOutlined from '@mui/icons-material/SaveOutlined'
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined'
import { fetchUserDetailByIdAPI, updateUserAPI } from '../../apis'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import  { ROLES } from '../../utils/roles'
import PermissionGuard from '../../components/PermissionGuard/PermissionGuard'
import { PERMISSIONS } from '../../utils/permissions'

const formUserData = {
  RoleId: '',
  Username: '',
  Password: '',
  FullName: '',
  Address: '',
  PhoneNumber: '',
  Salary: ''
}

function EmployeeEdit() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [initialUser, setInitialUser] = useState(formUserData)

    const {register, control, handleSubmit, reset,  setError, formState: { errors,  isSubmitting } 
  } = useForm({
    defaultValues: formUserData
  })


  useEffect(() => {
    fetchUserDetailByIdAPI(id)
      .then(data => {
        const employeeData = {
          RoleId: data?.RoleId ?? '',
          FullName: data?.FullName || '',
          Address: data?.Address || '',
          PhoneNumber: data?.PhoneNumber || '',
          Salary: data?.Salary ?? ''
        }

        setInitialUser(employeeData)
        reset(employeeData)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id, reset])


  
  const handleUpdateEmployee  = async (data) => {
    
    const employeeData = {
      RoleId: Number(data.RoleId),
      FullName: data.FullName.trim(),
      Address: data.Address.trim(),
      PhoneNumber: data.PhoneNumber.trim(),
      Salary: Number(data.Salary)
    }

      await updateUserAPI(id, employeeData)
      toast.success('Employee updated successfully.')
      navigate('/employees')
  }

  const handleResetForm = () => {
    reset(initialUser)
  }

  if (loading) {
    return (
      <Typography color="text.secondary">
        Đang tải thông tin nhân viên...
      </Typography>
    )
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Cập nhật nhân viên
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Chỉnh sửa thông tin tài khoản nhân viên.
        </Typography>
      </Box>

      <Paper
        component="form"
        onSubmit={handleSubmit(handleUpdateEmployee)}
        variant="outlined"
        sx={{ p: { xs: 2,md: 4 }, borderRadius: 3 }} >
        <Stack
          direction={{ xs: 'column',md: 'row' }}
          spacing={4}
          alignItems="flex-start"
        >
          <Box
            sx={{ 
                flex: 1, width: '100%', display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
                gap: 2.5
            }}
          >
             <TextField
                fullWidth
                label="Họ và tên"
                error={Boolean(errors.FullName)}
                helperText={errors.FullName?.message}
                {...register('FullName', {
                  required: 'Vui lòng nhập họ và tên.',
                  validate: value =>
                    value.trim() !== '' ||
                    'Vui lòng nhập họ và tên.',
                  maxLength: {
                    value: 100,
                    message:
                      'Họ và tên không được vượt quá 100 ký tự.'
                  }
                })}
            />

            <Controller
              name="RoleId"
              control={control}
              rules={{
                required: 'Vui lòng chọn chức vụ.'
              }}
              render={({ field, fieldState: { error } }) => (
                <FormControl
                  fullWidth
                  error={Boolean(error)}
                >
                  <InputLabel id="role-label">
                    Chức vụ
                  </InputLabel>

                  <Select
                    {...field}
                    labelId="role-label"
                    label="Chức vụ"
                  >
                    {ROLES.map(role => (
                      <MenuItem
                        key={role.RoleId}
                        value={role.RoleId}
                      >
                        {role.RoleName}
                      </MenuItem>
                    ))}
                  </Select>

                  <FormHelperText>
                    {error?.message}
                  </FormHelperText>
                </FormControl>
              )}
            />

        
            <TextField
              fullWidth
              label="Số điện thoại"
              error={Boolean(errors.PhoneNumber)}
              helperText={errors.PhoneNumber?.message}
              inputProps={{
                maxLength: 11
              }}
              {...register('PhoneNumber', {
                required: 'Vui lòng nhập số điện thoại.',
                pattern: {
                  value: /^[0-9]{9,11}$/,
                  message:
                    'Số điện thoại phải gồm từ 9 đến 11 chữ số.'
                }
              })}
            />

            <TextField
              fullWidth
              type="number"
              label="Lương"
              error={Boolean(errors.Salary)}
              helperText={errors.Salary?.message}
              inputProps={{
                min: 0
              }}
              {...register('Salary', {
                required: 'Vui lòng nhập lương.',
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: 'Lương không được nhỏ hơn 0.'
                },
                validate: value =>
                  !Number.isNaN(value) ||
                  'Lương phải là một số hợp lệ.'
              })}
            />

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Địa chỉ"
              error={Boolean(errors.Address)}
              helperText={errors.Address?.message}
              {...register('Address', {
                required: 'Vui lòng nhập địa chỉ.',
                validate: value =>
                  value.trim() !== '' ||'Vui lòng nhập địa chỉ.',
                maxLength: {
                  value: 255,
                  message:
                    'Địa chỉ không được vượt quá 255 ký tự.'
                }
              })}
              sx={{
                gridColumn: {  xs: 'auto',  md: '1 / -1'}
              }}
            />
          </Box>
        </Stack>

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
            onClick={handleResetForm}
            sx={{ textTransform: 'none' }}
          >
            Khôi phục
          </Button>

          <Button
            type="submit"
            variant="contained"
            startIcon={<SaveOutlined />}
            sx={{ textTransform: 'none' }}
          >
            Cập nhật nhân viên
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default EmployeeEdit