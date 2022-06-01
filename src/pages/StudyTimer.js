import { Grid, Typography } from '@mui/material';
import React from 'react'
import SideBar from '../components/SideBar/SideBar';

function StudyTimer() {
    return (
        <Grid container>
          <SideBar select={4} />
          <Grid item height={"80vh"}>
            <Typography>This is study timer page</Typography>
          </Grid>
        </Grid>
      );
}

export default StudyTimer