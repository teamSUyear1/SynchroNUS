import { Grid, Typography } from '@mui/material'
import React from 'react'
import SideBar from '../components/SideBar/SideBar'

function Meeting() {
    return (
        <Grid container>
            <SideBar select = {3} />
            <Grid item height={"80vh"}>
            <Typography>This is meeting page</Typography>
            </Grid>
        </Grid>
      
    )
}

export default Meeting