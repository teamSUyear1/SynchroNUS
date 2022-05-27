import { Grid, Typography } from '@mui/material'
import React from 'react'
import SideBar from '../components/SideBar/SideBar'

function Profile() {
  return (
      <Grid container>
          <SideBar select = {2} />
          <Grid item height={"80vh"}>
          <Typography>This is Profile page</Typography>
          </Grid>
      </Grid>
    
  )
}

export default Profile