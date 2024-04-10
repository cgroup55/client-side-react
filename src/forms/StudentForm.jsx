import React from 'react';
import "../styling/Form.css";
import { FaCheck } from 'react-icons/fa';
import { Button } from 'react-bootstrap';


export default function StudentForm() {

    return (

        <div className='container mt-5 form-container'>

            <div className='row' style={{paddingRight:'50px'}}>
                <h2>צפייה ועריכת פרטי תלמיד</h2>
                <div className='col sm-6 label-input col-form-label-sm' style={{ width: '300px'}}>
                    <h4 >פרטי תלמיד</h4>

                    <label htmlFor="stu_dateofbirth">תאריך לידה</label>
                    <input id="stu_dateofbirth" name="stu_dateofbirth" type="date" />

                    <label htmlFor="stu_grade">כיתה</label>
                    <input id="stu_grade" name="stu_grade" type="text" />

                    <label htmlFor="stu_dateofplacementcom">תאריך ועדת השמה</label>
                    <input id="stu_dateofplacementcom" name="stu_dateofplacementcom" type="date" />

                    <label htmlFor="stu_school">מוסד לימודי</label>
                    <select defaultValue={0} id="stu_school">
                        <option >Choose...</option>
                        <option >...</option>
                    </select>

                    <label htmlFor="stu_studentkind">סיווג תלמיד</label>
                    <select defaultValue={0} id="stu_studentkind">
                        <option value={0}>Choose...</option>
                        <option value={1}>רווחה</option>
                        <option value={2}>פנימיה</option>
                        <option value={3}>רגיל</option>
                    </select>

                    <label htmlFor="stu_disabilitiykind">סוג לקות</label>
                    <select defaultValue={0} id="stu_disabilitiykind">
                        <option value={0}>Choose...</option>
                        <option value={1}>אוטיזם</option>
                        <option value={2}>פיגור שכלי</option>
                        <option value={3}>נכות פיזית</option>
                    </select>

                    <br />
                    <label htmlFor="stu_cb_escortintitled">זכאות למלווה</label>
                    <input id="stu_cb_escortintitled" name="stu_cb_escortintitled" type="checkbox" style={{ marginBottom: '18px' }} />


                    <label htmlFor="stu_morningline">קו בוקר</label>
                    <input id="stu_morningline" name="stu_morningline" type="input" />

                    <label htmlFor="stu_noonline">קו צהריים</label>
                    <input id="stu_noonline" name="stu_noonline" type="input" />

                </div>

                <div className='col sm-6 label-input col-form-label-sm' style={{ width: '300px' }}>
                    <h4 >אנשי קשר</h4>

                    <label htmlFor="stu_parent1name">שם הורה א</label>
                    <input id="stu_parent1name" name="stu_parent1name" type="text" />

                    <label htmlFor="stu_parent1cell">נייד הורה א</label>
                    <input id="stu_parent1cell" name='stu_parent1cell' idtype="text" />

                    <label htmlFor="stu_parent1adress">כתובת הורה א</label>
                    <input id="stu_parent1adress" name='stu_parent1adress' idtype="text"/>

                    <label htmlFor="stu_parent2name">שם הורה ב</label>
                    <input id="stu_parent2name" name="stu_parent2name" type="text" />

                    <label htmlFor="stu_parent2cell">נייד הורה ב</label>
                    <input id="stu_parent2cell" name='stu_parent2cell' idtype="text" />

                    <label htmlFor="stu_parent2adress">כתובת הורה ב</label>
                    <input id="stu_parent2adress" name='stu_parent2adress' idtype="text"/>

                    <label htmlFor="stu_socialworker">עובד סוציאלי</label>
                    <input id="stu_socialworker" name='stu_socialworker' idtype="text" />

                    <label htmlFor="stu_socialworkercell">נייד עובד סוציאלי</label>
                    <input id="stu_socialworkercell" name='stu_socialworkercell' idtype="text" />

                    <label htmlFor="stu_comments">הערות</label>
                    <input id="stu_comments" name='stu_comments' idtype="text" />
                </div>
                <div className='text-center' style={{paddingTop:'5px'}}><Button>שמור <FaCheck style={{paddingBottom: '2px'}}/> </Button></div>
            </div>
        </div>
    )
}
