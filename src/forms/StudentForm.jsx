import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity, validateStreet, validateCity } from '../tools/cities&streets';
import { ValidPositiveNumber, ValidateId, validateHebrewletters, validateDateOfBirth, ValidCellPhoneNum, Validateselect, fixDate } from '../tools/validations';


export default function StudentForm() {

    const navigate = useNavigate();
    const { state } = useLocation();
    let originStudent = state;
    //console.log('originStudent=', originStudent);

    //States for handling the addresses
    const [cities, setCities] = useState([]);
    const [streets, setStreets] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [cities2, setCities2] = useState([]);
    const [streets2, setStreets2] = useState([]);
    const [filteredCities2, setFilteredCities2] = useState([]);

    const [student, setStudent] = useState({ ...originStudent });
    const [errors, setErrors] = useState({});
    //states to handle the contact
    const [addContact, setAddContact] = useState(false);
    const [isAddContactDisabled, setAddContactDisabled] = useState(false);

    //Toggle the visibility of the additional contact data div
    const toggleAdditionalContact = () => {
        setAddContact(!addContact);
        setAddContactDisabled(true);
    };

    //Function to handle cancel button click
    const handleCancel = () => {
        setAddContact(false);
        setAddContactDisabled(false);
    };

    //צריך לחבר לנתונים שיגיעו מהDB
    const schools = [{ schoolname: "טשרני" }, { schoolname: "אורט" }];
    const disabilities = [{ disabname: "אוטיזם" }, { disabname: "פיגור" }];

    //filterout cities that dont match the search for parent address
    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const filteredCities = cities.filter(city =>
            city.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setFilteredCities(filteredCities);
        fetchStreetsByCity(inputValue).then(streets => setStreets(streets));
        setStudent(prevStudent => ({ ...prevStudent, stu_parentCity: inputValue }));
    };
    //filterout cities that dont match the search for contact address
    const handleInputChange2 = (event) => {
        const inputValue = event.target.value;
        const filteredCities2 = cities2.filter(city2 =>
            city2.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setFilteredCities2(filteredCities2);
        fetchStreetsByCity(inputValue).then(streets2 => setStreets2(streets2));
        setStudent(prevStudent => ({ ...prevStudent, stu_contactCity: inputValue }));
    };


    //Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('stu_school=', student.stu_school);
        let isValid = validateForm();
        console.log('isValid:', isValid);

        if (isValid) {
            let studentToSend = {
                stu_fullName: student.stu_fullName,
                stu_id: student.stu_id,
                stu_dateofbirth: fixDate(student.stu_dateofbirth),
                stu_grade: student.stu_grade,
                stu_school: student.stu_school,
                stu_dateOfPlacement: fixDate(student.stu_dateOfPlacement),
                stu_disability: student.stu_disability,
                stu_comments: student.stu_comments,

                stu_parentName: student.stu_parentName,
                stu_parentCell: student.stu_parentCell,
                stu_parentCity: student.stu_parentCity,
                stu_parentStreet: student.stu_parentStreet,
                stu_parentHomeNum: student.stu_parentHomeNum,

                stu_contaceName: student.stu_contaceName,
                stu_contactCell: student.stu_contactCell,
                stu_contactCity: student.stu_contactCity,
                stu_contactStreet: student.stu_contactStreet,
                stu_contactHomeNum: student.stu_contactHomeNum,
            }
            navigate('/students', { state: studentToSend });

        } else {
            // Show error message
        }
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};
        newErrors.stu_fullName = validateHebrewletters(student.stu_fullName);
        newErrors.stu_id = ValidateId(student.stu_id);
        newErrors.stu_dateofbirth = validateDateOfBirth(student.stu_dateofbirth);
        if (student.stu_grade != "") {
            newErrors.stu_grade = validateHebrewletters(student.stu_grade);
        }
        newErrors.stu_school = Validateselect(student.stu_school);
        newErrors.stu_disability = Validateselect(student.stu_disability);
        //Parent validation
        newErrors.stu_parentName = validateHebrewletters(student.stu_parentName);
        newErrors.stu_parentCell = ValidCellPhoneNum(student.stu_parentCell);
        newErrors.stu_parentCity = validateCity(student.stu_parentCity, cities);
        newErrors.stu_parentStreet = validateStreet(student.stu_parentStreet, streets);
        newErrors.stu_parentHomeNum = ValidPositiveNumber(student.stu_parentHomeNum);

        //Another contact validation
        if (addContact) {
            newErrors.stu_contaceName = validateHebrewletters(student.stu_contaceName);
            newErrors.stu_contactCell = ValidCellPhoneNum(student.stu_contactCell);
            newErrors.stu_contactCity = validateCity(student.stu_contactCity, cities2);
            newErrors.stu_contactStreet = validateStreet(student.stu_contactStreet, streets2);
            newErrors.stu_contactHomeNum = ValidPositiveNumber(student.stu_contactHomeNum);
        }

        setErrors(newErrors);
        console.log('errors after=', errors);
        Object.values(newErrors).forEach(error => {
            if (error) {
                valid = false;
            }
        });
        return valid;
    };

    //Render the cities on-load
    useEffect(() => {
        fetchCities().then(cities => setCities(cities));
        fetchCities().then(cities2 => setCities2(cities2));
    }, []);

    //Render the streets in a specific city on-load
    useEffect(() => {
        if (originStudent.stu_parentCity != '') {
            fetchStreetsByCity(originStudent.stu_parentCity).then(streets => setStreets(streets));
        }
        if (originStudent.stu_contactCity != '') {
            fetchStreetsByCity(originStudent.stu_contactCity).then(streets2 => setStreets2(streets2));
        }
    }, []);

    return (
        <div className='container mt-5 form-container '>
            <Form onSubmit={handleSubmit}>
                
                <div className='row'>
                    <h2>{originStudent.stu_id != "" ? "עריכת" : "הוספת"} תלמיד</h2>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm'>
                        <h5>תלמיד</h5>

                        <Form.Group controlId="stu_id">
                            <Form.Label>תעודת זהות</Form.Label>
                            {originStudent.stu_id != "" ?
                                (<Form.Control type="text" value={student.stu_id} readOnly />)
                                :
                                (<Form.Control type="text" name="stu_id"
                                    value={student.stu_id}
                                    onChange={(e) => setStudent({ ...student, stu_id: e.target.value })}
                                    isInvalid={!!errors.stu_id}
                                    required
                                />)}

                            <Form.Control.Feedback type="invalid">
                                {errors.stu_id}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="stu_fullName">
                            <Form.Label>שם מלא</Form.Label>
                            <Form.Control type="text" name="stu_fullName"
                                value={student.stu_fullName}
                                onChange={(e) => setStudent({ ...student, stu_fullName: e.target.value })}
                                isInvalid={!!errors.stu_fullName}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_fullName}
                            </Form.Control.Feedback>
                        </Form.Group>



                        <Form.Group controlId="stu_dateofbirth">
                            <Form.Label>תאריך לידה</Form.Label>
                            <Form.Control type="date" name="stu_dateofbirth"
                                value={student.stu_dateofbirth}
                                onChange={(e) => setStudent({ ...student, stu_dateofbirth: e.target.value })}
                                isInvalid={!!errors.stu_dateofbirth}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_dateofbirth}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="stu_grade">
                            <Form.Label>כיתה</Form.Label>
                            <Form.Control type="text" name="stu_grade"
                                value={student.stu_grade}
                                onChange={(e) => setStudent({ ...student, stu_grade: e.target.value })}
                                isInvalid={!!errors.stu_grade}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_grade}
                            </Form.Control.Feedback>
                        </Form.Group>

                        מהDB צריך להיות  ***
                        <Form.Group controlId="stu_school">
                            <Form.Label>מוסד לימודים </Form.Label>
                            <Form.Control
                                as="select"
                                name="stu_school"
                                value={student.stu_school}
                                onChange={(e) => setStudent({ ...student, stu_school: e.target.value })}
                                isInvalid={!!errors.stu_school}
                                className="formSelect"
                                required
                            >
                                <option value={"-1"}> </option>
                                {schools.map((school, index) => (
                                    <option key={index} value={school.schoolname}>
                                        {school.schoolname}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_school}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>

                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm' >
                        <h5>פרטי לקות</h5>

                        <Form.Group controlId="stu_dateOfPlacement">
                            <Form.Label>תאריך ועדת השמה</Form.Label>
                            <Form.Control type="date" name="stu_dateOfPlacement"
                                value={student.stu_dateOfPlacement}
                                onChange={(e) => setStudent({ ...student, stu_dateOfPlacement: e.target.value })}
                                isInvalid={!!errors.stu_dateOfPlacement}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_dateOfPlacement}
                            </Form.Control.Feedback>
                        </Form.Group>

                        מהDB צריך להיות  ***
                        <Form.Group controlId="stu_disability">
                            <Form.Label>סוג לקות</Form.Label>
                            <Form.Control
                                as="select"
                                name="stu_disability"
                                value={student.stu_disability}
                                onChange={(e) => setStudent({ ...student, stu_disability: e.target.value })}
                                isInvalid={!!errors.stu_disability}
                                className="formSelect"
                                required
                            >
                                <option value={"-1"}></option>
                                {disabilities.map((disab, index) => (
                                    <option key={index} value={disab.disabname}>
                                        {disab.disabname}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_disability}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="stu_comments">
                            <Form.Label>הערות</Form.Label>
                            <Form.Control className='comment' as="textarea" rows={2} name="stu_comments"
                                value={student.stu_comments}
                                onChange={(e) => setStudent({ ...student, stu_comments: e.target.value })}
                            />
                        </Form.Group>


                    </div>

                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm' >
                        <h5>הורה</h5>
                        {/* readOnly = {student.stu_id!=''} */}
                        <Form.Group controlId="stu_parentName">
                            <Form.Label>שם הורה</Form.Label>
                            <Form.Control type="text" name="stu_parentName"
                                value={student.stu_parentName}
                                onChange={(e) => setStudent({ ...student, stu_parentName: e.target.value })}
                                isInvalid={!!errors.stu_parentName}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_parentName}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="stu_parentCell">
                            <Form.Label>נייד הורה</Form.Label>
                            <Form.Control type="text" name="stu_parentCell"
                                value={student.stu_parentCell}
                                onChange={(e) => setStudent({ ...student, stu_parentCell: e.target.value })}
                                isInvalid={!!errors.stu_parentCell}
                                //readOnly
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_parentCell}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="stu_parentCity">
                            <Form.Label>עיר</Form.Label>
                            <Form.Control list="cities-data1" name="stu_parentCity"
                                value={student.stu_parentCity}
                                onChange={handleInputChange}
                                onInput={handleInputChange}
                                isInvalid={!!errors.stu_parentCity}
                                required
                            />
                            <datalist id="cities-data1">
                                {filteredCities.map((city, index) => (
                                    <option key={index} value={city} />
                                ))}
                            </datalist>

                            <Form.Control.Feedback type="invalid">
                                {errors.stu_parentCity}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="stu_parentStreet">
                            <Form.Label>רחוב</Form.Label>
                            <div className="select-container">
                                <Form.Control className="formSelect" as="select" name="stu_parentStreet"
                                    value={student.stu_parentStreet}
                                    onChange={(e) => setStudent({ ...student, stu_parentStreet: e.target.value })}
                                    isInvalid={!!errors.stu_parentStreet}
                                    required>
                                    {<option value={-1}></option>}
                                    {streets.map((street, index) => (
                                        <option key={index} value={street}>{street}</option>
                                    ))}
                                </Form.Control>
                            </div>
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_parentStreet}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="stu_parentHomeNum">
                            <Form.Label>מספר בית</Form.Label>
                            <Form.Control type="text" name="stu_parentHomeNum"
                                value={student.stu_parentHomeNum}
                                onChange={(e) => setStudent({ ...student, stu_parentHomeNum: e.target.value })}
                                isInvalid={!!errors.stu_parentHomeNum}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_parentHomeNum}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br />
                        <div className='col-12 text-center'>
                            <Button
                                onClick={toggleAdditionalContact}
                                style={{ width: '25%', minWidth: '100px' }}
                                disabled={isAddContactDisabled}>
                                איש קשר נוסף
                                <FaPlus style={{ paddingBottom: '2px', paddingRight: '4px' }}></FaPlus>
                            </Button>
                        </div>
                    </div>
                    {
                        addContact && (
                            <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm'>
                                <h5>איש קשר</h5>
                                <Form.Group controlId="stu_contaceName">
                                    <Form.Label>שם איש קשר</Form.Label>
                                    <Form.Control type="text" name="stu_contaceName"
                                        value={student.stu_contaceName}
                                        onChange={(e) => setStudent({ ...student, stu_contaceName: e.target.value })}
                                        isInvalid={!!errors.stu_contaceName}
                                        required={addContact}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.stu_contaceName}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="stu_contactCell">
                                    <Form.Label>נייד</Form.Label>
                                    <Form.Control type="text" name="stu_contactCell"
                                        value={student.stu_contactCell}
                                        onChange={(e) => setStudent({ ...student, stu_contactCell: e.target.value })}
                                        isInvalid={!!errors.stu_contactCell}
                                        required={addContact}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.stu_contactCell}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="stu_contactCity">
                                    <Form.Label>עיר</Form.Label>
                                    <Form.Control
                                        list="cities-data2" name='stu_contactCity'
                                        value={student.stu_contactCity}
                                        onChange={handleInputChange2}
                                        onInput={handleInputChange2}
                                        isInvalid={!!errors.stu_contactCity}
                                        required={addContact}
                                    />
                                    <datalist id="cities-data2">
                                        {filteredCities2.map((city, index) => (
                                            <option key={index} value={city} />
                                        ))}
                                    </datalist>

                                    <Form.Control.Feedback type="invalid">
                                        {errors.stu_contactCity}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="stu_contactStreet">
                                    <Form.Label>רחוב</Form.Label>
                                    <div className="select-container">
                                        <Form.Control className="formSelect" as="select" name='stu_contactStreet'
                                            value={student.stu_contactStreet}
                                            onChange={(e) => setStudent({ ...student, stu_contactStreet: e.target.value })}
                                            isInvalid={!!errors.stu_contactStreet}
                                            required={addContact}>
                                            {<option value={-1}></option>}
                                            {streets2.map((street, index) => (
                                                <option key={index} value={street}>{street}</option>
                                            ))}
                                        </Form.Control>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.stu_contactStreet}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="stu_contactHomeNum">
                                    <Form.Label>מספר בית</Form.Label>
                                    <Form.Control type="text" name="stu_contactHomeNum"
                                        value={student.stu_contactHomeNum}
                                        onChange={(e) => setStudent({ ...student, stu_contactHomeNum: e.target.value })}
                                        isInvalid={!!errors.stu_contactHomeNum}
                                        required={addContact}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.stu_contactHomeNum}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <div className='col-12 text-center'>
                                    <Button
                                        onClick={handleCancel}
                                        style={{ width: '25%', minWidth: '100px', marginTop: '20px' }}
                                    >
                                        ביטול
                                    </Button>
                                </div>
                            </div>
                        )
                    }
                    <div className='row'>
                        <div className='col-12 text-center'>
                            <Button className="submitBtn" type="submit" style={{ width: '25%', minWidth: '100px', marginTop: '50px' }}>שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
                        </div>
                    </div>
                </div >
            </Form >
        </div >
    )
}
