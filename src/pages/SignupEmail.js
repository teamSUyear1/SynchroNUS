import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Stack,
  Box,
  Link,
  IconButton,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const SignupEmail = () => {
  const [email, setEmail] = useState("");

  const emailSaveHandler = () => {
    window.localStorage.setItem("email", email)
  };

  const emailValid = () => {
    const regex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding={10}
    >
      <Box
        component="span"
        sx={{
          border: "1px solid grey",
          borderRadius: "10px",
          height: "auto",
          width: "fit-content",
          backgroundColor: "background.default",
        }}
        padding={10}
      >
        <Grid
          container
          width="auto"
          spacing={2}
          direction={"column"}
          justify={"center"}
        >
          <Grid item xs={12}>
            <Typography>Enter your email</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2} ml={-7}>
              <ArrowRightAltIcon sx={{ fontSize: 35 }} />
              <TextField
                label="Email"
                color={
                  emailValid()
                    ? "success"
                    : email.length === 0
                    ? "warning"
                    : "error"
                }
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>
          </Grid>

          <Grid item xs={12} alignSelf="flex-end">
            <IconButton
              disabled={!emailValid()}
              href="/signup/password"
              onClick={emailSaveHandler}
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container xs={12} paddingTop={4} justifyContent="center">
          <Link variant="contained" href="/login">
            Already have account?
          </Link>
        </Grid>
      </Box>
    </Stack>
  );
};

export default SignupEmail;
