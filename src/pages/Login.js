import React, { useState } from "react";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [checked, setChecked] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const { signInWithGoogle, signin } = useAuth();

  const handleLogin = () => {
    signin(email, password).catch((error) => {
      console.log(error.code)
      if (error.code.includes("invalid-email")){
        alert("Please enter correct email");
      } else if (error.code.includes("user-not-found")){
        alert("Not registered, please sign up")
      } else if (error.code.includes("wrong-password")){
        alert("Wrong password! Please try agin")
      } else{
        alert(error.code)
      }
     
    });
  };

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

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
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <Typography>Log in to your account</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type={checked ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  label={"show password"}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="show password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleLogin}
              disabled={!validateForm()}
            >
              {" "}
              Login{" "}
            </Button>
          </Grid>
        </Grid>
        <Grid container xs={12} paddingTop={4} justifyContent="center">
          <Button
            variant="contained"
            color="error"
            startIcon={<GoogleIcon />}
            onClick={signInWithGoogle}
          >
            Sign in with Google
          </Button>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Login;
