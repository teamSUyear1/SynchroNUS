import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

function ProfileForm({ name, docRef, setOpenPopup }) {
  const [newName, setNewName] = useState(name);
  const changeNameHandler = (e) => {
    e.preventDefault();
    updateDoc(docRef, {
      name: newName,
    });
    setOpenPopup(false);
  };

  return (
    <form onSubmit={changeNameHandler}>
      <Typography>New Name</Typography>
      <TextField
        hiddenLabel
        variant="filled"
        defaultValue={newName}
        onChange={(e) => {
          setNewName(e.target.value);
        }}
      ></TextField>
      <Box marginTop={2}>
        <Button variant="contained" type="submit">
          Change
        </Button>
      </Box>
    </form>
  );
}

export default ProfileForm;
