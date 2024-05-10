import React, { useState, useEffect, useContext } from 'react';
import Table from '../components/Table';
import { Button } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';
import MyModal from '../components/MyModal';
import { fixDateForForm } from '../tools/validations.js';
import { SchoolContext } from '../contexts/schoolContext.jsx';

export default function Students() {

    const { keyValSchool } = useContext(SchoolContext);

    const navigate = useNavigate();

    const { state } = useLocation();
    let addedStudent = state;

    const [showModal, setShowModal] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [colData, setColData] = useState(null);
    console.log(keyValSchool[111]);

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
            stu_contaceName: '',
            stu_contactCell: '',
            stu_contactCity: '',
            stu_contactStreet: '',
            stu_contactHomeNum: '',
        }
        navigate('/StudentForm', { state: newStudent });
    }

    

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
            selector: (row) => keyValSchool[row.stu_school],
            sortable: true,
        },
        {
            name: "כיתה",
            selector: (row) => row.stu_grade,
            sortable: true,
        },
        {
            name: "לקות",
            selector: (row) => row.stu_disability,
            sortable: true,
        },
        {
            name: "הערות",
            selector: (row) => row.stu_comments,
        },
    ];

//לכאן תשפך רשימת התלמידים שתתקבל מהשרת 
    const StudentRows = [
        {
            stu_fullName: 'אבשלום ידידיה',
            stu_id: "024519875",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ה'",
            stu_school: "96",
            stu_dateOfPlacement:'01/05/2022',            
            stu_disability: "אוטיזם",
            stu_comments: "בלה בלה בלה בלה 4545",

            stu_parentName:'שולה ידידיה',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'תל חי',
            stu_parentHomeNum: 20,

            stu_contaceName: 'שימי ידידיה',
            stu_contactCell: '0527458877',
            stu_contactCity: 'כפר סבא',
            stu_contactStreet: 'ויצמן',
            stu_contactHomeNum: 55,
            // כאן צריכים להיות כל השדות של האובייקט גם אלה שלא בטבלה
        },
        {
            stu_fullName: 'שלום אהרון',
            stu_id: "023339833",
            stu_dateofbirth: '01/01/2020',
            stu_grade: '',
            stu_school: "1",
            stu_dateOfPlacement:'01/06/2023', 
            stu_disability: "פיגור",
            stu_comments: "אאא אאא אא אא 3333"
        },
    ];

    //זמני- למחוק ***************************
    const updatedStudentRows = addedStudent ? [...StudentRows, addedStudent] : StudentRows;

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
        stu_contaceName: 'שם איש קשר',
        stu_contactCell: 'נייד איש קשר',
        stu_contactCity: 'עיר',
        stu_contactStreet: 'רחוב',
        stu_contactHomeNum: 'מספר',
    }

    //modal view for specific row
    const handleView = (row) => {
        setColData(ColumnNamesByIdentifier);
        setRowData(row);
        setShowModal(true);
    };

    //edit mode- pass obj with relevante data
    const handleEdit = (row) => {
        let currentStudent = {
            stu_fullName: row.stu_fullName,
            stu_id: row.stu_id,
            stu_dateofbirth: fixDateForForm(row.stu_dateofbirth),
            stu_grade: row.stu_grade,
            stu_school: row.stu_school,
            stu_dateOfPlacement: fixDateForForm(row.stu_dateOfPlacement),
            stu_disability: row.stu_disability,
            stu_comments: row.stu_comments,

            stu_parentName: row.stu_parentName,
            stu_parentCell: row.stu_parentCell,
            stu_parentCity: row.stu_parentCity,
            stu_parentStreet: row.stu_parentStreet,
            stu_parentHomeNum: row.stu_parentHomeNum,

            stu_contaceName: row.stu_contaceName,
            stu_contactCell: row.stu_contactCell,
            stu_contactCity: row.stu_contactCity,
            stu_contactStreet: row.stu_contactStreet,
            stu_contactHomeNum: row.stu_contactHomeNum,
        };
        console.log('currentStudent:', currentStudent);
        navigate('/studentform', { state: currentStudent });
    };

    const handleDelete = (row) => {
        console.log('Delete:', row);
        // Add your delete logic here
    };



    return (
        <div className='container mt-5' >
            <h3 className="bold" style={{ textAlign: 'center' }}>נתוני תלמידים</h3>
            <Table rows={updatedStudentRows} columns={StudentCols} handleView={handleView} handleEdit={handleEdit} handleDelete={handleDelete} />
            <div className='text-center'
                style={{ padding: '20px' }}>
                <Button onClick={addNewStudent} >הוסף תלמיד חדש<FaPlus style={{ paddingBottom: '2px' }} /></Button></div>
            <MyModal show={showModal} handleClose={() => setShowModal(false)} rowData={rowData} colData={colData} pageName={"התלמיד"} />
        </div>
    )
}
