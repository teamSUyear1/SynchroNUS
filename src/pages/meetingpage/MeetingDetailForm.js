import {
  IconButton,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CustomAvatar from "../../components/CustomAvatar/CustomAvatar";
import PersonIcon from "@mui/icons-material/Person";
import LinkIcon from "@mui/icons-material/Link";
import PeopleIcon from "@mui/icons-material/People";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Popup from "../../components/Popup/Popup";
import ProfileDetailForm from "./ProfileDetailForm";

function MeetingDetailForm(props) {
  const { meetDetail } = props;
  const [openPopup, setOpenPopup] = useState(false)
  const [selectedUser, setSelectedUser] = useState({
    avatar: null,
    email: null,
    name: null
  })
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function avatarOnClick(user) {
    setSelectedUser(user)
    setOpenPopup(true)
  }
  return (
    <>
    <Stack spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center">
        <CalendarTodayIcon fontSize="small" />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {" "}
          {new Date(meetDetail.start).toDateString()}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <AccessTimeIcon fontSize="small" />
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {" "}
          {new Date(meetDetail.start).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          -{" "}
          {new Date(meetDetail.end).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        <PersonIcon />
        <Tooltip title={meetDetail.organiser.name} followCursor>
          <Box onClick={() => avatarOnClick(meetDetail.organiser)}>
            <CustomAvatar
              avatar={meetDetail.organiser.avatar}
              name={meetDetail.organiser.name}
            ></CustomAvatar>
          </Box>
        </Tooltip>
      </Stack>
      <Stack direction="row" alignItems="center">
        <PeopleIcon sx={{ marginRight: 1 }} />
        {meetDetail.participants.map((user) => (
          <Tooltip title={user.name} followCursor>
            <Box onClick={() => avatarOnClick(user)}>
              <CustomAvatar
                avatar={user.avatar}
                name={user.name}
              ></CustomAvatar>
            </Box>
          </Tooltip>
        ))}
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <LinkIcon />
        <Link href={meetDetail.link}>Click here </Link>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <KeyIcon />
        <TextField
          label="Passcode"
          size="small"
          disabled
          defaultValue={meetDetail.passcode}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Stack>
    </Stack>
    <Popup title="Profile detail" openPopup={openPopup}
        setOpenPopup={setOpenPopup}><ProfileDetailForm selectedUser={selectedUser}/></Popup>
    </>
  );
}

export default MeetingDetailForm;
