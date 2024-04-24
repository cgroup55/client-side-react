import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';

export default function Students() {

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [colData, setColData] = useState(null);

    const addNewStudent = () => {
        let newStudent = {
            stu_fullName: '',
            stu_id: '',
            stu_dateofbirth: '',
            stu_grade: '',
            stu_school: '',
            stu_dateOfPlacement: '',
            stu_disability: '',
            stu_comments: '',
            stu_parentName: '',
            stu_parentCell: '',
            stu_parentCity: '',
            stu_parentStreet: '',
            stu_parentHomeNum: '',

            // contacts:
            //     [{
            //         parent: {
            //             stu_parentName: '',
            //             stu_parentCell: '',
            //             stu_parentCity: '',
            //             stu_parentStreet: '',
            //             stu_parentHomeNum: ''
            //         }
            //     },
            //     {
            //         contact: {

            //         }
            //     }],
        }
        navigate('/StudentForm', { state: newStudent });
    }


    const StudentCols = [
        {
            name: "תז",
            selector: (row) => row.personID,
            sortable: true,
        },
        {
            name: "שם מלא",
            selector: (row) => row.fullName,
        },
        {
            name: "Height",
            selector: (row) => row.height,
        },
        {
            name: "eyeColor",
            selector: (row) => row.eyeColor,
        },

    ];


    const StudentRows = [
        {
            personID: 12345689,
            fullName: "Kate Shein",
            height: "1.79m",
            eyeColor: "blueeeeeeeeeeeeeeeee",
        },
        {
            personID: 2,
            fullName: "John Smith",
            height: "1.85m",
            eyeColor: "brown",
        },
        {
            personID: 3,
            fullName: "Emily Johnson",
            height: "1.67m",
            eyeColor: "greeeeeeeeeeeeeeeeeeeeeeeeen fcfcccccccccccccc",
        },
        {
            personID: 4,
            fullName: "Michael Davis",
            height: "1.78m",
            eyeColor: "hazel",
        },
        {
            personID: 5,
            fullName: "Sophia Brown",
            height: "1.72m",
            eyeColor: "blue",
        },
        {
            personID: 6,
            fullName: "William Wilson",
            height: "1.81m",
            eyeColor: "brown",
        },
        {
            personID: 7,
            fullName: "Olivia Martinez",
            height: "1.63m",
            eyeColor: "green",
        },
        {
            personID: 8,
            fullName: "James Anderson",
            height: "1.76m",
            eyeColor: "hazel",
        },
        {
            personID: 9,
            fullName: "Emma Garcia",
            height: "1.69m",
            eyeColor: "blue",
        },
        {
            personID: 10,
            fullName: "Benjamin Thomas",
            height: "1.88m",
            eyeColor: "brown",
        },
        {
            personID: 11,
            fullName: "Ava Hernandez",
            height: "1.65m",
            eyeColor: "green",
        },
        {
            personID: 12,
            fullName: "Alexander Rodriguez",
            height: "1.80m",
            eyeColor: "hazel",
        },
        {
            personID: 13,
            fullName: "Mia Lopez",
            height: "1.70m",
            eyeColor: "blue",
        },
        {
            personID: 14,
            fullName: "Ethan Lee",
            height: "1.83m",
            eyeColor: "brown",
        },
        {
            personID: 15,
            fullName: "Isabella Thompson",
            height: "1.79m",
            eyeColor: "blue",
        },
    ];

    const ColumnNamesByIdentifier =
    {

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
        let currentStudent = {

        };
        navigate('/studentform', { state: currentStudent });
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
        // Add your delete logic here
    };



    return (
        <div className='container mt-5' >
            <h3 className="bold" style={{ textAlign: 'center' }}>נתוני תלמידים</h3>
            <Table rows={StudentRows} columns={StudentCols} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
            <div className='text-center'
                style={{ padding: '20px' }}>
                <Button onClick={addNewStudent} >הוסף תלמיד חדש <FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
            <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"תלמיד"} />
        </div>
    )
}
