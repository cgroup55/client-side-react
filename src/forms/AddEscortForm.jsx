import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity } from '../tools/cities&streets';
import { ValidPositiveNumber, validateCityNstreet, ValidateId, validateHebrewletters, validateDateOfBirth, ValidCellPhoneNum } from '../tools/validations';

export default function AddEscortForm() {

  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [escort, setEscort] = useState({
    esc_firstName: '',
    esc_lastName: '',
    esc_id: '',
    esc_dateofbirth: '',
    esc_cell: '',
    esc_city: '',
    esc_street: '',
    esc_homeNum: ''
  });

  const [errors, setErrors] = useState({
    esc_firstName: '',
    esc_lastName: '',
    esc_id: '',
    esc_dateofbirth: '',
    esc_cell: '',
    esc_city: '',
    esc_street: '',
    esc_homeNum: ''
  });

  //render the cities on-load
  useEffect(() => {
    fetchCities().then(cities => setCities(cities));
  }, []);

  //filterout cities that dont match the search
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const filteredCities = cities.filter(city =>
      city.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredCities(filteredCities);
    fetchStreetsByCity(inputValue).then(streets => setStreets(streets));
    setEscort({ ...escort, esc_city: inputValue });
  };

  //Save new escort
  const SaveNewEscort = () => {
    let isValid = validateForm();
    console.log('isValid:', isValid);
    if (isValid) {
      //logic to check validity of new escort
      navigate('/escorts');
    }
    else {
      //הודעה על כשלון
    }
  };



  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    console.log('escort=',escort);
    newErrors.esc_firstName = validateHebrewletters(escort.esc_firstName);
    newErrors.esc_lastName = validateHebrewletters(escort.esc_lastName);
    newErrors.esc_id = ValidateId(escort.esc_id);
    newErrors.esc_dateofbirth = validateDateOfBirth(escort.esc_dateofbirth);
    newErrors.esc_cell = ValidCellPhoneNum(escort.esc_cell);
    newErrors.esc_city = validateCityNstreet(escort.esc_city);
    newErrors.esc_street = validateCityNstreet(escort.esc_street);
    newErrors.esc_homeNum = ValidPositiveNumber(escort.esc_homeNum);
    
    //need to check the following code *********
    setErrors(newErrors);
    console.log('errors after=', errors);
    Object.values(errors).forEach(error => {
      if (error) {
        valid = false;
      }
    });
    return false;
  };

  return (
    <div className='container mt-5 form-container'>
      <div className='row' >
        <h2>הוספת מלווה</h2>
        <Form className='col-9 escortsform label-input col-form-label-sm' style={{ margin: '0 auto' }}>
          <Form.Group controlId="esc_firstName">
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control type="text" name="esc_firstName"
              value={escort.esc_firstName}
              onChange={(e) => setEscort({ ...escort, esc_firstName: e.target.value })}
              isInvalid={!!errors.esc_firstName}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.esc_firstName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="esc_lastName">
            <Form.Label>שם משפחה</Form.Label>
            <Form.Control type="text" name="esc_lastName"
              value={escort.esc_lastName}
              onChange={(e) => setEscort({ ...escort, esc_lastName: e.target.value })}
              isInvalid={!!errors.esc_lastName}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.esc_lastName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="esc_id">
            <Form.Label>תעודת זהות</Form.Label>
            <Form.Control type="text" name="esc_id"
              value={escort.esc_id}
              onChange={(e) => setEscort({ ...escort, esc_id: e.target.value })}
              isInvalid={!!errors.esc_id}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.esc_id}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="esc_dateofbirth">
            <Form.Label>תאריך לידה</Form.Label>
            <Form.Control type="date" name="esc_dateofbirth"
              value={escort.esc_dateofbirth}
              onChange={(e) => setEscort({ ...escort, esc_dateofbirth: e.target.value })}
              isInvalid={!!errors.esc_dateofbirth}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.esc_dateofbirth}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="esc_cell">
            <Form.Label>נייד</Form.Label>
            <Form.Control type="text" name="esc_cell" 
             value={escort.esc_cell}
             onChange={(e) => setEscort({ ...escort, esc_cell: e.target.value })}
             isInvalid={!!errors.esc_cell}
             required
           />
            <Form.Control.Feedback type="invalid">
              {errors.esc_cell}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="esc_city">
            <Form.Label>עיר</Form.Label>
            <Form.Control list="cities-data" name="esc_city"
              value={escort.esc_city}
              onChange={handleInputChange}
              onInput={handleInputChange}
              isInvalid={!!errors.esc_city}
              required
            />

            <datalist id="cities-data">
              {filteredCities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>

            <Form.Control.Feedback type="invalid">
              {errors.esc_city}
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Group controlId="esc_street">
            <Form.Label>רחוב</Form.Label>
            <Form.Control className='formSelect' as="select" name="esc_street"
              value={escort.esc_street}
              onChange={(e) => setEscort({ ...escort, esc_street: e.target.value })}
              isInvalid={!!errors.esc_street}
              required >
              {streets.map((street, index) => (
                <option key={index} value={street}>{street}</option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.esc_street}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="esc_homeNum">
            <Form.Label>מספר בית</Form.Label>
            <Form.Control type="text" name="esc_homeNum"
              value={escort.esc_homeNum}
              onChange={(e) => setEscort({ ...escort, esc_homeNum: e.target.value })}
              isInvalid={!!errors.esc_homeNum}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.esc_homeNum}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </div>

      <div className='text-center' style={{ paddingTop: '5px' }}>
        <Button onClick={SaveNewEscort}>שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
      </div>
    </div>
  );
}
