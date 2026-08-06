import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Paper, Typography } from '@mui/material'
import { mergeTableAPI } from '~/apis'
import { useState } from 'react'

function MergeTableDialog({ open, selectedTable, occupiedTables, onClose, handleUpdateMergedTables }) {

  const [mergeTableIds, setMergeTableIds] = useState([])

  const handleClose = () => {
    setMergeTableIds([])
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Gộp bàn {selectedTable?.TableNumber}</DialogTitle>

      <DialogContent sx={{ p: 0, bgcolor: '#f7f9fc' }}>
        <Box sx={{ p: 3 }}>
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
            <Typography fontWeight={700} sx={{ mb: 1.5 }}>Chọn bàn cần gộp</Typography>

            <Box sx={{ maxHeight: 260, overflowY: 'auto' }}>
                {selectedTable &&
                 occupiedTables.filter(
                  table => table.TableId !== selectedTable.TableId
                ).map(table => (
                <FormControlLabel
                    key={table.TableId}
                    control={
                      <Checkbox
                        checked={mergeTableIds.includes(table.TableId)}
                        onChange={() => {
                          setMergeTableIds(previous =>
                            previous.includes(table.TableId)
                              ? previous.filter(id => id !== table.TableId)
                              : [...previous, table.TableId]
                          )
                        }}
                      />
                    }
                    label={`Bàn ${table.TableNumber}`}
                />
                ))}
            </Box>
            </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>Hủy</Button>
        <Button variant="contained"
          disabled={mergeTableIds.length === 0}
          onClick={async () => {
            try {
               const result = await mergeTableAPI({
                mergeTableIds,
                targetTableId: selectedTable.TableId
              })
              handleUpdateMergedTables(result.updatedStatusTables)
              handleClose()
            } catch (error) { console.log(error)}}}
          >
          Gộp bàn
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MergeTableDialog