import React, { useContext, useState } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';
import { convertDate } from '../tools/validations.js';
import { SchoolContext } from '../contexts/schoolContext.jsx';
import { EscortContext } from '../contexts/escortContext.jsx';
import { CompanyContext } from '../contexts/companyContext.jsx';
import { LineContext } from '../contexts/lineContext.jsx';


export default function Lines() {

  const navigate = useNavigate();
  const { linesList } = useContext(LineContext);
  console.log('line list in lines page-', linesList);
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState(null);

  const { keyValSchool } = useContext(SchoolContext);
  const { keyValEscort } = useContext(EscortContext);
  const { keyValCompany } = useContext(CompanyContext);

  //initialize empty object for adding new
  const addNewLine = () => {
    let currentLine = {
      line_code: "",
      line_car: "",
      number_of_seats: "",
      escort_incharge: "",
      school_of_line: "",
      station_definition: "",
      line_city: "",
      line_street: "",
      line_Homenumber: "",
      time_of_line: "00:00",
      definition_date: "",
      transportation_company: "",
      comments: ""
    }
    let studentsId = [];
    navigate('/LineForm', { state: { currentLine, studentsId } });
  }


  //columns name and connection to data in table
  const Linecolumns = [
    {
      name: "קוד קו",
      selector: (row) => row.line_code,
      sortable: true,
    },
    {
      name: "חברת הסעה",
      selector: (row) => keyValCompany[row.transportation_company].company_Name,
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
      selector: (row) => keyValSchool[row.school_of_line].name,
    },
    {
      name: "איסוף/פיזור",
      selector: (row) => row.station_definition,
      sortable: true,
    },
    {
      name: "מלווה",
      selector: (row) => keyValEscort[row.escort_incharge].esc_fullName,
    },
    {
      name: "מסלול",
      cell: (row) => (
        <a href="/" onClick={(e) => handleLinkClick(e, row)}>
          הצג
        </a>
      ),
    }


  ];


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
    time_of_line: "שעת יציאת הקו",
    definition_date: "תאריך הגדרת קו",
    transportation_company: "חברת הסעה",
    comments: "הערות"
  }

  //fetching the data of the foreign keys that sends to the modal 
  const mapRowData = (row) => {
    return {
      ...row,
      escort_incharge: keyValEscort[row.escort_incharge]?.esc_fullName,
      school_of_line: keyValSchool[row.school_of_line]?.name,
      transportation_company: keyValCompany[row.transportation_company]?.company_Name,
    };
  };

  const handleLinkClick = (e, line) => {
    e.preventDefault();
    let fixedLine = {
      ...line,
      escort_incharge: keyValEscort[line.escort_incharge]?.esc_fullName,
      school_of_line: keyValSchool[line.school_of_line]?.name,
      transportation_company: keyValCompany[line.transportation_company]?.company_Name,
    };
    // let linePoints={
    //   longitude:keyValSchool[line.school_of_line].lng,
    //   latitude:keyValSchool[line.school_of_line].lat
    // };
    // console.log("linePoints",linePoints);
    navigate('/RouteVizualization', { state: { fixedLine } });
  }

  //modal view for specific row
  const handleView = (row) => {
    const mappedRowData = mapRowData(row);
    setColData(ColumnNamesByIdentifier);
    setRowData(mappedRowData);
    setShowModal(true);
  };

  //edit mode- pass line obj with relevante data
  const handleEdit = (row) => {
    console.log("row", row);
    let currentLine = {
      line_code: row.line_code,
      line_car: row.line_car,
      definition_date: convertDate(row.definition_date, false),
      number_of_seats: row.number_of_seats,
      escort_incharge: row.escort_incharge,
      school_of_line: row.school_of_line,
      station_definition: row.station_definition,
      time_of_line: row.time_of_line,
      line_city: row.line_city,
      line_street: row.line_street,
      line_Homenumber: row.line_Homenumber,
      transportation_company: row.transportation_company,
      comments: row.comments
    }

    let studentsId = row.studentsId;
    console.log('studentsId-line page:', studentsId);
    navigate('/LineForm', { state: { currentLine, studentsId } });

  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
    // delete logic 
  };

  //dd students- pass line obj with relevante data
  const handleAdd = (row) => {
    console.log("row-line page", row);
    let studentIds = row.studentsId;
    navigate('/AddStudentToLine', { state: { row, studentIds } });

  }

  // renders the table after the data was loaded
  if (!linesList || linesList.length == 0)
    return (
      <div className='container mt-5' >
        <h3 className="bold" style={{ textAlign: 'center' }}>קווי הסעה</h3>
      </div>
    )

  return (
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>קווי הסעה</h3>
      <Table columns={Linecolumns} rows={linesList} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} handleAdd={handleAdd} />
      <div className='text-center'
        style={{ padding: '20px' }}>
        <Button onClick={addNewLine}>הוסף קו חדש <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
      <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"קו"} />
    </div>
  )
}
