import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity } from '../tools/cities&streets';


export default function AddEscortForm() {

  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

  //   const [escort, setEscort] = useState({
  //     esc_firstName: '',
  //     esc_lastName: '',
  //     esc_id: '',
  //     esc_dateofbirth: '',
  //     esc_cell: '',
  //     esc_city: '',
  //     esc_street: '',
  //     esc_homeNum: ''
  // });

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
  };
  //Save new escort
  const SaveNewEscort = () => {
    if (true) {
      //logic to check validity of new escort
      navigate('/escorts');
    }
    else {
      //הודעה על כשלון
    }
  }

  return (
    <div className='container mt-5 form-container'>
      <div className='row' >
        <h2>הוספת מלווה</h2>
        <Form className='col escortsform label-input col-form-label-sm'>
          <Form.Group controlId="esc_firstName">
            <Form.Label>שם פרטי</Form.Label>
            <Form.Control type="text" name="esc_firstName" />
          </Form.Group>

          <Form.Group controlId="esc_lastName">
            <Form.Label>שם משפחה</Form.Label>
            <Form.Control type="text" name="esc_lastName" />
          </Form.Group>

          <Form.Group controlId="esc_id">
            <Form.Label>תעודת זהות</Form.Label>
            <Form.Control type="text" name="esc_id" />
          </Form.Group>

          <Form.Group controlId="esc_dateofbirth">
            <Form.Label>תאריך לידה</Form.Label>
            <Form.Control type="date" name="esc_dateofbirth" />
          </Form.Group>

          <Form.Group controlId="esc_cell">
            <Form.Label>נייד</Form.Label>
            <Form.Control type="text" name="esc_cell" />
          </Form.Group>

          <Form.Group controlId="esc_city">
            <Form.Label>עיר</Form.Label>
            <Form.Control list="cities-data" name="esc_city"
           onChange={handleInputChange}
           onInput={handleInputChange} />
            <datalist id="cities-data">
              {filteredCities.map((city, index) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </Form.Group>

          <Form.Group controlId="esc_street">
            <Form.Label>רחוב</Form.Label>
            <Form.Control as="select" name="esc_street" >
            {streets.map((street, index) => (
              <option key={index} value={street}>{street}</option>
            ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="esc_homeNum">
            <Form.Label>מספר בית</Form.Label>
            <Form.Control type="text" name="esc_homeNum" />
          </Form.Group>
        </Form>
      </div>

      <div className='text-center' style={{ paddingTop: '5px' }}>
        <Button onClick={SaveNewEscort}>שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
      </div>
    </div>
  );
}
