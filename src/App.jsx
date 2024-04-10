import { useState } from 'react'
import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';

import '../src/styling/App.css';

import NavBar from './components/NavBar';
import Login from './pages/Login';
import Students from './pages/Students';
import HomePage from './pages/HomePage';
import RealTimeLines from './pages/RealTimeLines';
import Escorts from './pages/Escorts';
import Reports from './pages/Reports';
import Schools from './pages/Schools';
import TransportationCompanies from './pages/TransportationCompanies';
import Lines from './pages/Lines';
import StudentForm from './forms/StudentForm.jsx';



function App() {

  return (
    <>
    
      <BrowserRouter>

        {(location.pathname != "/") ? <NavBar/> : null}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path='/realtimelines' element={<RealTimeLines/>} />
          <Route path='/lines' element={ <Lines/>} />
          <Route path='/transportComps' element={ <TransportationCompanies/>} />
          <Route path='/students' element={<Students />} />
          <Route path='/schools' element={ <Schools/>} />
          <Route path='/escorts' element={<Escorts/> } />
          <Route path='/reports' element={<Reports/> } />
          <Route path='/studentform' element={<StudentForm/> } />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
