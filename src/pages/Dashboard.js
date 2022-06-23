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
import { formatDistanceToNow, isAfter, formatDistanceStrict } from "date-fns";
import useAssignment from "../hooks/useAssignment";
import Calendar from "../components/Calendar/Calendar";
import { useState } from "react";
import { LocalizationProvider } from "@mui/lab";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AddTaskIcon from '@mui/icons-material/AddTask';
import useClasses from "../hooks/useClasses";

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
  const { events } = useAssignment();
  const { timetable } = useClasses();
  const { name } = AccountInfo();

  function filterAssDate(task) {
    const taskdate = new Date(task.date).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return taskdate === selecteddate;
  }

  function filterClassDate(time) {
    const classdate = new Date(time).toLocaleDateString();
    const selecteddate = new Date(value).toLocaleDateString();
    return classdate === selecteddate;
  }

  return (
    <>
      <SideBar select={1} />
      <Grid
        container
        minHeight="79.5vh"
        paddingLeft={{ xs: 5, md: 35 }}
        paddingTop={2}
        paddingRight={{ xs: 5, md: 5 }}
        spacing={2}
      >
        <Grid item>
          <Stack spacing={1} padding={1}>
            <Typography variant="h4" color="inherit">
              Welcome, {name}!
            </Typography>
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
            <Box width="20vw" height="28vh" border={1} borderRadius={2}>
              This is for timer
            </Box>
          </Stack>
        </Grid>
        <Grid item>
          <Stack spacing={2}>
            <Box
              sx={{
                border: "1px solid",
                borderRadius: 3,
                padding: 2,
                maxWidth: 1200,
                alignSelf: "start",
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                marginBottom={1}
              >
                <AddTaskIcon />
                <Typography variant="h5" color="inherit">
                  Deadline Assignment
                </Typography>
                <Button color="primary" href="/assignment">
                  View All
                </Button>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  overflow: "scroll",
                  width: "55vw",
                  minHeight: 232,
                  margin: "auto",
                }}
              >
                {events.filter(filterAssDate).map((task) => (
                  <Card
                    variant="outlined"
                    sx={{
                      minWidth: 200,
                      background: task.isComplete
                        ? "#66bb6a"
                        : isAfter(new Date(), new Date(task.date))
                        ? "#f44336"
                        : isAfter(
                            tmpDate.setDate(tmpDate.getDate() + 1),
                            new Date(task.date)
                          )
                        ? "#ffa726"
                        : "",
                    }}
                  >
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
                        {task.isComplete
                          ? "Completed " +
                            formatDistanceToNow(new Date(task.Cdate), {
                              addSuffix: true,
                            })
                          : "Due " +
                            formatDistanceToNow(new Date(task.date), {
                              addSuffix: true,
                            })}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>
            <Box
              sx={{
                border: "1px solid",
                borderRadius: 3,
                padding: 1,
                width: "100%",
              }}
            >
              <Stack direction="row" spacing={0.5} justifyContent="center">
                <Typography noWrap>You have </Typography>
                {events.filter((task) => !task.isComplete).length === 0 ? (
                  <Typography>completed all the tasks</Typography>
                ) : (
                  <>
                    <Typography fontWeight={600}>
                      {events.filter((task) => !task.isComplete).length}
                    </Typography>
                    <Typography noWrap>
                      {" "}
                      tasks that are not complete.
                    </Typography>
                  </>
                )}
              </Stack>
            </Box>

            <Box
              sx={{
                border: "1px solid",
                borderRadius: 3,
                padding: 2,
                maxWidth: 1120,
                alignSelf: "start",
              }}
            >
              <Stack direction="row" justifyContent="space-between" marginBottom={2}>
              <AssignmentIcon />
                <Typography variant="h5" color="inherit" marginLeft={10}>
                  Today's class
                </Typography>
                <div>
                <Typography variant="caption" color="inherit" >
                  haven't import timetable?
                </Typography>
                <Button href="/profile">Click here</Button>
                </div>
              </Stack>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  overflow: "scroll",
                  width: "55vw",
                  minHeight: 240,
                  maxHeight: 200,
                  margin: "auto",
                }}
              >
                {timetable
                  .map((classes) => {
                    return {
                      ...classes,
                      dtstart: classes.dtstart.filter(filterClassDate),
                      dtend: classes.dtend.filter(filterClassDate),
                    };
                  })
                  .filter(
                    (classes) =>
                      classes.dtstart.length !== 0 &&
                      classes.dtstart.length !== 0
                  )
                  .map((task) => (
                    <Card variant="outlined" sx={{ minWidth: 200, width: "auto", background: "#29b6f6"}} key={task}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} gutterBottom>
                          {task?.summary}
                        </Typography>
                        <Typography variant="h7" component="div" >
                          {task?.description.split("\\n")[0]}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {task?.description.split("\\n")[1]}
                          <br />
                          {task?.location}
                        </Typography>
                        <Typography variant="body2">
                          Start:{" "}
                          {new Date(task?.dtstart).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          <br />
                          End:{" "}
                          {new Date(task?.dtend).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          <br />
                          Duration:{" "}
                          {formatDistanceStrict(
                            new Date(task?.dtstart),
                            new Date(task?.dtend),
                            {unit: 'hour'}
                          )}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
