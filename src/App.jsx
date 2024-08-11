import React from 'react';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';

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
import SchoolForm from './forms/SchoolForm.jsx';
import LineForm from './forms/LineForm.jsx';
import EscortForm from './forms/EscortForm.jsx';
import CompanyForm from './forms/CompanyForm.jsx';
import AddStudentToLine from './pages/AddStudentToLine.jsx';
import EscortContextProvider from './contexts/escortContext.jsx';
import SchoolContextProvider from './contexts/schoolContext.jsx';
import CompanyContextProvider from './contexts/companyContext.jsx';
import StudentContextProvider from './contexts/studentContext.jsx';
import LineContextProvider from './contexts/lineContext.jsx';
import RouteVizualization from './components/RouteVizualization.jsx';
import EscortHomePage from './pages/EscortHomePage.jsx';
import ParentHomePage from './pages/ParentHomePage.jsx';




function App() {

  return (
    <>
      <LineContextProvider>
        <EscortContextProvider>
          <SchoolContextProvider>
            <StudentContextProvider>
              <CompanyContextProvider>
                <HashRouter>
                   <NavBar /> 
                  <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path="/homepage" element={<HomePage />} />
                    <Route path='/realtimelines' element={<RealTimeLines />} />
                    <Route path='/lines' element={<Lines />} />
                    <Route path='/AddStudentToLine' element={<AddStudentToLine />} />
                    <Route path='/transportComps' element={<TransportationCompanies />} />
                    <Route path='/students' element={<Students />} />
                    <Route path='/schools' element={<Schools />} />
                    <Route path='/escorts' element={<Escorts />} />
                    <Route path='/StudentForm' element={<StudentForm />} />
                    <Route path='/SchoolForm' element={<SchoolForm />} />
                    <Route path='/LineForm' element={<LineForm />} />
                    <Route path='/EscortForm' element={<EscortForm />} />
                    <Route path='/CompanyForm' element={<CompanyForm />} />
                    <Route path='/RouteVizualization' element={<RouteVizualization/>}/>
                    <Route path='/EscortHomePage' element={<EscortHomePage/>}/>
                    <Route path= '/ParentHomePage' element={<ParentHomePage/>}/>
                  </Routes>
                </HashRouter>
              </CompanyContextProvider>
            </StudentContextProvider>
          </SchoolContextProvider>
        </EscortContextProvider>
      </LineContextProvider>
    </>
  )
}

export default App
