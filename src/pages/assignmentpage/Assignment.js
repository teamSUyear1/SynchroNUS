import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SideBar from "../../components/SideBar/SideBar";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Dialog from "../../components/Dialog/Dialog";
import Popup from "../../components/Popup/Popup";
import AssignmentEventForm from "./AssignmentEventForm";
import { Box, Container } from "@mui/system";
import AssignmentTable from "./AssignmentTable";
import { useAuth, db } from "../../hooks/useAuth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function Assignment() {
  const [value, setValue] = useState(new Date());
  const initialValue = new Date();
  const currentYear = new Date().getFullYear();
  const [openPopup, setOpenPopup] = useState(false);
  const [events, setEventsState] = useState([]);
  const { user } = useAuth();

  function setEvents(newTasks) {
    setEventsState(newTasks);
    setDoc(doc(db, "assignments", user?.uid), { tasks: newTasks });
  }

  function delEvent() {}

  useEffect(() => {
    async function fetchData() {
      const docSnapshot = await getDoc(doc(db, "assignments", user?.uid));
      if (docSnapshot.exists()) {
        setEventsState(docSnapshot.data().tasks);
      } else {
        setEventsState([]);
      }
    }
    fetchData();
  }, [user.uid]);

  return (
    <Grid container>
      <SideBar select={3} />
      <Grid item margin={3} minHeight="75vh">
        <Stack spacing={3} direction={{ xs: "column", xl: "row" }}>
          <Stack justifyContent="flex-start" alignItems="stretch" spacing={2}>
            <Button variant="contained" onClick={() => setOpenPopup(true)}>
              Add Assignment Event
            </Button>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ borderWidth: 2, borderRadius: 2 }}>
                <StaticDatePicker
                  value={value}
                  views={["year", "month", "day"]}
                  minDate={new Date(currentYear - 10, 0)}
                  maxDate={new Date(currentYear + 10, 12)}
                  displayStaticWrapperAs="desktop"
                  showDaysOutsideCurrentMonth
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <Box sx={{ border: "1px solid", borderRadius: 2 }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  margin={2}
                >
                  <Typography>{value.toDateString()}</Typography>
                  <Typography>Do not have any assignment </Typography>
                </Stack>
              </Box>
            </LocalizationProvider>
          </Stack>
          <Box sx={{ width: 700, height: 500, border: "1px solid" }}>
            <AssignmentTable
              events={events}
              setEvents={setEvents}
              delEvent={delEvent}
            />
          </Box>
        </Stack>
      </Grid>

      <Popup
        title="Add new Assignment"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AssignmentEventForm
          events={events}
          setEvents={setEvents}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </Grid>
  );
}

export default Assignment;
