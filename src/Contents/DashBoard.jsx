import React from 'react'
import { Box, Paper } from '@mui/material'
import Sidebar from '~/components/Sidebar/Sidebar'
import Header from '~/components/Header/Header'
import { Outlet } from 'react-router-dom'


function dashBoard() {

    return (
        <Box sx={{ height: '100vh', bgcolor: '#eef2f5', p: { xs: 0.5, md: 1 }, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Paper elevation={4} sx={{ width: '100%', maxWidth: 1500, height: '100%', mx: 'auto', borderRadius: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <Box sx={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
                <Sidebar />
                <Box component="main" sx={{ flex: 1, minWidth: 0, minHeight: 0, bgcolor: '#f7f9fb', p: { xs: 2, md: 3 }, overflowY: 'auto', overflowX: 'hidden' }}>
                <Outlet />
                </Box>
            </Box>
            </Paper>
        </Box>
    )
}

export default dashBoard
