import React, { useState, useEffect, useContext } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';
import { convertDate } from '../tools/validations.js';
import { EscortContext } from '../contexts/escortContext.jsx';


export default function Escorts() {
  const navigate = useNavigate();

  //escorts list from context
  const { escortsList } = useContext(EscortContext);
  console.log('escortsList:', escortsList);

  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState(null);

  //initialize empty object for adding new
  const addNewEscort = () => {
    let newEscort = {
      esc_fullName: '',
      esc_id: '',
      esc_dateOfBirth: '',
      esc_cell: '',
      esc_city: '',
      esc_street: '',
      esc_homeNum: ''
    };
    navigate('/EscortForm', { state: newEscort });
  }

  //columns name and connection to data in table
  const escortColumns = [
    {
      name: "שם מלא",
      selector: (row) => row.esc_fullName,
      sortable: true,
    },
    {
      name: "תעודת זהות",
      selector: (row) => row.esc_id,
    },
    {
      name: "נייד",
      selector: (row) => row.esc_cell,
    },
    {
      name: "כתובת",
      selector: (row) => row.esc_street + ' ' + row.esc_homeNum + ', ' + row.esc_city,
      sortable: true,
    },
    {
      name: "תאריך לידה",
      selector: (row) => row.esc_dateOfBirth,
      sortable: true,
    },
  ];


  //field names for the model
  const ColumnNamesByIdentifier = {
    esc_fullName: "שם מלא",
    esc_id: "תעודת זהות",
    esc_dateOfBirth: "תאריך לידה",
    esc_cell: 'טלפון נייד',
    esc_city: 'עיר',
    esc_street: 'רחוב',
    esc_homeNum: 'מספר',
  }

  //modal view for specific row
  const handleView = (row) => {
    setColData(ColumnNamesByIdentifier);
    setRowData(row);
    setShowModal(true);
  };

  //edit mode- pass obj with relevante data
  const handleEdit = (row) => {
    let currentEscort = {
      esc_fullName: row.esc_fullName,
      esc_id: row.esc_id,
      esc_dateOfBirth: convertDate(row.esc_dateOfBirth, false),
      esc_cell: row.esc_cell,
      esc_city: row.esc_city,
      esc_street: row.esc_street,
      esc_homeNum: row.esc_homeNum,
    };
    console.log("currentEscort:", currentEscort);
    navigate('/EscortForm', { state: currentEscort });
  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
    //delete logic 
  };



  //renders the table after the data was loaded
  if (!escortsList || escortsList.length == 0)
    return (
      <div className='container mt-5' >
        <h3 className="bold" style={{ textAlign: 'center' }}>נתוני מלווים</h3>
      </div>
    )

  return (
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>נתוני מלווים</h3>
      <Table columns={escortColumns} rows={escortsList} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div className='text-center'
        style={{ padding: '20px' }}>
        <Button onClick={addNewEscort}>הוסף מלווה חדש <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
      <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"המלווה"} />
    </div>
  )
}
