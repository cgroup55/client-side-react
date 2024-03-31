import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Main() {
  return (
    <div>
    
        <Navbar  data-bs-theme="light" fixed="top" >
        <Container>
          <Navbar.Brand href="#home"><img src="../../images/logo.jpeg" alt="#" /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  )
}
