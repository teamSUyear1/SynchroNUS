import { DatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import { db, useAuth } from "../../hooks/useAuth";
import { doc, getDoc, onSnapshot, collection } from "@firebase/firestore";
import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { isAfter } from "date-fns";
import React, { useEffect } from "react";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function MeetingForm(props) {
  const { setOpenPopup } = props;
  const date = new Date();
  const currDate =
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    }) +
    "-" +
    date.getDate().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    }) +
    "T" +
    date.getHours().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    }) +
    ":" +
    date.getMinutes().toLocaleString("en-US", {
      minimumIntegerDigits: 2,
    });
  const [endevent, setEndevent] = useState(new Date(currDate));
  const { alluser } = useUser();
  const [disable, setDisable] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [username, setUsername] = useState([]);
  const [participants, setParticipants] = useState([]);

  const getAvatarState = async (email) => {
    const alluserRef = doc(db, "users", email);
    const alluserSnap = await getDoc(alluserRef);
    return alluserSnap.data().avatar;
  };

  function getAvatar(email, index, val) {
    setParticipants(val);
    getAvatarState(email).then((value) => {
      if (!avatars.includes(value)) {
        const newAvatars = [
          ...avatars.slice(0, index),
          value,
          ...avatars.slice(index + 1),
        ];
        setAvatars(newAvatars);
      }
    });
    return avatars[index];
  }

  const getUsernameState = async (email) => {
    const alluserRef = doc(db, "users", email);
    const alluserSnap = await getDoc(alluserRef);
    return alluserSnap.data().name;
  };

  function getUsername(email, index, val) {
    setParticipants(val);
    getUsernameState(email).then((value) => {
      if (!username.includes(value)) {
        const newUsername = [
          ...username.slice(0, index),
          value,
          ...username.slice(index + 1),
        ];
        setUsername(newUsername);
      }
    });
    return username[index];
  }

  function changeHandler() {
    setAvatars([]);
    setUsername([]);
  }

  function HandleAddMeeting(e) {
    e.preventDefault();
    
  }

  return (
    <form>
      <Stack spacing={3} marginTop={1} marginBottom={1} width={400}>
        <TextField label="Meeting Title" required />
        <Box>
          <Autocomplete
            multiple
            id="tags-standard"
            limitTags={2}
            options={alluser}
            getOptionLabel={(option) => option.email}
            onChange={changeHandler}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.email}
              </li>
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={getUsername(option.email, index, value)}
                  size="small"
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="Participants" />
            )}
          />
        </Box>
        <TextField
          label="Meeting invite link"
          size="small"
          required
        ></TextField>
        <TextField label="Meeting Passcode" size="small"></TextField>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: 250,
            justifyContent: "center",
          }}
        ></Box>

        <Divider />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction="row" spacing={3}>
            <DatePicker
              showToolbar
              label="Date"
              openTo="day"
              views={["month", "day"]}
              value={endevent}
              shouldDisableDate={(date) => isAfter(new Date(currDate), date)}
              onChange={(newDate) => {
                setEndevent(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Time"
              value={endevent}
              showToolbar
              onChange={(newTime) => {
                setEndevent(newTime);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
          <Typography>{endevent.toString()}</Typography>
        </LocalizationProvider>
        <Button variant="contained" type="submit" disabled={disable}>
          Add
        </Button>
      </Stack>
    </form>
  );
}

export default MeetingForm;
