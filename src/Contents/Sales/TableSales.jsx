
import { useState } from 'react'
import BookingTableDialog from './Dialog/BookingTableDialog'
import ViewTableDialog from './Dialog/ViewTableDialog'
import ChooseProductDialog from './Dialog/ChooseProductDialog'
import MergeTableDialog from './Dialog/MergeTableDialog'
import SplitTableDialog from './Dialog/SplitTableDialog'
import TransferTableDialog from './Dialog/TransferTableDialog'
import PaymentDialog from './Dialog/PaymentDialog'
import { getTableActions } from '~/config/tableActions'
import { DIALOG } from '~/config/dialogTypes'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'
import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { getAllTableAPI, cancelTableAPI } from '~/apis'

const TABLE_STATUS = {
  AVAILABLE: 1,
  OCCUPIED: 2,
  RESERVED: 3
}


function TableSales() {

  const confirm = useConfirm()
  const [tableList, setTableList] = useState([])
    const [selectedTable, setSelectedTable] = useState(null)

  /** Get all Table */
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const getAllTable = await getAllTableAPI()
        
        setTableList(getAllTable)
      } catch (error) { console.error(error) }
    }
    fetchTables()
}, [])

  

  const isAvailable = selectedTable?.TableStatus === TABLE_STATUS.AVAILABLE
  const isOccupied = selectedTable?.TableStatus === TABLE_STATUS.OCCUPIED
  const isReserved = selectedTable?.TableStatus === TABLE_STATUS.RESERVED

  const availableCount = tableList.filter(table => table.TableStatus === TABLE_STATUS.AVAILABLE).length
  const occupiedCount = tableList.filter(table => table.TableStatus === TABLE_STATUS.OCCUPIED).length
  const reservedCount = tableList.filter(table => table.TableStatus === TABLE_STATUS.RESERVED).length

  const [currentDialog, setCurrentDialog] = useState(null)

  const tableActions = getTableActions({
    isAvailable,
    isOccupied,
    isReserved
  })

    const handleOpenDialog = (dialogType) => {
      setCurrentDialog(dialogType)
    }
   const handleCloseDialog = () => {
        setCurrentDialog(null)
    }


 
   const handleSelectTable = (table) => {
        setSelectedTable(table)
   }

   const getTableStatusName = status => {
        switch (status) {
            case TABLE_STATUS.OCCUPIED:
            return 'Đang sử dụng'

            case TABLE_STATUS.RESERVED:
            return 'Đã đặt'

            default:
            return 'Bàn trống'
        }
    }

    const getTableBackground = (table) => {
        if (selectedTable?.TableId === table.TableId) {
            return '#90caf9'
        }

        switch (table.TableStatus) {
            case TABLE_STATUS.OCCUPIED:
            return '#bdbdbd'

            case TABLE_STATUS.RESERVED:
            return '#ffe082'

            default:
            return '#f1f8f4'
        }
    }
  

  const occupiedTables = tableList.filter(table =>
      table.TableStatus === TABLE_STATUS.OCCUPIED &&
      table.TableId !== selectedTable?.TableId
  )
  
  const getTableEmpty = tableList.filter(table =>
    table.TableStatus === TABLE_STATUS.AVAILABLE &&
    table.TableId !== selectedTable?.TableId
  )

  const handleCancelTable = (tableId) => {
    confirm({
      title: 'Hủy bàn',
      description: 'Bạn có chắc muốn hủy bàn này không?',
      confirmationText: 'Xác nhận',
      cancellationText: 'Hủy'
    }).then(async () => {
      const result = await cancelTableAPI(tableId)
      handleUpdateTable(result.updatedStatusTable)
      toast.success('Hủy bàn thành công.')
    })
  }

  // hàm update status table
  const handleUpdateTable = (updatedTable) => {
    if (!updatedTable) return
    setTableList(previous =>
      previous.map(table =>
        table.TableId === updatedTable.TableId ? updatedTable : table
      )
    )
    setSelectedTable(previous =>
      previous?.TableId === updatedTable.TableId ? updatedTable : previous
    )
  }

  const handleUpdateRelatedTables = (updatedOldTable, updatedNewTable, nextSelectedTable ) => {
    if (!updatedOldTable || !updatedNewTable) return

    setTableList(previous =>
      previous.map(table => {
        if (table.TableId === updatedOldTable.TableId) return updatedOldTable
        if (table.TableId === updatedNewTable.TableId) return updatedNewTable
        return table
      })
    )

    setSelectedTable(nextSelectedTable)
  }

  const handleUpdateMergedTables = (updatedStatusTables) => {
    setTableList(previous =>
      previous.map(table => {
        const updatedTable = updatedStatusTables.find(
          item => item.TableId === table.TableId
        )
        return updatedTable || table
      })
    )
  }

  return (
    <Box sx={{ width: '100%', pb: 1 }}>
      <Card sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 1.5, borderRadius: 2 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={1} sx={{ mb: 1.5 }}>
          <Box>
            <Typography variant="h5">Quản lý bán hàng</Typography>
            <Typography variant="body2">Chọn bàn và thực hiện các chức năng bán hàng</Typography>
          </Box>

           <Stack direction="row" spacing={1} flexWrap="wrap">
              <Chip label={`Bàn trống: ${availableCount}`} size="small" sx={{ bgcolor: '#f1f8f4' }} />
              <Chip label={`Đang sử dụng: ${occupiedCount}`} size="small" sx={{ bgcolor: '#bdbdbd' }} />
              <Chip label={`Đã đặt: ${reservedCount}`} size="small" sx={{ bgcolor: '#ffe082' }} />
              <Chip label="Đang chọn" size="small" sx={{ bgcolor: '#90caf9' }} />
          </Stack>
        </Stack>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 1 }}>
          {tableList.map(table => (
            <Box
              key={table.TableId}
              onClick={() => handleSelectTable(table)}
              sx={{
                minHeight: 90,
                border: '1px solid',
                borderColor: selectedTable?.TableId === table.TableId ? 'primary.main' : 'divider',
                borderRadius: 2,
                bgcolor: getTableBackground(table),
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: selectedTable?.TableId === table.TableId ? 3 : 0
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Typography fontWeight={700}>Bàn {table.TableNumber}</Typography>
                <Typography variant="caption" color="text.secondary">{getTableStatusName(table.TableStatus)}</Typography>
              </Box>
            </Box>
          ))}
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 1, mt: 1 }}>
            {tableActions.map(action => (
              <Button key={action.dialog} disabled={action.disabled} variant={action.variant} onClick={() => handleOpenDialog(action.dialog)}>
                {action.label}
              </Button>
            ))}

          <Button
            color="error"
            variant="outlined"
            disabled={!isReserved}
            onClick={() => handleCancelTable(selectedTable.TableId)}
          >
            Hủy bàn
          </Button>
        </Box>
      </Card>
      <BookingTableDialog
        open={currentDialog === DIALOG.BOOKING}
        onClose={handleCloseDialog}
        selectedTable={selectedTable}
        handleUpdateTable={handleUpdateTable}
        />
      <ViewTableDialog
        open={currentDialog === DIALOG.VIEW}
        onClose={handleCloseDialog}
        selectedTable={selectedTable}
      />
      <ChooseProductDialog
        open={currentDialog === DIALOG.ORDER}
        onClose={handleCloseDialog}
        selectedTable={selectedTable}
        handleUpdateTable={handleUpdateTable}
      />
      <MergeTableDialog
        open={currentDialog === DIALOG.MERGE}
        selectedTable={selectedTable}
        occupiedTables={occupiedTables}
        handleUpdateMergedTables={handleUpdateMergedTables}
        onClose={handleCloseDialog}
      />
      <SplitTableDialog
        open={currentDialog === DIALOG.SPLIT}
        selectedTable={selectedTable}
        getTableEmpty={getTableEmpty}
        handleUpdateTable={handleUpdateTable}
        onClose={handleCloseDialog}
      />
      <TransferTableDialog
        open={currentDialog === DIALOG.TRANSFER}
        selectedTable={selectedTable}
        getTableEmpty={getTableEmpty}
        handleUpdateRelatedTables={handleUpdateRelatedTables}
        onClose={handleCloseDialog}
      />
      <PaymentDialog 
        open={currentDialog === DIALOG.PAYMENT} 
        selectedTable={selectedTable} 
        onClose={handleCloseDialog}
        handleUpdateTable={handleUpdateTable}
      />
    </Box>
  )
}

export default TableSales