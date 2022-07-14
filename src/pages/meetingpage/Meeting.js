import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Popup from "../../components/Popup/Popup";
import SideBar from "../../components/SideBar/SideBar";
import MeetingForm from "./MeetingForm";

function Meeting() {
  const [openPopup, setOpenPopup] = useState(false);
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
          <Stack spacing={3} direction={{ xs: "column", xl: "row" }}>
            <Button variant="contained" onClick={() => setOpenPopup(true)}>Add Meeting</Button>
          </Stack>
        </Grid>
      </Grid>
      <Popup
        title="Add Meeting"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <MeetingForm setOpenPopup={setOpenPopup}></MeetingForm>
      </Popup>
    </>
  );
}

export default Meeting;
