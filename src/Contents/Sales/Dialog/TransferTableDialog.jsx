import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { tranferTableAPI } from '~/apis'

function TransferTableDialog({ open, selectedTable, getTableEmpty, onClose, handleUpdateRelatedTables }) {
  const [targetTableId, setTargetTableId] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)


  const handleTranferTable = async () => {
    setIsSubmitted(true)

    if (!targetTableId || !selectedTable?.TableId) return updatedOldTabel, updatedNewTable

    const result = await tranferTableAPI({
      oldTableId: selectedTable.TableId,
      newTableId: Number(targetTableId)
    })

    handleUpdateRelatedTables(
      result.updatedOldTabel,
      result.updatedNewTable
    )
    handleClose()
    toast.success('Chuyển bàn thành công.')
  }

  const handleClose = () => {
    setTargetTableId('')
    setIsSubmitted(false)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ bgcolor: 'primary.main', color: '#fff' }}>
        Chuyển bàn {selectedTable?.TableNumber}
      </DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: '#f7f9fc' }}>
        <Box sx={{ p: 3 }}>
          <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Chọn bàn chuyển đến
            </Typography>

            <TextField
              select
              fullWidth
              label="Bàn chuyển đến"
              error={isSubmitted && !targetTableId}
              value={targetTableId}
              onChange={event => setTargetTableId(event.target.value)}
              helperText={ isSubmitted && !targetTableId ? 'Vui lòng chọn bàn cần chuyển' : '' }
            >
              {getTableEmpty.map(table => (
                <MenuItem key={table.TableId} value={table.TableId}>
                  Bàn {String(table.TableNumber).padStart(2, '0')}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 60px 1fr', alignItems: 'center', gap: 2, mt: 3, p: 2, bgcolor: '#f1f5f9', borderRadius: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Bàn hiện tại</Typography>
                <Typography fontWeight={700}>Bàn {selectedTable?.TableNumber}</Typography>
              </Box>

              <Typography textAlign="center" fontWeight={700}>→</Typography>

              <Box>
                <Typography variant="body2" color="text.secondary">Chuyển đến</Typography>
                <Typography fontWeight={700}>
                  {targetTableId
                    ? `Bàn ${getTableEmpty.find(table => table.TableId === targetTableId)?.TableNumber}`
                    : 'Chưa chọn bàn'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
        <Button variant="contained" onClick={handleTranferTable}>Chuyển bàn</Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransferTableDialog