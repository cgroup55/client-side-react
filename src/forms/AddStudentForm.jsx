import React, { useState, useEffect } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { fetchCities, fetchStreetsByCity } from '../tools/cities&streets';


export default function AddStudentForm() {

    //State for student type (רווחה, פנימיה, רגיל)
    const [stuKind, setstuKind] = useState("");
    // State for toggling the additional contact section
    const [addContact, setaddContact] = useState(false);
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

    //Render the cities on-load
    useEffect(() => {
        fetchCities().then(cities => setCities(cities));
    }, []);


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


    //show social worker section on condition
    const handleStuKindChange = (e) => {
        setstuKind(e.target.value);
    };

    //Toggle the additional parent section
    const showAddContact = () => {
        setaddContact(true);
        event.target.disabled = true;
    }


    return (

        <div className='container mt-5 form-container'>
            <div className='row' style={{ paddingRight: '50px' }}>
                <h2>הוספת תלמיד</h2>
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm'>
                    <h5>תלמיד</h5>

                    <label htmlFor="stu_firstName">שם פרטי</label>
                    <input id="stu_firstName" name='stu_firstName' idtype="text" />

                    <label htmlFor="stu_lastName">שם משפחה</label>
                    <input id="stu_lastName" name='stu_lastName' idtype="text" />

                    <label htmlFor="stu_id">תעודת זהות</label>
                    <input id="stu_id" name='stu_id' idtype="text" />

                    <label htmlFor="stu_dateofbirth">תאריך לידה</label>
                    <input id="stu_dateofbirth" name="stu_dateofbirth" type="date" />

                    <label htmlFor="stu_grade">כיתה</label>
                    <input id="stu_grade" name="stu_grade" type="text" />

                    <label htmlFor="stu_school">מוסד לימודי</label>
                    <select defaultValue={0} id="stu_school">
                        <option >בחר...</option>
                        <option >...</option>
                    </select>

                </div>
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm' >
                <h5>פרטי לקות</h5>
                    <label htmlFor="stu_dateofplacementcom">תאריך ועדת השמה</label>
                    <input id="stu_dateofplacementcom" name="stu_dateofplacementcom" type="date" />

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

                <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm' >
                    <h5>הורה</h5>

                    <label htmlFor="stu_parent1name">שם הורה</label>
                    <input id="stu_parent1name" name="stu_parent1name" type="text" />

                    <label htmlFor="stu_parent1cell">נייד הורה</label>
                    <input id="stu_parent1cell" name='stu_parent1cell' idtype="text" />

                    <label htmlFor="stu_parent1city">עיר</label>
                    <input
                        list="cities-data1"
                        id="city-choice1"
                        name="city-choice1"
                        onChange={(e) => handleCityInputChange(e, setFilteredCities1, setSelectedCity1, setStreets1)}
                        onInput={(e) => handleCityInputChange(e, setFilteredCities1, setSelectedCity1, setStreets1)}
                    />
                    <datalist id="cities-data1">
                        {filteredCities1.map((city, index) => (
                            <option key={index} value={city} />
                        ))}
                    </datalist>

                    <label htmlFor="stu_parent1street">רחוב</label>
                    <select id="stu_parent1street" value={selectedStreet1} onChange={(e) => handleStreetInputChange(e, setSelectedStreet1)}>
                        {streets1.map((street, index) => (
                            <option key={index} value={street}>{street}</option>
                        ))}
                    </select>

                    <label htmlFor="stu_parent1homeNum">מספר בית</label>
                    <input id="stu_parent1homeNum" name='stu_parent1homeNum' idtype="text" />
                    <br />
                    <button type='button' className='btn btn-light' onClick={showAddContact}> הוסף איש קשר
                        <FaPlus style={{ paddingBottom: '2px', paddingRight: '4px' }} />
                    </button>

                </div>

                {addContact && (
                    <div className='col-12 col-sm-6 col-md-4 col-lg-3 label-input col-form-label-sm'>
                        <h5>איש קשר</h5>
                        <label htmlFor="stu_parent2name">שם איש קשר</label>
                        <input id="stu_parent2name" name="stu_parent2name" type="text" />

                        <label htmlFor="stu_parent2cell">נייד איש קשר</label>
                        <input id="stu_parent2cell" name='stu_parent2cell' idtype="text" />

                        <label htmlFor="stu_parent2city">עיר</label>
                        <input
                            list="cities-data2"
                            id="city-choice2"
                            name="city-choice2"
                            onChange={(e) => handleCityInputChange(e, setFilteredCities2, setSelectedCity2, setStreets2)}
                            onInput={(e) => handleCityInputChange(e, setFilteredCities2, setSelectedCity2, setStreets2)}
                        />
                        <datalist id="cities-data2">
                            {filteredCities2.map((city, index) => (
                                <option key={index} value={city} />
                            ))}
                        </datalist>

                        <label htmlFor="stu_parent2street">רחוב</label>
                        <select id="stu_parent2street" value={selectedStreet2} onChange={(e) => handleStreetInputChange(e, setSelectedStreet2)}>
                            {streets2.map((street, index) => (
                                <option key={index} value={street}>{street}</option>
                            ))}
                        </select>

                        <label htmlFor="stu_parent2homeNum">מספר בית</label>
                        <input id="stu_parent2homeNum" name='stu_parent2homeNum' idtype="text" />
                    </div>
                )}

            </div>

            <div className='text-center' style={{ paddingTop: '5px' }}><Button>שמור <FaCheck style={{ paddingBottom: '2px' }} /> </Button></div>
        </div>
    )
}
