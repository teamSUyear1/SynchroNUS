import { DatePicker, LocalizationProvider, TimePicker } from "@mui/lab";
import { db, useAuth } from "../../hooks/useAuth";
import { doc, getDoc, onSnapshot, collection } from "@firebase/firestore";
import {
  Autocomplete,
  Button,
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
  const [option, setOption] = useState([]);

  function addUser(value) {
    onSnapshot(doc(db, "users", value), (doc) => {
      setOption(doc.data());
    });
  }

  return (
    <form>
      <Stack spacing={3} marginTop={1} marginBottom={1}>
        <TextField label="Meeting Title" required />
          <Box sx={{ minWidth: 250 }}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={alluser}
              getOptionLabel={(option) => option.email}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Participants"
                />
              )}
            />
          </Box>
          <TextField></TextField>
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
              label="Due Date"
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
              label="Due Time"
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
