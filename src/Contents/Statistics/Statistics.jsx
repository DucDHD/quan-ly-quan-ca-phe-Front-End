

function Statistics() {
  return (
        <Paper
        variant="outlined"
        sx={{
            p: 2.5,
            borderRadius: 2.5,
            bgcolor: 'rgba(255,255,255,0.9)',
        }}
        >
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            }}
        >
            <Box
            sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'rgba(7,153,146,0.12)',
                color: 'primary.main',
            }}
            >
            {icon}
            </Box>

            <Box>
            <Typography variant="body2" color="text.secondary">
                {title}
            </Typography>

            <Typography variant="h6" fontWeight={700}>
                {value}
            </Typography>

            <Typography variant="caption" color="text.secondary">
                {description}
            </Typography>
            </Box>
        </Box>
        </Paper>
    )
}

export default Statistics
