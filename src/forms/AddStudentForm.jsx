import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import axios from 'axios';


export default function AddStudentForm() {

    const api_url = "https://data.gov.il/api/3/action/datastore_search";
    const cities_resource_id = "5c78e9fa-c2e2-4771-93ff-7f400a12f7ba";
    const streets_resource_id = "a7296d1a-f8c9-4b70-96c2-6ebb4352f8e3";
    const city_name_key = "שם_ישוב";
    const street_name_key = "שם_רחוב";

    const [stuKind, setstuKind] = useState("");
    const [addParent, setaddParent] = useState(false);
    const [cities, setCities] = useState([]);
    const [streets, setStreets] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [filteredCities, setFilteredCities] = useState([]);
     
    useEffect(() => {
        populateDataList(cities_resource_id, city_name_key, setCities);
    }, []);

    const populateDataList = (resource_id, field_name, setter) => {
        axios.get(api_url, {
            params: { resource_id },
            responseType: "json"
        })
            .then((response) => {
                const records = response?.data?.result?.records || [];
                const dataList = records.map(record => record[field_name].trim());
                const sortedCities = dataList.sort((a, b) => a.localeCompare(b)); // Sort streets alphabetically
                setter(sortedCities);
            })
            .catch((error) => {
                console.log("Couldn't fetch data for", field_name, error);
            });
    };
    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
        populateStreets(selectedCity);
        
    };

    const handleCityInputChange = (event) => {
        const inputValue = event.target.value;
        const filteredCities = cities.filter(city =>
            city.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        setFilteredCities(filteredCities);
    };

    const populateStreets = (city) => {
        axios.get(api_url, {
          params: {
            resource_id: streets_resource_id,
            q: JSON.stringify({ [city_name_key]: city }),
            limit: 32000
          },
          responseType: "json"
        })
        .then((response) => {
          const records = response?.data?.result?.records || [];
          const streetList = records.map(record => record[street_name_key].trim());
          const sortedStreets = streetList.sort((a, b) => a.localeCompare(b)); // Sort streets alphabetically
          setStreets(sortedStreets);
        })
        .catch((error) => {
          console.log("Couldn't fetch streets for", city, error);
        });
    }
    //show social worker on condition
    const handleStuKindChange = (e) => {
        setstuKind(e.target.value);
    };

    const showAddParent = () => {
        setaddParent(true);
        console.log(addParent);
    }


    return (

        <div className='container mt-5 form-container'>

            <div className='row' style={{ paddingRight: '50px' }}>
                <h2>הוספת תלמיד</h2>
                <div className='col sm-12 label-input col-form-label-sm' >
                    <h4 >פרטי תלמיד</h4>

                    <label htmlFor="stu_dateofbirth">תאריך לידה</label>
                    <input id="stu_dateofbirth" name="stu_dateofbirth" type="date" />

                    <label htmlFor="stu_grade">כיתה</label>
                    <input id="stu_grade" name="stu_grade" type="text" />

                    <label htmlFor="stu_dateofplacementcom">תאריך ועדת השמה</label>
                    <input id="stu_dateofplacementcom" name="stu_dateofplacementcom" type="date" />

                    <label htmlFor="stu_school">מוסד לימודי</label>
                    <select defaultValue={0} id="stu_school">
                        <option >בחר...</option>
                        <option >...</option>
                    </select>

                    <label htmlFor="stu_studentkind">סיווג תלמיד</label>
                    <select defaultValue={0} id="stu_studentkind" onChange={handleStuKindChange}>
                        <option value={0}>בחר...</option>
                        <option value={"רווחה"}>רווחה</option>
                        <option value={"פנימיה"}>פנימיה</option>
                        <option value={"רגיל"}>רגיל</option>
                    </select>

                    {stuKind === "רווחה" && (
                        <div className='socialDiv' >
                            <label htmlFor="stu_socialworker">עובד סוציאלי</label>
                            <input id="stu_socialworker" name='stu_socialworker' idtype="text" />

                            <label htmlFor="stu_socialworkercell">נייד עובד סוציאלי</label>
                            <input id="stu_socialworkercell" name='stu_socialworkercell' idtype="text" />
                        </div>
                    )}

                    <label htmlFor="stu_disabilitiykind">סוג לקות</label>
                    <select defaultValue={0} id="stu_disabilitiykind" >
                        <option value={0}>בחר...</option>
                        <option value={1}>אוטיזם</option>
                        <option value={2}>פיגור שכלי</option>
                        <option value={3}>נכות פיזית</option>
                    </select>

                    <label htmlFor="stu_comments">הערות</label>
                    <input id="stu_comments" name='stu_comments' idtype="text" />
                </div>

                <div className='col sm-12 label-input col-form-label-sm' >
                    <h4 >אנשי קשר</h4>

                    <label htmlFor="stu_parent1name">שם הורה</label>
                    <input id="stu_parent1name" name="stu_parent1name" type="text" />

                    <label htmlFor="stu_parent1cell">נייד הורה</label>
                    <input id="stu_parent1cell" name='stu_parent1cell' idtype="text" />

                    <label htmlFor="stu_parent1adress" style={{ fontWeight: 'bold' }}>כתובת הורה</label>

                    <label htmlFor="stu_parent1city">עיר</label>
                    <input 
                        list="cities-data" 
                        id="city-choice" 
                        name="city-choice" 
                        onChange={handleCityChange} 
                        onInput={handleCityInputChange} 
                    />
                    <datalist id="cities-data">
                        {filteredCities.map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>

                    <label htmlFor="street-choice">רחוב</label>
                    <select id="stu_parent1street">
                        {streets.map((street, index) => (
                            <option key={index} value={street}>{street}</option>
                        ))}
                    </select>

                    <label htmlFor="stu_parent1homeNum">מספר בית</label>
                    <input id="stu_parent1homeNum" name='stu_parent1homeNum' idtype="text" />

                    <button type='button' className='btn btn-light' onClick={showAddParent}> הוסף איש קשר
                        <FaPlus style={{ paddingBottom: '2px', paddingRight: '4px' }} />
                    </button>
                    <br />
                    <br />

                    {addParent && (
                        <div className='secParDiv' >
                            <label htmlFor="stu_parent2name">שם איש קשר</label>
                            <input id="stu_parent2name" name="stu_parent2name" type="text" />

                            <label htmlFor="stu_parent2cell">נייד איש קשר</label>
                            <input id="stu_parent2cell" name='stu_parent2cell' idtype="text" />

                            <label htmlFor="stu_parent2adress" style={{ fontWeight: 'bold' }}>כתובת איש קשר</label>
                            <label htmlFor="stu_parent2street">רחוב</label>
                            <input id="stu_parent2street" name='stu_parent2street' idtype="text" />

                            <label htmlFor="stu_parent2city">עיר</label>
                            <input id="stu_parent2city" name='stu_parent2city' idtype="text" />

                            <label htmlFor="stu_parent2homeNum">מספר בית</label>
                            <input id="stu_parent2homeNum" name='stu_parent2homeNum' idtype="text" />

                        </div>
                    )}


                </div>
                <div className='text-center' style={{ paddingTop: '5px' }}><Button>שמור <FaCheck style={{ paddingBottom: '2px' }} /> </Button></div>

                <div className='col sm-12 label-input col-form-label-sm'>

                </div>
            </div>
        </div>
    )
}
