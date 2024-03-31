import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Login from './Login';
import { Link } from 'react-router-dom';

export default function NavBar() {
    return (
        <>
            <Navbar bg="white" data-bs-theme="light" fixed="top" style={{ fontSize: '20px' }}>
                <Container >
                    <Nav>
                        <NavDropdown title="הסעות" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/students">הסעות בזמן אמת</NavDropdown.Item>
                            <NavDropdown.Item href="/">קווי הסעה </NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.3">חברות הסעה </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="תלמידים" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/2.1">נתוני תלמידים</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.2">מוסדות לימוד</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#pricing">מלווים</Nav.Link>
                        <Nav.Link href="#pricing">דוחות</Nav.Link>

                    </Nav>
                    <Navbar.Brand href="#home"><img className='w-25' src="../src/images/clearlogo.png" alt="#"  /></Navbar.Brand>
                </Container>
            </Navbar>

        </>
    )
}
