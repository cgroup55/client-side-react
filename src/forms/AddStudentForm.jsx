import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { fetchCities, fetchStreetsByCity } from '../tools/cities&streets';
import { useNavigate } from 'react-router-dom';

export default function AddStudentForm() {

    const navigate = useNavigate();

    //State for student type (רווחה, פנימיה, רגיל)
    const [stuKind, setstuKind] = useState("");
    // State for toggling the additional contact section
    const [addContact, setaddContact] = useState(false);
    //States for handling the addresses
    const [cities, setCities] = useState([]);
    const [filteredCities1, setFilteredCities1] = useState([]);
    const [filteredCities2, setFilteredCities2] = useState([]);
    const [selectedCity1, setSelectedCity1] = useState("");
    const [selectedCity2, setSelectedCity2] = useState("");
    const [streets1, setStreets1] = useState([]);
    const [streets2, setStreets2] = useState([]);
    const [selectedStreet1, setSelectedStreet1] = useState("");
    const [selectedStreet2, setSelectedStreet2] = useState("");

    //Render the cities on-load
    useEffect(() => {
        fetchCities().then(cities => setCities(cities));
    }, []);


    //Handle city input change for both contacts
    const handleCityInputChange = (event, setFilteredCities, setSelectedCity, setStreets) => {
        const inputValue = event.target.value;
        const filteredCities = cities.filter(city =>
            city.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setFilteredCities(filteredCities);
        setSelectedCity(inputValue);
        setStreets([]);
        fetchStreetsByCity(inputValue).then(streets => setStreets(streets));
    };

    //Handle street input change for both contacts
    const handleStreetInputChange = (event, setSelectedStreet) => {
        setSelectedStreet(event.target.value);
    };


    //show social worker section on condition
    const handleStuKindChange = (e) => {
        setstuKind(e.target.value);
    };

    //Toggle the additional parent section
    const showAddContact = () => {
        setaddContact(true);
        event.target.disabled = true;
    }


    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form here
        // If valid, save new student
        if (true) {
            //logic to check validity of new stu
            navigate('/students');
        }
        else {
            //הודעה על כשלון
        }
    }

    return (

        <div className='container mt-5 form-container'>
            <div className='row' style={{ paddingRight: '50px' }}>
                <Form onSubmit={handleSubmit}>
                    <h2>הוספת תלמיד</h2>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm'>
                        <h5>תלמיד</h5>

                        <Form.Group controlId="stu_firstName">
                            <Form.Label>שם פרטי</Form.Label>
                            <Form.Control type="text" name="stu_firstName" required />
                        </Form.Group>

                        <Form.Group controlId="stu_lastName">
                            <Form.Label>שם משפחה</Form.Label>
                            <Form.Control type="text" name="stu_lastName" />
                        </Form.Group>

                        <Form.Group controlId="stu_id">
                            <Form.Label>תעודת זהות</Form.Label>
                            <Form.Control type="text" name="stu_id" />
                        </Form.Group>

                        <Form.Group controlId="stu_dateofbirth">
                            <Form.Label>תאריך לידה</Form.Label>
                            <Form.Control type="date" name="stu_dateofbirth" />
                        </Form.Group>

                        <Form.Group controlId="stu_grade">
                            <Form.Label>כיתה</Form.Label>
                            <Form.Control type="text" name="stu_grade" />
                        </Form.Group>

                        <Form.Group controlId="stu_school">
                            <Form.Label>מוסד לימודי</Form.Label>
                            <Form.Control as="select" defaultValue={0}>
                                <option>בחר...</option>
                                <option>...</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm' >
                        <h5>פרטי לקות</h5>
                        <Form.Group controlId="stu_dateofplacementcom">
                            <Form.Label>תאריך ועדת השמה</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <Form.Group controlId="stu_studentkind">
                            <Form.Label>סיווג תלמיד</Form.Label>
                            <Form.Control as="select" defaultValue={0} onChange={handleStuKindChange}>
                                <option value={0}>בחר...</option>
                                <option value={"רווחה"}>רווחה</option>
                                <option value={"פנימיה"}>פנימיה</option>
                                <option value={"רגיל"}>רגיל</option>
                            </Form.Control>
                        </Form.Group>

                        {stuKind === "רווחה" && (
                            <div className='socialDiv' >
                                <Form.Group controlId="stu_socialworker">
                                    <Form.Label>עובד סוציאלי</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                                <Form.Group controlId="stu_socialworkercell">
                                    <Form.Label>נייד עובד סוציאלי</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </div>
                        )}

                        <Form.Group controlId="stu_disabilitiykind">
                            <Form.Label>סוג לקות</Form.Label>
                            <Form.Control as="select" defaultValue={0}>
                                <option value={0}>בחר...</option>
                                <option value={1}>אוטיזם</option>
                                <option value={2}>פיגור שכלי</option>
                                <option value={3}>נכות פיזית</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="stu_comments">
                            <Form.Label>הערות</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                    </div>

                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm' >
                        <h5>הורה</h5>
                        <Form.Group controlId="stu_parent1name">
                            <Form.Label>שם הורה</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group controlId="stu_parent1cell">
                            <Form.Label>נייד הורה</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group controlId="stu_parent1city">
                            <Form.Label>עיר</Form.Label>
                            <Form.Control
                                list="cities-data1"
                                onChange={(e) => handleCityInputChange(e, setFilteredCities1, setSelectedCity1, setStreets1)}
                                onInput={(e) => handleCityInputChange(e, setFilteredCities1, setSelectedCity1, setStreets1)}
                            />
                            <datalist id="cities-data1">
                                {filteredCities1.map((city, index) => (
                                    <option key={index} value={city} />
                                ))}
                            </datalist>
                        </Form.Group>

                        <Form.Group controlId="stu_parent1street">
                            <Form.Label>רחוב</Form.Label>
                            <Form.Control as="select" value={selectedStreet1} onChange={(e) => handleStreetInputChange(e, setSelectedStreet1)}>
                                {streets1.map((street, index) => (
                                    <option key={index} value={street}>{street}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="stu_parent1homeNum">
                            <Form.Label>מספר בית</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
<br />
                        <Button type='button' className='btn btn-light' onClick={showAddContact} disabled={addContact} style={{ border: '2px solid black' }}> הוסף איש קשר
                            <FaPlus style={{ paddingBottom: '2px', paddingRight: '4px' }} />
                        </Button>


                    </div>

                    {addContact && (
                        <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm'>
                            <h5>איש קשר</h5>
                            <Form.Group controlId="stu_parent2name">
                                <Form.Label>שם איש קשר</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group controlId="stu_parent2cell">
                                <Form.Label>נייד איש קשר</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>

                            <Form.Group controlId="stu_parent2city">
                                <Form.Label>עיר</Form.Label>
                                <Form.Control
                                    list="cities-data2"
                                    onChange={(e) => handleCityInputChange(e, setFilteredCities2, setSelectedCity2, setStreets2)}
                                    onInput={(e) => handleCityInputChange(e, setFilteredCities2, setSelectedCity2, setStreets2)}
                                />
                                <datalist id="cities-data2">
                                    {filteredCities2.map((city, index) => (
                                        <option key={index} value={city} />
                                    ))}
                                </datalist>
                            </Form.Group>

                            <Form.Group controlId="stu_parent2street">
                                <Form.Label>רחוב</Form.Label>
                                <Form.Control as="select" value={selectedStreet2} onChange={(e) => handleStreetInputChange(e, setSelectedStreet2)}>
                                    {streets2.map((street, index) => (
                                        <option key={index} value={street}>{street}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="stu_parent2homeNum">
                                <Form.Label>מספר בית</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                        </div>
                    )}
                    <br /> 
                    <Button type="submit">שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
                </Form>
            </div>
        </div>
    )
}
