
import { Avatar,Box, Button, Divider, Grid, Paper, Stack,TextField,Typography, IconButton } from '@mui/material'
import { 
  CancelOutlined, EditOutlined, HomeOutlined, PersonOutlined, 
  PhoneOutlined, SaveOutlined, WorkOutlineOutlined, AttachMoneyOutlined 
} from '@mui/icons-material'

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'
import { useEffect, useState, useRef } from 'react'
import { fetchUserDetailByIdAPI, updateUserDetailByIdAPI, updatedAvatarAPI } from '../../apis'
import { API_ROOT } from '../../utils/constants'
import { useConfirm } from 'material-ui-confirm'
import { useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { selectCurrentUser } from '../../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { logoutUserAPI } from '../../redux/user/userSlice'


  const ROLES = {
      1: 'Admin',
      2: 'Quản Lý',
      3: 'Thu Ngân',
      4: 'Pha Chế',
      5: 'Phục Vụ'
  }

function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  const [user, setUser] = useState(null)

  const [formData, setFormData] = useState({
    FullName: '',
    Address: '',
    PhoneNumber: ''
  })

  const confirmLogout = useConfirm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

const currentUser = useSelector(selectCurrentUser)
  useEffect( () => {
    // CAll API show user
    const userId = currentUser?.EmployeeId
    if (!userId) return
    fetchUserDetailByIdAPI(userId).then(data => {
      setUser(data)

      // Update User
      setFormData({
      FullName: data?.FullName,
      Address: data?.Address,
      PhoneNumber: data?.PhoneNumber
    })
    })
  },[])


  const handleSubmitUser = async () => {
    await updateUserDetailByIdAPI(
      user.EmployeeId,
      formData
    )
    setUser({...user,...formData })
    setFormData({ ...formData})

    setIsEditing(false)
  }

  const handleLogoutUser = async () => {
    confirmLogout({
      title: 'log out of your account?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then( async () => {
        dispatch(logoutUserAPI())
        navigate('/login')
    }).catch(() => {} )
  }


    const [avatarFile, setAvatarFile] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState('')

    const fileInputRef = useRef(null)

    const handleChooseAvatar = () => {
      fileInputRef.current?.click()
    }

    const handleUploadAvatar = (event) => {
      const file = event.target.files?.[0]

      if (!file) return
  
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }

    const handleSaveAvatar = async () => {
      if (!avatarFile) return
      const formData = new FormData()
      formData.append('avatar', avatarFile)

      const result = await updatedAvatarAPI(user.EmployeeId, formData)
      setUser((prevUser) => ({
        ...prevUser,
        Avatar: result.Avatar
      }))

      setAvatarFile(null)
    }
  

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }))
  }

  const handleEdit = () => {
    setFormData({
      FullName: user?.FullName || '',
      Address: user?.Address || '',
      PhoneNumber: user?.PhoneNumber || '',
    })

    setIsEditing(true)
  }

  const handleCancel = () => {
    setFormData(user)
    setIsEditing(false)
  }

  return (
    <Box>
     <Box
      sx={{
        mb: 3,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}
    >
  {/* Bên trái */}
  <Box>
    <Typography variant="h4" fontWeight={700}>
      Trang cá nhân
    </Typography>

    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
      Xem và cập nhật thông tin tài khoản của bạn.
    </Typography>
  </Box>

  {/* Bên phải */}
  <Button
    color="error"
    variant="outlined"
    onClick={handleLogoutUser}
    startIcon={<LogoutOutlined />}
    sx={{
      textTransform: 'none'
    }}
  >
    Đăng xuất
  </Button>
</Box>
    <Paper
        variant="outlined"
        sx={{
          overflow: 'hidden',
          borderRadius: 3,
        }}
      >
        {/* Phần thông tin tổng quan */}
        <Box
          sx={{
            minHeight: 180,
            p: { xs: 3, md: 4, },
            display: 'flex',
            alignItems: { xs: 'flex-start',  sm: 'center', },
            flexDirection: {  xs: 'column', sm: 'row',},
            gap: 3,
            background:
              'linear-gradient(135deg, rgba(25,118,210,0.14), rgba(255,255,255,0.95))',
          }}
        >
         <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 110,
                  height: 110
                }}
              >
                <Avatar
                  src={avatarPreview ? avatarPreview : `${API_ROOT}${user?.Avatar}`}
                  sx={{
                    width: 110,
                    height: 110,
                    bgcolor: 'primary.main',
                    fontSize: 40,
                    fontWeight: 700
                  }}
                />

                <IconButton
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
                    '&:hover': {
                      bgcolor: 'primary.dark'
                    }
                  }}
                >
                  <PhotoCameraIcon sx={{ fontSize: 18 }} />
                </IconButton>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  hidden
                  onChange={handleUploadAvatar}
                />
              </Box>
              {avatarFile && 
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleSaveAvatar}
                  sx={{
                    minWidth: 110,
                    borderRadius: 2,
                    textTransform: 'none'
                  }}
                  >
                  Lưu ảnh
                </Button>
              }
              
            </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={700}>
              {user?.FullName}
            </Typography>

            <Typography
              color="primary.main"
              fontWeight={600}
              sx={{ mt: 0.5 }}
            >
              {ROLES[user?.RoleId]}
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 1 }}>
              Tài khoản: {user?.Username}
            </Typography>
          </Box>

          {!isEditing && (
            <Button
              variant="contained"
              startIcon={<EditOutlined />}
              onClick={handleEdit}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
              }}
            >
              Chỉnh sửa
            </Button>
          )}
        </Box>

        <Divider />

        {/* Phần thông tin chi tiết */}
        <Box
          sx={{
            p: {
              xs: 2,
              md: 4,
            },
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
            Thông tin cá nhân
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <ProfileField
                editing={isEditing}
                label="Họ và tên"
                name="FullName"
                value={formData?.FullName}
                displayValue={user?.FullName}
                icon={<PersonOutlined />}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ProfileField
                editing={isEditing}
                label="Tên đăng nhập"
                name="username"
                value={formData?.Username}
                displayValue={user?.Username}
                icon={<PersonOutlined />}
                onChange={handleChange}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ProfileField
                editing={isEditing}
                label="Chức vụ"
                name="role"
                value={ROLES[formData?.RoleId]}
                displayValue={ROLES[user?.RoleId]}
                icon={<WorkOutlineOutlined />}
                onChange={handleChange}
                disabled
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ProfileField
                editing={isEditing}
                label="Số điện thoại"
                name="PhoneNumber"
                value={formData?.PhoneNumber}
                displayValue={user?.PhoneNumber}
                icon={<PhoneOutlined />}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <ProfileField
                editing={isEditing}
                label="Địa chỉ"
                name="Address"
                value={formData?.Address}
                displayValue={user?.Address}
                icon={<HomeOutlined />}
                onChange={handleChange}
              />
            </Grid>
             <Grid size={{ xs: 12, md: 6 }}>
                <ProfileField
                    editing={isEditing}
                    label="Mức lương"
                    name="salary"
                    value={formData?.Salary}
                    displayValue={user?.Salary}
                    icon={<AttachMoneyOutlined />}
                    disabled
                />
                </Grid>
          </Grid>

          {isEditing && (
            <Stack
              direction="row"
              spacing={1.5}
              justifyContent="flex-end"
              sx={{ mt: 4 }}
            >
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<CancelOutlined />}
                onClick={handleCancel}
                sx={{ textTransform: 'none' }}
              >
                Hủy
              </Button>

              <Button
                variant="contained"
                startIcon={<SaveOutlined />}
                onClick={handleSubmitUser}
                sx={{ textTransform: 'none' }}
              >
                Lưu thay đổi
              </Button>
            </Stack>
          )}
        </Box>
        
      </Paper>
    </Box>
    
  )
}

function ProfileField({
  editing,
  label,
  name,
  value,
  displayValue,
  icon,
  onChange,
  disabled = false,
  }) 
{
  if (editing) {
    return (
      <TextField
        fullWidth
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    )
  }

  return (
    <Box
      sx={{
        minHeight: 76,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: '#ffffff',
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          flexShrink: 0,
          display: 'grid',
          placeItems: 'center',
          borderRadius: 2,
          bgcolor: 'rgba(25,118,210,0.1)',
          color: 'primary.main',
        }}
      >
        {icon}
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>

        <Typography
          fontWeight={600}
          sx={{
            mt: 0.25,
            wordBreak: 'break-word',
          }}
        >
          {displayValue || 'Chưa cập nhật'}
        </Typography>
      </Box>
    </Box>
  )
}

export default Profile