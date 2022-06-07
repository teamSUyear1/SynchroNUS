import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import SideBar from "../components/SideBar/SideBar";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth, db, storage } from "../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Input from "@mui/material/Input";
import AccountInfo from "../hooks/AccountInfo";
import { CircularProgressbar } from "react-circular-progressbar";

function Profile() {
  const { user } = useAuth();
  const { name, avatar } = AccountInfo();
  const [progress, setProgress] = React.useState(0);
  const docRef = doc(db, "users", user.email);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    console.log(file);
    uploadFiles(file);
  };

  const changeNameHandler = () => {
    const newName = prompt("What is your name?", name);
    if (newName !== null) {
      updateDoc(docRef, {
        name: newName,
      });
    }
  };

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

  return (
    <Grid container height={"80vh"}>
      <SideBar select={5} />
      <Grid item>
        <Grid container direction="row" spacing={3} alignItems="center">
          <Grid item>
            <Stack alignItems="center" spacing={2}>
              <IconButton onClick={openFile}>
                <Avatar src={avatar} />
              </IconButton>
              <div style={{ height: 50, width: 50 }}>
                <CircularProgressbar value={progress} text={progress + "%"} />
              </div>
            </Stack>
          </Grid>
          <Grid item>
            <Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>{name}</Typography>
                <Tooltip title="Edit">
                  <IconButton onClick={changeNameHandler}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography>{user.email}</Typography>

              <form onSubmit={formHandler}>
                <input id="fileID" type="file" accept="image/*" hidden />
                <Button type="submit" variant="outlined">
                  Update profile picture
                </Button>
              </form>
            </Stack>
          </Grid>
        </Grid>
        <Typography>Zoom</Typography>
      </Grid>
    </Grid>
  );
}

export default Profile;
