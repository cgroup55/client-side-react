import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

export default function Schools() {

    const navigate = useNavigate();

    const addSchool = () => {
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
            selector: (row) => row.schoolCode,
            sortable: true,
        },
        {
            name: "שם מוסד",
            selector: (row) => row.schoolName,
            sortable: true,
        },
        {
            name: "כתובת",
            selector: (row) => row.schoolAddress,
            sortable: true,
        },
        {
            name: "טל מזכירות",
            selector: (row) => row.schoolSecretaryPhone,
        },
        {
            name: "מייל מזכירות",
            selector: (row) => row.schoolSecretaryMail,
        },
        {
            name: "איש קשר",
            selector: (row) => row.schoolContactName,
        },
        {
            name: "נייד איש קשר",
            selector: (row) => row.schoolContactCell,
        },
    ];

    const Schoolrows = [

        {
            schoolCode: 14,
            schoolName: "אברהמסון",
            schoolAddress: "לשרשר כתובת מלאה",
            schoolSecretaryPhone: '097755669',
            schoolSecretaryMail: 'ell2@gmail.com',
            schoolContactName: 'מתנאל כהן',
            schoolContactCell: '0527896633',
            principal_name: 'ff',
            principal_cell: '0528889955'
        },
        {
            schoolCode: 7,
            schoolName: "אהרוני",
            schoolAddress: "לשרשר כתובת מלאה",
            schoolSecretaryPhone: '097755663',
            schoolSecretaryMail: 'ell2@gmail.com',
            schoolContactName: 'שיראל עזריהו',
            schoolContactCell: '0527896622',
            principal_name: 'ff',
            principal_cell: '0528889955'
        },
        {
            schoolCode: 80,
            schoolName: "השרונים",
            schoolAddress: "לשרשר כתובת מלאה",
            schoolSecretaryPhone: '097777663',
            schoolSecretaryMail: 'bbbl2@gmail.com',
            schoolContactName: 'שני אהרונסון',
            schoolContactCell: '0527896644',
            principal_name: 'ff',
            principal_cell: '0528889955'
        },
    ];



    //3 functions that handle viewing, editing and deleting a row
    const handleView = (row) => {
        console.log('View:', row);
        // Add your view logic here
    };

    const handleEdit = (row) => {
        console.log('Edit:', row);
        // Add your edit logic here לזכור לפצל את הכתובת לפי פסיק
        let currentSchool = {
            school_code: row.schoolCode,
            school_name: row.schoolName,
            school_city: 'כפר סבא',
            school_street: 'הגפן',
            school_homeNum: '55',
            principal_name: principal_name,
            principal_cell: principal_cell,
            secretar_cell: row.schoolSecretaryPhone,
            secretar_mail: row.schoolSecretaryMail,
            school_contactName: row.schoolContactName,
            school_contactCell: row.schoolContactCell
        };
        navigate('/SchoolForm', { state: currentSchool });
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
        // Add your delete logic here
    };

    return (
        <div className='container mt-5' >
            <h3 className="bold" style={{ textAlign: 'center' }}>מוסדות לימוד</h3>
            <Table columns={Schoolcolumns} rows={Schoolrows} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
            <div className='text-center'
                style={{ padding: '20px' }}>
                <Button onClick={addSchool}>הוסף מוסד לימודים <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
        </div>
    )
}
