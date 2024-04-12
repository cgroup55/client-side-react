import React, { useState, useEffect  } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity } from '../tools/cities&streets';


export default function AddEscortForm() {

  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);

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
        <div className='col escortsform label-input col-form-label-sm'>
          <label htmlFor="esc_firstName">שם פרטי</label>
          <input id="esc_firstName" name='esc_firstName' idtype="text" />

          <label htmlFor="esc_lastName">שם משפחה</label>
          <input id="esc_lastName" name='esc_lastName' idtype="text" />

          <label htmlFor="esc_id">תעודת זהות</label>
          <input id="esc_id" name='esc_id' idtype="text" />

          <label htmlFor="esc_dateofbirth">תאריך לידה</label>
          <input id="esc_dateofbirth" name="esc_dateofbirth" type="date" />

          <label htmlFor="esc_cell">נייד</label>
          <input id="esc_cell" name='esc_cell' idtype="text" />

          <label htmlFor="esc_city">עיר</label>
          <input
            list="cities-data"
            id="esc_city"
            name="esc_city"
            onChange={handleInputChange}
            onInput={handleInputChange}
          />
          <datalist id="cities-data">
            {filteredCities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>

          <label htmlFor="esc_street">רחוב</label>
          <select id="esc_street">
            {streets.map((street, index) => (
              <option key={index} value={street}>{street}</option>
            ))}
          </select>


          <label htmlFor="esc_homeNum">מספר בית</label>
          <input id="esc_homeNum" name='esc_homeNum' idtype="text" />

        </div>
      </div>

      <div className='text-center' style={{ paddingTop: '5px' }}><Button onClick={SaveNewEscort}>שמור <FaCheck style={{ paddingBottom: '2px' }} /> </Button></div>
    </div>
  )
}
