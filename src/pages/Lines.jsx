import React, { useState } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';


export default function Lines() {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState(null);


  const addLine = () => {

    let newLine = {
      line_code: "",
      line_car: "",
      number_of_seats: "",
      escort_incharge: "",
      school_of_line: "",
      station_definition: "",
      line_city: "",
      line_street: "",
      line_Homenumber: "",
      time_of_line: ""
    }
    navigate('/LineForm', { state: newLine });
  }

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

  ];

  const Linerows = [

    {
      line_code: 1,
      line_car: "bus",
      number_of_seats: 3,
      escort_incharge: "בני בוי",
      school_of_line: "טשרני",
      station_definition: "origin",
      time_of_line:"19:17",
      line_city: "נתניה",
      line_street: "שד' בנימין",
      line_Homenumber: "3",
    },
    {
      line_code: "2",
      line_car: "cab",
      number_of_seats: "3",
      escort_incharge: "בני בוי",
      school_of_line: "טשרני",
      station_definition: "origin",
      time_of_line:"20:21",
      line_city: "כפר סבא",
      line_street: "עליה",
      line_Homenumber: "8",

    },
  ];

  //define the hebrew names of each field
  const ColumnNamesByIdentifier =
  {
    line_code: "קוד קו",
    line_car: "bus",
    number_of_seats: "מספר כסאות",
    escort_incharge: "מלווה אחראי",
    school_of_line: "ביס של קו",
    station_definition: "ייעוד תחנה",
    line_city: "עיר",
    line_street: "רחוב",
    line_Homenumber: "מספר",
    time_of_line: "שעת התחנה"
  }



  //3 functions that handle viewing, editing and deleting a row
  const handleView = (row) => {
    setColData(ColumnNamesByIdentifier);
    console.log(colData);
    setRowData(row);
    setShowModal(true);
  };


  const handleEdit = (row) => {
    console.log('Edit:', row);
    // Add your edit logic here
    let currentLine = {
      line_code: "1",
      line_car: "bus",
      number_of_seats: "3",
      escort_incharge: "בני בוי",
      school_of_line: "טשרני",
      station_definition: "origin",
      time_of_line:"18:17"
    }
    navigate('/LineForm', { state: currentLine });
  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
    // Add your delete logic here
  };


  return (
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>קווי הסעה</h3>
      <Table columns={Linecolumns} rows={Linerows} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div className='text-center'
        style={{ padding: '20px' }}>
        <Button onClick={addLine}>הוסף קו חדש <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
      <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"קו"} />
    </div>
  )
}
