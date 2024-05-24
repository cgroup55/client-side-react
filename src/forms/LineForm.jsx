import React, { useState, useEffect, useContext } from 'react';
import "../styling/Form.css";
import Swal from 'sweetalert2';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { ValidPositiveNumber, isRadioButtonChecked, Validateselect, convertDate } from '../tools/validations';
import { MdCancel } from 'react-icons/md';
import { SchoolContext } from '../contexts/schoolContext.jsx';
import { EscortContext } from '../contexts/escortContext.jsx';
import { CompanyContext } from '../contexts/companyContext.jsx';
import { LineContext } from '../contexts/lineContext.jsx';

export default function LineForm() {

  const navigate = useNavigate();
  const today = new Date().toLocaleDateString('en-GB');

  const { state } = useLocation();
  let originLine = state.currentLine;
  let studentsId = state.studentsId;

  const { schoolsList } = useContext(SchoolContext);
  const { escortsList } = useContext(EscortContext);
  const { companiesList } = useContext(CompanyContext);
  const { addLine, updateLine } = useContext(LineContext);

  let giventime = originLine.time_of_line.split(':')
  const [line, setLine] = useState({ ...originLine, definition_date: today });
  const [errors, setErrors] = useState({});
  const [time, setTime] = useState({ hours: giventime[0], minutes: giventime[1], error: '' });



  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    let isValid = validateForm();

    if (isValid) {
      let timeLine = time.hours + ":" + time.minutes;
      if (time.hours == "00") {
        console.log("inside");
        setTime({ ...time, error: "שעת יציאת הקו לא יכולה להיות 00" });
        return;
      }
      setTime({ ...time, error: "" });


      //a new line has an empty students list
      let LinetoExport = {
        line_code: line.line_code,
        line_car: line.line_car,
        number_of_seats: line.number_of_seats,
        escort_incharge: line.escort_incharge,
        school_of_line: line.school_of_line,
        station_definition: line.station_definition,
        line_city: line.line_city,
        line_street: line.line_street,
        line_Homenumber: line.line_Homenumber,
        time_of_line: timeLine,
        definition_date: convertDate(line.definition_date, false),
        transportation_company: line.transportation_company,
        comments: line.comments,
        studentsId: []
      };


      if (originLine.line_code == '') //add or update?
      {
        console.log('LinetoExport-', LinetoExport);
        let res = await addLine(LinetoExport);
        if (res && res >= 1) //check if res returns a valid response  
        {
          navigate('/Lines');
        }
        else console.log("error");//add swal
      }
      else {
        //studentsId added to passing so line doesnt lose the array of student ids in update
        //let dbUpdate =  true;
        //await updateLine(LinetoExport, studentsId, dbUpdate);
        navigate('/Lines');

      }
    } else {
      // Show error message
      console.log("invalid details");
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
    newErrors.transportation_company = Validateselect(line.transportation_company);

    setErrors(newErrors);
    Object.values(newErrors).forEach(error => {
      if (error) {
        valid = false;
      }
    });
    return valid;
  };

  //updates the school info 
  useEffect(() => {
    const chosenSchool = schoolsList.find(school => school.institutionId === line.school_of_line);
    if (chosenSchool) {
      setLine(prevLine => ({
        ...prevLine,
        line_city: chosenSchool.city,
        line_street: chosenSchool.street,
        line_Homenumber: chosenSchool.houseNumber
      }));
    }
  }, [line.school_of_line]);

  if (!schoolsList || schoolsList.length == 0 || !escortsList || escortsList.length == 0 || !companiesList || companiesList.length == 0)
    return (
      <div className='container mt-5 form-container '>

        <div className='row justify-content-between align-items-center'>
          <div className='col-10'>
            <h2>{originLine.line_code != "" ? "עריכת" : "הוספת"} קו הסעה</h2>
          </div>
          <div className='col-2' style={{ textAlign: 'left' }}>
            <Button variant='btn btn-outline-dark' style={{ maxWidth: "4rem", marginBottom: '7px' }} onClick={() => { navigate('/Lines') }}>
              <MdCancel style={{ fontSize: "1.3rem" }} /></Button>
          </div>
        </div>
      </div>
    )

  return (
    <div className='container mt-5 form-container'>

      <div className='row justify-content-between align-items-center'>
        <div className='col-10'>
          <h2>{originLine.line_code != "" ? "עריכת" : "הוספת"} קו הסעה</h2>
        </div>
        <div className='col-2' style={{ textAlign: 'left' }}>
          <Button variant='btn btn-outline-dark' style={{ maxWidth: "4rem", marginBottom: '7px' }} onClick={() => { navigate('/Lines') }}>
            <MdCancel style={{ fontSize: "1.3rem" }} /></Button>
        </div>
      </div>

      <Form style={{ margin: '0 auto' }} onSubmit={handleSubmit}>
        <div className='row'>
          <div className='col-12 col-sm-6 label-input col-form-label-sm'>
            <h5>פרטי קו</h5>

            <Form.Group controlId="line_code">
              <Form.Label>קוד קו</Form.Label>
              {originLine.line_code != "" ?
                (<Form.Control type="text" value={line.line_code} readOnly />)
                :
                (<Form.Control type="text" name="line_code"
                  value={line.line_code}
                  onChange={(e) => setLine({ ...line, line_code: e.target.value })}
                  isInvalid={!!errors.line_code}
                  required
                />)
              }

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

            <Form.Group controlId="transportation_company">
              <Form.Label>חברת הסעה</Form.Label>
              <Form.Control
                as="select"
                name="transportation_company"
                value={line.transportation_company}
                onChange={(e) => setLine({ ...line, transportation_company: e.target.value })}
                isInvalid={!!errors.transportation_company}
                required
                className="formSelect"
              >
                <option value={"-1"}></option>
                {companiesList.map((company, index) => (
                  <option key={index} value={company.company_Code}>
                    {company.company_Name}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.transportation_company}
              </Form.Control.Feedback>
            </Form.Group>



            <Form.Group controlId="line_car">
              <Form.Label>סוג רכב</Form.Label>
              <Form.Control
                as="select"
                name="line_car"
                value={line.line_car} // This should be line_car
                onChange={(e) => {
                  const selectedOptionText = e.target.options[e.target.selectedIndex].text;
                  setLine({ ...line, line_car: selectedOptionText });
                }}
                isInvalid={!!errors.line_car}
                required
                className="formSelect"
              >
                <option value={"-1"}></option>
                <option value={"אוטובוס"}>אוטובוס</option>
                <option value={"מיניבוס"}>מיניבוס</option>
                <option value={"מונית"}>מונית</option>
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
                value={line.escort_incharge}
                onChange={(e) => setLine({ ...line, escort_incharge: e.target.value })}
                isInvalid={!!errors.escort_incharge}
                className="formSelect"
              >
                <option value={"-1"}></option>
                {escortsList.map((escort, index) => (
                  <option key={index} value={escort.esc_id}>
                    {escort.esc_fullName}
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
                value={line.school_of_line}
                onChange={(e) => setLine({ ...line, school_of_line: e.target.value })}
                isInvalid={!!errors.school_of_line}
                required
                className="formSelect"
              >
                <option value={"-1"}></option>
                {schoolsList.map((school, index) => (
                  <option key={index} value={school.institutionId}>
                    {school.name}
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
                checked={line.station_definition === "מוצא"}
                onChange={(e) => setLine({ ...line, station_definition: "מוצא" })}
                isInvalid={!!errors.station_definition}
              />
              <Form.Check
                type="radio"
                id="radio-destination"
                label="יעד"
                name="stationDefinition"
                checked={line.station_definition === "יעד"}
                onChange={(e) => setLine({ ...line, station_definition: "יעד" })}
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
                  isInvalid={!!time.error}
                >
                  {/* Render hour options */}
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={String(i).padStart(2, '0')}>{String(i).padStart(2, '0')}</option>
                  ))}
                </Form.Control>
              </div>

              <Form.Control.Feedback type="invalid">
                {time.error}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="comments">
              <Form.Label>הערות</Form.Label>
              <Form.Control className='comment' as="textarea" rows={2} name="comments"
                value={line.comments}
                onChange={(e) => setLine({ ...line, comments: e.target.value })}
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
