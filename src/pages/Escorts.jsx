import React from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";


//3 functions that handle viewing, editing and deleting a row
const handleView = (row) => {
  console.log('View:', row);
  // Add your view logic here
};

const handleEdit = (row) => {
  console.log('Edit:', row);
  // Add your edit logic here
};

const handleDelete = (row) => {
  console.log('Delete:', row);
  // Add your delete logic here
};


export default function Escorts() {
  return (
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>נתוני מלווים</h3>
      <Table columns={""} rows={""} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div className='text-center'
        style={{ padding: '20px' }}>
        <Button>הוסף מלווה חדש <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
    </div>
  )
}
