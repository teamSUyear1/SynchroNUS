import {
  Alert,
  Button,
  IconButton,
  Paper,
  Rating,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Tab from "../../components/Tabs/tab";
import TabPanel from "@mui/lab/TabPanel";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRateIcon from "@mui/icons-material/StarRate";
import {  formatDistanceToNow } from "date-fns";
import CheckIcon from "@mui/icons-material/Check";

function AssignmentTable(props) {
  const { events, setEvents, delEvent } = props;

  function filterImp(task, index) {
    return task.importance === index;
  }

  function filterDone(task) {
    return task.isComplete === true;
  }

  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    const newTasks = [
      // Once again, this is the spread operator
      ...events.slice(0, toToggleTaskIndex),
      {
        title: toToggleTask.title,
        type: toToggleTask.type,
        importance: toToggleTask.importance,
        date: toToggleTask.date,
        isComplete: !toToggleTask.isComplete,
      },
      ...events.slice(toToggleTaskIndex + 1),
    ];
    // We set new tasks in such a complex way so that we maintain immutability
    // Read this article to find out more:
    // https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

    setEvents(newTasks);
  }

  return (
    <Tab
      label1="All"
      label2="5"
      label3="4"
      label4="3"
      label5="2"
      label6="1"
      label7="Completed"
      label8="Overdue"
    >
      <TabPanel value="1">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Importance</TableCell>
                <TableCell align="left">Assignment Title</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events === undefined || events.length === 0 ? (
                <Typography>No Assignement</Typography>
              ) : (
                events.map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Typography>
                          {row.importance}
                          <StarRateIcon fontSize="small"></StarRateIcon>
                        </Typography>
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="center">{row.type}</TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="2">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 5))
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="3">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 4))
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 3))
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="5">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 2))
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="6">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .filter((task) => filterImp(task, 1))
                .map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">
                        <Typography component="p">
                          {new Date(row.date).toDateString()}
                        </Typography>
                        <Typography component="p">
                          {new Date(row.date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography component="p">
                          {formatDistanceToNow(new Date(row.date), {
                            addSuffix: true,
                          })}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          checked={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => delEvent(row)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="7">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Type</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.filter(filterDone).map((row, index) => (
                <>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      <Typography component="p">
                        {new Date(row.date).toDateString()}
                      </Typography>
                      <Typography component="p">
                        {new Date(row.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                      <Typography component="p">
                        {formatDistanceToNow(new Date(row.date), {
                          addSuffix: true,
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                    <TableCell align="right">
                      <Switch
                        size="small"
                        checked={row.isComplete}
                        onChange={() => handleTaskCompletionToggled(row, index)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Tab>
  );
}

export default AssignmentTable;
