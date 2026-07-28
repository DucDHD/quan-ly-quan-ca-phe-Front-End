import { Avatar, Box, Button, Divider,Grid, IconButton,Paper,Stack, TextField, Typography } from '@mui/material'
import {
  AttachMoneyOutlined,
  CancelOutlined,
  EditOutlined,
  HomeOutlined,
  PersonOutlined,
  PhoneOutlined,
  SaveOutlined,
  WorkOutlineOutlined
} from '@mui/icons-material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useConfirm } from 'material-ui-confirm'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUserDetailByIdAPI,
  updatedAvatarAPI,
  updateUserDetailByIdAPI
} from '~/apis'
import { API_ROOT } from '~/utils/constants'
import { ROLES } from '~/utils/roles'
import { logoutUserAPI,selectCurrentUser } from '~/redux/user/userSlice'

const profileDefaultValues = {
  FullName: '',
  Address: '',
  PhoneNumber: ''
}


function Profile() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const confirmLogout = useConfirm()

  const currentUser = useSelector(selectCurrentUser)

  const [user, setUser] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState('')

  const fileInputRef = useRef(null)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: profileDefaultValues
  })

  useEffect(() => {
    const userId = currentUser?.EmployeeId

    if (!userId) return

    fetchUserDetailByIdAPI(userId)
      .then(data => {
        setUser(data)

        reset({
          FullName: data?.FullName || '',
          Address: data?.Address || '',
          PhoneNumber: data?.PhoneNumber || ''
        })
      })
      .catch(error => {
        // 401 đã được interceptor xử lý logout
        if (error?.response?.status === 401) return

        console.error(error)
      })
  }, [currentUser?.EmployeeId, reset])

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    }
  }, [avatarPreview])

  const getRoleName = roleId => ROLES.find(role => role.RoleId === Number(roleId))?.RoleName || 'Chưa cập nhật'

  const handleEdit = () => {
    reset({
      FullName: user?.FullName || '',
      Address: user?.Address || '',
      PhoneNumber: user?.PhoneNumber || ''
    })

    setIsEditing(true)
  }

  const handleCancel = () => {
    reset({
      FullName: user?.FullName || '',
      Address: user?.Address || '',
      PhoneNumber: user?.PhoneNumber || ''
    })

    setIsEditing(false)
  }

  const handleSubmitUser = async data => {
    const updatedData = {
      FullName: data.FullName.trim(),
      Address: data.Address.trim(),
      PhoneNumber: data.PhoneNumber.trim()
    }

    await updateUserDetailByIdAPI(user.EmployeeId, updatedData)

    setUser(previousUser => ({
      ...previousUser,
      ...updatedData
    }))

    reset(updatedData)
    setIsEditing(false)
  }

  const handleLogoutUser = () => {
    confirmLogout({
      title: 'Đăng xuất khỏi tài khoản?',
      confirmationText: 'Xác nhận',
      cancellationText: 'Hủy'
    })
      .then(() => {
        dispatch(logoutUserAPI())
        // navigate('/login')
      })
      .catch(() => {})
  }

  const handleChooseAvatar = () => fileInputRef.current?.click()

  const handleUploadAvatar = event => {
    const file = event.target.files?.[0]

    if (!file) return
    if (avatarPreview) URL.revokeObjectURL(avatarPreview)

    setAvatarFile(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSaveAvatar = async () => {
    if (!avatarFile || !user?.EmployeeId) return

    const avatarFormData = new FormData()
    avatarFormData.append('avatar', avatarFile)

    const result = await updatedAvatarAPI(user.EmployeeId, avatarFormData)

    setUser(previousUser => ({
      ...previousUser,
      Avatar: result.Avatar
    }))

    setAvatarFile(null)

    if (avatarPreview) URL.revokeObjectURL(avatarPreview)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Trang cá nhân</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>Xem và cập nhật thông tin tài khoản của bạn.</Typography>
        </Box>

        <Button color="error" variant="outlined" onClick={handleLogoutUser} startIcon={<LogoutOutlined />} sx={{ textTransform: 'none' }}>
          Đăng xuất
        </Button>
      </Box>

      <Paper component="form" onSubmit={handleSubmit(handleSubmitUser)} variant="outlined" noValidate sx={{ overflow: 'hidden', borderRadius: 3 }}>
        <Box
          sx={{
            minHeight: 180,
            p: { xs: 3, md: 4 },
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
            background: 'linear-gradient(135deg, rgba(25,118,210,0.14), rgba(255,255,255,0.95))'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ position: 'relative', width: 110, height: 110 }}>
              <Avatar
                src={avatarPreview || (user?.Avatar ? `${API_ROOT}${user.Avatar}` : '')}
                sx={{ width: 110, height: 110, bgcolor: 'primary.main', fontSize: 40, fontWeight: 700 }}
              />

              <IconButton
                type="button"
                onClick={handleChooseAvatar}
                sx={{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: 34,
                  height: 34,
                  bgcolor: 'primary.main',
                  color: 'white',
                  border: '3px solid white',
                  '&:hover': { bgcolor: 'primary.dark' }
                }}
              >
                <PhotoCameraIcon sx={{ fontSize: 18 }} />
              </IconButton>

              <input ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/webp" hidden onChange={handleUploadAvatar} />
            </Box>

            {avatarFile && (
              <Button type="button" variant="contained" size="small" onClick={handleSaveAvatar} sx={{ minWidth: 110, borderRadius: 2, textTransform: 'none' }}>
                Lưu ảnh
              </Button>
            )}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={700}>{user?.FullName || 'Chưa cập nhật'}</Typography>
            <Typography color="primary.main" fontWeight={600} sx={{ mt: 0.5 }}>{getRoleName(user?.RoleId)}</Typography>
            <Typography color="text.secondary" sx={{ mt: 1 }}>Tài khoản: {user?.Username || 'Chưa cập nhật'}</Typography>
          </Box>

          {!isEditing && (
            <Button type="button" variant="contained" startIcon={<EditOutlined />} onClick={handleEdit} sx={{ textTransform: 'none', borderRadius: 2 }}>
              Chỉnh sửa
            </Button>
          )}
        </Box>

        <Divider />

        <Box sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>Thông tin cá nhân</Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Họ và tên"
                  error={Boolean(errors.FullName)}
                  helperText={errors.FullName?.message}
                  {...register('FullName', {
                    required: 'Vui lòng nhập họ và tên.',
                    validate: value => value.trim() !== '' || 'Vui lòng nhập họ và tên.',
                    maxLength: { value: 100, message: 'Họ và tên không được vượt quá 100 ký tự.' }
                  })}
                />
              ) : (
                <ProfileField label="Họ và tên" displayValue={user?.FullName} icon={<PersonOutlined />} />
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {isEditing ? (
                <TextField fullWidth disabled label="Tên đăng nhập" value={user?.Username || ''} />
              ) : (
                <ProfileField label="Tên đăng nhập" displayValue={user?.Username} icon={<PersonOutlined />} />
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {isEditing ? (
                <TextField fullWidth disabled label="Chức vụ" value={getRoleName(user?.RoleId)} />
              ) : (
                <ProfileField label="Chức vụ" displayValue={getRoleName(user?.RoleId)} icon={<WorkOutlineOutlined />} />
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  error={Boolean(errors.PhoneNumber)}
                  helperText={errors.PhoneNumber?.message}
                  inputProps={{ maxLength: 11 }}
                  {...register('PhoneNumber', {
                    required: 'Vui lòng nhập số điện thoại.',
                    pattern: {
                      value: /^[0-9]{9,11}$/,
                      message: 'Số điện thoại phải gồm từ 9 đến 11 chữ số.'
                    }
                  })}
                />
              ) : (
                <ProfileField label="Số điện thoại" displayValue={user?.PhoneNumber} icon={<PhoneOutlined />} />
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {isEditing ? (
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  error={Boolean(errors.Address)}
                  helperText={errors.Address?.message}
                  {...register('Address', {
                    required: 'Vui lòng nhập địa chỉ.',
                    validate: value => value.trim() !== '' || 'Vui lòng nhập địa chỉ.',
                    maxLength: { value: 255, message: 'Địa chỉ không được vượt quá 255 ký tự.' }
                  })}
                />
              ) : (
                <ProfileField label="Địa chỉ" displayValue={user?.Address} icon={<HomeOutlined />} />
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {isEditing ? (
                <TextField fullWidth disabled label="Mức lương" value={user?.Salary ?? ''} />
              ) : (
                <ProfileField label="Mức lương" displayValue={user?.Salary} icon={<AttachMoneyOutlined />} />
              )}
            </Grid>
          </Grid>

          {isEditing && (
            <Stack direction="row" spacing={1.5} justifyContent="flex-end" sx={{ mt: 4 }}>
              <Button type="button" variant="outlined" color="inherit" startIcon={<CancelOutlined />} onClick={handleCancel} disabled={isSubmitting} sx={{ textTransform: 'none' }}>
                Hủy
              </Button>

              <Button type="submit" variant="contained" startIcon={<SaveOutlined />} disabled={isSubmitting} sx={{ textTransform: 'none' }}>
                {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
              </Button>
            </Stack>
          )}
        </Box>
      </Paper>
    </Box>
  )
}


function ProfileField({ label, displayValue, icon }) {
  return (
    <Box sx={{ minHeight: 76, display: 'flex', alignItems: 'center', gap: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, bgcolor: '#fff' }}>
      <Box sx={{ width: 42, height: 42, flexShrink: 0, display: 'grid', placeItems: 'center', borderRadius: 2, bgcolor: 'rgba(25,118,210,0.1)', color: 'primary.main' }}>
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary">{label}</Typography>
        <Typography fontWeight={600} sx={{ mt: 0.25, wordBreak: 'break-word' }}>
          {displayValue || 'Chưa cập nhật'}
        </Typography>
      </Box>
    </Box>
  )
}

export default Profile