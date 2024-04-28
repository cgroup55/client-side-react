import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';;
import Form from 'react-bootstrap/Form';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#4B8443',
    borderColor: '#4B8443',

    '&:hover': {
        backgroundColor: '#2E4D11',
        borderColor: '#2E4D11',
    },
    '&:active': {
        backgroundColor: '#2E4D11',
        borderColor: '#2E4D11',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(46,77,17,.5)',
    },
});

export default function Login() {

    const [user, setUser] = useState({});



    const navigate = useNavigate();
    const redirectTo = (user) => {
        //POST user to pass on to dbs
        //check if the user that we got is a listed user
        //return from fetch
        //fetch("POST",user....)
        //return()

        //erase after dbs connection
        navigate('/homepage');
        if (user == undefined) {
            Swal.fire({
                title: "נסה שנית",
                text: "פרטייך שגויים",
                icon: "error"
            });
        }
        else 
        {
            if (user.role == 0) {
                //need to add check if user exists+take user login info***
                Swal.fire({
                    title: "נכנסת בהצלחה",
                    text: "שלום משרד!",
                    icon: "success"
                });
                //navigate('/homepage');
            }
            else {
                Swal.fire({
                    title: "פרטים שגויים",
                    text: "היכנס לאפליקציה הייעודית",
                    icon: "error"
                });
            }

        }
    }



    return (
        <>
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
            }}>
                <img src="../src/images/clearlogo.png" style={{ width: "300px", margin: "20px", marginBottom: "30px" }} alt="" />
                <h3 style={{ textAlign: 'center' }}>ברוכים הבאים!</h3>
                <br />
                <Form>
                    <Form.Group className="md-3" controlId="formBasicEmail">
                        <Form.Label>שם משתמש:</Form.Label>
                        <Form.Control type="text"
                            onChange={(e) => { setUser({ ...user, userName: e.target.value }) }}
                        />
                    </Form.Group>

                    <Form.Group className="md-3" controlId="formBasicPassword">
                        <Form.Label>סיסמא:</Form.Label>
                        <Form.Control type="password"
                            onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                        />
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
                        <BootstrapButton onClick={redirectTo}>
                            התחבר
                        </BootstrapButton>
                    </div>
                </Form>
            </div>
        </>
    )
}

