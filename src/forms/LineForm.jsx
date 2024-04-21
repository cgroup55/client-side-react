import React, { useState, useEffect, useRef } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { ValidPositiveNumber, isRadioButtonChecked, validateHebrewletters, Validateselect } from '../tools/validations';

export default function LineForm() {

  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-GB');

  const { state } = useLocation();
  let originLine = state;
  let giventime = originLine.time_of_line.split(':')
  console.log(giventime);
  const [line, setLine] = useState({ ...originLine, definition_date: today });
  const [errors, setErrors] = useState({});
  const [time, setTime] = useState({ hours: giventime[0], minutes: giventime[1] });

  //צריך לחבר לנתונים שיגיעו מהDB
  const schools = [{ schoolname: "טשרני", schoolcity: "נתניה", schoolstreet: "הגרא", schoolHomenum: "3" }, { schoolname: "אורט", schoolcity: "חדרה", schoolstreet: "הרצל", schoolHomenum: "5" }];//need to fetch from database
  const escorts = ["אבי לוי", "בני בוי"];//need to fetch from database



  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    let isValid = validateForm();
    console.log('isValid:', isValid);
    if (isValid) {
      // Logic to check validity of new line

      let timeLine = time.hours + ":" + time.minutes;
      navigate('/Lines', { state: { ...line, time_of_line: timeLine } });
    } else {
      // Show error message
    }
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    newErrors.line_code = ValidPositiveNumber(line.line_code);
    newErrors.line_car = Validateselect(line.line_car);
    newErrors.number_of_seats = ValidPositiveNumber(line.number_of_seats);
    newErrors.school_of_line = Validateselect(line.school_of_line);
    newErrors.station_definition = isRadioButtonChecked(line.station_definition);

    setErrors(newErrors);
    console.log('errors after=', errors);
    Object.values(newErrors).forEach(error => {
      if (error) {
        valid = false;
      }
    });
    return valid;
  };

  useEffect(() => {
    const chosenSchool = schools.find(school => school.schoolname === line.school_of_line);
    console.log(chosenSchool);
    if (chosenSchool) {
      setLine(prevLine => ({
        ...prevLine,
        line_city: chosenSchool.schoolcity,
        line_street: chosenSchool.schoolstreet,
        line_Homenumber: chosenSchool.schoolHomenum
      }));
    }
  }, [line.school_of_line]);

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
                //readOnly 
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

            <Form.Group controlId="transportaion_company">
              <Form.Label>חברת הסעה</Form.Label>
              <Form.Control
                as="select"
                name="transportaion_company"
                value={line.transportaion_company}
                onChange={(e) => setLine({ ...line, transportaion_company: e.target.value })}
                isInvalid={!!errors.line_car}
                required
                className="formSelect"
              >
                <option value={"-1"}>בחר חברת הסעה</option>
                <option value={"1"}>אא הסעים</option>
                <option value={"2"}>בב הסעות</option>
                <option value={"3"}>א אוטובוס</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.transportaion_company}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="line_car">
              <Form.Label>סוג רכב</Form.Label>
              <Form.Control
                as="select"
                name="line_car"
                value={line.line_car} // This should be line_car
                onChange={(e) => setLine({ ...line, line_car: e.target.value })}
                isInvalid={!!errors.line_car}
                required
                className="formSelect"
              >
                <option value={"-1"}>בחר סוג רכב</option>
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

            מהDB צריך להיות  ***
            <Form.Group controlId="escort_incharge">
              <Form.Label>מלווה אחראי </Form.Label>
              <Form.Control
                as="select"
                name="escort_incharge"
                value={line.escort_incharge}
                onChange={(e) => setLine({ ...line, escort_incharge: e.target.value })}
                isInvalid={!!errors.escort_incharge}
                required
                className="formSelect"
              >
                <option value={"-1"}>בחר מלווה</option>
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

            מהDB צריך להיות  ***
            <Form.Group controlId="school_of_line">
              <Form.Label>מוסד לימודים </Form.Label>
              <Form.Control
                as="select"
                name="school_of_line"
                value={line.school_of_line}
                onChange={(e) => setLine({ ...line, school_of_line: e.target.value })}
                isInvalid={!!errors.school_of_line}
                required
                className="formSelect"
              >
                <option value={"-1"}>בחר מוסד</option>
                {schools.map((school, index) => (
                  <option key={index} value={school.schoolname}>
                    {school.schoolname}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.school_of_line}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className='col-12 col-sm-6 label-input col-form-label-sm'>
            <h5>הגדרת תחנה</h5>
            <Form.Group controlId="station_definition">

              <Form.Check
                type="radio"
                id="radio-origin"
                label="מוצא"
                name="stationDefinition"
                checked={line.station_definition === "origin"}
                onChange={(e) => setLine({ ...line, station_definition: "origin" })}
                isInvalid={!!errors.station_definition}
              />
              <Form.Check
                type="radio"
                id="radio-destination"
                label="יעד"
                name="stationDefinition"
                checked={line.station_definition === "destination"}
                onChange={(e) => setLine({ ...line, station_definition: "destination" })}
                isInvalid={!!errors.station_definition}
              />

              <Form.Control.Feedback type="invalid">
                {errors.station_definition}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="line_city">

              <Form.Label>עיר</Form.Label>
              <Form.Control type='text' name="line_city"
                readOnly
                value={line.line_city}//add from school fields
              />
            </Form.Group>

            <Form.Group controlId="line_street">
              <Form.Label>רחוב</Form.Label>
              <Form.Control type='text' name="line_street"
                readOnly
                value={line.line_street}
              />


            </Form.Group>

            <Form.Group controlId="line_Homenumber">
              <Form.Label>מספר</Form.Label>
              <Form.Control type="text" name="line_Homenumber"
                value={line.line_Homenumber}
                readOnly
              />

            </Form.Group>

            <Form.Group controlId="time_definition">
              <Form.Label>הגדרת שעת יציאה/הגעה</Form.Label>
              <div className="d-flex" style={{ justifyContent: 'center' }}>

                <Form.Control
                  as="select"
                  className="ml-2 comment"
                  value={time.minutes}
                  onChange={(e) => setTime({ ...time, minutes: e.target.value })}
                  required
                  style={{ maxWidth: 'fit-content' }}
                >
                  {/* Render minute options */}
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
                  ))}
                </Form.Control>
                <span>:</span>
                <Form.Control
                  as="select"
                  className="mr-2 comment"
                  value={time.hours}
                  onChange={(e) => setTime({ ...time, hours: e.target.value })}
                  required
                  style={{ maxWidth: 'fit-content' }}
                >
                  {/* Render hour options */}
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
                  ))}
                </Form.Control>
              </div>

            </Form.Group>

            <Form.Group controlId="line_comments">
              <Form.Label>הערות</Form.Label>
              <Form.Control className='comment' as="textarea" rows={2} name="line_comments"
                value={line.line_comments}
                onChange={(e) => setLine({ ...line, line_comments: e.target.value })}
              />
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
