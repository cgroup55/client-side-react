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
            name: "ID",
            selector: (row) => row.personID,
            sortable: true,
        },
        {
            name: "Full Name",
            selector: (row) => row.fullName,
        },


    ];

    const Schoolrows = [

        {
            personID: 14,
            fullName: "Ethan Lee",

        },
        {
            personID: 15,
            fullName: "Isabella Thompson",

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
        let newSchool = {
            school_code: '123',
            school_name: 'abc',
            school_city: 'כפר סבא',
            school_street: 'הגפן',
            school_homeNum: '55',
            principal_name: 'אהרון',
            principal_cell: '',
            secretar_cell: '097658899',
            secretar_mail: '',
            school_contactName: '',
            school_contactCell: ''
        };
        navigate('/SchoolForm', { state: newSchool });
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
