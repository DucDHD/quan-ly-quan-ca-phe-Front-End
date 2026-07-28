import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Paper, TextField, Typography } from '@mui/material'

function TransferTableDialog({ open, selectedTable, availableTables, onClose }) {
  const [targetTableId, setTargetTableId] = useState('')

  const handleClose = () => {
    setTargetTableId('')
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
              value={targetTableId}
              onChange={event => setTargetTableId(event.target.value)}
            >
              {availableTables.map(table => (
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
                    ? `Bàn ${availableTables.find(table => table.TableId === targetTableId)?.TableNumber}`
                    : 'Chưa chọn bàn'}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
        <Button variant="contained" disabled={!targetTableId}>Chuyển bàn</Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransferTableDialog