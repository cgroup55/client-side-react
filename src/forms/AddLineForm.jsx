import React, { useState } from 'react';
import "../styling/Form.css";
import { FaCheck, FaPlus } from 'react-icons/fa';
import { Button } from 'react-bootstrap';

export default function AddLineForm() {
  return (
    <div className='container mt-5 form-container'>
    <div className='row' style={{ paddingRight: '50px' }}>
      <h2>יצירת קו הסעה</h2>
    </div>
  </div>
  )
}