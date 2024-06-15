import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginSuccessMessage } from '../tools/swalUtils';
import { create } from "../tools/api";
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {
    const url = 'api/User/Login';
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const checkUser = async (userToCheck) => {
        console.log('userToCheck:', userToCheck);
        let res = await create(url, userToCheck);
        if (res == undefined || res == null) {
            Swal.fire({
                title: "קיימת תקלה",
                text: "אנא נסה שנית במועד מאוחר יותר",
                icon: "error"
            });
            return;
        }
        return res;
    }

    const redirectTo = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            let userFromDB = await checkUser(user);
            console.log('userFromDB:', userFromDB);
            if (userFromDB[0].role == 1) {
                loginSuccessMessage('משרד');
                navigate('/homepage');
            }
            else if (userFromDB[0].role == 2) {
                loginSuccessMessage(userFromDB[0].fullName);
                navigate('/EscortHomePage', { state: { userFromDB } });
            }
            else if (userFromDB[0].role == 3) {
                //loginSuccessMessage(userFromDB[0].);
                // navigate('/ParentHomePage');
            }
            else {
                Swal.fire({
                    title: "לא נמצא משתמש עם פרטים אלה במערכת",
                    text: "נסה להזין שנית",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error during login:", error);
        } finally {
            setLoading(false);
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
                <Form onSubmit={redirectTo}>
                    <Form.Group className="md-3" controlId="formBasicEmail">
                        <Form.Label>שם משתמש:</Form.Label>
                        <Form.Control type="text"
                            onChange={(e) => { setUser({ ...user, userName: e.target.value }) }}
                            required />
                    </Form.Group>

                    <Form.Group className="md-3" controlId="formBasicPassword">
                        <Form.Label>סיסמא:</Form.Label>
                        <Form.Control type="password"
                            onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                            required />
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
                        <Button type='submit' disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'התחבר'}
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}
