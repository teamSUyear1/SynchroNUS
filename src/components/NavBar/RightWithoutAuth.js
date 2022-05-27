import { Button, Stack } from '@mui/material'
import React from 'react'

function RightComponent() {
  return (
    <Stack direction="row" spacing={1}>
              <Button color="inherit" href="/Login">
                Login
              </Button>
              <Button variant="outlined" href="/SignUp" color="inherit">
                Sign Up
              </Button>
            </Stack>
  )
}

export default RightComponent