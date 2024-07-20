import React, { useState, useEffect, useContext } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';
import { convertDate } from '../tools/validations.js';
import { SchoolContext } from '../contexts/schoolContext.jsx';
import { StudentContext } from '../contexts/studentContext.jsx';

export default function Students() {
    const navigate = useNavigate();

    //schools and disabilities lists in a format of key:value & students list in form format
    const { keyValSchool } = useContext(SchoolContext);
    const { disKeyVal, studentsListFormFormat } = useContext(StudentContext);

    console.log("keyValSchool students page-", keyValSchool);

    const [showModal, setShowModal] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [colData, setColData] = useState(null);

    //initialize empty object for adding new
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
            stu_contactName: '',
            stu_contactCell: '',
            stu_contactCity: '',
            stu_contactStreet: '',
            stu_contactHomeNum: '',
        }
        navigate('/StudentForm', { state: newStudent });
    }


    //columns name and connection to data in table
    const StudentCols = [
        {
            name: "שם מלא",
            selector: (row) => row.stu_fullName,
            sortable: true,
        },
        {
            name: "תעודת זהות",
            selector: (row) => row.stu_id,
        },
        {
            name: "מוסד לימודי",
            selector: (row) => keyValSchool[row.stu_school].name,
            sortable: true,
        },
        {
            name: "כיתה",
            selector: (row) => row.stu_grade,
            sortable: true,
        },
        {
            name: "לקות",
            selector: (row) => disKeyVal[row.stu_disability],
            sortable: true,
        },
        {
            name: "הערות",
            selector: (row) => row.stu_comments,
        },
    ];

    //field names for the model
    const ColumnNamesByIdentifier = {
        stu_fullName: 'שם מלא',
        stu_id: 'תעודת זהות',
        stu_dateofbirth: 'תאריך לידה',
        stu_grade: 'כיתה',
        stu_school: 'מוסד לימודי',
        stu_dateOfPlacement: 'תאריך ועדת השמה',
        stu_disability: 'סוג לקות',
        stu_comments: 'הערות',
        stu_parentName: 'שם הורה',
        stu_parentCell: 'נייד הורה',
        stu_parentCity: 'עיר',
        stu_parentStreet: 'רחוב',
        stu_parentHomeNum: 'מספר',
        stu_contactName: 'שם איש קשר',
        stu_contactCell: 'נייד איש קשר',
        stu_contactCity: 'עיר',
        stu_contactStreet: 'רחוב',
        stu_contactHomeNum: 'מספר',
    }

    //fetching the data of the foreign keys that sends to the modal 
    const mapRowData = (row) => {
        return {
            ...row,
            stu_school: keyValSchool[row.stu_school]?.name,
            stu_disability: disKeyVal[row.stu_disability],
        };
    };

    //modal view for specific row
    const handleView = (row) => {
        const mappedRowData = mapRowData(row);
        setColData(ColumnNamesByIdentifier);
        setRowData(mappedRowData);
        setShowModal(true);
    };


    //edit mode- pass obj with relevante data
    const handleEdit = (row) => {
        let currentStudent = {
            stu_fullName: row.stu_fullName,
            stu_id: row.stu_id,
            stu_dateofbirth: convertDate(row.stu_dateofbirth, false),
            stu_grade: row.stu_grade,
            stu_school: row.stu_school,
            stu_dateOfPlacement: convertDate(row.stu_dateOfPlacement, false),
            stu_disability: row.stu_disability,
            stu_comments: row.stu_comments,

            stu_parentName: row.stu_parentName,
            stu_parentCell: row.stu_parentCell,
            stu_parentCity: row.stu_parentCity,
            stu_parentStreet: row.stu_parentStreet,
            stu_parentHomeNum: row.stu_parentHomeNum,

            stu_contactName: row.stu_contactName,
            stu_contactCell: row.stu_contactCell,
            stu_contactCity: row.stu_contactCity,
            stu_contactStreet: row.stu_contactStreet,
            stu_contactHomeNum: row.stu_contactHomeNum
        };
        console.log('currentStudent:', currentStudent);
        navigate('/studentform', { state: currentStudent });
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
        //delete logic 
    };

    //renders the table after the data was loaded
    if (!studentsListFormFormat || studentsListFormFormat.length == 0)
        return (
            <div className='container mt-5' >
                <h3 className="bold" style={{ textAlign: 'center' }}>נתוני תלמידים</h3>
            </div>
        )

    return (
        <div className='container mt-5' >
            <h3 className="bold" style={{ textAlign: 'center' }}>נתוני תלמידים</h3>
            <Table rows={studentsListFormFormat} columns={StudentCols} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
            <div className='text-center'
                style={{ padding: '20px' }}>
                <Button onClick={addNewStudent} >הוסף תלמיד חדש<FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
            <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"התלמיד"} />
        </div>
    )
}
