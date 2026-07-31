// import { DIALOG } from './dialogTypes'

// export const getTableActions = ({isAvailable, isOccupied, isReserved}) => 
//   [{
//       label: 'Xem bàn',
//       dialog: DIALOG.VIEW,
//       disabled: !isOccupied && !isReserved,
//       variant: 'outlined'
//     },
//     {
//       label: 'Đặt bàn',
//       dialog: DIALOG.BOOKING,
//       disabled: !isAvailable,
//       variant: 'contained'
//     },
//     {
//       label: 'Chọn món',
//       dialog: DIALOG.ORDER,
//       disabled: !isOccupied,
//       variant: 'contained'
//     },
//     {
//       label: 'Thanh toán',
//       dialog: DIALOG.PAYMENT,
//       disabled: !isOccupied,
//       variant: 'contained'
//     },
//     {
//       label: 'Chuyển bàn',
//       dialog: DIALOG.TRANSFER,
//       disabled: !isOccupied,
//       variant: 'outlined'
//     },
//     {
//       label: 'Gộp bàn',
//       dialog: DIALOG.MERGE,
//       disabled: !isOccupied,
//       variant: 'outlined'
//     },
//     {
//       label: 'Tách bàn',
//       dialog: DIALOG.SPLIT,
//       disabled: !isOccupied,
//       variant: 'outlined'
//     }
//   ]