import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity, validateStreet, validateCity } from '../tools/cities&streets';
import { ValidPositiveNumber, ValidateId, validateHebrewletters, validateDateOfBirth, ValidCellPhoneNum, Validateselect } from '../tools/validations';


export default function StudentForm() {

    const navigate = useNavigate();
    const { state } = useLocation();
    let originStudent = state;

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

    const [student, setStudent] = useState({ ...originStudent });
    const [errors, setErrors] = useState({});
    const [addContact, setAddContact] = useState(false);
    const [isAddContactDisabled, setAddContactDisabled] = useState(false);

    //Toggle the visibility of the additional contact data div
    const toggleAdditionalContact = () => {
        setAddContact(!addContact);
        setAddContactDisabled(true);
    };

    // Function to handle cancel button click
    const handleCancel = () => {
        setAddContact(false);
        setAddContactDisabled(false);
    };


    //צריך לחבר לנתונים שיגיעו מהDB
    const schools = [{ schoolname: "טשרני" }, { schoolname: "אורט" }];
    const disabilities = [{ disabname: "אוטיזם" }, { disabname: "פיגור" }];


    //כנראה נצטרך להוסיף ולהתאים ל2 השדות
    // useEffect(() => {
    //     if (originStudent.stu_city != '') {
    //       fetchStreetsByCity(originStudent.stu_city).then(streets => setStreets(streets));
    //     }
    //   }, []);

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


    //Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = validateForm();
        console.log('isValid:', isValid);
        if (isValid) {
            // Logic to check validity of new student
            navigate('/students', student);
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
        if (student.stu_grade != '') {
            newErrors.stu_grade = validateHebrewletters(student.stu_grade);
        }
        newErrors.stu_school = Validateselect(student.stu_school);
        newErrors.stu_disability = Validateselect(student.stu_disability);
        //Parent validation
        newErrors.stu_parentName = validateHebrewletters(student.stu_parentName);
        newErrors.stu_parentCell = ValidCellPhoneNum(student.stu_parentCell);
        newErrors.stu_parentCity = validateCity(student.stu_parentCity);
        // newErrors.esc_street = validateStreet(escort.esc_street, streets);
        newErrors.stu_parentHomeNum = ValidPositiveNumber(student.stu_parentHomeNum);

        //Another contact validation
        if (addContact) {        
            newErrors.stu_contaceName = validateHebrewletters(student.stu_contaceName);
            newErrors.stu_contactCell = ValidCellPhoneNum(student.stu_contactCell);
            //newErrors.stu_parentCity = validateCity(student.stu_parentCity);
            // newErrors.esc_street = validateStreet(escort.esc_street, streets);
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
    }, []);

    return (

        <div className='container mt-5 form-container'>
            <Form onSubmit={handleSubmit}>
                <div className='row'>
                    <h2>הוספת תלמיד</h2>
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm'>
                        <h5>תלמיד</h5>

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

                        <Form.Group controlId="stu_id">
                            <Form.Label>תעודת זהות</Form.Label>
                            <Form.Control type="text" name="stu_id"
                                value={student.stu_id}
                                onChange={(e) => setStudent({ ...student, stu_id: e.target.value })}
                                isInvalid={!!errors.stu_id}
                                //readOnly
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.stu_id}
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
                                <option value={"-1"}></option>
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
                                onChange={(e) => handleCityInputChange(e, setFilteredCities1, setSelectedCity1, setStreets1)}
                                onInput={(e) => handleCityInputChange(e, setFilteredCities1, setSelectedCity1, setStreets1)}
                                isInvalid={!!errors.stu_parentCity}
                                required
                            />
                            <datalist id="cities-data1">
                                {filteredCities1.map((city, index) => (
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
                                    value={selectedStreet1}
                                    onChange={(e) => handleStreetInputChange(e, setSelectedStreet1)}
                                    required>
                                    {<option value={-1}>בחר רחוב</option>}
                                    {streets1.map((street, index) => (
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
                    {addContact && (
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
                                <Form.Control as="select" className="formSelect" value={selectedStreet2} onChange={(e) => handleStreetInputChange(e, setSelectedStreet2)}>
                                    {streets2.map((street, index) => (
                                        <option key={index} value={street}>{street}</option>
                                    ))}
                                </Form.Control>
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
                    )}
                    <div className='row'>
                        <div className='col-12 text-center'>
                            <Button className="submitBtn" type="submit" style={{ width: '25%', minWidth: '100px', marginTop: '50px' }}>שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}
