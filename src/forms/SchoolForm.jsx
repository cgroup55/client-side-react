import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity, validateCity, validateStreet } from '../tools/cities&streets';
import { ValidPositiveNumber, validateHebrewletters, ValidCellPhoneNum, ValidCellOrHomePhoneNum, validateEmail } from '../tools/validations';


export default function SchoolForm() {


  const navigate = useNavigate();
  const { state } = useLocation();
  let originSchool = state;

  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [school, setSchool] = useState({ ...originSchool });
  const [errors, setErrors] = useState({});

  //render the cities on-load
  useEffect(() => {
    fetchCities().then(cities => setCities(cities));
  }, []);

  useEffect(() => {
    if (originSchool.school_city != '') {
      fetchStreetsByCity(originSchool.school_city).then(streets => setStreets(streets));
    }
  }, []);

  //filterout cities that dont match the search
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const filteredCities = cities.filter(city =>
      city.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredCities(filteredCities);
    fetchStreetsByCity(inputValue).then(streets => setStreets(streets));
    setSchool({ ...school, school_city: inputValue });
  };

  //form subbmision
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    let isValid = validateForm();
    console.log('isValid:', isValid);
    if (isValid) {
      // Logic to inser new school
      navigate('/schools', school);
    } else {
      // Show error message
    }
  };

  //Validation for all inputs
  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    console.log('school=', school);
    newErrors.school_code = ValidPositiveNumber(school.school_code);
    newErrors.school_name = validateHebrewletters(school.school_name);
    newErrors.school_city = validateCity(school.school_city, cities);
    newErrors.school_street = validateStreet(school.school_street, streets);
    newErrors.school_homeNum = ValidPositiveNumber(school.school_homeNum);
    newErrors.secretar_cell = ValidCellOrHomePhoneNum(school.secretar_cell);
    if (school.principal_name != '') {
      newErrors.principal_name = validateHebrewletters(school.principal_name);
    }
    if (school.principal_cell != '') {
      newErrors.principal_cell = ValidCellPhoneNum(school.principal_cell);
    }
    if (school.secretar_mail != '') {
      newErrors.secretar_mail = validateEmail(school.secretar_mail);
    }
    if (school.school_contactName != '') {
      newErrors.school_contactName = validateHebrewletters(school.school_contactName);
    }
    if (school.school_contactCell != '') {
      newErrors.school_contactCell = ValidCellPhoneNum(school.school_contactCell);
    }
    setErrors(newErrors);
    //validity check before submition
    Object.values(newErrors).forEach(error => {
      if (error) {
        valid = false;
      }
    });
    return valid;
  };

  console.log('school state=', school);
  return (

    <div className='container mt-5 form-container'>
      <div className='row'>
        <h2>הוספת מוסד לימודים</h2>
        <Form className='col-9 schoolsform label-input col-form-label-sm' style={{ margin: '0 auto' }} onSubmit={handleSubmit}>

          <Form.Group controlId="school_code">
            <Form.Label>סמל מוסד</Form.Label>
            {
              originSchool.school_code != "" ?
                (
                  <Form.Control type="text" value={school.school_code} readOnly />
                ) :
                < Form.Control type="text" name="school_code"
                  value={school.school_code}
                  onChange={(e) => setSchool({ ...school, school_code: e.target.value })}
                  isInvalid={!!errors.school_code}
                  required
                />
            }
            <Form.Control.Feedback type="invalid">
              {errors.school_code}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="school_name">
            <Form.Label>שם מוסד לימודי</Form.Label>
            <Form.Control type="text" name="school_name"
              value={school.school_name}
              onChange={(e) => setSchool({ ...school, school_name: e.target.value })}
              isInvalid={!!errors.school_name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.school_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="school_city">
            <Form.Label>עיר</Form.Label>
            <Form.Control list="cities-data" name="school_city"
              value={school.school_city}
              onChange={handleInputChange}
              onInput={handleInputChange}
              isInvalid={!!errors.school_city}
              required
            />

            <datalist id="cities-data">
              {filteredCities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>

            <Form.Control.Feedback type="invalid">
              {errors.school_city}
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Group controlId="school_street">
            <Form.Label>רחוב</Form.Label>
            <Form.Control className='formSelect' as="select" name="school_street"
              value={school.school_street}
              onChange={(e) => setSchool({ ...school, school_street: e.target.value })}
              isInvalid={!!errors.school_street}
              required >
              {<option value={-1}></option>}
              {streets.map((street, index) => (
                <option key={index} value={street}>{street}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.school_street}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="school_homeNum">
            <Form.Label>מספר</Form.Label>
            <Form.Control type="text" name="school_homeNum"
              value={school.school_homeNum}
              onChange={(e) => setSchool({ ...school, school_homeNum: e.target.value })}
              isInvalid={!!errors.school_homeNum}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.school_homeNum}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="principal_name">
            <Form.Label>שם מנהל</Form.Label>
            <Form.Control type="text" name="principal_name"
              value={school.principal_name}
              onChange={(e) => setSchool({ ...school, principal_name: e.target.value })}
              isInvalid={!!errors.principal_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.principal_name}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="principal_cell">
            <Form.Label>נייד מנהל</Form.Label>
            <Form.Control type="text" name="principal_cell"
              value={school.principal_cell}
              onChange={(e) => setSchool({ ...school, principal_cell: e.target.value })}
              isInvalid={!!errors.principal_cell}
            />
            <Form.Control.Feedback type="invalid">
              {errors.principal_cell}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="secretar_cell">
            <Form.Label>טלפון מזכירות</Form.Label>
            <Form.Control type="text" name="secretar_cell"
              value={school.secretar_cell}
              onChange={(e) => setSchool({ ...school, secretar_cell: e.target.value })}
              isInvalid={!!errors.secretar_cell}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.secretar_cell}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="secretar_mail">
            <Form.Label>מייל מזכירות</Form.Label>
            <Form.Control type="text" name="secretar_mail"
              value={school.secretar_mail}
              onChange={(e) => setSchool({ ...school, secretar_mail: e.target.value })}
              isInvalid={!!errors.secretar_mail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.secretar_mail}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="school_contactName">
            <Form.Label>שם איש קשר נוסף</Form.Label>
            <Form.Control type="text" name="school_contactName"
              value={school.school_contactName}
              onChange={(e) => setSchool({ ...school, school_contactName: e.target.value })}
              isInvalid={!!errors.school_contactName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.school_contactName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="school_contactCell">
            <Form.Label>נייד איש קשר</Form.Label>
            <Form.Control type="text" name="school_contactCell"
              value={school.school_contactCell}
              onChange={(e) => setSchool({ ...school, school_contactCell: e.target.value })}
              isInvalid={!!errors.school_contactCell}
            />
            <Form.Control.Feedback type="invalid">
              {errors.school_contactCell}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='text-center' style={{ paddingTop: '20px' }}>
            <Button type="submit" >שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
          </div>
        </Form>
      </div>


    </div>
  );
}
