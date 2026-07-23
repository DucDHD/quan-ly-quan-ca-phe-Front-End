import React from 'react'
import { Box, Paper } from '@mui/material'
import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'


function dashBoard() {


    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#eef2f5', p: { xs: 1,md: 3, }, }} >
        <Paper elevation={4} sx={{  maxWidth: 1500,  minHeight: 'calc(100vh - 48px)',  mx: 'auto', borderRadius: 3,  overflow: 'hidden' }} >
            <Header />
            <Box sx={{ display: 'flex', minHeight: 'calc(100vh - 120px)'  }} >
            <Sidebar />
            <Box component="main" sx={{  flex: 1,  minWidth: 0,    bgcolor: '#f7f9fb',   p: {  xs: 2,   md: 3,  } }} >
                <Outlet />
            </Box>
            </Box>
        </Paper>
        </Box>
    )
}

export default dashBoard
