import { LocalizationProvider } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useState } from "react";
import Calendar from "../../components/Calendar/Calendar";
import Popup from "../../components/Popup/Popup";
import SideBar from "../../components/SideBar/SideBar";
import useMeeting from "../../hooks/useMeeting";
import MeetingForm from "./MeetingForm";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import useUser from "../../hooks/useUser";
import { add } from "date-fns";

function Meeting() {
  const { meetings } = useMeeting();
  const { alluser } = useUser();
  const [openPopup, setOpenPopup] = useState(false);
  console.log("alluser", alluser);
  console.log("meetings", meetings);
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
  const [value, setValue] = useState(new Date(currDate));
  const [month, setMonth] = useState(value.getMonth());

  function filterMeetDate(meet) {
    console.log("startdate", meet.start);
    const startdate = new Date(meet.start).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return startdate === selecteddate;
  }

  const getUserState = (email) => {
    console.log("email", email);
    return alluser.find((value) => value.email === email);
  };

  useEffect(() => {}, []);
  return (
    <>
      <SideBar select={2} />
      <Grid
        container
        minHeight="80vh"
        justifyContent="center"
        paddingLeft={{ xs: 5, md: 30 }}
      >
        <Grid item margin={3}>
          <Stack spacing={3} direction="column">
            <Button variant="contained" onClick={() => setOpenPopup(true)}>
              Add Meeting
            </Button>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box
                sx={{
                  backgroundColor: "background.default",
                  boxShadow: 2,
                  borderWidth: 1,
                  borderRadius: 2,
                }}
                p={1}
              >
                <Calendar
                  value={value}
                  setValue={setValue}
                  month={month}
                  setMonth={setMonth}
                />
              </Box>
            </LocalizationProvider>
          </Stack>
        </Grid>
        <Grid item>
          <Box
            sx={{
              borderRadius: 3,
              padding: 2,
              maxWidth: 1200,
              alignSelf: "start",
              backgroundColor: "background.default",
              boxShadow: 2,
            }}
          >
            <Typography variant="h5" color="inherit">
              Meeting
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              sx={{
                overflow: "auto",
                width: "55vw",
                minHeight: 232,
                margin: "auto",
              }}
            >
              {meetings.filter(filterMeetDate).map((meet, index) => (
                <Card
                  key={index}
                  variant="outlined"
                  sx={{
                    minWidth: 200,
                    boxShadow: 4,
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {meet.title}
                    </Typography>
                    
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {new Date(meet.start).toDateString()}
                      <br />  
                     {new Date(meet.start).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} - {new Date(meet.end).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} 
                    </Typography>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={1}
                      mt={1}
                    >
                      <Avatar src={meet.organiser.avatar}></Avatar>
                      <AvatarGroup max={3}>
                        {meet.participants.map((user) => (
                          <Avatar
                            src={getUserState(user.email).avatar}
                          ></Avatar>
                        ))}
                      </AvatarGroup>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Popup
        title="Add Meeting"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <MeetingForm setOpenPopup={setOpenPopup}></MeetingForm>
      </Popup>
    </>
  );
}

export default Meeting;
