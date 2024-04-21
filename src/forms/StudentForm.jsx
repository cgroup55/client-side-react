import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck } from 'react-icons/fa';
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


    //צריך לחבר לנתונים שיגיעו מהDB
    const schools = [{ schoolname: "טשרני" }, { schoolname: "אורט" }];
    const disabilities = [{ disabname: "אוטיזם" }, { disabname: "פיגור" }];

    //Render the cities on-load
    useEffect(() => {
        fetchCities().then(cities => setCities(cities));
    }, []);
    //כנראה נצטרך להוסיף ולהתאים ל2 השדות
    // useEffect(() => {
    //     if (originstuort.stu_city != '') {
    //       fetchStreetsByCity(originstuort.stu_city).then(streets => setStreets(streets));
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
            // Logic to check validity of new stuort
            navigate('/stuorts', stuort);
        } else {
            // Show error message
        }
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};
        newErrors.stu_fullName = validateHebrewletters(stuort.stu_fullName);
        newErrors.stu_id = ValidateId(stuort.stu_id);
        newErrors.stu_dateofbirth = validateDateOfBirth(stuort.stu_dateofbirth);
        if (student.stu_grade != '') {
            newErrors.stu_grade = validateHebrewletters(stuort.stu_grade);
        }
        newErrors.stu_school = Validateselect(line.stu_school);
        newErrors.stu_disability = Validateselect(line.stu_disability);


        //newErrors.stu_cell = ValidCellPhoneNum(stuort.stu_cell);
        // newErrors.stu_city = validateCity(stuort.stu_city, cities);
        //newErrors.stu_street = validateStreet(stuort.stu_street, streets);
        //  newErrors.stu_homeNum = ValidPositiveNumber(stuort.stu_homeNum);

        setErrors(newErrors);
        console.log('errors after=', errors);
        Object.values(newErrors).forEach(error => {
            if (error) {
                valid = false;
            }
        });
        return valid;
    };


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
                                required
                                className="formSelect"
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
                                required
                                className="formSelect"
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
                            <Form.Control as="select" className="formSelect" value={selectedStreet1} onChange={(e) => handleStreetInputChange(e, setSelectedStreet1)}>
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
                    </div>

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
                            <Form.Control as="select" className="formSelect" value={selectedStreet2} onChange={(e) => handleStreetInputChange(e, setSelectedStreet2)}>
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

                    <div className='row'>
                        <div className='col-12 text-center'>
                            <Button className="submitBtn" type="submit" style={{ width: '25%', minWidth: '100px' }}>שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    )
}
