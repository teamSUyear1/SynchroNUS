import React, { useState } from "react";
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [checked, setChecked] = React.useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const { signInWithGoogle } = useAuth();

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
        sx={{ border: "1px solid grey", borderRadius:"10px" , height: "auto", width: "fit-content", backgroundColor:"background.default" }}
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
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  label={"Keep me logged in"}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              }
              label="Keep me logged in"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" disabled={!validateForm()}>
              {" "}
              Login{" "}
            </Button>
          </Grid>
        </Grid>
        <Grid container xs={12} paddingTop={4} justifyContent="center">
          <Button variant="contained" color="error" startIcon={<GoogleIcon />} onClick = {signInWithGoogle}>
            Sign in with Google
          </Button>
        </Grid>
      </Box>
    </Stack>
  );
};

export default Login;
