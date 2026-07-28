

import { Box,Button, FormControl,InputLabel,MenuItem, Paper, Select, Stack,TextField,Typography, FormHelperText } from '@mui/material'

import SaveOutlined from '@mui/icons-material/SaveOutlined'
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined'
import { createdUserAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import  { ROLES } from '~/utils/roles'


const formUserData = {
  RoleId: '',
  Username: '',
  Password: '',
  FullName: '',
  Address: '',
  PhoneNumber: '',
  Salary: ''
}

function EmployeeCreate() {
  const { register, control, handleSubmit, setError, formState: { errors }, watch } = useForm({defaultValues: formUserData})

  const navigate = useNavigate()

 
  const handleCreateEmployee = async (data) => {
    const employeeData = {
      RoleId: Number(data.RoleId),
      Username: data.Username.trim(),
      Password: data.Password,
      FullName: data.FullName.trim(),
      Address: data.Address.trim(),
      PhoneNumber: data.PhoneNumber.trim(),
      Salary: Number(data.Salary),
    }

    await createdUserAPI(employeeData).then( () => {
        toast.success('Employee created successfully.')
        navigate('/employees')
    }).catch( error  => {
      const statusCode = error?.response?.status
      //const message = error?.response?.data?.message

      if ( statusCode === 409 ) {
         setError('Username', {type: 'server',   message: 'Tên đăng nhập đã tồn tại.'})
        return
      }
    })
  }

  const handleReset = () => {
    setFormUser(formUserData)
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          Thêm nhân viên
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Nhập đầy đủ thông tin để tạo tài khoản nhân viên mới.
        </Typography>
      </Box>

      <Paper
        component="form"
        onSubmit={handleSubmit(handleCreateEmployee)}
        variant="outlined"
        sx={{ p: {  xs: 2,  md: 4, }, borderRadius: 3 }} >
        <Stack  direction={{ xs: 'column',  md: 'row',}} spacing={4} alignItems="flex-start" >
          <Box
            sx={{
              flex: 1,
              width: '100%',
              display: 'grid',
              gridTemplateColumns: {  xs: '1fr',  md: 'repeat(2, minmax(0, 1fr))' },
              gap: 2.5,
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
                  value.trim() !== '' || 'Vui lòng nhập họ và tên.'
              })}
            />

             <Controller  name="RoleId" control={control}rules={{  required: 'Vui lòng chọn chức vụ.' }} render={({ field }) => (
                  <FormControl fullWidth  error={Boolean(errors.RoleId)} >
                    <InputLabel id="role-label">
                      Chức vụ
                    </InputLabel>
                    <Select  {...field}   labelId="role-label"  label="Chức vụ">
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
                      {errors.RoleId?.message}
                    </FormHelperText>
                  </FormControl>
                )}
              />

           <TextField
            fullWidth
            label="Tên đăng nhập"
            error={Boolean(errors.Username)}
            helperText={errors.Username?.message}
            {...register('Username', {
              required: 'Vui lòng nhập tên đăng nhập.',
              minLength: {
                value: 4,
                message: 'Tên đăng nhập phải có ít nhất 4 ký tự.'
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: 'Tên đăng nhập chỉ được chứa chữ, số và dấu gạch dưới.'
              }
            })}
          />

            <TextField
              fullWidth
              type="password"
              label="Mật khẩu"
              error={Boolean(errors.Password)}
              helperText={errors.Password?.message}
              {...register('Password', {
                required: 'Vui lòng nhập mật khẩu.',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự.'
                }
              })}
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
                  message: 'Số điện thoại không hợp lệ.'
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
                    message:
                      'Lương không được nhỏ hơn 0.'
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
              })}
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
            onClick={handleReset}
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
            Lưu nhân viên
          </Button>
        </Stack>
      </Paper>
    </Box>
  )
}

export default EmployeeCreate