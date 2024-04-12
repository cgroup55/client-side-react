import React from 'react'
import "../styling/Form.css"
import { FaCheck } from 'react-icons/fa'
import { Button } from 'react-bootstrap'
export default function StudentForm() {
    return (

        <div className='container mt-5 form-container'>

            <div className='text-center' style={{ paddingTop: '5px' }}><Button>שמור <FaCheck style={{ paddingBottom: '2px' }} /> </Button></div>
        </div>

    )
}
