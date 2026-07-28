import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Paper, Typography } from '@mui/material'

function MergeTableDialog({ open, selectedTable, occupiedTables, onClose }) {

 
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Gộp bàn {selectedTable?.TableNumber}</DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: '#f7f9fc' }}>
        <Box sx={{ p: 3 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 1.5 }}>Chọn bàn cần gộp</Typography>

            <Box sx={{ maxHeight: 260, overflowY: 'auto' }}>
                {occupiedTables.map(table => (
                <FormControlLabel
                    key={table.TableId}
                    control={<Checkbox />}
                    label={`Bàn ${table.TableNumber}`}
                />
                ))}
            </Box>
            </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Hủy</Button>
        <Button variant="contained">Gộp bàn</Button>
      </DialogActions>
    </Dialog>
  )
}

export default MergeTableDialog