import React, { useState, useEffect, useRef } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity, validateCity, validateStreet } from '../tools/cities&streets';
import { ValidPositiveNumber, validateHebrewletters, ValidCellPhoneNum, ValidCellOrHomePhoneNum, validateEmail, ValidateId } from '../tools/validations';
import { BsChevronDown } from 'react-icons/bs'; // Import the arrow down icon from react-icons

export default function CompanyForm() {

  const navigate = useNavigate();
  const selectRef = useRef(null);

  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [company, setCompany] = useState({});
  const [errors, setErrors] = useState({});





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
    setCompany({ ...company, company_city: inputValue });
  };




  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    let isValid = validateForm();
    console.log('isValid:', isValid);
    if (isValid) {
      // Logic to check validity of new company
      navigate('/transportComps',company);
    } else {
      // Show error message
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    console.log('company=', company);

    newErrors.company_code = ValidPositiveNumber(company.company_code);
    newErrors.company_name = validateHebrewletters(company.company_name);
    newErrors.company_email = validateEmail(company.company_email);
    newErrors.company_phone = ValidCellOrHomePhoneNum(company.company_phone);
    newErrors.manager_phone = ValidCellOrHomePhoneNum(company.manager_phone);
    newErrors.company_city = validateCity(company.company_city,cities,cities);
    newErrors.company_street = validateStreet(company.company_street,streets);
    newErrors.company_homeNum = ValidPositiveNumber(company.company_homeNum);
    //need to check the following code *********
    setErrors(newErrors);
    console.log('errors after=', errors);
    Object.values(newErrors).forEach(error => {
      if (error) {
        valid = false;
      }
    });
    return valid;
  };

  //continue comments+ send obj
  return (
    <div className='container mt-5 form-container'>
      <div className='row'>
        <h2>הוספת חברת הסעה</h2>
        <Form className='col-9 label-input col-form-label-sm' style={{ margin: '0 auto' }} onSubmit={handleSubmit}>
          <Form.Group controlId="company_code">
            <Form.Label>קוד חברה</Form.Label>
            <Form.Control type="text" name="company_code"
              value={company.company_code}
              onChange={(e) => setCompany({ ...company, company_code: e.target.value })}
              isInvalid={!!errors.company_code}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.company_code}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="company_name">
            <Form.Label>שם חברה</Form.Label>
            <Form.Control type="text" name="company_name"
              value={company.company_name}
              onChange={(e) => setCompany({ ...company, company_name: e.target.value })}
              isInvalid={!!errors.company_name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.company_name}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="company_email">
            <Form.Label>מייל חברה</Form.Label>
            <Form.Control type="text" name="company_email"
              value={company.company_email}
              onChange={(e) => setCompany({ ...company, company_email: e.target.value })}
              isInvalid={!!errors.company_email}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.company_email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="company_phone">
            <Form.Label>טלפון חברה</Form.Label>

            <Form.Control type="text" name="company_phone"
              value={company.company_phone}
              onChange={(e) => setCompany({ ...company, company_phone: e.target.value })}
              isInvalid={!!errors.company_phone}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.company_phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="manager_name">
            <Form.Label>שם מנהל</Form.Label>
            <Form.Control type="text" name="manager_name"
              value={company.manager_name}
              onChange={(e) => setCompany({ ...company, manager_name: e.target.value })}
              isInvalid={!!errors.manager_name}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.manager_name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="manager_phone">
            <Form.Label>טלפון מנהל</Form.Label>
            <Form.Control type="text" name="manager_phone"
              value={company.manager_phone}
              onChange={(e) => setCompany({ ...company, manager_phone: e.target.value })}
              isInvalid={!!errors.manager_phone}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.manager_phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="company_comments">
            <Form.Label>הערות</Form.Label>
            <Form.Control type="text" name="company_comments"
              value={company.company_comments}
              onChange={(e) => setCompany({ ...company, company_comments: e.target.value })}
            />

          </Form.Group>


          <Form.Group controlId="company_city">
            <Form.Label>עיר</Form.Label>
            <Form.Control list="cities-data" name="company_city"
              value={company.company_city}
              onChange={handleInputChange}
              onInput={handleInputChange}
              isInvalid={!!errors.company_city}
              required
            />

            <datalist id="cities-data">
              {filteredCities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>

            <Form.Control.Feedback type="invalid">
              {errors.company_city}
            </Form.Control.Feedback>

          </Form.Group>

          <Form.Group controlId="company_street">
            <Form.Label>רחוב</Form.Label>
            <Form.Control
              as="select"
              name="company_street"
              value={company.company_street}
              onChange={(e) => setCompany({ ...company, company_street: e.target.value })}
              isInvalid={!!errors.company_street}
              required
              className="formSelect"
            >
              {streets.map((street, index) => (
                <option key={index} value={street}>{street}</option>
              ))}
            </Form.Control>

            <Form.Control.Feedback type="invalid">
              {errors.company_street}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="company_homeNum">
            <Form.Label>מספר</Form.Label>
            <Form.Control type="text" name="company_homeNum"
              value={company.company_homeNum}
              onChange={(e) => setCompany({ ...company, company_homeNum: e.target.value })}
              isInvalid={!!errors.company_homeNum}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.company_homeNum}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='text-center' style={{ paddingTop: '20px' }}>
            <Button type="submit" >שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
          </div>
        </Form>
      </div>

    </div>
  )
}
