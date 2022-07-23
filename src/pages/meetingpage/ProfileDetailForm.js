import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function ProfileDetailForm(props) {
const {selectedUser} = props
  return (
    <Stack>
    <Typography>Name: {selectedUser.name}</Typography>
    <Typography>Email: {selectedUser.email}</Typography>
    </Stack>
  )
}
