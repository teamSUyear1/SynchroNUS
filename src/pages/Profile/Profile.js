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
import React, { Fragment, useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth, db, storage } from "../../hooks/useAuth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Input from "@mui/material/Input";
import AccountInfo from "../../hooks/AccountInfo";
import Popup from "../../components/Popup/Popup";
import ProfileForm from "./ProfileForm";

function Profile() {
  const { user } = useAuth();
  const { name, avatar } = AccountInfo();
  const [progress, setProgress] = useState(0);
  const docRef = doc(db, "users", user.email);
  const [openPopup, setOpenPopup] = useState(false);

  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
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
    <>
      <SideBar select={5} />
      <Grid container justifyContent={"center"} minHeight="80vh">
        <Grid item alignSelf={"center"}>
        <Box border={"1px solid"} borderRadius={3} padding={3} >
        <Stack direction="row" spacing={3}>
            <Stack alignItems="center" spacing={3}>
              <IconButton onClick={openFile}>
                <Avatar src={avatar} sx={{width: 100, height: 100}}/>
              </IconButton>
              <div style={{ width: "100%", height: "100%"}}>
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
                <Typography variant="h4" component={Typography} >{name}</Typography>
                <Tooltip title="Edit">
                  <IconButton onClick={() => setOpenPopup(true)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Typography variant="h5" component={Typography} color="primary">{user.email}</Typography>
            </Stack>
            </Stack>
            </Box>
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
