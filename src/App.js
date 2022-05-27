import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Error from "./pages/Error";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Divider, Grid, Paper, Stack } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SideBar from "./components/SideBar/SideBar";


function App() {


  return (
    <Router>
      <CssBaseline enableColorScheme />
      <Paper component={Stack} square>
        <Grid container direction="column">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </Grid>
        <Divider variant="middle" />
      </Paper>

      <Footer />
    </Router>
  );
}

export default App;
