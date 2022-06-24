import {
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Tab from "../../components/Tabs/tab";
import TabPanel from "@mui/lab/TabPanel";
import DeleteIcon from "@mui/icons-material/Delete";
import StarRateIcon from "@mui/icons-material/StarRate";
import { formatDistanceToNow, compareAsc, isAfter } from "date-fns";

function AssignmentTable(props) {
  const { events, delEvent, handleSort } = props;

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
        Cdate: new Date().toISOString(),
        isComplete: !toToggleTask.isComplete,
      },
      ...events.slice(toToggleTaskIndex + 1),
    ];
    // We set new tasks in such a complex way so that we maintain immutability
    // Read this article to find out more:
    // https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

    handleSort(newTasks);
  }

  const tablehead1 = (
    <TableHead>
      <TableRow>
        <TableCell>Type</TableCell>
        <TableCell align="center">Assignment Title</TableCell>
        <TableCell align="center">Due</TableCell>
        <TableCell align="right">Done</TableCell>
        <TableCell align="right">Action</TableCell>
      </TableRow>
    </TableHead>
  );
  const tablehead2 = (e) => (
    <TableHead>
      <TableRow>
        <TableCell>No.</TableCell>
        <TableCell align="center">{e} on</TableCell>
        <TableCell align="center">Assignment Title</TableCell>
        <TableCell align="center">Type</TableCell>
        <TableCell align="right">Action</TableCell>
      </TableRow>
    </TableHead>
  );

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
        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Importance</TableCell>
                <TableCell align="center">Assignment Title</TableCell>
                <TableCell align="center">Type</TableCell>
                <TableCell align="center">Due</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events === undefined || events.length === 0 ? (
                <Typography>No Assignment</Typography>
              ) : (
                events.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography>
                        {row.importance}
                        <StarRateIcon fontSize="small"></StarRateIcon>
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
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
                        onChange={() => handleTaskCompletionToggled(row, index)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="2">
        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
          <Table>
            {tablehead1}
            <TableBody>
              {events.map((row, index) =>
                filterImp(row, 5) && !filterDone(row) ? (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
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
                        onChange={() => handleTaskCompletionToggled(row, index)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="3">
        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
          <Table>
            {tablehead1}
            <TableBody>
              {events.map((row, index) =>
                filterImp(row, 4) && !filterDone(row) ? (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
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
                        onChange={() => handleTaskCompletionToggled(row, index)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="4">
        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
          <Table>
            {tablehead1}
            <TableBody>
              {events.map((row, index) =>
                filterImp(row, 3) && !filterDone(row) ? (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
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
                        onChange={() => handleTaskCompletionToggled(row, index)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="5">
        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
          <Table>
            {tablehead1}
            <TableBody>
              {events.map((row, index) =>
                filterImp(row, 2) && !filterDone(row) ? (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
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
                        onChange={() => handleTaskCompletionToggled(row, index)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="6">
        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
          <Table>
            {tablehead1}
            <TableBody>
              {events.map((row, index) =>
                filterImp(row, 1) && !filterDone(row) ? (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.type}
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
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
                        onChange={() => handleTaskCompletionToggled(row, index)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ) : (
                  <></>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="7">
        <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
          <Table>
            {tablehead2("Completed")}
            <TableBody>
              {events
                .filter(filterDone)
                .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      <Typography varient="p" color="#81c784">
                        {new Date(row.Cdate).toDateString()}
                      </Typography>
                      <Typography varient="p" color="#81c784">
                        {new Date(row.Cdate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="8">
        <TableContainer component={Paper} sx={{ maxHeight: "65vh" }}>
          <Table>
            {tablehead2("Due")}
            <TableBody>
              {events
                .filter(
                  (task) =>
                    isAfter(new Date(), new Date(task.date)) &&
                    !filterDone(task)
                )
                .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
                .map((row, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="center">
                      <Typography component="p" color="error.light">
                        {new Date(row.date).toDateString()}
                      </Typography>
                      <Typography component="p" color="error.light">
                        {new Date(row.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">{row.title}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => delEvent(row)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Tab>
  );
}

export default AssignmentTable;
