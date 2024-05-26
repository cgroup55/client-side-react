import React, { useState, useEffect, useContext, } from 'react';
import "../styling/Form.css";
import { showSuccessMessage, showErrorMessage, showInvalidDetailsMessage } from '../tools/swalUtils';
import { FaCheck } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchCities, fetchStreetsByCity, validateCity, validateStreet } from '../tools/cities&streets';
import { ValidPositiveNumber, validateHebrewletters, ValidCellOrHomePhoneNum, validateEmail, ValidateId } from '../tools/validations';
import { MdCancel } from 'react-icons/md';
import { CompanyContext } from '../contexts/companyContext';

export default function CompanyForm() {

  const navigate = useNavigate();
  const { state } = useLocation();
  let originCompany = state;

  const { addCompany, updateCompany } = useContext(CompanyContext);

  const [cities, setCities] = useState([]);
  const [streets, setStreets] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [company, setCompany] = useState({ ...originCompany });
  const [errors, setErrors] = useState({});


  //filterout cities that dont match the search
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const filteredCities = cities.filter(city =>
      city.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    setFilteredCities(filteredCities);
    fetchStreetsByCity(inputValue).then(streets => setStreets(streets));
    setCompany({ ...company, company_City: inputValue });
  };

  //form subbmision
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    let isValid = validateForm();
    if (isValid) {
      let companyToExport = {
        company_Code: company.company_Code,
        company_Name: company.company_Name,
        company_Email: company.company_Email,
        company_Phone: company.company_Phone,
        manager_Name: company.manager_Name,
        manager_Phone: company.manager_Phone,
        company_Comments: company.company_Comments,
        company_City: company.company_City,
        company_Street: company.company_Street,
        company_HomeNum: company.company_HomeNum
      };
      console.log("companyToExport", companyToExport);
      if (originCompany.company_Code == '')//add or update?
      {
        let res = await addCompany(companyToExport);
        if (res && res == 1) //check if res returns a valid response for 
        {
          showSuccessMessage(); //show successfuly saved message
          navigate('/transportComps');
        }
        else showErrorMessage();
      }
      else {
        let result = await updateCompany(companyToExport);
        if (result && result > 0) {
          showSuccessMessage(); //show successfuly saved message
          navigate('/transportComps');
        }
        else showErrorMessage();
      }
    } else {
      showInvalidDetailsMessage()
    }
  };



  const validateForm = () => {
    let valid = true;
    let newErrors = {};
    console.log('company=', company);

    newErrors.company_Code = ValidPositiveNumber(company.company_Code);
    newErrors.company_Name = validateHebrewletters(company.company_Name);
    newErrors.company_Email = validateEmail(company.company_Email);
    newErrors.company_Phone = ValidCellOrHomePhoneNum(company.company_Phone);
    if (company.manager_Name != "") {
      newErrors.manager_Name = validateHebrewletters(company.manager_Name);
    }
    if (company.manager_Phone != "") {
      newErrors.manager_Phone = ValidCellOrHomePhoneNum(company.manager_Phone);
    }

    newErrors.company_City = validateCity(company.company_City, cities);
    newErrors.company_Street = validateStreet(company.company_Street, streets);
    newErrors.company_HomeNum = ValidPositiveNumber(company.company_HomeNum);

    setErrors(newErrors);
    console.log('errors after=', errors);
    Object.values(newErrors).forEach(error => {
      if (error) {
        valid = false;
      }
    });
    return valid;
  };

  //Render the cities on-load
  useEffect(() => {
    fetchCities().then(cities => setCities(cities));
  }, []);

  //Render the streets in a specific city on-load
  useEffect(() => {
    if (originCompany.company_City != '') {
      fetchStreetsByCity(originCompany.company_City).then(streets => setStreets(streets));
    }
  }, []);

  return (
    <div className='container mt-5 form-container'>

      <div className='row justify-content-between align-items-center'>
        <div className='col-10'>
          <h2>{originCompany.company_Code !== "" ? "עריכת" : "הוספת"} חברת הסעה</h2>
        </div>
        <div className='col-2' style={{ textAlign: 'left' }}>
          <Button variant='btn btn-outline-dark' style={{ maxWidth: "4rem", marginBottom: '7px' }} onClick={() => { navigate('/transportComps') }}>
            <MdCancel style={{ fontSize: "1.3rem" }} /></Button>
        </div>
        <div className='row'>
          <Form className='col-9 label-input col-form-label-sm' style={{ margin: '0 auto' }} onSubmit={handleSubmit}>
            <Form.Group controlId="company_Code">
              <Form.Label>ח"פ חברה</Form.Label>
              {originCompany.company_Code != "" ?  //  if in edit mode
                (<Form.Control type="text" value={company.company_Code} readOnly /> // Render as plain text
                ) : (
                  <Form.Control // Render as input field if not in edit mode
                    type="text"
                    value={company.company_Code}
                    onChange={(e) => setCompany({ ...company, company_Code: e.target.value })}
                    isInvalid={!!errors.company_Code}
                    required
                  />
                )}
              <Form.Control.Feedback type="invalid">
                {errors.company_Code}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="company_Name">
              <Form.Label>שם חברה</Form.Label>
              <Form.Control type="text" name="company_Name"
                value={company.company_Name}
                onChange={(e) => setCompany({ ...company, company_Name: e.target.value })}
                isInvalid={!!errors.company_Name}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.company_Name}
              </Form.Control.Feedback>
            </Form.Group>


            <Form.Group controlId="company_Email">
              <Form.Label>מייל חברה</Form.Label>
              <Form.Control type="text" name="company_Email"
                value={company.company_Email}
                onChange={(e) => setCompany({ ...company, company_Email: e.target.value })}
                isInvalid={!!errors.company_Email}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.company_Email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="company_Phone">
              <Form.Label>טלפון חברה</Form.Label>

              <Form.Control type="text" name="company_Phone"
                value={company.company_Phone}
                onChange={(e) => setCompany({ ...company, company_Phone: e.target.value })}
                isInvalid={!!errors.company_Phone}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.company_Phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="manager_Name">
              <Form.Label>שם מנהל</Form.Label>
              <Form.Control type="text" name="manager_Name"
                value={company.manager_Name}
                onChange={(e) => setCompany({ ...company, manager_Name: e.target.value })}
                isInvalid={!!errors.manager_Name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.manager_Name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="manager_Phone">
              <Form.Label>טלפון מנהל</Form.Label>
              <Form.Control type="text" name="manager_Phone"
                value={company.manager_Phone}
                onChange={(e) => setCompany({ ...company, manager_Phone: e.target.value })}
                isInvalid={!!errors.manager_Phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.manager_Phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="company_Comments">
              <Form.Label>הערות</Form.Label>
              <Form.Control className='comment' as="textarea" rows={1} name="company_Comments"
                value={company.company_Comments}
                onChange={(e) => setCompany({ ...company, company_Comments: e.target.value })}
              />

            </Form.Group>


            <Form.Group controlId="company_City">
              <Form.Label>עיר</Form.Label>
              <Form.Control list="cities-data" name="company_City"
                value={company.company_City}
                onChange={handleInputChange}
                onInput={handleInputChange}
                isInvalid={!!errors.company_City}
                required
              />

              <datalist id="cities-data">
                {filteredCities.map((city, index) => (
                  <option key={index} value={city} />
                ))}
              </datalist>

              <Form.Control.Feedback type="invalid">
                {errors.company_City}
              </Form.Control.Feedback>

            </Form.Group>

            <Form.Group controlId="company_Street">
              <Form.Label>רחוב</Form.Label>
              <Form.Control
                as="select"
                name="company_Street"
                value={company.company_Street}
                onChange={(e) => setCompany({ ...company, company_Street: e.target.value })}
                isInvalid={!!errors.company_Street}
                required
                className="formSelect"
              >
                {<option value={-1}></option>}
                {streets.map((street, index) => (
                  <option key={index} value={street}>{street}</option>
                ))}
              </Form.Control>

              <Form.Control.Feedback type="invalid">
                {errors.company_Street}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="company_HomeNum">
              <Form.Label>מספר</Form.Label>
              <Form.Control type="text" name="company_HomeNum"
                value={company.company_HomeNum}
                onChange={(e) => setCompany({ ...company, company_HomeNum: e.target.value })}
                isInvalid={!!errors.company_HomeNum}
                required
              />
              <Form.Control.Feedback type="invalid">
                {errors.company_HomeNum}
              </Form.Control.Feedback>
            </Form.Group>

            <div className='text-center' style={{ paddingTop: '20px' }}>
              <Button type="submit" >שמור <FaCheck style={{ paddingBottom: '2px' }} /></Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
