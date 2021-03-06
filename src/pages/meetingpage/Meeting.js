import { LocalizationProvider } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
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
import { compareAsc } from "date-fns";
import useUser from "../../hooks/useUser";
import CustomAvatar from "../../components/CustomAvatar/CustomAvatar";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MeetingDetailForm from "./MeetingDetailForm";
import BellSound from "../../components/Assets/BellSound.wav";

function Meeting() {
  const { meetings } = useMeeting();
  const { alluser } = useUser();
  const [openPopup, setOpenPopup] = useState(false);
  const [openCardPopup, setOpenCardPopup] = useState(false);
  const [meetDetail, setMeetDetail] = useState({
    duration: null,
    end: null,
    start: null,
    link: null,
    organiser: { avatar: null, email: null, name: null },
    participants: [],
    passcode: null,
    title: null,
  });
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
  let audioAlert = new Audio(BellSound);

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

  function getPopup(meet) {
    setOpenCardPopup(true);
    setMeetDetail(meet);
  }

  function timeReminder() {
    meetings.map((meet) => {
      if (meet.start === new Date(currDate).toISOString()) {
        console.log("play");
        audioAlert.play();
      }
      console.log("curr time", new Date(currDate).toISOString(), meet.start);
    });
  }

  useEffect(() => {
    timeReminder();
  }, [meetings, date]);
  return (
    <>
      <SideBar select={2} />
      <Grid
        container
        minHeight="80vh"
        justifyContent="center"
        paddingLeft={{ xs: 0, md: 30 }}
        paddingTop={2}
      >
        <Grid item margin={{xs: 0, md:3}}>
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
        <Grid item marginY={3}>
          <Box
            sx={{
              borderRadius: 3,
              padding: 2,
              maxWidth: 1200,
              alignSelf: "start",
              backgroundColor: "background.default",
              boxShadow: 2,
              width: "100%",
            }}
          >
            <Stack spacing={2} padding={1}>
              <Typography
                variant="h5"
                color="inherit"
                fontSize={{ xs: 20 }}
                textAlign="center"
              >
                Meeting
              </Typography>

              <Stack
                direction="row"
                spacing={2}
                sx={{
                  overflow: "auto",
                  width: "60vw",
                  minHeight: 232,
                  margin: "auto",
                }}
              >
                {meetings
                  .filter(filterMeetDate)
                  .sort((a, b) =>
                    compareAsc(new Date(a.start), new Date(b.start))
                  )
                  .map((meet, index) => (
                    <>
                      <Card
                        key={index}
                        variant="outlined"
                        sx={{
                          minWidth: 200,
                          boxShadow: 4,
                        }}
                      >
                        <CardActionArea onClick={() => getPopup(meet)}>
                          <CardContent>
                            <Typography variant="h5" component="div">
                              {meet.title}
                            </Typography>
                            <Stack direction="row" spacing={1}>
                              <CalendarTodayIcon fontSize="small" />
                              <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                              >
                                {" "}
                                {new Date(meet.start).toDateString()}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                              <AccessTimeIcon fontSize="small" />
                              <Typography
                                sx={{ mb: 1.5 }}
                                color="text.secondary"
                              >
                                {" "}
                                {new Date(meet.start).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}{" "}
                                -{" "}
                                {new Date(meet.end).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </Typography>
                            </Stack>
                            <Stack
                              direction="row"
                              divider={
                                <Divider orientation="vertical" flexItem />
                              }
                              spacing={1}
                              mt={1}
                            >
                              <CustomAvatar
                                name={meet.organiser.name}
                                avatar={meet.organiser.avatar}
                              ></CustomAvatar>
                              <AvatarGroup max={3}>
                                {meet.participants.map((user) => (
                                  <CustomAvatar
                                    name={getUserState(user.email).name}
                                    avatar={getUserState(user.email).avatar}
                                  ></CustomAvatar>
                                ))}
                              </AvatarGroup>
                            </Stack>
                          </CardContent>
                        </CardActionArea>
                        <CardActions>
                          <Button onClick={() => window.open(meet.link)}>
                            Join
                          </Button>
                        </CardActions>
                      </Card>
                    </>
                  ))}
              </Stack>
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
      <Popup
        title={meetDetail.title}
        openPopup={openCardPopup}
        setOpenPopup={setOpenCardPopup}
      >
        <MeetingDetailForm meetDetail={meetDetail}></MeetingDetailForm>
      </Popup>
    </>
  );
}

export default Meeting;
