import React from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import {useNavigate } from 'react-router-dom';


export default function Lines() {

  const navigate = useNavigate();

  const addLine = () => {
   
    let newLine={
      line_code:"",
      line_car:"",
      number_of_seats:"",
      escort_incharge:"",
      school_of_line:"",
      station_definition:"",
      line_city:"",
      line_street:"",
      line_Homenumber:"",
      origin_arrivaltime_minutes:"",
      origin_arrivaltime_hours:""
    }
    navigate('/LineForm',{ state: newLine });
  }

  const Linecolumns = [
    {
        name: "ID",
        selector: (row) => row.personID,
        sortable: true,
    },
    {
        name: "Full Name",
        selector: (row) => row.fullName,
    },


];

const Linerows = [

    {
        personID: 14,
        fullName: "Ethan Lee",

    },
    {
        personID: 15,
        fullName: "Isabella Thompson",

    },
];
  
//3 functions that handle viewing, editing and deleting a row
const handleView = (row) => {
  console.log('View:', row);
  // Add your view logic here
};

const handleEdit = (row) => {
  console.log('Edit:', row);
  // Add your edit logic here
  let currentLine={
    line_code:"1",
    line_car:"bus",
    number_of_seats:"3",
    escort_incharge:"בני בוי",
    school_of_line:"טשרני",
    station_definition:"origin",
   
    origin_arrivaltime_minutes:"17",
    origin_arrivaltime_hours:"18"
  }
  navigate('/LineForm',{ state: currentLine });
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
    </div>
  )
}
