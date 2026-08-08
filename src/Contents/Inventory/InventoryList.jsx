import { Box, IconButton, InputAdornment, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material'
import { EditOutlined, SearchOutlined } from '@mui/icons-material'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const sortHeaderStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  fontWeight: 600
}

function InventoryList() {
  const navigate = useNavigate()

  const [inventory, setInventory] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filters, setFilters] = useState({ sortBy: 'InventoryId', order: 'asc', search: '', page: 1, limit: 5 })
  const [pagination, setPagination] = useState({ totalRows: 0, totalPages: 0 })

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        // const result = await getAllInventoryAPI(filters)
        // setInventory(result.inventory || [])
        // setPagination(result.pagination || {})
      } catch (error) {
        console.error(error)
      }
    }

    fetchInventory()
  }, [filters])

  const handleSearch = () => {
    setFilters(previous => ({ ...previous, search: searchValue.trim(), page: 1 }))
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

  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>Danh sách hàng hóa</Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>Quản lý và theo dõi hàng hóa trong kho.</Typography>
      </Box>

      <TextField
        fullWidth
        size="small"
        placeholder="Tìm kiếm hàng hóa..."
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
                <Box onClick={() => handleSort('InventoryId')} sx={sortHeaderStyle}>
                  Mã hàng {renderSortIcon('InventoryId')}
                </Box>
              </TableCell>

              <TableCell>
                <Box onClick={() => handleSort('ProductName')} sx={sortHeaderStyle}>
                  Tên hàng hóa {renderSortIcon('ProductName')}
                </Box>
              </TableCell>

              <TableCell>
                <Box onClick={() => handleSort('ImportDate')} sx={sortHeaderStyle}>
                  Ngày nhập {renderSortIcon('ImportDate')}
                </Box>
              </TableCell>

              <TableCell>
                <Box onClick={() => handleSort('ExportDate')} sx={sortHeaderStyle}>
                  Ngày xuất {renderSortIcon('ExportDate')}
                </Box>
              </TableCell>

              <TableCell align="center">
                <Box onClick={() => handleSort('StockQuantity')} sx={{ ...sortHeaderStyle, width: '100%', justifyContent: 'center' }}>
                  Số lượng {renderSortIcon('StockQuantity')}
                </Box>
              </TableCell>

              <TableCell>Đơn vị</TableCell>

              <TableCell align="right">
                <Box onClick={() => handleSort('Price')} sx={{ ...sortHeaderStyle, width: '100%', justifyContent: 'flex-end' }}>
                  Đơn giá {renderSortIcon('Price')}
                </Box>
              </TableCell>

              <TableCell align="right">Tổng tiền</TableCell>
              <TableCell align="center">Thao tác</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {inventory.map(item => (
              <TableRow hover key={item.InventoryId}>
                <TableCell>{item.InventoryId}</TableCell>
                <TableCell>{item.ProductName}</TableCell>
                <TableCell>{item.ImportDate ? new Date(item.ImportDate).toLocaleDateString('vi-VN') : '-'}</TableCell>
                <TableCell>{item.ExportDate ? new Date(item.ExportDate).toLocaleDateString('vi-VN') : '-'}</TableCell>
                <TableCell align="center">{item.StockQuantity}</TableCell>
                <TableCell>{item.Unit}</TableCell>
                <TableCell align="right">{Number(item.Price || 0).toLocaleString('vi-VN')} đ</TableCell>
                <TableCell align="right">{Number(item.StockQuantity * item.Price).toLocaleString('vi-VN')} đ</TableCell>

                <TableCell align="center">
                  <IconButton color="primary" onClick={() => navigate(`/inventory/edit/${item.InventoryId}`)}>
                    <EditOutlined />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {!inventory.length && (
              <TableRow>
                <TableCell colSpan={9} align="center">Không có dữ liệu hàng hóa.</TableCell>
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

export default InventoryList