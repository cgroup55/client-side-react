import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styling/lineAddition.css';
import { showSuccessMessage } from '../tools/swalUtils';
import Swal from 'sweetalert2';
import { FaCheck } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { MdCancel } from 'react-icons/md';
import { StudentContext } from '../contexts/studentContext';
import { SchoolContext } from '../contexts/schoolContext';
import { EscortContext } from '../contexts/escortContext';
import { CompanyContext } from '../contexts/companyContext';
import { LineContext } from '../contexts/lineContext.jsx';
import { create } from '../tools/api';

export default function AddStudentToLine() {
    const { updateLine } = useContext(LineContext);
    const url = 'api/Transportation_Line/CreateRoute';
    const navigate = useNavigate();
    const { state } = useLocation();

    let tempLine = state.row;
    // let studentsId = state.studentsId;

    const [line, setLine] = useState(tempLine);
    // const [students, setStudents] = useState(studentsId || []);

    const [school, setSchool] = useState({});
    const [company, setCompany] = useState({});
    const [escort, setEscort] = useState({});

    const { keyValSchool } = useContext(SchoolContext);
    const { disabilities, studentsListFormFormat } = useContext(StudentContext);
    const { keyValEscort } = useContext(EscortContext);
    const { keyValCompany } = useContext(CompanyContext);

    const [loading, setLoading] = useState(true);
    const [selectedStudents, setSelectedStudents] = useState([]);

    //Management student assigned to the line
    const handleStudentSelection = (student) => {
        //student holds all the student obj selected
        const isSelected = selectedStudents.some(s => s.stu_id == student.stu_id);
        console.log('isSelected:', isSelected);
        if (isSelected) {
            setSelectedStudents(selectedStudents.filter(s => s.stu_id != student.stu_id));
        } else {
            setSelectedStudents([...selectedStudents, student]);
        }
    };

    const filteredStudents = studentsListFormFormat.filter(student => student.stu_school === line.school_of_line);

    //Sort filteredStudents array by 'stu_school' and then by 'stu_fullName'
    const sortedStudents = filteredStudents.sort((a, b) => {
        if (a.stu_school === b.stu_school) {
            return a.stu_fullName.localeCompare(b.stu_fullName);
        }
        return a.stu_school.localeCompare(b.stu_school);
    });

    const updateStudentsInLine = async (studentsIdsString) => {
        console.log('studentsIdsString:', studentsIdsString);
        let res = await create(url, studentsIdsString);
        if (res == undefined || res == null) {
            console.log('server error- students in line');
            Swal.fire({
                title: "קיימת תקלה בשרת",
                text: "אנא נסה שנית במועד מאוחר יותר",
                icon: "error"
            });
            return;
        }
        return res;
    }

    //Hanle save changes
    const handleSaving = async () => {
        //create object of line code and string of students id for updating students array in line
        const studentofLine = selectedStudents.map(student => student.stu_id).join(',');
        let studentsIdsString = {
            students: studentofLine,
            linecode: line.line_code
        };
        console.log('selectedStudents:', selectedStudents);
        if (selectedStudents.length < 2) {
            // If less than 2 students are selected, show message
            Swal.fire({
                icon: 'warning',
                title: 'לא ניתן לבצע שמירה',
                text: 'כמות תלמידים מינימלית בקו היא 2',
                confirmButtonText: 'המשך'
            });
            return;
        }
        //update students in line in DB
        let res = await updateStudentsInLine(studentsIdsString);

        //create students ids array for local update
        const studentsIdArr = selectedStudents.map(student => student.stu_id);
        console.log('studentsIdArr for local update', studentsIdArr);
        //update line with updatede students array locally
        let dbUpdate = false;
        await updateLine(line, studentsIdArr, dbUpdate);
        console.log('res:', res);
        if (res) {
            showSuccessMessage(); //show successfuly saved message
            navigate('/lines');
        }
        else {
            console.log('server error- students in line');
        }
    }

    //added by bar : i want to check the pre selected kids(that were selected before entering the page)
    useEffect(() => {
        if (line.studentsId && studentsListFormFormat) {
            console.log("studentsId", line.studentsId);
            const preSelectedStudents = studentsListFormFormat.filter(student => line.studentsId.includes(student.stu_id));
            console.log("preSelectedStudents", preSelectedStudents);
            setSelectedStudents(preSelectedStudents);
        }
    }, [line, studentsListFormFormat]);


    useEffect(() => {
        if (line && keyValSchool && keyValEscort && keyValCompany) {
            setSchool(keyValSchool[line.school_of_line]);
            setEscort(keyValEscort[line.escort_incharge]);
            setCompany(keyValCompany[line.transportation_company]);
            if (keyValSchool[line.school_of_line] && keyValEscort[line.escort_incharge] && keyValCompany[line.transportation_company]) {
                setLoading(false);
            }
        }
    }, [line, keyValSchool, keyValEscort, keyValCompany]);

    if (loading)
        return (
            <div className='container mt-5' >
                <h3 className="bold" style={{ textAlign: 'center' }}>Loading...</h3>
            </div>
        )

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-12'>
                    <h3 className="bold" style={{ textAlign: 'center', display: 'inline-block' }}> שיבוץ תלמידים לקו הסעה</h3>
                    <Button variant='btn btn-outline-dark' style={{ maxWidth: "4rem", marginBottom: '7px', float: 'left' }} onClick={() => { navigate('/lines') }}>
                        <MdCancel style={{ fontSize: "1.3rem" }} />
                    </Button>
                </div>
            </div>
            <br />
            <div className='row'>
                <div className='col-4 col-sm-12 line_detailsDiv'>
                    <h4>פרטי קו הסעה</h4>
                    קוד קו: {line.line_code} <br />
                    מלווה: {line.escort_incharge ? (escort.esc_fullName) : ("טרם הוגדר מלווה")} <br />
                    חברת הסעה: {company.company_Name} <br />
                    מוסד לימודי: {school ? school.name : ''}<br />
                    כתובת המוסד: {school ? `${school.street} ${school.houseNumber}, ${school.city}` : ''} <br />
                </div>

                <div className='col-8 col-sm-12 assocStu_detailsDiv'>
                    <h4>תלמידים משויכים לקו</h4>
                    <ul>
                        {selectedStudents.map((student, index) => (
                            <li key={index}>{student.stu_fullName}</li>
                        ))}
                    </ul>
                </div>
            </div>


            <div className='row students_detailsDiv' style={{ marginTop: '18px' }}>
                <h4>תלמידים לשיוך לקו</h4>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>שם תלמיד</th>
                                <th>כיתה</th>
                                <th>לקות</th>
                                <th>כתובת</th>
                                <th>מוסד לימודים</th>
                                <th>הערות</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedStudents.map((student) => (
                                <tr key={student.stu_id}>
                                    <td>
                                        <input type="checkbox"
                                            onChange={() => handleStudentSelection(student)}
                                            checked={selectedStudents.some(s => s.stu_id === student.stu_id)} />
                                    </td>
                                    <td>{student.stu_fullName}</td>
                                    <td>{student.stu_grade}</td>
                                    <td>{disabilities[student.stu_disability]}</td>
                                    <td>{student.stu_parentStreet} {student.stu_parentHomeNum}, {student.stu_parentCity}</td>
                                    <td>{school.name}</td>
                                    <td>{student.stu_comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className='text-center' style={{ paddingTop: '20px' }}>
                    <Button type="button" onClick={handleSaving}>שמירה <FaCheck style={{ paddingBottom: '2px' }} /></Button>
                </div>

            </div>

        </div>
    );
}