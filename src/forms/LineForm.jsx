import React, { useState, useEffect, useRef } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity } from '../tools/cities&streets';
import { ValidPositiveNumber, validateCityNstreet, validateHebrewletters, ValidCellPhoneNum, ValidCellOrHomePhoneNum, validateEmail, ValidateId } from '../tools/validations';

export default function LineForm() {

  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-GB');

  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  const [line, setLine] = useState({ definition_date: today });
  const [errors, setErrors] = useState({});

  const schools = ["אורט", "טשרני"];//need to fetch from database
  const escorts = ["אבי לוי", "בני בוי"];//need to fetch from database
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
    setLine({ ...line, line_city: inputValue });
  };




  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    let isValid = validateForm();
    console.log('isValid:', isValid);
    if (isValid) {
      // Logic to check validity of new line
      navigate('/Lines', line);
    } else {
      // Show error message
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    console.log('line=', line);

    newErrors.line_code=ValidPositiveNumber(line.line_code);
    newErrors.line_car=Validateselect(line.line.car);
    newErrors.number_of_seats=ValidPositiveNumber(line.number_of_seats);
    
    newErrors.line_school=Validateselect(line.school_of_line);



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
      <h2>הוספת קו הסעה</h2>
      <Form style={{ margin: '0 auto' }} onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-12 col-sm-6 label-input col-form-label-sm'>
          <h5>פרטי קו</h5>

            <Form.Group controlId="line_code">
              <Form.Label>קוד קו</Form.Label>
              <Form.Control type="text" name="line_code"
                value={line.line_code}
                onChange={(e) => setLine({ ...line, line_code: e.target.value })}
                isInvalid={!!errors.line_code}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.line_code}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="definition_date">
              <Form.Label>תאריך הגדרת קו</Form.Label>
              <Form.Control type="text" name="definition_date"
                value={line.definition_date}
                readOnly
              />

            </Form.Group>

            <Form.Group controlId="line_car">
              <Form.Label>סוג רכב</Form.Label>
              <Form.Control
                as="select"
                name="line_car"
                value={line.line_car}
                onChange={(e) => setLine({ ...line, line_car: e.target.value })}
                isInvalid={!!errors.line_car}
                required
                className="formSelect"
              >
                <option value={"-1"}></option>
                <option value={"bus"}>אוטובוס</option>
                <option value={"minibus"}>מיניבוס</option>
                <option value={"cab"}>מונית</option>

              </Form.Control>

              <Form.Control.Feedback type="invalid">
                {errors.line_car}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="number_of_seats">
              <Form.Label>מספר מקומות ברכב ההסעה</Form.Label>
              <Form.Control type="number" name="number_of_seats"
                value={line.number_of_seats}
                onChange={(e) => setLine({ ...line, number_of_seats: e.target.value })}
                isInvalid={!!errors.number_of_seats}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.number_of_seats}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="escort_incharge">
              <Form.Label>מלווה אחראי </Form.Label>
              <Form.Control
                as="select"
                name="escort_incharge"
                value={line.line_car}
                onChange={(e) => setLine({ ...line, escort_incharge: e.target.value })}
                isInvalid={!!errors.escort_incharge}
                required
                className="formSelect"
              >
                <option value={"-1"}></option>
                {escorts.map((escort, index) => (
                  <option key={index} value={escort}>
                    {escort}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.escort_incharge}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="school_of_line">
              <Form.Label>מוסד לימודים </Form.Label>
              <Form.Control
                as="select"
                name="school_of_line"
                value={line.line_car}
                onChange={(e) => setLine({ ...line, school_of_line: e.target.value })}
                isInvalid={!!errors.school_of_line}
                required
                className="formSelect"
              >
                <option value={"-1"}></option>
                {schools.map((school, index) => (
                  <option key={index} value={school}>
                    {school}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.line_car}
              </Form.Control.Feedback>
            </Form.Group>

          </div>
          <div className='col-12 col-sm-6 label-input col-form-label-sm'>
          <h5>תחנת מוצא</h5>
            <Form.Group controlId="origin_city">
              
              <Form.Label>עיר</Form.Label>
              <Form.Control list="cities-data" name="origin_city"
                value={line.origin_city}
                onChange={handleInputChange}
                onInput={handleInputChange}
                isInvalid={!!errors.origin_city}
                required
              />

              <datalist id="cities-data">
                {filteredCities.map((city, index) => (
                  <option key={index} value={city} />
                ))}
              </datalist>

              <Form.Control.Feedback type="invalid">
                {errors.origin_city}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="origin_street">
              <Form.Label>רחוב</Form.Label>
              <Form.Control className='formSelect' as="select" name="origin_street"
                value={line.origin_street}
                onChange={(e) => setLine({ ...line, origin_street: e.target.value })}
                isInvalid={!!errors.origin_street}
                required >
                {streets.map((street, index) => (
                  <option key={index} value={street}>{street}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.origin_street}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="origin_homeNum">
              <Form.Label>מספר</Form.Label>
              <Form.Control type="text" name="origin_homeNum"
                value={line.origin_homeNum}
                onChange={(e) => setLine({ ...line, origin_homeNum: e.target.value })}
                isInvalid={!!errors.origin_homeNum}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.origin_homeNum}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="origin_arrivaltime">
              <Form.Label>שעת יציאה</Form.Label>
              <Form.Control type="text" name="origin_arrivaltime"
                value={line.origin_arrivaltime}
                onChange={(e) => setLine({ ...line, origin_arrivaltime: e.target.value })}
                isInvalid={!!errors.origin_arrivaltime}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.destination_arrivaltime}
              </Form.Control.Feedback>
            </Form.Group>

            <h5 style={{ marginTop: "15px" }}>תחנת יעד</h5>
            <Form.Group controlId="destination_city">

              <Form.Label>עיר</Form.Label>
              <Form.Control list="cities-data" name="destination_city"
                value={line.destination_city}
                onChange={handleInputChange}
                onInput={handleInputChange}
                isInvalid={!!errors.destination_city}
                required
              />

              <datalist id="cities-data">
                {filteredCities.map((city, index) => (
                  <option key={index} value={city} />
                ))}
              </datalist>

              <Form.Control.Feedback type="invalid">
                {errors.destination_city}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="destination_street">
              <Form.Label>רחוב</Form.Label>
              <Form.Control className='formSelect' as="select" name="destination_street"
                value={line.origin_street}
                onChange={(e) => setLine({ ...line, destination_street: e.target.value })}
                isInvalid={!!errors.destination_street}
                required >
                {streets.map((street, index) => (
                  <option key={index} value={street}>{street}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.destination_street}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="destination_homeNum">
              <Form.Label>מספר</Form.Label>
              <Form.Control type="text" name="destination_homeNum"
                value={line.destination_homeNum}
                onChange={(e) => setLine({ ...line, destination_homeNum: e.target.value })}
                isInvalid={!!errors.destination_homeNum}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.destination_homeNum}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="destination_arrivaltime">
              <Form.Label>שעת הגעה</Form.Label>
              <Form.Control type="text" name="destination_arrivaltime"
                value={line.destination_arrivaltime}
                onChange={(e) => setLine({ ...line, destination_arrivaltime: e.target.value })}
                isInvalid={!!errors.destination_arrivaltime}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.destination_arrivaltime}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className='text-center' style={{ paddingTop: '20px' }}>
            <Button type="submit" >שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
          </div>
        </div>
      </Form>


    </div>
  )
}
