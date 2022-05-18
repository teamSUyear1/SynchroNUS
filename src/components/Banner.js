import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'

function Banner() {
    return (
    <Navbar bg="dark" variant="dark">
        <Container fluid>
          <Col>
            <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/favicon.ico"
                width="30"
                height="30"
                className="d-inline-block align-midde"
              />{' '}
            SynchroNUS
            </Navbar.Brand>
            </Col>
        </Container>
       <Col>
              <Nav className="me-auto">
              <Nav.Link href="#Login">Login</Nav.Link>
              <Nav.Link href="#Signup">Signup</Nav.Link>
              </Nav>
            </Col>
    </Navbar>
    );
}

export default Banner;