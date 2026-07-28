import React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

function BookingTableDialog( { selectedTable,  open, onClose, }) {

   const [bookingForm, setBookingForm] = useState({
        CustomerName: '',
        PhoneNumber: '',
        BookingDate: '',
        BookingTime: '',
        PeopleCount: 1
    })
    const handleBookingFormChange = (event) => {
        const { name, value } = event.target

        setBookingForm(previous => ({
            ...previous,
            [name]: value
        }))
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={open} onClose={onClose}
        >
            <DialogTitle >
                Đặt bàn{' '}
                {selectedTable? String(selectedTable.TableNumber).padStart(2, '0'): ''}
            </DialogTitle>

            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        name="CustomerName"
                        label="Tên khách hàng"
                        value={bookingForm.CustomerName}
                        onChange={handleBookingFormChange}
                        fullWidth
                    />

                    <TextField
                        name="PhoneNumber"
                        label="Số điện thoại"
                        value={bookingForm.PhoneNumber}
                        onChange={handleBookingFormChange}
                        fullWidth
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }}spacing={2}>
                        <TextField
                            name="BookingDate"
                            label="Ngày đặt"
                            type="date"
                            value={bookingForm.BookingDate}
                            onChange={handleBookingFormChange}
                            fullWidth
                            slotProps={{ inputLabel: {  shrink: true  } }}
                            
                        />

                        <TextField
                            name="BookingTime"
                            label="Giờ đặt"
                            type="time"
                            value={bookingForm.BookingTime}
                            onChange={handleBookingFormChange}
                            fullWidth
                            slotProps={{ inputLabel: {  shrink: true  } }}
                        />
                    </Stack>

                    <TextField
                        name="PeopleCount"
                        label="Số người"
                        type="number"
                        value={bookingForm.PeopleCount}
                        onChange={handleBookingFormChange}
                        fullWidth
                        slotProps={{   htmlInput: {  min: 1 }}}
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Hủy
                </Button>

                <Button variant="contained">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default BookingTableDialog
