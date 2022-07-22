import { DatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import { db, useAuth } from "../../hooks/useAuth";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  arrayUnion,
  updateDoc,
} from "@firebase/firestore";
import {
  Autocomplete,
  Avatar,
  Button,
  Checkbox,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { isAfter, add } from "date-fns";
import React, { useEffect } from "react";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountInfo from "../../hooks/AccountInfo";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function MeetingForm(props) {
  const { setOpenPopup } = props;
  const date = new Date();
  const { user } = useAuth();
  const { avatar, name } = AccountInfo();
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
  const [start, setStart] = useState(new Date(currDate));
  const { alluser } = useUser();
  const [disable, setDisable] = useState(false);
  //  const [avatars, setAvatars] = useState([]);
  // const [username, setUsername] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [passcode, setPasscode] = useState("");
  const [timeUnit, setTimeUnit] = useState("hours");
  const [duration, setDuration] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const units = [
    {
      value: "hours",
    },
    {
      value: "minutes",
    },
  ];

  const handleChange = (e) => {
    setTimeUnit(e.target.value);
  };
  /*
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
*/
  // const getUsernameState = async (email) => {
  //   const alluserRef = doc(db, "users", email);
  //   const alluserSnap = await getDoc(alluserRef);
  //   return alluserSnap.data().name;
  // };

  function getUsername(name, val) {
    setParticipants(val);
    return name;
  }


  function addMeeting(title, participants, link, passcode, start, end, duration) {
    setOpenPopup(false);
    const newMeetingRef = doc(collection(db, "meetings"));
    setDoc(newMeetingRef, {
      title: title,
      participants: participants,
      link: link,
      passcode: passcode,
      start: start,
      end: end,
      duration: duration,
      organiser: { email: user.email, avatar: avatar, name: name },
    });
    const allNotification = [
      ...participants,
      {
        email: user.email,
      },
    ];
    allNotification.map((participant) =>
      sendNotification(participant.email, newMeetingRef.id)
    );
  }

  async function sendNotification(email, docID) {
    console.log(email);
    const newNotificationRef = doc(db, "notifications", email);
    const docSnap = await getDoc(newNotificationRef);
    const newNotification = {
      docID: docID,
      status: email === user.email,
      timestamp: new Date(),
    };

    if (docSnap.exists()) {
      updateDoc(newNotificationRef, {
        new: arrayUnion(newNotification),
      });
    } else {
      setDoc(newNotificationRef, {
        new: [newNotification],
      });
    }
  }

  function handleAddMeeting(e) {
    e.preventDefault();
    const end = add(start, {
      minutes: duration
    });
    console.log("end", end)
    addMeeting(
      title,
      participants,
      link,
      passcode,
      start.toISOString(),
      end.toISOString(),
      duration
    );
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (
      duration === 0 ||
      isNaN(duration) ||
      isAfter(new Date(currDate), start) ||
      participants.length === 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    console.log(alluser);
  }, [duration, start, currDate, participants]);

  return (
    <form onSubmit={handleAddMeeting}>
      <Stack spacing={3} marginTop={1} marginBottom={1}>
        <TextField
          label="Meeting Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <Box>
          <Autocomplete
            multiple
            id="tags-standard"
            limitTags={2}
            options={alluser.filter((users) => users.email !== user.email)}
            getOptionLabel={(option) => option.email}
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
                  avatar={
                    <Avatar
                      alt={option.name}
                      src={option.avatar === null ? "NA" : option.avatar}
                    />
                  }
                  label={getUsername(option.name, value)}
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
          onChange={(e) => setLink(e.target.value)}
        ></TextField>
        <TextField
          label="Meeting Passcode"
          size="small"
          type={showPassword ? "text" : "password"}
          helperText="If there is passcode, please input it"
          onChange={(e) => setPasscode(e.target.value)}
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

        <Divider />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Stack direction="row" spacing={3}>
            <DatePicker
              showToolbar
              label="Date"
              openTo="day"
              views={["month", "day"]}
              value={start}
              shouldDisableDate={(date) => isAfter(new Date(currDate), date)}
              onChange={(newDate) => {
                setStart(newDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              label="Time"
              value={start}
              showToolbar
              onChange={(newTime) => {
                setStart(newTime);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
          <Stack justifyContent="space-between" direction="row">
            <TextField
              size="small"
              select
              label="unit"
              value={timeUnit}
              onChange={handleChange}
            >
              {units.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              size="small"
              type="number"
              label="Duration"
              onInput={(e) => {
                if (timeUnit === "minutes") {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 3);
                } else {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 1);
                }
              }}
              onChange={(e) =>
                setDuration(
                  timeUnit === "hours"
                    ? e.target.valueAsNumber * 60
                    : e.target.valueAsNumber
                )
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">{timeUnit}</InputAdornment>
                ),
              }}
            ></TextField>
          </Stack>
          <Typography fontSize={13}>{start.toString()}</Typography>
        </LocalizationProvider>
        <Button variant="contained" type="submit" disabled={disable}>
          Add
        </Button>
      </Stack>
    </form>
  );
}

export default MeetingForm;
