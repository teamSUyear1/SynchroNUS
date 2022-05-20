import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Error from "./pages/Error";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className={'background-dark'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
