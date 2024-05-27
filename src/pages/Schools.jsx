import React, { useState, useEffect, useContext } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';
import { SchoolContext } from '../contexts/schoolContext.jsx';


export default function Schools() {

    const { schoolsList, keyValSchool } = useContext(SchoolContext);
    console.log("schoolsList", schoolsList);
    console.log("Key Val", keyValSchool);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [colData, setColData] = useState(null);

    //initialize empty object for adding new
    const addNewSchool = () => {
        let newSchool = {
            institutionId: '',
            name: '',
            city: '',
            street: '',
            houseNumber: '',
            principal: '',
            principalCellphone: '',
            secretariatPhone: '',
            secretariatMail: '',
            anotherContact: '',
            contactPhone: ''
        };
        navigate('/SchoolForm', { state: newSchool });
    }

    //columns name and connection to data in table
    const Schoolcolumns = [
        {
            name: "סמל מוסד",
            selector: (row) => row.institutionId,
            sortable: true,
        },
        {
            name: "שם מוסד",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "כתובת",
            selector: (row) => row.street + ' ' + row.houseNumber + ', ' + row.city,
            sortable: true,
        },
        {
            name: "טל מזכירות",
            selector: (row) => row.secretariatPhone,
        },
        {
            name: "מייל מזכירות",
            selector: (row) => row.secretariatMail,
        },
        {
            name: "איש קשר",
            selector: (row) => row.anotherContact,
        },
        {
            name: "נייד איש קשר",
            selector: (row) => row.contactPhone,
        },
    ];

    //field names for the model
    const ColumnNamesByIdentifier =
    {
        institutionId: 'קוד מוסד',
        name: 'שם מוסד',
        city: 'עיר',
        street: 'רחוב',
        houseNumber: 'מספר',
        secretariatPhone: 'טלפון מזכירות',
        secretariatMail: 'מייל מזכירות',
        anotherContact: 'שם איש קשר',
        contactPhone: 'נייד איש קשר',
        principal: 'שם המנהל',
        principalCellphone: 'נייד מנהל',
    }

    //modal view for specific row
    const handleView = (row) => {
        console.log('row school page', row);
        setColData(ColumnNamesByIdentifier);
        setRowData(row);
        setShowModal(true);
    };

    //edit mode- pass obj with relevante data
    const handleEdit = (row) => {
        let currentSchool = {
            institutionId: row.institutionId,
            name: row.name,
            city: row.city,
            street: row.street,
            houseNumber: row.houseNumber,
            principal: row.principal,
            principalCellphone: row.principalCellphone,
            secretariatPhone: row.secretariatPhone,
            secretariatMail: row.secretariatMail,
            anotherContact: row.anotherContact,
            contactPhone: row.contactPhone
        };
        navigate('/SchoolForm', { state: currentSchool });
    };

    //delete ?
    const handleDelete = (row) => {
        console.log('Delete:', row);
        // Add your delete logic here
    };


    //renders the table after the data was loaded
    if (!schoolsList ||schoolsList.length==0)
        return (
            <div className='container mt-5' >
                <h3 className="bold" style={{ textAlign: 'center' }}>נתוני מלווים</h3>
            </div>
        )

    return (
        <div className='container mt-5' >
            <h3 className="bold" style={{ textAlign: 'center' }}>מוסדות לימוד</h3>
            <Table columns={Schoolcolumns} rows={schoolsList} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
            <div className='text-center'
                style={{ padding: '20px' }}>
                <Button onClick={addNewSchool}>הוסף מוסד לימודים <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
            <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"מוסד לימודי"} />
        </div>
    )
}
