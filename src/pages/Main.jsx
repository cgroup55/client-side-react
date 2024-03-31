import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Main() {
    return (
        <div>
            <Navbar bg="white" data-bs-theme="light" fixed="top" style={{ fontSize: '20px' }}>
                <Container >
                    <Nav >
                        <NavDropdown title="הסעות" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/1.1">הסעות בזמן אמת</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.2">קווי הסעה </NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.3">חברות הסעה </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="תלמידים" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/2.1">נתוני תלמידים</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.2">מוסדות לימוד</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#pricing">מלווים</Nav.Link>
                        <Nav.Link href="#pricing">דוחות</Nav.Link>
                        
                    </Nav>
                    <Navbar.Brand href="#home"><img src="../src/images/clearlogo.png" alt="#" width={250} height={75} /></Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}
