import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import CoffeeOutlined from '@mui/icons-material/CoffeeOutlined'
import LoginOutlined from '@mui/icons-material/LoginOutlined'
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import { Box, Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material'

import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { loginUserAPI } from '~/redux/user/userSlice'

const loginDefaultValues = {
  Username: '',
  Password: '',
  rememberMe: false
}

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({
    defaultValues: loginDefaultValues
  })

  const handleLogin = async data => {
    const loginData = {
      Username: data.Username.trim(),
      Password: data.Password
    }

    const result = await dispatch(loginUserAPI(loginData))

    if (loginUserAPI.fulfilled.match(result)) {
      navigate('/')
      return
    }

    setError('LoginError', {
      type: 'server',
      message: 'Tên đăng nhập hoặc mật khẩu không đúng.'
    })
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: '#eef2f5', p: 2 }}>
      <Paper elevation={8} sx={{ width: '100%', maxWidth: 440, p: { xs: 3, sm: 4 }, borderRadius: 4 }}>
        <Stack alignItems="center" spacing={1} sx={{ mb: 4 }}>
          <Box sx={{ width: 64, height: 64, display: 'grid', placeItems: 'center', borderRadius: 3, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <CoffeeOutlined sx={{ fontSize: 38 }} />
          </Box>

          <Typography variant="h4" fontWeight={700} textAlign="center">Đăng nhập</Typography>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Phần mềm quản lý quán cà phê Bonsai Coffee
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit(handleLogin)}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              autoFocus
              label="Tên đăng nhập"
              error={Boolean(errors.Username)}
              helperText={errors.Username?.message}
              {...register('Username', {
                required: 'Vui lòng nhập tên đăng nhập.',
                onChange: () => clearErrors('LoginError')
              })}
            />

            <TextField
              fullWidth
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              error={Boolean(errors.Password)}
              helperText={errors.Password?.message}
              {...register('Password', {
                required: 'Vui lòng nhập mật khẩu.',
                onChange: () => clearErrors('LoginError')
              })}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="button" edge="end" onClick={() => setShowPassword(previous => !previous)}>
                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
            />

            <FieldErrorAlert errors={errors} fieldName="LoginError" />

            <FormControlLabel control={<Checkbox {...register('rememberMe')} />} label="Ghi nhớ đăng nhập" />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              startIcon={<LoginOutlined />}
              disabled={isSubmitting}
              sx={{ py: 1.25, textTransform: 'none', borderRadius: 2, fontWeight: 700 }}
            >
              Đăng nhập
            </Button>
          </Stack>
        </Box>

        <Typography variant="caption" color="text.secondary" display="block" textAlign="center" sx={{ mt: 3 }}>
          Tài khoản demo: admin / 12345678A
        </Typography>
      </Paper>
    </Box>
  )
}

export default Login