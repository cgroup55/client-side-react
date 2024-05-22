import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styling/lineAddition.css';
import { FaCheck } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { StudentContext } from '../contexts/studentContext';
import { SchoolContext } from '../contexts/schoolContext';
import { EscortContext } from '../contexts/escortContext';
import { CompanyContext } from '../contexts/companyContext';

export default function AddStudentToLine() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [school, setSchool] = useState({});
    const [company, setCompany] = useState({});
    const [escort, setEscort] = useState({});
    const [line, setLine] = useState(state);

    const { keyValSchool } = useContext(SchoolContext);
    const { disabilities, studentsListFormFormat } = useContext(StudentContext);
    const { keyValEscort } = useContext(EscortContext);
    const { keyValCompany } = useContext(CompanyContext);

    const [loading, setLoading] = useState(true);

 

    console.log(line);
    useEffect(() => {
        setSchool(keyValSchool[line.school_of_line]);
        setEscort(keyValEscort[line.escort_incharge]);
        setCompany(keyValCompany[line.transportaion_company]);
        console.log("keyValEscort", keyValEscort);
        console.log("company", school, "escort", escort, "company", company);
        if (school && escort && company) {
            setLoading(false);
        }
    }, [keyValSchool, keyValEscort, keyValCompany, line]);


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

    //Hanle save changes
    const handleSaving = () => {

        const studentofLine = selectedStudents.map(student => student.stu_id).join(',');

        navigate('/lines');
    }

    if (loading || line == undefined || school == undefined || escort == undefined || company == undefined) {
        return <div>Loading...</div>; // Or a more sophisticated loading indicator
    }

    return (

        <div className='container mt-5'>
            <h3 className="bold" style={{ textAlign: 'center' }}> שיבוץ תלמידים לקו הסעה</h3>
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
                                    <td><input type="checkbox" onChange={() => handleStudentSelection(student)} /></td>
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