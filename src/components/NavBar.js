import {Nav, Navbar, Container, Col} from 'react-bootstrap'
import React from "react";
import {
  Link
} from "react-router-dom";

function NavBar() {
  return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container fluid>
              <Navbar.Brand href="/">
                <img
                  alt=""
                  src="/favicon.ico"
                  width="40"
                  height="40"
                  className="d-inline-block align-midde"
                />{" "}
                SynchroNUS
              </Navbar.Brand>
            <Col>
              <Nav className="me-auto" variant="pills" >
                  <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                  <Nav.Link as={Link} to={"/features"}>Features</Nav.Link>
                  <Nav.Link as={Link} to={"/about"}>About</Nav.Link>
              </Nav>
            </Col>
          </Container>
          <Col>
              <Nav>
              <Nav.Item>
                <Nav.Link href="#Login">Login</Nav.Link>
              </Nav.Item>
                <Nav.Item>
                <Nav.Link href="#Signup">Signup</Nav.Link>
              </Nav.Item>
              </Nav>
            </Col>
        </Navbar>
      </div>
  );
}

export default NavBar;
