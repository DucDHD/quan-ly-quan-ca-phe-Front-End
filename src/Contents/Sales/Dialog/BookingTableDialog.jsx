import React from 'react'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import Button from '@mui/material/Button'
import { bookingTableAPI } from '~/apis'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box'
import { toast } from 'react-toastify'

function BookingTableDialog( { selectedTable,  open, onClose, handleUpdateTable }) {

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: { CustomerName: '', PhoneNumber: '', BookingDate: '', BookingHour: '', PeopleCount: 1 }
    })


    const submitBooking = async (data) => {
        try {
            const BookingTime = `${data.BookingDate}T${data.BookingHour}:00`

            const result = await bookingTableAPI({
            CustomerName: data.CustomerName,
            PhoneNumber: data.PhoneNumber,
            TableId: selectedTable.TableId,
            BookingTime,
            PeopleCount: Number(data.PeopleCount)
            })

            handleUpdateTable(result.updateStatusTable)
            toast.success('Đặt bàn thành công.')
            reset()
            onClose()
            //onBookingSuccess()
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Đặt bàn thất bại.')
        }
    }
    const handleClose = () => {
        reset()
        onClose()
    }
      return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Đặt bàn {selectedTable?.TableNumber}</DialogTitle>

        <Box component="form" onSubmit={handleSubmit(submitBooking)} >
            <DialogContent>
            <TextField
                fullWidth
                label="Tên khách hàng"
                margin="normal"
                error={!!errors.CustomerName}
                helperText={errors.CustomerName?.message}
                {...register('CustomerName', {
                required: 'Vui lòng nhập tên khách hàng.',
                minLength: { value: 3, message: 'Tên khách hàng phải có ít nhất 3 ký tự.' }
                })}
            />

            <TextField
                fullWidth
                label="Số điện thoại"
                margin="normal"
                error={!!errors.PhoneNumber}
                helperText={errors.PhoneNumber?.message}
                {...register('PhoneNumber', { required: 'Vui lòng nhập số điện thoại.' })}
            />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mt: 1 }}>

                <TextField
                type="date"
                label="Ngày đặt"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.BookingDate}
                helperText={errors.BookingDate?.message}
                {...register('BookingDate', { required: 'Vui lòng chọn ngày đặt.' })}
                />

                <TextField
                type="time"
                label="Giờ đặt"
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!errors.BookingHour}
                helperText={errors.BookingHour?.message}
                {...register('BookingHour', { required: 'Vui lòng chọn giờ đặt.' })}
                />
    
            </Box>

            <TextField
                fullWidth
                type="number"
                label="Số người"
                margin="normal"
                inputProps={{ min: 1 }}
                error={!!errors.PeopleCount}
                helperText={errors.PeopleCount?.message}
                {...register('PeopleCount', {
                required: 'Vui lòng nhập số người.',
                min: { value: 1, message: 'Số người phải lớn hơn 0.' }
                })}
            />
            </DialogContent>

            <DialogActions>
            <Button onClick={handleClose} variant="outlined">Hủy</Button>
            <Button type="submit" variant="contained">Xác nhận</Button>
            </DialogActions>
        </Box>
        </Dialog>
    )
}

export default BookingTableDialog
