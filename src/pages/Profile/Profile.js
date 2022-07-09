import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth, db, storage } from "../../hooks/useAuth";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import AccountInfo from "../../hooks/AccountInfo";
import Popup from "../../components/Popup/Popup";
import ProfileForm from "./ProfileForm";
import useClasses from "../../hooks/useClasses";
import ICalParser from "ical-js-parser";
import { parseISO } from "date-fns";
import { RRule } from "rrule";

function Profile() {
  const { user } = useAuth();
  const { name, avatar } = AccountInfo();
  const [progress, setProgress] = useState(0);
  const docRef = doc(db, "users", user.email);
  const [openPopup, setOpenPopup] = useState(false);
  const { setTimetableState } = useClasses();
  const [disabledButt, setDisabledButt] = useState(false);

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    const parsed = ICalParser.toJSON(content);
    setTimetable(parsed.events.map(allday));
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  function rruleFormat(task, dt) {
    const rule = RRule.fromString(
      "DTSTART:" + dt + ";\n" + "RRULE:" + task.rrule
    );
    return rule.all();
  }

  function allday(task) {
    if (task.rrule === undefined) {
      return addTimetable(
        task.description,
        task.summary,
        parseISO(task.dtstart.value),
        parseISO(task.dtend.value),
        task.location === undefined ? null : task.location
      );
    } else {
      return addTimetable(
        task.description,
        task.summary,
        rruleFormat(task, task.dtstart.value),
        rruleFormat(task, task.dtend.value),
        task.location === undefined ? null : task.location
      );
    }
  }

  function addTimetable(description, summary, dtstart, dtend, location) {
    const newTimetable = {
      type: "timetable",
      description: description,
      summary: summary,
      dtstart: dtstart.toString().split(","),
      dtend: dtend.toString().split(","),
      location: location,
    };
    return newTimetable;
  }

  function setTimetable(newClass) {
    setTimetableState(newClass);
    setDoc(doc(db, "timetable", user?.uid), { classes: newClass })
      .then(() => {
        alert("Uploaded sucessfully!");
        setDisabledButt(true);
      })
      .catch((e) => {
        alert(e.code);
      });
  }

  function deleteTimetable() {
    deleteDoc(doc(db, "timetable", user?.uid));
    alert("Reset successfully!");
    document.getElementById("icsID").value = "";
    setDisabledButt(false);
  }

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/image/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          updateDoc(docRef, {
            avatar: url,
          });
        });
      }
    );
  };

  const openFile = () => {
    document.getElementById("fileID").click();
    setProgress(0);
  };

  const openICS = () => {
    document.getElementById("icsID").click();
  };

  useEffect(() => {
    const unsubscribe = async () => {
      const ref = doc(db, "timetable", user?.uid);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        setDisabledButt(true);
      } else {
        setDisabledButt(false);
      }
    };
    unsubscribe();
  }, [user?.uid]);

  return (
    <>
      <SideBar select={6} />
      <Grid container justifyContent={"center"} minHeight="80vh" spacing={3}>
        <Grid item alignSelf={"center"}>
          <Box border={"1px solid"} borderRadius={3} padding={3}>
            <Stack direction="row" spacing={3}>
              <Stack alignItems="center" spacing={3}>
                <IconButton onClick={openFile}>
                  <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
                </IconButton>
                <div style={{ width: "100%", height: "100%" }}>
                  <LinearProgress variant="determinate" value={progress} />
                </div>
                <form onSubmit={formHandler}>
                  <input id="fileID" type="file" accept="image/*" hidden />
                  <Button type="submit" variant="outlined">
                    Update
                  </Button>
                </form>
              </Stack>
              <Stack justifyContent="center">
                <Stack direction="row" spacing={1}>
                  <Typography variant="h4" component={Typography}>
                    {name}
                  </Typography>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setOpenPopup(true)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Typography variant="h5" component={Typography} color="primary">
                  {user.email}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Grid>
        <Grid item alignSelf={"center"}>
          <Stack>
            <Button
              onClick={openICS}
              variant="contained"
              disabled={disabledButt}
            >
              Upload ics file
            </Button>
            <Button onClick={deleteTimetable}>Reset timetable</Button>
            <input
              id="icsID"
              type="file"
              accept="text/calendar"
              onChange={(e) => handleFileChosen(e.target.files[0])}
              hidden
            />
          </Stack>
        </Grid>
      </Grid>
      <Popup
        title="What is your name?"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ProfileForm name={name} docRef={docRef} setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
}

export default Profile;
