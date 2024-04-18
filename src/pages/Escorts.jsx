import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';


export default function Escorts() {

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState(null);

  const addEscort = () => {
    let newEscort = {
      esc_fullName: '',
      esc_id: '',
      esc_dateofbirth: '',
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
      selector: (row) => row.esc_dateofbirth,
      sortable: true,
    },
  ];

  const escortRows = [
    //GET
    {
      esc_fullName: "אלי כהן",
      esc_id: "218675984",
      esc_dateofbirth: "12/04/1998",
      esc_cell: '0527458899',
      esc_city: 'כפר סבא',
      esc_street: 'ברנר',
      esc_homeNum: 5
    },
    {
      esc_fullName: 14,
      esc_id: "אברהמסון",
      esc_dateofbirth: "12/04/1998",
      esc_cell: '0527458899',
      esc_city: 'כפר סבא',
      esc_street: 'ברנר',
      esc_homeNum: 8
    },
    {
      esc_fullName: 14,
      esc_id: "אברהמסון",
      esc_dateofbirth: "12/04/1998",
      esc_cell: '',
      esc_city: 'כפר סבא',
      esc_street: 'ברנר',
      esc_homeNum: 5
    },
  ];

  const ColumnNamesByIdentifier = {

    esc_fullName: "שם מלא",
    esc_id: "תעודת זהות",
    esc_dateofbirth: "תאריך לידה",
    esc_cell: 'טלפון נייד',
    esc_city: 'עיר',
    esc_street: 'רחוב',
    esc_homeNum: 'מספר'

  }
  //3 functions that handle viewing, editing and deleting a row
  const handleView = (row) => {
    setColData(ColumnNamesByIdentifier);
    setRowData(row);
    setShowModal(true);
  };

  const handleEdit = (row) => {
    console.log('Edit:', row);
    // handle format of date
    let dateParts=(row.esc_dateofbirth).split('/');
    let fixedDate=dateParts[2]+'-'+dateParts[1]+'-'+dateParts[0];

    let currentEscort = {
      esc_fullName: row.esc_fullName,
      esc_id: row.esc_id,
      esc_dateofbirth: fixedDate,
      esc_cell: row.esc_cell,
      esc_city: row.esc_city,
      esc_street: row.esc_street,
      esc_homeNum: row.esc_homeNum,
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
      <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"מלווה"} />
    </div>
  )
}
