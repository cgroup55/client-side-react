import { useState } from 'react'
import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { Helmet } from 'react-helmet-async';


import './App.css'
import NavBar from './pages/NavBar'
import Login from './pages/Login';

function App() {


  return (
    <>
    
      <Login/>
    </>
  )
}

export default App
