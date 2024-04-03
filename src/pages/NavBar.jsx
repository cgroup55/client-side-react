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
           

            <Navbar expand="sm" fixed="top" style={{backgroundColor:'white',height:'70px',fontSize:'20px',position:"absolute"}}>
            <Container>
           
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse >
                
                    <Nav  navbarScroll style={{backgroundColor:"white",width:'100%',position:'relative'}}>
                    <NavDropdown title="הסעות">
                            <NavDropdown.Item href="/realtimeLines">הסעות בזמן אמת</NavDropdown.Item>
                            <NavDropdown.Item href="/lines">קווי הסעה </NavDropdown.Item>
                            <NavDropdown.Item href="/transportComps">חברות הסעה </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="תלמידים" >
                            <NavDropdown.Item href="/students">נתוני תלמידים</NavDropdown.Item>
                            <NavDropdown.Item href="/schools">מוסדות לימוד</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/escorts">מלווים</Nav.Link>
                        <Nav.Link href="/reports">דוחות</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
                <Navbar.Brand href="/homepage"  >
                        <img style={{ position: 'absolute', left: '10px', top: '10px', maxHeight: '52px', maxWidth: '100%' }} src="../src/images/clearlogo.png" alt="#" />
                    </Navbar.Brand>
            </Container>
        </Navbar>
        </>
    )
}
