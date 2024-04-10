import React, { useState } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

export default function AddStudentForm() {

    const [stuKind, setstuKind] = useState("");
    const [addParent, setaddParent] = useState(false);

    //show social worker on condition
    const handleStuKindChange = (e) => {
        setstuKind(e.target.value);
    };

    const showAddParent = () => {
        setaddParent(true);
        console.log(addParent);
    }


    return (

        <div className='container mt-5 form-container'>

            <div className='row' style={{ paddingRight: '50px' }}>
                <h2>הוספת תלמיד</h2>
                <div className='col sm-12 label-input col-form-label-sm' >
                    <h4 >פרטי תלמיד</h4>

                    <label htmlFor="stu_dateofbirth">תאריך לידה</label>
                    <input id="stu_dateofbirth" name="stu_dateofbirth" type="date" />

                    <label htmlFor="stu_grade">כיתה</label>
                    <input id="stu_grade" name="stu_grade" type="text" />

                    <label htmlFor="stu_dateofplacementcom">תאריך ועדת השמה</label>
                    <input id="stu_dateofplacementcom" name="stu_dateofplacementcom" type="date" />

                    <label htmlFor="stu_school">מוסד לימודי</label>
                    <select defaultValue={0} id="stu_school">
                        <option >בחר...</option>
                        <option >...</option>
                    </select>

                    <label htmlFor="stu_studentkind">סיווג תלמיד</label>
                    <select defaultValue={0} id="stu_studentkind" onChange={handleStuKindChange}>
                        <option value={0}>בחר...</option>
                        <option value={"רווחה"}>רווחה</option>
                        <option value={"פנימיה"}>פנימיה</option>
                        <option value={"רגיל"}>רגיל</option>
                    </select>

                    {stuKind === "רווחה" && (
                        <div className='socialDiv' >
                            <label htmlFor="stu_socialworker">עובד סוציאלי</label>
                            <input id="stu_socialworker" name='stu_socialworker' idtype="text" />

                            <label htmlFor="stu_socialworkercell">נייד עובד סוציאלי</label>
                            <input id="stu_socialworkercell" name='stu_socialworkercell' idtype="text" />
                        </div>
                    )}

                    <label htmlFor="stu_disabilitiykind">סוג לקות</label>
                    <select defaultValue={0} id="stu_disabilitiykind" >
                        <option value={0}>בחר...</option>
                        <option value={1}>אוטיזם</option>
                        <option value={2}>פיגור שכלי</option>
                        <option value={3}>נכות פיזית</option>
                    </select>

                    <label htmlFor="stu_comments">הערות</label>
                    <input id="stu_comments" name='stu_comments' idtype="text" />
                </div>

                <div className='col sm-12 label-input col-form-label-sm' >
                    <h4 >אנשי קשר</h4>

                    <label htmlFor="stu_parent1name">שם הורה</label>
                    <input id="stu_parent1name" name="stu_parent1name" type="text" />

                    <label htmlFor="stu_parent1cell">נייד הורה</label>
                    <input id="stu_parent1cell" name='stu_parent1cell' idtype="text" />

                    <label htmlFor="stu_parent1adress" style={{ fontWeight: 'bold' }}>כתובת הורה</label>
                    
                    <label htmlFor="stu_parent1city">עיר</label>
                    <input list="cities-data" id="city-choice" name="city-choice" />
                    <datalist id="cities-data">
                        <option value="">טוען רשימת ערים...</option>
                    </datalist>
                    {/* <input id="stu_parent1city" name='stu_parent1city' idtype="text" /> */}

                    <label htmlFor="stu_parent1street">רחוב</label>
                    <input id="stu_parent1street" name='stu_parent1street' idtype="text" />

                    <label htmlFor="stu_parent1homeNum">מספר בית</label>
                    <input id="stu_parent1homeNum" name='stu_parent1homeNum' idtype="text" />

                    <button type='button' className='btn btn-light' onClick={showAddParent}> הוסף איש קשר
                        <FaPlus style={{ paddingBottom: '2px', paddingRight: '4px' }} />
                    </button>
                    <br />
                    <br />

                    {addParent && (
                        <div className='secParDiv' >
                            <label htmlFor="stu_parent2name">שם איש קשר</label>
                            <input id="stu_parent2name" name="stu_parent2name" type="text" />

                            <label htmlFor="stu_parent2cell">נייד איש קשר</label>
                            <input id="stu_parent2cell" name='stu_parent2cell' idtype="text" />

                            <label htmlFor="stu_parent2adress" style={{ fontWeight: 'bold' }}>כתובת איש קשר</label>
                            <label htmlFor="stu_parent2street">רחוב</label>
                            <input id="stu_parent2street" name='stu_parent2street' idtype="text" />

                            <label htmlFor="stu_parent2city">עיר</label>
                            <input id="stu_parent2city" name='stu_parent2city' idtype="text" />

                            <label htmlFor="stu_parent2homeNum">מספר בית</label>
                            <input id="stu_parent2homeNum" name='stu_parent2homeNum' idtype="text" />

                        </div>
                    )}


                </div>
                <div className='text-center' style={{ paddingTop: '5px' }}><Button>שמור <FaCheck style={{ paddingBottom: '2px' }} /> </Button></div>

                <div className='col sm-12 label-input col-form-label-sm'>

                </div>
            </div>
        </div>
    )
}
