import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity } from '../tools/cities&streets';
import { ValidPositiveNumber, validateCityNstreet, validateHebrewletters, ValidCellPhoneNum , ValidCellOrHomePhoneNum} from '../tools/validations';


export default function SchoolForm() {

  
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [school, setSchool] = useState({ });

  const [errors, setErrors] = useState({ });

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
    setSchool({ ...school, school_city: inputValue });
  };

  //form subbmision
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    let isValid = validateForm();
    console.log('isValid:', isValid);
    if (isValid) {
      // Logic to check validity of new school
      navigate('/schools');
    } else {
      // Show error message
    }
  };


  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    console.log('school=',school);
    newErrors.school_name = validateHebrewletters(school.school_name);
    newErrors.principal_name = validateHebrewletters(school.principal_name);
    newErrors.principal_cell = ValidCellPhoneNum(school.principal_cell);
    newErrors.school_city = validateCityNstreet(school.school_city);
    newErrors.school_street = validateCityNstreet(school.school_street);
    newErrors.school_homeNum = ValidPositiveNumber(school.school_homeNum);
    newErrors.secretar_cell = ValidCellOrHomePhoneNum(school.secretar_cell);
    
    //need to check the following code *********
    setErrors(newErrors);
    console.log('errors after=', errors);
    Object.values(newErrors).forEach(error => {
      if (error) {
        valid = false;
      }
    });
    return false;
  };

  return (

    <div className='container mt-5 form-container'>
      <div className='row' style={{ paddingRight: '50px' }}>
        <h2>הוספת מוסד לימודים</h2>
        <Form className='col-9 schoolsform label-input col-form-label-sm' style={{ margin: '0 auto' }} onSubmit={handleSubmit}>
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
              required
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
             required
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

          <div className='text-center' style={{ paddingTop: '20px' }}>
        <Button  type="submit" >שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
      </div>
        </Form>        
      </div>

      
    </div>
  );
}
