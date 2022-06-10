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
import React from "react";
import Tab from "../../components/Tabs/tab";
import TabPanel from "@mui/lab/TabPanel";
import DeleteIcon from "@mui/icons-material/Delete";

function AssignmentTable(props) {
  const { events, setEvents, delEvent } = props;
  console.log(events);

  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    const newTasks = [
      // Once again, this is the spread operator
      ...events.slice(0, toToggleTaskIndex),
      {
        title: toToggleTask.title,
        code: toToggleTask.code,
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
    /* <Stack margin={2}>
      <div>
      <Paper elevation={0} variant="outlined">
        <Typography variant="h8" gutterBottom component="div">
          Assignment Title.
        </Typography>
        <Rating></Rating>
        </Paper>
      </div>
    </Stack> */
    <Tab label1="All" label2={5} label3="4" label4="3" label5="2" label6="1">
      <TabPanel value="1">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Importance</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Module Code</TableCell>
                <TableCell align="right">Due</TableCell>
                <TableCell align="right">Done</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events === "" ? (
                <Typography>No Assignement</Typography>
              ) : (
                events.map((row, index) => (
                  <>
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.importance}
                      </TableCell>
                      <TableCell align="right">{row.title}</TableCell>
                      <TableCell align="right">{row.code}</TableCell>
                      <TableCell align="right">
                        <Typography>{row.date}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Switch
                          size="small"
                          value={row.isComplete}
                          onChange={() =>
                            handleTaskCompletionToggled(row, index)
                          }
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton>
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
                <TableCell>Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Module Code</TableCell>
                <TableCell align="right">Done</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel value="3">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Due</TableCell>
                <TableCell align="right">Assignment Title</TableCell>
                <TableCell align="right">Module Code</TableCell>
                <TableCell align="right">Done</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </TabPanel>
    </Tab>
  );
}

export default AssignmentTable;
