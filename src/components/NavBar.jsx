import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';

export default function NavBar() {

    let location = useLocation();
    let { pathname } = location;

    //show navBar only after login
    if (pathname == '/' || pathname == '/EscortHomePage' || pathname == '/ParentHomePage') {
        return null;
    }
    return (
        <>

            <Navbar sticky='top' expand="sm" fixed="top" style={{ backgroundColor: 'white', height: '70px', fontSize: '20px', position: "absolute" }}>
                <Container>

                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse >

                        <Nav navbarScroll style={{ backgroundColor: "white", width: '100%', top: '10px' }}>
                            <NavDropdown title="הסעות">
                                <NavDropdown.Item href="#/realtimeLines">הסעות בזמן אמת</NavDropdown.Item>
                                <NavDropdown.Item href="#/lines">קווי הסעה </NavDropdown.Item>
                                <NavDropdown.Item href="#/transportComps">חברות הסעה </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="תלמידים" >
                                <NavDropdown.Item href="#/students">נתוני תלמידים</NavDropdown.Item>
                                <NavDropdown.Item href="#/schools">מוסדות לימוד</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="#/escorts">מלווים</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                    <Navbar.Brand href="#/homepage"  >
                        <img style={{ position: 'absolute', left: '40px', top: '10px', maxHeight: '52px', maxWidth: '100%' }} src="../src/images/clearlogo.png" alt="#" />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </>
    )
}
