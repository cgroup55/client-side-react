import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import Swal from 'sweetalert2';
import { FaCheck } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity, validateCity, validateStreet } from '../tools/cities&streets';
import { ValidPositiveNumber, validateHebrewletters, ValidCellPhoneNum, ValidCellOrHomePhoneNum, validateEmail } from '../tools/validations';
import { MdCancel } from 'react-icons/md';


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
    if (originSchool.city != '') {
      fetchStreetsByCity(originSchool.city).then(streets => setStreets(streets));
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
    setSchool({ ...school, city: inputValue });
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
    newErrors.institutionId = ValidPositiveNumber(school.institutionId);
    newErrors.name = validateHebrewletters(school.name);
    newErrors.city = validateCity(school.city, cities);
    newErrors.street = validateStreet(school.street, streets);
    newErrors.houseNumber = ValidPositiveNumber(school.houseNumber);
    newErrors.secretariatPhone = ValidCellOrHomePhoneNum(school.secretariatPhone);
    if (school.principal != '') {
      newErrors.principal = validateHebrewletters(school.principal);
    }
    if (school.principalCellphone != '') {
      newErrors.principalCellphone = ValidCellPhoneNum(school.principalCellphone);
    }
    if (school.secretariatMail != '') {
      newErrors.secretariatMail = validateEmail(school.secretariatMail);
    }
    if (school.anotherContact != '') {
      newErrors.anotherContact = validateHebrewletters(school.anotherContact);
    }
    if (school.contactPhone != '') {
      newErrors.contactPhone = ValidCellPhoneNum(school.contactPhone);
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

      <div className='row justify-content-between align-items-center'>
        <div className='col-10'>
          <h2>{originSchool.institutionId !== "" ? "עריכת" : "הוספת"} מוסד לימודי</h2>
        </div>
        <div className='col-2' style={{textAlign: 'left'}}>
          <Button variant='btn btn-outline-dark' style={{ maxWidth: "4rem", marginBottom: '7px' }} onClick={() => { navigate('/schools') }}>
            <MdCancel style={{ fontSize: "1.3rem" }} /></Button>
        </div>
        <div className='row'>
        <Form className='col-9 schoolsform label-input col-form-label-sm' style={{ margin: '0 auto' }} onSubmit={handleSubmit}>
          <Form.Group controlId="institutionId">
            <Form.Label>סמל מוסד</Form.Label>
            {
              originSchool.institutionId != "" ?
                (
                  <Form.Control type="text" value={school.institutionId} readOnly />
                ) :
                < Form.Control type="text" name="institutionId"
                  value={school.institutionId}
                  onChange={(e) => setSchool({ ...school, institutionId: e.target.value })}
                  isInvalid={!!errors.institutionId}
                  required
                />
            }
            <Form.Control.Feedback type="invalid">
              {errors.institutionId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>שם מוסד לימודי</Form.Label>
            <Form.Control type="text" name="name"
              value={school.name}
              onChange={(e) => setSchool({ ...school, name: e.target.value })}
              isInvalid={!!errors.name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>עיר</Form.Label>
            <Form.Control list="cities-data" name="city"
              value={school.city}
              onChange={handleInputChange}
              onInput={handleInputChange}
              isInvalid={!!errors.city}
              required
            />

            <datalist id="cities-data">
              {filteredCities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>

            <Form.Control.Feedback type="invalid">
              {errors.city}
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Group controlId="street">
            <Form.Label>רחוב</Form.Label>
            <Form.Control className='formSelect' as="select" name="street"
              value={school.street}
              onChange={(e) => setSchool({ ...school, street: e.target.value })}
              isInvalid={!!errors.street}
              required >
              {<option value={-1}></option>}
              {streets.map((street, index) => (
                <option key={index} value={street}>{street}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.street}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="houseNumber">
            <Form.Label>מספר</Form.Label>
            <Form.Control type="text" name="houseNumber"
              value={school.houseNumber}
              onChange={(e) => setSchool({ ...school, houseNumber: e.target.value })}
              isInvalid={!!errors.houseNumber}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.houseNumber}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="principal">
            <Form.Label>שם מנהל</Form.Label>
            <Form.Control type="text" name="principal"
              value={school.principal}
              onChange={(e) => setSchool({ ...school, principal: e.target.value })}
              isInvalid={!!errors.principal}
            />
            <Form.Control.Feedback type="invalid">
              {errors.principal}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="principalCellphone">
            <Form.Label>נייד מנהל</Form.Label>
            <Form.Control type="text" name="principalCellphone"
              value={school.principalCellphone}
              onChange={(e) => setSchool({ ...school, principalCellphone: e.target.value })}
              isInvalid={!!errors.principalCellphone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.principalCellphone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="secretariatPhone">
            <Form.Label>טלפון מזכירות</Form.Label>
            <Form.Control type="text" name="secretariatPhone"
              value={school.secretariatPhone}
              onChange={(e) => setSchool({ ...school, secretariatPhone: e.target.value })}
              isInvalid={!!errors.secretariatPhone}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.secretariatPhone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="secretariatMail">
            <Form.Label>מייל מזכירות</Form.Label>
            <Form.Control type="text" name="secretariatMail"
              value={school.secretariatMail}
              onChange={(e) => setSchool({ ...school, secretariatMail: e.target.value })}
              isInvalid={!!errors.secretariatMail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.secretariatMail}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="anotherContact">
            <Form.Label>שם איש קשר נוסף</Form.Label>
            <Form.Control type="text" name="anotherContact"
              value={school.anotherContact}
              onChange={(e) => setSchool({ ...school, anotherContact: e.target.value })}
              isInvalid={!!errors.anotherContact}
            />
            <Form.Control.Feedback type="invalid">
              {errors.anotherContact}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="contactPhone">
            <Form.Label>נייד איש קשר</Form.Label>
            <Form.Control type="text" name="contactPhone"
              value={school.contactPhone}
              onChange={(e) => setSchool({ ...school, contactPhone: e.target.value })}
              isInvalid={!!errors.contactPhone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.contactPhone}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='text-center' style={{ paddingTop: '20px' }}>
            <Button type="submit" >שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
          </div>
        </Form>
      </div>
      </div>

    </div>
  );
}
