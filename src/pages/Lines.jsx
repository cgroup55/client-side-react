import React, { useContext, useState } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
import MyModal from '../components/MyModal';
import { SchoolContext } from '../contexts/schoolContext.jsx';
import { EscortContext } from '../contexts/escortContext.jsx';
import { CompanyContext } from '../contexts/companyContext.jsx';


export default function Lines() {

  const navigate = useNavigate();
  const { state } = useLocation();
  let addedLine = state;

  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState(null);

  const { schoolsList, keyValSchool} = useContext(SchoolContext);
  const { keyValEscort } = useContext(EscortContext);
  const { keyValCompany } = useContext(CompanyContext);



  console.log("schools list",schoolsList);
  console.log("keyValEscort",keyValEscort);
  //initialize empty object for adding new
  const addNewLine = () => {
    let newLine = {
      line_code: "",
      line_car: "",
      number_of_seats: "",
      escort_incharge: "",
      school_of_line: {},
      station_definition: "",
      line_city: "",
      line_street: "",
      line_Homenumber: "",
      time_of_line: "00:00",
      definition_date: "",
      transportaion_company: "",
      comments: ""
    }
    navigate('/LineForm', { state: newLine });
  }

  //columns name and connection to data in table
  const Linecolumns = [
    {
      name: "קוד קו",
      selector: (row) => row.line_code,
      sortable: true,
    },
    {
      name: "סוג רכב",
      selector: (row) => row.line_car,
    },
    {
      name: "מקומות ישיבה",
      selector: (row) => row.number_of_seats,
    },
    {
      name: "מוסד לימודי",
      selector: (row) => row.school_of_line,
    },
    {
      name: "איסוף/פיזור",
      selector: (row) => row.station_definition,
      sortable: true,
    },
    {
      name: "מלווה",
      selector: (row) => row.escort_incharge,
    },

  ];

  //יימחק
  const Linerows = [

    {
      line_code: 1,
      line_car: "אוטובוס",
      number_of_seats: 3,
      escort_incharge: "123321123",
      school_of_line: "1",
      station_definition: "מוצא",
      time_of_line: "19:17",
      line_city: "נתניה",
      line_street: "שד' בנימין",
      line_Homenumber: "3",
      definition_date: "12/04/2021",
      transportaion_company: "12",
      comments: "הערההההההה"

    },
    {
      line_code: "2",
      line_car: "מיניבוס",
      number_of_seats: "5",
      escort_incharge: "בני בוי",
      school_of_line: "טשרני",
      station_definition: "יעד",
      time_of_line: "20:21",
      line_city: "כפר סבא",
      line_street: "עליה",
      line_Homenumber: "8",
      transportaion_company: "אא הסעים",
    },
  ];

  const updatedLineRows = addedLine ? [...Linerows, addedLine] : Linerows;

  //field names for the model
  const ColumnNamesByIdentifier =
  {
    line_code: "קוד קו",
    line_car: "סוג רכב",
    number_of_seats: "מספר כסאות",
    escort_incharge: "מלווה אחראי",
    school_of_line: "מוסד לימודי",
    station_definition: "ייעוד תחנה",
    line_city: "עיר",
    line_street: "רחוב",
    line_Homenumber: "מספר",
    time_of_line: "שעת התחנה",
    definition_date: "תאריך הגדרת קו",
    transportaion_company: "חברת הסעה",
    comments: "הערות"
  }

  //modal view for specific row
  const handleView = (row) => {
    setColData(ColumnNamesByIdentifier);
    setRowData(row);
    setShowModal(true);
  };

  //edit mode- pass line obj with relevante data
  const handleEdit = (row) => {
    console.log("row",row);
    let currentLine = {
      line_code: row.line_code,
      line_car: row.line_car,
      definition_date: row.definition_date,
      number_of_seats: row.number_of_seats,
      escort_incharge: row.escort_incharge,
      school_of_line: row.school_of_line,
      station_definition: row.station_definition,
      time_of_line: row.time_of_line,
      line_city: row.line_city,
      line_street: row.line_street,
      line_Homenumber: row.line_Homenumber,
      transportaion_company: row.transportaion_company,
      comments: row.comments

    }
    navigate('/LineForm', { state: currentLine });
  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
    // Add your delete logic here
  };

  //dd students- pass line obj with relevante data
  const handleAdd = (row) => {
    console.log("row",row);
    console.log("row school",row.school_of_line);
    let school=keyValSchool[row.school_of_line];
    console.log("school",school);
    navigate('/AddStudentToLine', { state: row });

  }

  //renders the table after the data was loaded
  // if (! || .length == 0)
  //   return (
  //       <div className='container mt-5' >
  //           <h3 className="bold" style={{ textAlign: 'center' }}>קווי הסעה</h3>
  //       </div>
  //   )

  return (
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>קווי הסעה</h3>
      <Table columns={Linecolumns} rows={updatedLineRows} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} handleAdd={handleAdd} />
      <div className='text-center'
        style={{ padding: '20px' }}>
        <Button onClick={addNewLine}>הוסף קו חדש <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
      <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"קו"} />
    </div>
  )
}
