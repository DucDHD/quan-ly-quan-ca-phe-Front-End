import { Box, IconButton, Paper, Stack,Table,TableBody, TableCell, TableContainer, TableHead, TableRow,TextField, Typography } from '@mui/material'
import { DeleteOutlineOutlined,EditOutlined, SearchOutlined } from '@mui/icons-material'
import InputAdornment from '@mui/material/InputAdornment'
import { useEffect, useState  } from 'react'
import { getAllUserAPI, deleteUserAPI } from '../../apis'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'

import { useNavigate } from 'react-router-dom'

const ROLES = {
      1: 'Admin',
      2: 'Quản Lý',
      3: 'Thu Ngân',
      4: 'Pha Chế',
      5: 'Phục Vụ'
}

function EmployeeList() {

  const confirmDeleteUser = useConfirm()

  const [users, setUsers] = useState([])

  useEffect( () => {
      // CAll API show all User
      getAllUserAPI().then( employees => {
        setUsers(employees)
      })
  },[])

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
            <TableRow
              sx={{  bgcolor: '#f5f5f5', }} >
              <TableCell>Mã NV</TableCell>
              <TableCell>Họ tên</TableCell>
              <TableCell>Chức vụ</TableCell>
              <TableCell align="right">
                Lương
              </TableCell>
              <TableCell align="center">
                Thao tác
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow
                hover
                key={user.EmployeeId}
              >
                <TableCell>
                  {user.EmployeeId}
                </TableCell>

                <TableCell>
                  {user.FullName}
                </TableCell>

                <TableCell>
                  {ROLES[user?.RoleId]}
                </TableCell>

                <TableCell align="right">
                  {user.Salary.toLocaleString('vi-VN')} đ
                </TableCell>

                <TableCell align="center">
                  <IconButton color="primary">
                    <EditOutlined onClick={() => navigate(`/employees/edit/${user.EmployeeId}`)} />
                  </IconButton>

                  <IconButton color="error" onClick={() => handleDeleteUser(user.EmployeeId)} >
                    <DeleteOutlineOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default EmployeeList