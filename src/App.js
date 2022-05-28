import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Error from "./pages/Error";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import {
  Backdrop,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "./components/SideBar/SideBar";
import { useAuth } from "./hooks/useAuth";
import SignupEmail from "./pages/SignupEmail";
import SignupPw from "./pages/SignupPw";

function App() {
  const { user } = useAuth();

  return (
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
              <Navbar />
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  path="/dashboard"
                  element={user ? <Dashboard /> : <Navigate replace to="/" />}
                />
                <Route
                  path="/profile"
                  element={user ? <Profile /> : <Navigate replace to="/" />}
                />
                <Route
                  path="/login"
                  element={user ? <Navigate replace to="/" /> : <Login />}
                />
                <Route
                  path="/signup"
                  element={user ? <Navigate replace to="/" /> : <SignupEmail />}
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
  );
}

export default App;
