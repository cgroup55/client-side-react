import React, { useState } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import {useNavigate ,useLocation} from 'react-router-dom';
import MyModal from '../components/MyModal';


export default function TransportationCompanies() {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState(null);

  const Companycolumns = [
    {
        name: "ID",
        selector: (row) => row.company_code,
        sortable: true,
    },
    {
        name: "Full Name",
        selector: (row) => row.company_name,
    },


];

const Companyrows = [

    {
      company_code:"1",
      company_name:"אא' הסעים",
      company_email:"bararad@gmail.com",
      company_phone:"0549506905",
      manager_name:"בר ארד",
      manager_phone:"0547896541",
      company_comments:"גבגב",
      company_city:"תל אביב",
      company_street:"אבן גבירול",
      company_homeNum:"3"

    },
    {
      company_code:"1",
      company_name:"בב' הסעות",
      company_email:"bararad@gmail.com",
      company_phone:"0549506905",
      manager_name:"בר ארד",
      manager_phone:"0547896541",
      company_comments:"גבגב",
      company_city:"תל אביב",
      company_street:"אבן גבירול",
      company_homeNum:"3"

    },
];

const ColumnNamesByIdentifier =
{
  company_code:"קוד קו",
  company_name:"שם חברה",
  company_email:"מייל חברה",
  company_phone:"טלפון חברה",
  manager_name:"שם מנהל",
  manager_phone:"טלפון מנהל",
  company_comments:"הערות",
  company_city:"עיר",
  company_street:"רחוב",
  company_homeNum:"מספר"
}

  const addCompany = () => { 
    let newCompany={
      company_code:"",
      company_name:"",
      company_email:"",
      company_phone:"",
      manager_name:"",
      manager_phone:"",
      company_comments:"",
      company_city:"",
      company_street:"",
      company_homeNum:""
    }
    navigate('/CompanyForm',{state:newCompany});
  }
  
  //3 functions that handle viewing, editing and deleting a row
  const handleView = (row) => {
    setColData(ColumnNamesByIdentifier);
    setRowData(row);
    setShowModal(true);
  };
  
  const handleEdit = (row) => {
    console.log('Edit:', row);
    // Add your edit logic here

    let currentCompany={
      company_code:"1",
      company_name:"אא' הסעים",
      company_email:"bararad@gmail.com",
      company_phone:"0549506905",
      manager_name:"בר ארד",
      manager_phone:"0547896541",
      company_comments:"גבגב",
      company_city:"תל אביב",
      company_street:"אבן גבירול",
      company_homeNum:"3"
    }
    navigate('/CompanyForm',{state:currentCompany});

  };
  
  const handleDelete = (row) => {
    console.log('Delete:', row);
    // Add your delete logic here
  };
  


  return (
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>חברות הסעה</h3>
      <Table columns={Companycolumns} rows={Companyrows} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div className='text-center'
        style={{ padding: '20px' }}>
        <Button onClick={addCompany}>הוסף חברת הסעה <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
        <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"חברת הסעה"} />
    </div>
  )
}
