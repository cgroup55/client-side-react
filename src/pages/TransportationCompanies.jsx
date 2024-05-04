import React, { useContext, useState } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate, useLocation } from 'react-router-dom';
import MyModal from '../components/MyModal';
import { CompanyContext } from '../contexts/companyContext';


export default function TransportationCompanies() {

  //companies list from context
  const { companiesList } = useContext(CompanyContext);
  console.log("companiesList", companiesList);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [colData, setColData] = useState(null);



  const addNewCompany = () => {
    let newCompany = {
      company_Code: "",
      company_Name: "",
      company_Email: "",
      company_Phone: "",
      manager_Name: "",
      manager_Phone: "",
      company_Comments: "",
      company_City: "",
      company_Street: "",
      company_HomeNum: ""
    }
    navigate('/CompanyForm', { state: newCompany });
  }

  const Companycolumns = [
    {
      name: "ח.פ",
      selector: (row) => row.company_Code,
    },
    {
      name: "שם חברה",
      selector: (row) => row.company_Name,
      sortable: true,
    },
    {
      name: "מייל",
      selector: (row) => row.company_Email,
    },
    {
      name: "מנהל",
      selector: (row) => row.manager_Name,
      sortable: true,
    },
    {
      name: "נייד מנהל",
      selector: (row) => row.manager_Phone,
      sortable: true,
    },
    {
      name: "הערות",
      selector: (row) => row.company_Comments
    },
  ];

  //field names for the model
  const ColumnNamesByIdentifier =
  {
    company_Code: "ח.פ",
    company_Name: "שם חברה",
    company_Email: "מייל",
    company_Phone: "טלפון",
    manager_Name: "שם מנהל",
    manager_Phone: "טלפון מנהל",
    company_City: "עיר",
    company_Street: "רחוב",
    company_HomeNum: "מספר",
    company_Comments: "הערות"
  }

  //modal view for specific row
  const handleView = (row) => {
    setColData(ColumnNamesByIdentifier);
    setRowData(row);
    setShowModal(true);
  };

//edit mode- pass obj with relevante data
  const handleEdit = (row) => {
    console.log('company-row', row);
    let currentCompany = {
      company_Code: row.company_Code,
      company_Name: row.company_Name,
      company_Email: row.company_Email,
      company_Phone: row.company_Phone,
      manager_Name: row.manager_Name,
      manager_Phone: row.manager_Phone,
      company_Comments: row.company_Comments,
      company_City: row.company_City,
      company_Street: row.company_Street,
      company_HomeNum: row.company_HomeNum
    }
    navigate('/CompanyForm', { state: currentCompany });
  };

  const handleDelete = (row) => {
    console.log('Delete:', row);
    // Add your delete logic here
  };

  if(!companiesList || companiesList.length==0)
  return(
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>חברות הסעה</h3>
    </div>
  )

  return (
    <div className='container mt-5' >
      <h3 className="bold" style={{ textAlign: 'center' }}>חברות הסעה</h3>
      <Table columns={Companycolumns} rows={companiesList} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
      <div className='text-center'
        style={{ padding: '20px' }}>
        <Button onClick={addNewCompany}>הוסף חברת הסעה <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
      <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"חברת ההסעה"} />
    </div>
  )
}
