// src/components/Layout.jsx
import { Container, Navbar, Nav } from "react-bootstrap";

export default function Layout({ children }) {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">EventConnect</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/events">Events</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="my-4">{children}</Container>

      <footer className="bg-dark text-light py-3 mt-4">
        <Container className="text-center">
          &copy; {new Date().getFullYear()} EventConnect. All rights reserved.
        </Container>
      </footer>
    </>
  );
}
