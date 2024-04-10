import React from 'react'
import "../styling/Form.css"
import { FaCheck } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
export default function StudentForm() {
    return (

        <div className='container mt-5 form-container'>

            <div className='row' style={{paddingRight:'50px'}}>
                <h2 style={{textAlign:'center'}}>הוספת מלווה</h2>
                <div className='col sm-6 label-input col-form-label-sm' style={{ width: '300px'}}>
                    <h4 >פרטי מלווה</h4>

                    <label htmlFor="fullname">שם מלא</label>
                    <input id="dateofbirth" name="dateofbirth" type="date" />

                    <label htmlFor="grade">כיתה</label>
                    <input id="grade" name="grade" type="text" />

                    <label htmlFor="dateofplacementcom">תאריך ועדת השמה</label>
                    <input id="dateofplacementcom" name="dateofplacementcom" type="date" />

                    <label htmlFor="school">מוסד לימודי</label>
                    <select defaultValue={0} id="school">
                        <option >Choose...</option>
                        <option >...</option>
                    </select>

                    <label htmlFor="studentkind">סיווג תלמיד</label>
                    <select defaultValue={0} id="studentkind">
                        <option value={0}>Choose...</option>
                        <option value={1}>רווחה</option>
                        <option value={2}>פנימיה</option>
                        <option value={3}>רגיל</option>
                    </select>

                    <label htmlFor="disabilitiykind">סוג לקות</label>
                    <select defaultValue={0} id="disabilitiykind">
                        <option value={0}>Choose...</option>
                        <option value={1}>אוטיזם</option>
                        <option value={2}>פיגור שכלי</option>
                        <option value={3}>נכות פיזית</option>
                    </select>

                    <br />
                    <label htmlFor="cb_escortintitled">זכאות למלווה</label>
                    <input id="cb_escortintitled" name="cb_escortintitled" type="checkbox" style={{ marginBottom: '18px' }} />


                    <label htmlFor="morningline">קו בוקר</label>
                    <input id="morningline" name="morningline" type="input" />

                    <label htmlFor="noonline">קו צהריים</label>
                    <input id="noonline" name="noonline" type="input" />

                </div>

                <div className='col sm-6 label-input col-form-label-sm' style={{ width: '300px' }}>
                    <h4 >אנשי קשר</h4>

                    <label htmlFor="parent1name">שם הורה א</label>
                    <input id="parent1name" name="parent1name" type="text" />

                    <label htmlFor="parent1cell">נייד הורה א</label>
                    <input id="parent1cell" name='parent1cell' idtype="text" />

                    <label htmlFor="parent1adress">כתובת הורה א</label>
                    <input id="parent1adress" name='parent1adress' idtype="text" />

                    <label htmlFor="parent2name">שם הורה ב</label>
                    <input id="parent2name" name="parent2name" type="text" />

                    <label htmlFor="parent2cell">נייד הורה ב</label>
                    <input id="parent2cell" name='parent2cell' idtype="text" />

                    <label htmlFor="parent2adress">כתובת הורה ב</label>
                    <input id="parent2adress" name='parent2adress' idtype="text" />

                    <label htmlFor="socialworker">עובד סוציאלי</label>
                    <input id="socialworker" name='socialworker' idtype="text" />

                    <label htmlFor="socialworkercell">נייד עובד סוציאלי</label>
                    <input id="socialworkercell" name='socialworkercell' idtype="text" />

                    <label htmlFor="comments">הערות</label>
                    <input id="comments" name='comments' idtype="text" />
                </div>
                <div className='text-center' style={{paddingTop:'5px'}}><Button>שמור <FaCheck style={{paddingBottom: '2px'}}/> </Button></div>
            </div>
        </div>
    )
}
