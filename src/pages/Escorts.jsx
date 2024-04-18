import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';



export default function Escorts() {

  const navigate = useNavigate();

  const addEscort = () => {
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

  const escortColumns = [
    {
      name: "שם מלא",
      identifier:"fullname",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "תעודת זהות",
      
      selector: (row) => row.id,
    },
    {
      name: "נייד",
      selector: (row) => row.cell,
    },
    {
      name: "כתובת",
      selector: (row) => row.street + ' ' + row.homeNum + ', ' + row.City,
      sortable: true,
    },
    {
      name: "תאריך לידה",
      selector: (row) => row.dateOfBirth,
      sortable: true,
    },
  ];

  const escortRows = [
    //GET
    {
      fullName: 14,
      id: "אברהמסון",
      street: 'ברנר',
      homeNum: 5,
      City: 'כפר סבא',
      dateOfBirth: '05/10/1999',
      cell: '0527458899'
    },
    {
      fullName: 7,
      id: "אהרוני",
      street: 'ויצמן',
      homeNum: 8,
      City: 'כפר סבא',
      dateOfBirth: '10/02/1997',
      cell: '0527458844'
    },
    {
      fullName: 80,
      id: "השרונים",
      street: 'הנביאים',
      homeNum: 85,
      City: 'כפר סבא',
      dateOfBirth: '01/04/2010',
      cell: '052745877'
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
    let currentEscort = {
      esc_fullName: row.fullName,
      esc_id: row.id,
      esc_dateOfBirth: row.dateOfBirth,
      esc_cell: row.cell,
      esc_city: row.City,
      esc_street: row.street,
      esc_homeNum: row.homeNum,
    };
    navigate('/EscortForm', { state: currentEscort });
  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
    // Add your delete logic here
  };


  return (
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>נתוני מלווים</h3>
      <Table columns={escortColumns} rows={escortRows} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div className='text-center'
        style={{ padding: '20px' }}>
        <Button onClick={addEscort}>הוסף מלווה חדש <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
    </div>
  )
}
