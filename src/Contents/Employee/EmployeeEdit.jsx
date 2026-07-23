import { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import SaveOutlined from '@mui/icons-material/SaveOutlined'
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined'
import { fetchUserDetailByIdAPI, updateUserAPI } from '../../apis'

import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

const ROLES = [
  { RoleId: 1, RoleName: 'Admin' },
  { RoleId: 2, RoleName: 'Quản Lý' },
  { RoleId: 3, RoleName: 'Thu ngân' },
  { RoleId: 4, RoleName: 'Pha Chế' },
  { RoleId: 5, RoleName: 'Phục vụ' }
]

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

    const [formUser, setFormUser] = useState(formUserData)
    const [initialUser, setInitialUser] = useState(formUserData)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)


    useEffect( () => {
        // CAll API show user
        fetchUserDetailByIdAPI(id).then(data => {
        setFormUser(data)
        setInitialUser(data)
        setLoading(false)
        }).catch(() => {
          // Không cần làm gì.
          // authorizeAxios đã xử lý logout hoặc refresh token.
        })
    },[id])


  const handleChange = (event) => {
    const { name, value } = event.target

    setFormUser((previousData) => ({
      ...previousData,
      [name]: value
    }))

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: ''
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formUser.FullName.trim()) {
      newErrors.FullName = 'Vui lòng nhập họ và tên.'
    }

    if (!formUser.RoleId) {
      newErrors.RoleId = 'Vui lòng chọn chức vụ.'
    }

    if (!formUser.Username.trim()) {
      newErrors.Username = 'Vui lòng nhập tên đăng nhập.'
    }

    if (!formUser.PhoneNumber.trim()) {
      newErrors.PhoneNumber = 'Vui lòng nhập số điện thoại.'
    } else if (!/^[0-9]{9,11}$/.test(formUser.PhoneNumber.trim())) {
      newErrors.PhoneNumber = 'Số điện thoại không hợp lệ.'
    }

    if (formUser.Salary === '') {
      newErrors.Salary = 'Vui lòng nhập lương.'
    } else if (Number(formUser.Salary) < 0) {
      newErrors.Salary = 'Lương không được nhỏ hơn 0.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) return

      const employeeData = {
        RoleId: Number(formUser.RoleId),
        Username: formUser.Username.trim(),
        FullName: formUser.FullName.trim(),
        Address: formUser.Address.trim(),
        PhoneNumber: formUser.PhoneNumber.trim(),
        Salary: Number(formUser.Salary)
      }

      await updateUserAPI(id, employeeData)

      toast.success('Employee updated successfully.')

      navigate('/employees')
  }

  const handleReset = () => {
    setFormUser(initialUser)
    setErrors({})
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
        onSubmit={handleSubmit}
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
              required
              label="Họ và tên"
              name="FullName"
              value={formUser.FullName}
              onChange={handleChange}
              error={Boolean(errors.FullName)}
              helperText={errors.FullName}
            />

            <FormControl
              fullWidth
              required
              error={Boolean(errors.RoleId)}
            >
              <InputLabel id="role-label">Chức vụ</InputLabel>

              <Select
                labelId="role-label"
                label="Chức vụ"
                name="RoleId"
                value={formUser.RoleId}
                onChange={handleChange}
              >
                {ROLES.map((role) => (
                  <MenuItem
                    key={role.RoleId}
                    value={role.RoleId}
                  >
                    {role.RoleName}
                  </MenuItem>
                ))}
              </Select>

              {errors.RoleId && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ ml: 1.75, mt: 0.5 }}
                >
                  {errors.RoleId}
                </Typography>
              )}
            </FormControl>

            <TextField
              fullWidth
              required
              label="Tên đăng nhập"
              name="Username"
              value={formUser.Username}
              onChange={handleChange}
              error={Boolean(errors.Username)}
              helperText={errors.Username}
            />

            <TextField
              fullWidth
              required
              label="Số điện thoại"
              name="PhoneNumber"
              value={formUser.PhoneNumber}
              onChange={handleChange}
              error={Boolean(errors.PhoneNumber)}
              helperText={errors.PhoneNumber}
              inputProps={{
                maxLength: 11
              }}
            />

            <TextField
              fullWidth
              required
              type="number"
              label="Lương"
              name="Salary"
              value={formUser.Salary}
              onChange={handleChange}
              error={Boolean(errors.Salary)}
              helperText={errors.Salary}
              inputProps={{
                min: 0
              }}
            />

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Địa chỉ"
              name="Address"
              value={formUser.Address}
              onChange={handleChange}
              sx={{
                gridColumn: {
                  xs: 'auto',
                  md: '1 / -1'
                }
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
            onClick={handleReset}
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