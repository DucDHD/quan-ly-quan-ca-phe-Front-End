import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import {
  AssessmentOutlined,
  BadgeOutlined,
  ExpandLess,
  ExpandMore,
  HomeOutlined,
  InfoOutlined,
  Inventory2Outlined,
  LocalCafeOutlined,
  PeopleOutlined,
  PersonAddOutlined,
  PersonOutlined,
  PointOfSaleOutlined,
  RestaurantMenuOutlined,
  SettingsOutlined,
  StorageOutlined
} from '@mui/icons-material'

import { Box, Button, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'

import PermissionGuard from '~/components/PermissionGuard/PermissionGuard'
import { PERMISSIONS } from '~/utils/permissions'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  //const [employeeOpen, setEmployeeOpen] = useState(location.pathname.startsWith('/employees'))

  const [openMenu, setOpenMenu] = useState(() => {
    if (location.pathname.startsWith('/employees')) return 'employees'
    if (location.pathname.startsWith('/equipments')) return 'equipments'
    if (location.pathname.startsWith('/inventorys')) return 'inventorys'
    return ''
  })

  const menuStyle = {
    mb: 0.5,
    borderRadius: 2,
    minHeight: 46,
    '&.Mui-selected': {
      bgcolor: 'rgba(25, 118, 210, 0.12)',
      color: 'primary.main',
      '& .MuiListItemIcon-root': { color: 'primary.main' }
    },
    '&.Mui-selected:hover': { bgcolor: 'rgba(25, 118, 210, 0.18)' }
  }

  return (
    <Box component="aside" sx={{ width: 280, flexShrink: 0, bgcolor: '#fff', borderRight: '1px solid', borderColor: 'divider', display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, overflow: 'hidden' }}>
      <Box sx={{ px: 2, pt: 2, pb: 1, flexShrink: 0 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={700}>Danh mục quản lý</Typography>
      </Box>

      <List
        sx={{
          px: 1.5,
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': { width: 6 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: '#b0b0b0', borderRadius: 10 },
          '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#8a8a8a' }
        }}
      >
        <ListItemButton selected={location.pathname === '/'} onClick={() => navigate('/')} sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><HomeOutlined /></ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItemButton>

        <ListItemButton selected={location.pathname === '/profile'} onClick={() => navigate('/profile')} sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><PersonOutlined /></ListItemIcon>
          <ListItemText primary="Trang cá nhân" />
        </ListItemButton>

        <ListItemButton selected={location.pathname.startsWith('/employees')} onClick={() => {setOpenMenu(openMenu === 'employees' ? '' : 'employees') }}  sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><BadgeOutlined /></ListItemIcon>
          <ListItemText primary="Quản lý nhân viên" />
          {openMenu === 'employees' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMenu === 'employees'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton selected={location.pathname === '/employees'} onClick={() => navigate('/employees')} sx={{ ...menuStyle, pl: 6 }}>
              <ListItemIcon sx={{ minWidth: 38 }}><PeopleOutlined fontSize="small" /></ListItemIcon>
              <ListItemText primary="Danh sách nhân viên" />
            </ListItemButton>

            <PermissionGuard resource="employees" permission={PERMISSIONS.CREATE}>
              <ListItemButton selected={location.pathname === '/employees/create'} onClick={() => navigate('/employees/create')} sx={{ ...menuStyle, pl: 6 }}>
                <ListItemIcon sx={{ minWidth: 38 }}><PersonAddOutlined fontSize="small" /></ListItemIcon>
                <ListItemText primary="Thêm nhân viên" />
              </ListItemButton>
            </PermissionGuard>
          </List>
        </Collapse>

        <ListItemButton selected={location.pathname.startsWith('/sales')} onClick={() => navigate('/sales')} sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><PointOfSaleOutlined /></ListItemIcon>
          <ListItemText primary="Quản lý bán hàng" />
        </ListItemButton>

       

        <ListItemButton selected={location.pathname.startsWith('/equipments')} onClick={() => {setOpenMenu(openMenu === 'equipments' ? '' : 'equipments') }}  sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><SettingsOutlined /></ListItemIcon>
          <ListItemText primary="Quản lý trang thiết bị" />
          {openMenu === 'equipments' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMenu === 'equipments'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton selected={location.pathname === '/equipments'} onClick={() => navigate('/equipments')} sx={{ ...menuStyle, pl: 6 }}>
              <ListItemIcon sx={{ minWidth: 38 }}><PeopleOutlined fontSize="small" /></ListItemIcon>
              <ListItemText primary="Danh sách thiết bị" />
            </ListItemButton>
            <PermissionGuard resource="equipments" permission={PERMISSIONS.CREATE}>
              <ListItemButton selected={location.pathname === '/equipment/create'} onClick={() => navigate('/equipment/create')} sx={{ ...menuStyle, pl: 6 }}>
                <ListItemIcon sx={{ minWidth: 38 }}><PersonAddOutlined fontSize="small" /></ListItemIcon>
                <ListItemText primary="Thêm Thiết Bị" />
              </ListItemButton>
            </PermissionGuard>
          </List>
        </Collapse>

        <ListItemButton selected={location.pathname.startsWith('/inventorys')}  onClick={() => {setOpenMenu(openMenu === 'inventorys' ? '' : 'inventorys') }} sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><Inventory2Outlined /></ListItemIcon>
          <ListItemText primary="Quản lý kho hàng" />
          {openMenu === 'inventorys' ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

         <Collapse in={openMenu === 'inventorys'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton selected={location.pathname === '/inventorys'} onClick={() => navigate('/inventorys')} sx={{ ...menuStyle, pl: 6 }}>
              <ListItemIcon sx={{ minWidth: 38 }}><PeopleOutlined fontSize="small" /></ListItemIcon>
              <ListItemText primary="Danh sách hàng hóa" />
            </ListItemButton>
            <PermissionGuard resource="inventorys" permission={PERMISSIONS.CREATE}>
              <ListItemButton selected={location.pathname === '/inventory/create'} onClick={() => navigate('/inventory/create')} sx={{ ...menuStyle, pl: 6 }}>
                <ListItemIcon sx={{ minWidth: 38 }}><PersonAddOutlined fontSize="small" /></ListItemIcon>
                <ListItemText primary="Thêm hàng hóa" />
              </ListItemButton>
            </PermissionGuard>
          </List>
        </Collapse>

        <ListItemButton sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><RestaurantMenuOutlined /></ListItemIcon>
          <ListItemText primary="Quản lý thực đơn" />
          
        </ListItemButton>

        <ListItemButton sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><LocalCafeOutlined /></ListItemIcon>
          <ListItemText primary="Quản lý Marketing" />
        </ListItemButton>

        <ListItemButton sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><StorageOutlined /></ListItemIcon>
          <ListItemText primary="Quản lý ngân sách" />
        </ListItemButton>

        <ListItemButton sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><StorageOutlined /></ListItemIcon>
          <ListItemText primary="Quản lý dữ liệu" />
        </ListItemButton>

        <ListItemButton sx={menuStyle}>
          <ListItemIcon sx={{ minWidth: 42 }}><AssessmentOutlined /></ListItemIcon>
          <ListItemText primary="Thống kê, báo cáo" />
        </ListItemButton>
      </List>

      <Divider />

      <Box sx={{ p: 2, flexShrink: 0 }}>
        <Button fullWidth variant="outlined" startIcon={<InfoOutlined />} sx={{ borderRadius: 2, textTransform: 'none' }}>
          Giới thiệu
        </Button>
      </Box>
    </Box>
  )
}

export default Sidebar