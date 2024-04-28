import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styling/lineAddition.css';

export default function AddStudentToLine() {
    const navigate = useNavigate();
    const { state } = useLocation();
    let line = state;
    console.log();


    return (
   
        <div className='container mt-5'>
        <h3 className="bold" style={{ textAlign: 'center' }}> שיבוץ תלמידים לקו הסעה</h3>
        <div className='detailsDiv'>
            <h4>פרטי קו :</h4>
          קוד קו : {line.line_code} <br/>
          מלווה : {line.escort_incharge?(line.escort_incharge):("טרם הוגדר מלווה")} <br/>
          מוסד לימודי : {line.school_of_line}<br/>
           כתובת המוסד : {line.line_street+" "+line.line_Homenumber+" , "+line.line_city} <br/>
        חברת הסעה: {line.transportaion_company}
        </div>
        </div>
        
    )
}
