import { Avatar } from '@mui/material'
import React from 'react'

function CustomAvatar(props) {
  const {name, avatar, sx} = props


  return (
    <Avatar 
    sx={sx}
    src={avatar === null ? "NA" : avatar}
    alt={name}
    ></Avatar>
    
  )
}

export default CustomAvatar