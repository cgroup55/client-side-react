import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styling/lineAddition.css';

export default function AddStudentToLine() {
    const navigate = useNavigate();
    const { state } = useLocation();
    let line = state;
    
    const [selectedStudents, setSelectedStudents] = useState([]);

    //Get 1. stu list 
    const StudentsList = [
        {
            stu_fullName: 'שושי שרון',
            stu_id: "024519877",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ט'",
            stu_school: "טשרני",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "פיגור",
            stu_comments: "בשש ש545",

            stu_parentName: 'שולה שרון',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'הנביאים',
            stu_parentHomeNum: 9,
        },
        {
            stu_fullName: 'שלום אולי',
            stu_id: "024519866",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ט'",
            stu_school: "טשרני",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "פיגור",
            stu_comments: "בשש ש545",

            stu_parentName: 'שולה שרון',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'הנביאים',
            stu_parentHomeNum: 9,
        },
        {
            stu_fullName: 'בני גברא',
            stu_id: "024519878",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ט'",
            stu_school: "טשרני",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "פיגור",
            stu_comments: "בשש ש545",

            stu_parentName: 'שולה שרון',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'הנביאים',
            stu_parentHomeNum: 9,
        },
        {
            stu_fullName: 'מיכאל לוי',
            stu_id: "024519885",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ט'",
            stu_school: "טשרני",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "פיגור",
            stu_comments: "בשש ש545",

            stu_parentName: 'שולה שרון',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'הנביאים',
            stu_parentHomeNum: 9,
        },
        {
            stu_fullName: 'אבשלום ידידיה',
            stu_id: "024522875",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ה'",
            stu_school: "אורט",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "אוטיזם",
            stu_comments: "בלה בלה בלה בלה 4545",

            stu_parentName: 'שולה ידידיה',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'תל חי',
            stu_parentHomeNum: 20,

            stu_contaceName: 'שימי ידידיה',
            stu_contactCell: '0527458877',
            stu_contactCity: 'כפר סבא',
            stu_contactStreet: 'ויצמן',
            stu_contactHomeNum: 55,
        },
        {
            stu_fullName: 'שלומי שרון',
            stu_id: "024519871",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ט'",
            stu_school: "אלון",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "פיגור",
            stu_comments: "בשש ש545",

            stu_parentName: 'שולה שרון',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'שלמה המלך',
            stu_parentHomeNum: 27,

            stu_contaceName: 'שימי שרון',
            stu_contactCell: '0527458877',
            stu_contactCity: 'כפר סבא',
            stu_contactStreet: 'ויצמן',
            stu_contactHomeNum: 55,
        },
        {
            stu_fullName: 'אבי אהרון',
            stu_id: "024519876",
            stu_dateofbirth: '10/02/2015',
            stu_grade: "ה'",
            stu_school: "טשרני",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "פיגור",
            stu_comments: "אאא אא א אאא",

            stu_parentName: 'שרה אהרון',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'ברק',
            stu_parentHomeNum: 8,

            stu_contaceName: 'שימי אהרון',
            stu_contactCell: '0527458877',
            stu_contactCity: 'כפר סבא',
            stu_contactStreet: 'ויצמן',
            stu_contactHomeNum: 55,
        },
        {
            stu_fullName: 'אהובה לוי',
            stu_id: "024515875",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ה'",
            stu_school: "אורט",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "אוטיזם",
            stu_comments: "בלה בלה בלה בלה 4545",

            stu_parentName: 'שולה לוי',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'אז"ר',
            stu_parentHomeNum: 9,

            stu_contaceName: 'שימי לוי',
            stu_contactCell: '0527458877',
            stu_contactCity: 'כפר סבא',
            stu_contactStreet: 'ויצמן',
            stu_contactHomeNum: 55,
        },
        {
            stu_fullName: 'שירה יהלום',
            stu_id: "024519175",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ה'",
            stu_school: "אורט",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "אוטיזם",
            stu_comments: "בלה בלה בלה בלה 4545",

            stu_parentName: 'שולה ידידיה',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'תל חי',
            stu_parentHomeNum: 20,

            stu_contaceName: 'שימי ידידיה',
            stu_contactCell: '0527458877',
            stu_contactCity: 'כפר סבא',
            stu_contactStreet: 'ויצמן',
            stu_contactHomeNum: 55,
        },
        {
            stu_fullName: 'אלון בן יגאל',
            stu_id: "024513375",
            stu_dateofbirth: '12/01/2011',
            stu_grade: "ט'",
            stu_school: "טשרני",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "אוטיזם",
            stu_comments: "בשש ש545",

            stu_parentName: 'שולה שרון',
            stu_parentCell: '0527465588',
            stu_parentCity: 'כפר סבא',
            stu_parentStreet: 'שאול המלך',
            stu_parentHomeNum: 18,

            stu_contaceName: 'שימי שרון',
            stu_contactCell: '0527458877',
            stu_contactCity: 'כפר סבא',
            stu_contactStreet: 'ויצמן',
            stu_contactHomeNum: 55,
        },

    ];

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

    //************/
    //לשים לב שכרגע זה לפי *שם* בית ספר- זמני וצריך להתאים לשדות שיהיו לקו (-קוד בצפר)??  
    const filteredStudents = StudentsList.filter(student => student.stu_school === line.school_of_line);

    // Sort filteredStudents array by 'stu_school' and then by 'stu_fullName'
    const sortedStudents = filteredStudents.sort((a, b) => {
        if (a.stu_school === b.stu_school) {
            return a.stu_fullName.localeCompare(b.stu_fullName);
        }
        return a.stu_school.localeCompare(b.stu_school);
    });
   
    return (

        <div className='container mt-5'>
            <h3 className="bold" style={{ textAlign: 'center' }}> שיבוץ תלמידים לקו הסעה</h3>
            <br />
            <div className='row'>
                <div className='col-4 col-sm-12 line_detailsDiv'>
                    <h4>פרטי קו הסעה</h4>
                    קוד קו: {line.line_code} <br />
                    מלווה: {line.escort_incharge ? (line.escort_incharge) : ("טרם הוגדר מלווה")} <br />
                    חברת הסעה: {line.transportaion_company} <br />
                    מוסד לימודי: {line.school_of_line}<br />
                    כתובת המוסד: {line.line_street + " " + line.line_Homenumber + " , " + line.line_city} <br />
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
                                    <td>{student.stu_disability}</td>
                                    <td>{student.stu_parentStreet} {student.stu_parentHomeNum}, {student.stu_parentCity}</td>
                                    <td>{student.stu_school}</td>
                                    <td>{student.stu_comments}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}