import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styling/lineAddition.css';

export default function AddStudentToLine() {
    const navigate = useNavigate();
    const { state } = useLocation();
    let line = state;
    console.log();

    //Get 1. stu list 2. school list from server
    const StudentsList = [
        {
            stu_fullName: 'אבשלום ידידיה',
            stu_id: "024519875",
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
            stu_fullName: 'אבי אהרון',
            stu_id: "024519875",
            stu_dateofbirth: '10/02/2015',
            stu_grade: "ה'",
            stu_school: "טשרני",
            stu_dateOfPlacement: '01/05/2022',
            stu_disability: "פיגור",
            stu_comments: "אאא אא א אאא ..",

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
    ];

    const schoolsList =  [{ schoolname: "טשרני", schoolcity: "נתניה", schoolstreet: "הגרא", schoolHomenum: "3" }, { schoolname: "אורט", schoolcity: "חדרה", schoolstreet: "הרצל", schoolHomenum: "5" }];//need to fetch from database
 

    //צריך לאפשר להוסיף תחנת עצירה נוספת שהיא בית ספר
    return (

        <div className='container mt-5'>
            <h3 className="bold" style={{ textAlign: 'center' }}> שיבוץ תלמידים לקו הסעה</h3>
            <div className='detailsDiv'>
                <h4>פרטי קו:</h4>
                קוד קו: {line.line_code} <br />
                מלווה: {line.escort_incharge ? (line.escort_incharge) : ("טרם הוגדר מלווה")} <br />
                מוסד לימודי: {line.school_of_line}<br />
                כתובת המוסד: {line.line_street + " " + line.line_Homenumber + " , " + line.line_city} <br />
                חברת הסעה: {line.transportaion_company}
            </div>
        </div>

    )
}
