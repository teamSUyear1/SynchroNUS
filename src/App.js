import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/homepage/Home";
import Profile from "./pages/profilepage/Profile";
import Login from "./pages/Login";
import Error from "./pages/Error";
import About from "./pages/aboutpage/About";
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import {
  Backdrop,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
  ThemeProvider,
} from "@mui/material";
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { useAuth } from "./hooks/useAuth";
import SignupEmail from "./pages/SignupEmail";
import SignupPw from "./pages/SignupPw";

import StudyTimer from "./pages/timerpage/StudyTimer";
import Assignment from "./pages/assignmentpage";
import Meeting from "./pages/meetingpage/Meeting";
import { useEffect, useState } from "react";


function App() {
  let mode = window.localStorage.getItem("darkMode") === null ? "true" : window.localStorage.getItem("darkMode").toString()
  const [darkMode, setDarkMode] = useState(mode === "true")
  const { user } = useAuth();
  function getMode(mode) {
    let theme;
    console.log("fun", mode)  
    if (mode) {
      console.log("dark", mode)
      theme = createTheme({
        palette: {
          mode: "dark",
          primary: { main: "rgb(102, 157, 246)" },
        },
    });
  } else {
    console.log("light")
    theme = createTheme({
      palette: {
        primary: {
          main: "#01579b",
        },
        mode: "light",
      },
    });
  }
  return theme = responsiveFontSizes(theme);

  }
//  let darkTheme = createTheme({
//     palette: {
//       mode: "dark",
//       primary: { main: "rgb(102, 157, 246)" },
//     },
//   });

//   darkTheme = responsiveFontSizes(darkTheme);

//  let lightTheme = createTheme({
//     palette: {
//       primary: {
//         main: "#01579b",
//       },
//       mode: "light",
//     },
//   });
useEffect(() => {

}, [mode])

  return (
    <ThemeProvider theme={getMode(darkMode)}>
      <Router>
        <CssBaseline enableColorScheme />
        {user === null ? (
          <Grid>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />  
            </Backdrop>
          </Grid>
        ) : (
          <>
            <Paper component={Stack} square>
              <Grid container direction="column">
                <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route
                    path="/dashboard"
                    element={user ? <Dashboard darkMode={darkMode}/> : <Navigate replace to="/" />}
                  />
                  <Route
                    path="/profile"
                    element={user ? <Profile /> : <Navigate replace to="/" />}
                  />
                  <Route
                    path="/meeting"
                    element={user ? <Meeting /> : <Navigate replace to="/" />}
                  />
                  <Route
                    path="/assignment"
                    element={
                      user ? <Assignment /> : <Navigate replace to="/" />
                    }
                  />
                  <Route
                    path="/studytimer"
                    element={
                      user ? <StudyTimer darkMode={darkMode}/> : <Navigate replace to="/" />
                    }
                  />
                  <Route
                    path="/login"
                    element={user ? <Navigate replace to="/" /> : <Login />}
                  />
                  <Route
                    path="/signup"
                    element={
                      user ? <Navigate replace to="/" /> : <SignupEmail />
                    }
                  />
                  <Route
                    path="/signup/password"
                    element={user ? <Navigate replace to="/" /> : <SignupPw />}
                  />
                  <Route path="*" element={<Error />} />
                </Routes>
              </Grid>
              <Divider variant="middle" />
            </Paper>
            <Footer />
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
