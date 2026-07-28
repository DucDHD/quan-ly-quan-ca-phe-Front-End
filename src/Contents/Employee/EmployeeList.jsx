import { Box, IconButton, Paper, Stack,Table,TableBody, TableCell, TableContainer, TableHead, TableRow,TextField, Typography } from '@mui/material'
import { DeleteOutlineOutlined,EditOutlined, SearchOutlined } from '@mui/icons-material'
import InputAdornment from '@mui/material/InputAdornment'
import { useEffect, useState  } from 'react'
import { getAllUserAPI, deleteUserAPI } from '../../apis'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'
import  { ROLES } from '~/utils/roles'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'

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

function EmployeeList() {


  const currentUser = useSelector(selectCurrentUser)

 const action = (
  hasPermission(currentUser?.RoleId, PERMISSIONS.EMPLOYEE_UPDATE) ||
  hasPermission(currentUser?.RoleId, PERMISSIONS.EMPLOYEE_DELETE)
)



  const [filters, setFilters] = useState({
    sortBy: 'EmployeeId',
    order: 'asc',
    search: '',
    page: 1,
    limit: 5,
  })

  /** Xử lý phân trang */
  const [pagination, setPagination] = useState({
    totalRows: 0,
    totalPages: 0
  })
  
 
  const handleChangePage = (event,value ) => {
    setFilters(prev => ({
      ...prev,
      page: value
    }))
  }



  /** Xử lý search */
  const [searchValue, setSearchValue] = useState('')

  const handleSearch = () => {
    setFilters(previous => ({
      ...previous,
      search: searchValue.trim(),
      page: 1
    }))
  }

  /** Xử lý Sort */
 const handleSort = field => {
    setFilters(previous => ({
      ...previous,
      sortBy: field,
      order: previous.sortBy === field && previous.order === 'asc' ? 'desc' : 'asc'
    }))
  }

  const renderSortIcon = (field) => {

    const active = filters.sortBy === field

    if (filters.sortBy !== field) return null

    if (active && filters.order === 'desc') {
      return (<KeyboardArrowDownRoundedIcon sx={{ ml: 0.5, fontSize: 18, color: 'primary.main' }}/> )
    }
     return ( <KeyboardArrowUpRoundedIcon sx={{ ml: 0.5,fontSize: 18,  color: active ? 'primary.main' : 'text.disabled' }} />)
  }


    /** Lấy Danh sách nhân viên */
  const confirmDeleteUser = useConfirm()
  const [users, setUsers] = useState([])




 useEffect(() => {
    const fetchUsers = async () => {
      try {
        const result = await getAllUserAPI(filters)

        setUsers(result.users || [])
        setPagination(result.pagination)
      } catch (error) { console.error(error)}
    }

    fetchUsers()
  }, [filters])

  /** Xóa Nhân viên */
  const navigate = useNavigate()
  const handleDeleteUser = (userId) => {
    confirmDeleteUser({
      description: 'This action will permanently delete Employee Are you sure?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then( async () => {
      await deleteUserAPI(userId)
      toast.success('Employee deleted successfully.')
      
      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user.EmployeeId !== userId
        )
      )
    })
  }

  return (
    <Paper sx={{p: 3, borderRadius: 3 }}  >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Danh sách nhân viên
          </Typography>
        </Box>

      </Stack>

      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Tìm kiếm nhân viên..."
        value={searchValue}
        onChange={event => {setSearchValue(event.target.value) }}
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
                <SearchOutlined
                  fontSize="small"
                  sx={{ color: 'text.secondary' }}
                />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell>
                <Box onClick={() => handleSort('EmployeeId')} sx={sortHeaderStyle}>
                  Mã NV
                  {renderSortIcon('EmployeeId')}
                </Box>
              </TableCell>

              <TableCell>
                <Box onClick={() => handleSort('FullName')} sx={sortHeaderStyle} >
                  Họ tên
                  {renderSortIcon('FullName')}
                </Box>
              </TableCell>

              <TableCell>
                <Box onClick={() => handleSort('RoleId')} sx={sortHeaderStyle}  >
                  Chức vụ
                  {renderSortIcon('RoleId')}
                </Box>
              </TableCell>

              <TableCell align="right">
                <Box onClick={() => handleSort('Salary')}
                  sx={{
                    ...sortHeaderStyle,
                    width: '100%',
                    justifyContent: 'flex-end'
                  }}
                >
                  Lương
                  {renderSortIcon('Salary')}
                </Box>
              </TableCell>
              {action && 
              <TableCell align="center">
                Thao tác
              </TableCell>
              }
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow hover  key={user.EmployeeId} >
                <TableCell>
                  {user.EmployeeId}
                </TableCell>
                <TableCell>
                  {user.FullName}
                </TableCell>
                <TableCell>
                  { ROLES.find( role => role.RoleId === Number(user?.RoleId) )?.RoleName}
                </TableCell>
                <TableCell align="right">
                  {user.Salary.toLocaleString('vi-VN')} đ
                </TableCell>
                {action &&
                <TableCell align="center">
                  <PermissionGuard permission={PERMISSIONS.EMPLOYEE_UPDATE}>
                    <IconButton color="primary">
                      <EditOutlined onClick={() => navigate(`/employees/edit/${user.EmployeeId}`)} />
                    </IconButton>
                  </PermissionGuard>
                  <PermissionGuard permission={PERMISSIONS.EMPLOYEE_DELETE}>
                  <IconButton color="error" onClick={() => handleDeleteUser(user.EmployeeId)} >                  
                      <DeleteOutlineOutlined />
                    </IconButton>
                  </PermissionGuard>
                </TableCell>
                }
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}  >
        <Pagination
          count={pagination.totalPages}
          page={filters.page}
          color="primary"
          onChange={handleChangePage}
        />
      </Stack>
    </Paper>
  )
}

export default EmployeeList