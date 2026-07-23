import { useState } from 'react'

import { Alert,Box,Button, Checkbox, FormControlLabel, IconButton, InputAdornment, Paper,Stack, TextField, Typography } from '@mui/material'

import CoffeeOutlined from '@mui/icons-material/CoffeeOutlined'
import LoginOutlined from '@mui/icons-material/LoginOutlined'
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined'
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined'
import VisibilityOutlined from '@mui/icons-material/VisibilityOutlined'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUserAPI } from '~/redux/user/userSlice'

function Login() {
  

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    rememberMe: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === 'checkbox' ? checked : value,
    }))

    setErrorMessage('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    if (!formData.Username.trim()) {
      setErrorMessage('Vui lòng nhập tên đăng nhập.')
      return
    }

    if (!formData.Password.trim()) {
      setErrorMessage('Vui lòng nhập mật khẩu.')
      return
    }
    
    const loginData = {
      Username: formData.Username.trim(),
      Password: formData.Password
    }
    dispatch(loginUserAPI(loginData))
    setErrorMessage('Tên đăng nhập hoặc mật khẩu không chính xác.')
    navigate('/')
    
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        bgcolor: '#eef2f5',
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: '100%',
          maxWidth: 440,
          p: {
            xs: 3,
            sm: 4,
          },
          borderRadius: 4,
        }}
      >
        <Stack
          alignItems="center"
          spacing={1}
          sx={{ mb: 4 }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 3,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <CoffeeOutlined sx={{ fontSize: 38 }} />
          </Box>

          <Typography
            variant="h4"
            fontWeight={700}
            textAlign="center"
          >
            Đăng nhập
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
          >
            Phần mềm quản lý quán cà phê Bonsai Coffee
          </Typography>
        </Stack>

        {errorMessage && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {errorMessage}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleLogin}
        >
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              autoFocus
              label="Tên đăng nhập"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlined color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Mật khẩu"
              name="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.Password}
              onChange={handleChange}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        edge="end"
                        onClick={() =>
                          setShowPassword((previous) => !previous)
                        }
                        aria-label={
                          showPassword
                            ? 'Ẩn mật khẩu'
                            : 'Hiện mật khẩu'
                        }
                      >
                        {showPassword ? (
                          <VisibilityOffOutlined />
                        ) : (
                          <VisibilityOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
              }
              label="Ghi nhớ đăng nhập"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              startIcon={<LoginOutlined />}
              sx={{
                py: 1.25,
                textTransform: 'none',
                borderRadius: 2,
                fontWeight: 700,
              }}
            >
              Đăng nhập
            </Button>
          </Stack>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          textAlign="center"
          sx={{ mt: 3 }}
        >
          Tài khoản demo: admin / 123456
        </Typography>
      </Paper>
    </Box>
  )
}

export default Login