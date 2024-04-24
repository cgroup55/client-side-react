import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';


const apiUrl1 = 'https://localhost:7039/api/Educational';
//add bar's url
export default function Schools() {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [colData, setColData] = useState(null);
    //const [schoolRows, setSchoolRows] = useState([]);

    const addNewSchool = () => {
        let newSchool = {
            school_code: '',
            school_name: '',
            school_city: '',
            school_street: '',
            school_homeNum: '',
            principal_name: '',
            principal_cell: '',
            secretar_cell: '',
            secretar_mail: '',
            school_contactName: '',
            school_contactCell: ''
        };
        navigate('/SchoolForm', { state: newSchool });
    }

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

    //console.log('schoolRows=', schoolRows);
    const schoolRows =
        [
            //     //GET        
            {
                institutionId: 14,
                name: "אברהמסון",
                street: 'ברנר',
                houseNumber: 5,
                city: 'כפר סבא',
                secretariatPhone: '097755669',
                secretariatMail: 'ell2@gmail.com',
                anotherContact: 'מתנאל כהן',
                contactPhone: '0527896633',
                principal: 'שרון מימון',
                principalCellphone: '0528889955'
            },
        ];

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
        setColData(ColumnNamesByIdentifier);
        setRowData(row);
        setShowModal(true);
    };

    //edit mode- pass obj with relevante data
    const handleEdit = (row) => {
        console.log('Edit:', row);
        let currentSchool = {
            school_code: row.institutionId,
            school_name: row.name,
            school_city: row.city,
            school_street: row.street,
            school_homeNum: row.houseNumber,
            principal_name: row.principal,
            principal_cell: row.principalCellphone,
            secretar_cell: row.secretariatPhone,
            secretar_mail: row.secretariatMail,
            school_contactName: row.anotherContact,
            school_contactCell: row.contactPhone
        };
        navigate('/SchoolForm', { state: currentSchool });
    };

    //delete ?
    const handleDelete = (row) => {
        console.log('Delete:', row);
        // Add your delete logic here
    };

    return (
        <div className='container mt-5' >
            <h3 className="bold" style={{ textAlign: 'center' }}>מוסדות לימוד</h3>
            {schoolRows && (
                <Table columns={Schoolcolumns} rows={schoolRows} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />)}
            <div className='text-center'
                style={{ padding: '20px' }}>
                <Button onClick={addNewSchool}>הוסף מוסד לימודים <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
            <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"מוסד לימודי"} />
        </div>
    )
}
