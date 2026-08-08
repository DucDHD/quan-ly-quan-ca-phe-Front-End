import {
  Box, IconButton, InputAdornment, Pagination, Paper, Stack, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField, Typography
} from '@mui/material'
import { DeleteOutlineOutlined, EditOutlined, SearchOutlined } from '@mui/icons-material'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useEffect, useState } from 'react'
import { useConfirm } from 'material-ui-confirm'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAllEquipmentAPI, deleteEquipmentAPI } from '~/apis'
import PermissionGuard from '~/components/PermissionGuard/PermissionGuard'
import { PERMISSIONS } from '~/utils/permissions'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { hasPermission } from '~/utils/authorization'
import { useSelector } from 'react-redux'

const sortHeaderStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  fontWeight: 600
}

function EquipmentList() {
  
   const currentUser = useSelector(selectCurrentUser)
  
  const action = (
    hasPermission(currentUser?.RoleId, 'equipments', PERMISSIONS.UPDATE) ||
    hasPermission(currentUser?.RoleId, 'equipments', PERMISSIONS.DELETE)
  )

  const navigate = useNavigate()
  const confirmDelete = useConfirm()

  const [equipments, setEquipments] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState({
    sortBy: 'EquipmentId',
    order: 'asc',
    search: '',
    page: 1,
    limit: 5
  })

  const [pagination, setPagination] = useState({
    totalRows: 0,
    totalPages: 0
  })

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const result = await getAllEquipmentAPI(filters)
        console.log('(result.equipments', result.equipments)
        setEquipments(result.getEquipment  || [])
        setPagination(result.pagination || {})
      } catch (error) {
        console.error(error)
      }
    }

    fetchEquipments()
  }, [filters])

  const handleSearch = () => {
    setFilters(previous => ({ ...previous, search: searchValue.trim()  ,page: 1 }))
  }

  const handleChangePage = (event, value) => {
    setFilters(previous => ({ ...previous, page: value }))
  }

  const handleSort = field => {
    setFilters(previous => ({
      ...previous,
      sortBy: field,
      order: previous.sortBy === field && previous.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  const renderSortIcon = field => {
    if (filters.sortBy !== field) return null

    return filters.order === 'desc'
      ? <KeyboardArrowDownRoundedIcon sx={{ ml: 0.5, fontSize: 18, color: 'primary.main' }} />
      : <KeyboardArrowUpRoundedIcon sx={{ ml: 0.5, fontSize: 18, color: 'primary.main' }} />
  }

  const handleDeleteEquipment = (equipmentId) => {
    confirmDelete({
      title: 'Xóa thiết bị',
      description: 'Bạn có chắc muốn xóa thiết bị này không?',
      confirmationText: 'Xác nhận',
      cancellationText: 'Hủy'
    }).then(async () => {
      await deleteEquipmentAPI(equipmentId)
      setEquipments(previous => previous.filter(equipment => equipment.EquipmentId !== equipmentId))
      toast.success('Xóa thiết bị thành công.')
    })
  }

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Danh sách thiết bị</Typography>
      </Stack>

      <TextField
        fullWidth
        size="small"
        placeholder="Tìm kiếm thiết bị..."
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
        onKeyDown={event => {
          if (event.key === 'Enter') {
            event.preventDefault()
            handleSearch()
          }
        }}
        sx={{ maxWidth: 380, mb: 2 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined fontSize="small" sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }
        }}
      />

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell>
                <Box onClick={() => handleSort('EquipmentId')} sx={sortHeaderStyle}>
                  Mã thiết bị {renderSortIcon('EquipmentId')}
                </Box>
              </TableCell>

              <TableCell>
                <Box onClick={() => handleSort('EquipmentName')} sx={sortHeaderStyle}>
                  Tên thiết bị {renderSortIcon('EquipmentName')}
                </Box>
              </TableCell>

              <TableCell>
                <Box onClick={() => handleSort('PurchaseDate')} sx={sortHeaderStyle}>
                  Ngày mua {renderSortIcon('PurchaseDate')}
                </Box>
              </TableCell>

              <TableCell align="center">
                <Box onClick={() => handleSort('Quantity')} sx={{ ...sortHeaderStyle, width: '100%', justifyContent: 'center' }}>
                  Số lượng {renderSortIcon('Quantity')}
                </Box>
              </TableCell>

              <TableCell align="right">
                <Box onClick={() => handleSort('UnitPrice')} sx={{ ...sortHeaderStyle, width: '100%', justifyContent: 'flex-end' }}>
                  Đơn giá {renderSortIcon('UnitPrice')}
                </Box>
              </TableCell>
              {action && 
                <TableCell align="center">Thao tác</TableCell>
              }
              
            </TableRow>
          </TableHead>

          <TableBody>
            {equipments.map(equipment => (
              <TableRow hover key={equipment.EquipmentId}>
                <TableCell>{equipment.EquipmentId}</TableCell>
                <TableCell>{equipment.EquipmentName}</TableCell>
                <TableCell>{new Date(equipment.EquipmentDate).toLocaleDateString('vi-VN')}</TableCell>
                <TableCell align="center">{equipment.Quantity}</TableCell>
                <TableCell align="right">{Number(equipment.Price).toLocaleString('vi-VN')} đ</TableCell>
                {action && 
                <TableCell align="center">
                  <PermissionGuard resource="equipments" permission={PERMISSIONS.UPDATE}>
                    <IconButton color="primary" onClick={() => navigate(`/equipment/edit/${equipment.EquipmentId}`)}>
                      <EditOutlined />
                    </IconButton>
                   </PermissionGuard>
                   <PermissionGuard resource="equipments" permission={PERMISSIONS.DELETE}>
                    <IconButton color="error" onClick={() => handleDeleteEquipment(equipment.EquipmentId)}>
                      <DeleteOutlineOutlined />
                    </IconButton>
                  </PermissionGuard>
                </TableCell>
                }
                
              </TableRow>
            ))}

            {!equipments.length && (
              <TableRow>
                <TableCell colSpan={7} align="center">Không có dữ liệu thiết bị.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Pagination count={pagination.totalPages} page={filters.page} color="primary" onChange={handleChangePage} />
      </Stack>
    </Paper>
  )
}

export default EquipmentList
