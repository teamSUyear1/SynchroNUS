import React from "react";
import {Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <Nav className="justify-content-center" defaultActiveKey="/" as="ul">
        <Nav.Item as="li">
          <Nav.Link as={Link} to="/" style={{ color: "white" }}>
            About
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1" style={{ color: "white" }}>
            Documentation
          </Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link
            href="https://github.com/teamSUyear1/SynchroNUS-website"
            style={{ color: "white" }}
          >
            Github
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}
