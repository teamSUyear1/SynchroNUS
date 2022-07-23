import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Stack,
  Box,
  IconButton,
} from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useAuth } from "../hooks/useAuth";

const SignupPw = () => {
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [select, setSelect] = useState(0);
  //Destructuring of useAuth into signup function (signup defined in useAuth.js)
  const { signup } = useAuth();
  //Email storage from SignupEmail
  const email = window.localStorage.getItem("email");

  const createUserHandler = () => {
    window.localStorage.setItem("email", "");
    signup(email, password).catch(error => {
      if (error.code.includes("email-already-in-use")){
        alert("Email had registered, please log in")
      } else {
        alert(error.code)
      }
    });
  };
  const cpasswordValid = () => {
    return cpassword === password;
  };

  const passwordValid = () => {
    const regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    return regex.test(password);
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      padding={{xs: 5, md: 10}}
      height="79.5vh"
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
            <Typography>Set your password</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2} ml={-7}>
              {select === 1 ? (
                <ArrowRightAltIcon sx={{ fontSize: 35 }} />
              ) : (
                <HorizontalRuleIcon sx={{ fontSize: 35 }} />
              )}
              <TextField
                label="Password"
                type={"password"}
                color={
                  passwordValid()
                    ? "success"
                    : password.length === 0
                    ? "warning"
                    : "error"
                }
                onChange={(e) => setPassword(e.target.value)}
                onClick={() => setSelect(1)}
              ></TextField>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2} ml={-7}>
              {select === 2 ? (
                <ArrowRightAltIcon sx={{ fontSize: 35 }} />
              ) : (
                <HorizontalRuleIcon sx={{ fontSize: 35 }} />
              )}
              <TextField
                label="Confirm password"
                type={"password"}
                onChange={(e) => setCpassword(e.target.value)}
                color={
                  cpasswordValid() && passwordValid() ? "success" : "error"
                }
                onClick={() => setSelect(2)}
              ></TextField>
            </Stack>
          </Grid>

          <Grid item xs={12} alignSelf="flex-end">
            <Stack direction="row">
              <IconButton href="/signup">
                <ArrowBackIosRoundedIcon />
              </IconButton>
              <IconButton
                disabled={!(passwordValid() && cpasswordValid())}
                onClick={createUserHandler}
              >
                <ArrowForwardIosRoundedIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item fontSize={13} letterSpacing={-0.5} ml={-6}>
            Password must contain 8 charaters with at least
            <li>one lowercase alphabetical character</li>
            <li>one uppercase alphabetical character</li>
            <li>one numeric character</li>
            <li>one special character</li>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default SignupPw;
