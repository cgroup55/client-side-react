import React from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import {useNavigate } from 'react-router-dom';

export default function TransportationCompanies() {

  const navigate = useNavigate();

  const addCompany = () => { 
    navigate('/CompanyForm');
  }
  
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
  


  return (
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>חברות הסעה</h3>
      <Table columns={""} rows={""} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div className='text-center'
        style={{ padding: '20px' }}>
        <Button onClick={addCompany}>הוסף חברת הסעה <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
    </div>
  )
}
