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

function Meeting() {
  const { meetings } = useMeeting();
  const { alluser } = useUser();
  const [openPopup, setOpenPopup] = useState(false);
  const [openCardPopup, setOpenCardPopup] = useState(false);
  const [meet, setMeet] = useState({
duration: null,
end: null,
start: null,
link: null,
organiser:{avatar: null, email: null, name: null},
participants: [],
passcode: null,
title: null
  })
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

  function getPopup(meet) {
    setOpenCardPopup(true);
setMeet(meet)
  }

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

                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {new Date(meet.start).toDateString()}
                            <br />
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
        title={meet.title}
        openPopup={openCardPopup}
        setOpenPopup={setOpenCardPopup}
      >
        {meet.organiser.name}
        <br/>
        {meet.participants.map(user => (
          <Typography>{user.name}</Typography>
        ))}
      </Popup>
    </>
  );
}

export default Meeting;
