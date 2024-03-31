import { useState } from 'react'
import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Helmet } from 'react-helmet-async';


import './App.css'
import NavBar from './pages/NavBar'
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Students from './pages/Students';

function App() {
  return (
    <>
      <BrowserRouter>

        {(location.pathname!="/")?<NavBar/>:null}
        <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/students" element={<Students/>}/>
        </Routes>
       
      </BrowserRouter>
    </>
  )
}

export default App
