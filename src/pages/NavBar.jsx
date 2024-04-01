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
            <Navbar bg="white" data-bs-theme="light" fixed="top" style={{ fontSize: '19px' ,height:'70px'}}>
                <Container >
                    <Nav style={{position:'relative',right:'10px',top:'2px'}}>
                        <NavDropdown title="הסעות" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/realtimeLines">הסעות בזמן אמת</NavDropdown.Item>
                            <NavDropdown.Item href="/lines">קווי הסעה </NavDropdown.Item>
                            <NavDropdown.Item href="/transportComps">חברות הסעה </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="תלמידים" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/students">נתוני תלמידים</NavDropdown.Item>
                            <NavDropdown.Item href="/schools">מוסדות לימוד</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/escorts">מלווים</Nav.Link>
                        <Nav.Link href="/reports">דוחות</Nav.Link>

                    </Nav>
                    <Navbar.Brand href="/homepage"  >
                        <img style={{position:'absolute',left:'10px',top:'10px',maxHeight:'52px',maxWidth:'90%'}} src="../src/images/clearlogo.png" alt="#" />
                    </Navbar.Brand>
                </Container>
            </Navbar>

        </>
    )
}
