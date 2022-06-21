import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import SideBar from "../components/SideBar/SideBar";
import { Box } from "@mui/system";
import AccountInfo from "../hooks/AccountInfo";
import { formatDistanceToNow, isAfter  } from "date-fns";
import Event from "../hooks/Event";
import Calendar from "../components/Calendar/Calendar";
import { useState } from "react";
import { LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function Dashboard() {
  var tmpDate = new Date();
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
  const { events } = Event();
  const { name} = AccountInfo();

  function filterDate(task) {
    const taskdate = new Date(task.date).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return taskdate === selecteddate;
  }

  return (
    <>
      <SideBar select={1} />
      <Grid
        container
        minHeight="80vh"
        paddingLeft={{ xs: 5, md: 40 }}
        paddingTop={2}
        paddingRight={{ xs: 5, md: 10 }}
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h4" color="inherit">
            Welcome, {name}!
          </Typography>
        </Grid>
        <Grid item>
        <Stack direction="row" spacing={3}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box
              sx={{ border: "1px solid", borderWidth: 1, borderRadius: 2 }}
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
          <Stack spacing={1.5}>
          <Box
            sx={{
              border: "1px solid",
              borderRadius: 3,
              padding: 2,
              maxWidth: 1120,
              alignSelf: 'start',
            }}
          >
          <Stack direction="row" justifyContent="space-between" marginBottom={2}>
            <Typography variant="h5" color="inherit">
              Deadline Assignment
            </Typography>
            <Button color="primary" href="/assignment">View All</Button>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ overflow: "scroll", width: "50vw", minHeight: 232, margin:'auto'}}>
              {
                events.filter(filterDate)
                .map((task) => (
                  <Card variant="outlined" sx={{ minWidth: 200, background:  task.isComplete ? "#66bb6a" : isAfter(new Date(), new Date(task.date))? "#f44336": isAfter( tmpDate.setDate(tmpDate.getDate() + 1), new Date(task.date)) ? "#ffa726" : ""}}>
                    <CardContent>
                      <Typography sx={{ fontSize: 14 }} gutterBottom>
                        {task.importance} ⭐️
                      </Typography>
                      <Typography variant="h5" component="div">
                        {task.title}
                      </Typography>
                      <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {task.type}
                      </Typography>
                      <Typography variant="body2">
                        {new Date(task.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        <br />
                        {new Date(task.date).toDateString()}
                        <br />
                        {task.isComplete ? "Completed " + formatDistanceToNow(new Date(task.Cdate), {
                          addSuffix: true,
                        }) : "Due " +
                        formatDistanceToNow(new Date(task.date), {
                          addSuffix: true,
                        })}
                      </Typography>
                    </CardContent>
                    
                  </Card>
                ))}
            </Stack>
          </Box>
          <Box sx={{
              border: "1px solid",
              borderRadius: 3,
              padding: 1,
              width:"100%",
            }}>
          <Stack direction="row" spacing={0.5} justifyContent="center">
          <Typography noWrap>You have  </Typography>
          {events.filter(task => !task.isComplete).length === 0 ? <Typography>completed all the tasks</Typography> :
          <>
          <Typography fontWeight={600}>{events.filter(task => !task.isComplete).length}</Typography>
          <Typography noWrap> tasks that are not complete.</Typography>
          </>
          }
          </Stack>
          </Box>
          </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
