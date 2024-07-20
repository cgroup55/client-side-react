import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styling/User.css';
import { readById } from "../tools/api";
import { serverError } from '../tools/swalUtils';
import Map from '../components/Map';
import { Button } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';

export default function ParentHomePage() {

  const navigate = useNavigate();
  const location = useLocation();
  const parentData = location.state;

  const url = 'api/Transportation_Line/LineRouteInfo';
  const [parentInfo, setParentInfo] = useState([]);
  // const [lineCode, setLineCode] = useState();
  const [showRoute, setShowRoute] = useState(false);
  const [routeDetails, setRouteDetails] = useState("");
  const [schoolOfLine, setSchoolOfLine] = useState("");
  const [Hpoint, setHpoint] = useState(null);
  console.log('parentData', parentData);

  //Displays the data of the selected line
  const handleRowClick = async (info) => {
    // setLineCode(info.line_code);
    console.log('parent info-', info);
    const res = await readById(url, 'linecod', info.line_code);
    console.log('res route info-', res);
    if (res == undefined || res == null) {
      serverError();
    }
    else {
      //show route on map
      setShowRoute(true);
      setSchoolOfLine(info.nameschool);
      setRouteDetails(res);
      const homeIndex = res.findIndex(detail => detail.studentFullName === info.fullNamestudent);
      console.log('homeIndex-', homeIndex);
      // Set the home point index
      if (homeIndex !== -1) {
        setHpoint(homeIndex);
      } else {
        setHpoint(null);
      }
    }
  };



  useEffect(() => {
    if (parentData.userFromDB && Array.isArray(parentData.userFromDB)) {
      setParentInfo(parentData.userFromDB);
    }
  }, [parentData])

  return (
    <div className='container'>
      {(showRoute && Hpoint != null) ? (
        <div className='row'>
          <div className='row'>
            <div className='col-11'>
              <h3 className='header mt-3'>צפייה במסלול</h3>
            </div>

            <div className='col-1' style={{ textAlign: 'left' }}>
              <Tooltip title="חזור">
                <Button variant='btn btn-outline-dark' onClick={() => { setShowRoute(false) }}>
                  <UndoOutlinedIcon /></Button></Tooltip>
            </div>

          </div>

          <Map routeDetails={routeDetails} mode="parent" school={schoolOfLine} homePoint={Hpoint} />
        </div>
      ) : (
        <>
          <div className='row'>
            <div className='row'>
              <div className='col-11'>
                <h3 className='header mt-3'>הסעות</h3>
              </div>
              <div className='col-1' style={{ textAlign: 'left' }}>
                <Tooltip title="התנתק">
                  <Button variant='btn btn-outline-dark' style={{ maxWidth: "4rem", marginBottom: '7px' }} onClick={() => { navigate('/') }}>
                    <LogoutIcon style={{ fontSize: "1.3rem" }} /></Button></Tooltip>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 mt-4'>
              {parentInfo.map((info, index) => (
                <div key={index} className='user-info' onClick={() => handleRowClick(info)}>
                  <span className='col-7' style={{ marginRight: '10px' }}><strong></strong>{info.fullNamestudent}</span>
                  <span className='col-5' style={{ marginRight: '10px' }}><strong>מספר קו </strong>{info.line_code}</span>
                </div>
              ))}
            </div>
            <div className='col-12'>
              <h6 style={{ marginTop: '200px' }}>לצפייה במסלול לחץ על הקו המבוקש</h6>
            </div>
          </div>

        </>
      )

      }

    </div >
  )
}
