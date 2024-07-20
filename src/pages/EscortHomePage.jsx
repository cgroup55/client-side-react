import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styling/User.css';
import { create, readById } from "../tools/api";
import { serverError } from '../tools/swalUtils';
import Swal from 'sweetalert2';
import Map from '../components/Map';
import { Button } from 'react-bootstrap';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';

export default function EscortHomePage() {
  const navigate = useNavigate();

  const url = 'api/Transportation_Line/LineRouteInfo';
  const [existRoute, setExistRoute] = useState(false);
  const [schoolOfLine, setSchoolOfLine] = useState("");
  const [routeDetails, setRouteDetails] = useState("");
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [endButtonDisabled, setEndButtonDisabled] = useState(true);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [comments, setComments] = useState('');

  const location = useLocation();
  const escortData = location.state;
  //console.log('escortData-', escortData);
  const [escortInfo, setEscortInfo] = useState([]);
  const [lineCode, setLineCode] = useState();


  useEffect(() => {
    if (escortData.userFromDB && Array.isArray(escortData.userFromDB)) {
      setEscortInfo(escortData.userFromDB);
    }
  }, [escortData])

  //Displays the data of the selected line
  const handleRowClick = async (info) => {
    setLineCode(info.line_code);
    console.log('escort info-', info);
    const res = await readById(url, 'linecod', info.line_code);
    console.log('res route info-', res);
    if (res == undefined || res == null) {
      serverError();
    }
    else if (res.length <= 1) {
      Swal.fire({
        title: "אופס..",
        text: "טרם שובצו תלמידים בקו זה, לא ניתן לצפות בקו ריק",
        icon: "error",
        confirmButtonText: 'חזור',
      });
    }
    else {
      //show route on map
      console.log('escort school info-', info.nameschool);
      setExistRoute(true);
      setSchoolOfLine(info.nameschool);
      setRouteDetails(res);
    }
  };

  //Saving historical line data
  const handleStartEndLine = (startOrEnd) => {

    if (startOrEnd === 'start') {
      Swal.fire({
        title: 'האם הנסיעה מתחילה?',
        showCancelButton: true,
        confirmButtonText: 'כן',
        cancelButtonText: 'לא'
      }).then((result) => {
        if (result.isConfirmed) {
          setStartButtonDisabled(true);
          setEndButtonDisabled(false);
          setStartTime(new Date().toISOString());
          console.log('startTime', new Date().toISOString());
          console.log('startTime', startTime);
        }
      });
    }
    else if (startOrEnd === 'end') {
      setComments("");
      setEndTime(new Date().toISOString());
      console.log('endTime', startTime);
      Swal.fire({
        title: 'האם ברצונך להוסיף הערות?',
        input: 'textarea',
        inputPlaceholder: 'הזן את ההערות שלך כאן...',
        showCancelButton: true,
        confirmButtonText: 'סיום הקו',
        cancelButtonText: 'ביטול',
        preConfirm: (userComments) => {
          if (!userComments) {
            setComments('אין');
          } else {
            setComments(userComments);
          }
          console.log('Comments:', comments);
        }
      });
      setExistRoute(false);
      setStartButtonDisabled(false);
      setEndButtonDisabled(true);
    }
  };

  useEffect(() => {
    let lineHistory = '';
    //if all information exists create line history
    if (startTime != '' && endTime != '' && lineCode && comments != '') {
      lineHistory = {
        Line_code: lineCode,
        Time_of_start: startTime,
        Time_of_end: endTime,
        Comments: comments
      }
      //console.log('lineHistory:', lineHistory);
      saveHistoryLine(lineHistory);
    }
  }, [startTime, endTime, lineCode, comments])


  const saveHistoryLine = async (line_history) => {
    console.log('line_history:', line_history);

    let res = await create('api/TransportationLineHistory', line_history);
    if (res && res >= 1) //check if res returns a valid response  
    {
      console.log('succes', res);
    }
    else {
      console.log('error', res);
    }
  }

  return (
    <div className='container'>
      {existRoute ? (
        <div className='col-12'>
          <h3 className='header mt-3'>המסלול שלי</h3>
          <Button style={{ marginBottom: '10px' }}
            onClick={() => handleStartEndLine('start')}
            disabled={startButtonDisabled}>התחל קו</Button>
          <br />
          <Map routeDetails={routeDetails} mode="escort" school={schoolOfLine} />
          <Button onClick={() => handleStartEndLine('end')}
            disabled={endButtonDisabled}>סיום קו</Button>
        </div>
      ) : (
        <>
          {escortData.userFromDB[0].fullName ? (
            <div className='row'>
              <div className='row'>
                <div className='col-11'>
                  <h3 className='header mt-3'>המסלולים שלי</h3>
                </div>
                <div className='col-1' style={{ textAlign: 'left' }}>
                  <Tooltip title="התנתק">
                    <Button variant='btn btn-outline-dark' style={{ maxWidth: "4rem", marginBottom: '7px' }} onClick={() => { navigate('/') }}>
                      <LogoutIcon style={{ fontSize: "1.3rem" }} /></Button></Tooltip>
                </div>
              </div>
              <div className='row'>
                <div className='col-12 mt-4'>
                  {escortInfo.map((info, index) => (
                    <div key={index} className='user-info' onClick={() => handleRowClick(info)}>
                      <span className='col-5' style={{ marginRight: '10px' }}><strong>מספר קו </strong>{info.line_code}</span>
                      <span className='col-7' style={{ marginRight: '10px' }}><strong>שם מוסד לימודי </strong>{info.nameschool}</span>
                    </div>
                  ))}
                </div>
                <div className='col-12'>
                  <h6 style={{ marginTop: '200px' }}>לצפייה במסלול ופרטי הקו לחץ על הקו המבוקש</h6>
                </div>
              </div>
            </div>
          ) : (
            //escort without lines in system
            <div className='row'>
              <div className='row' style={{ marginTop: '40px' }}>
                <div className='col-5'>
                  <h4 style={{ marginRight: '60px' }}> התנתק</h4>
                </div>
                <div className='col-7' style={{ textAlign: 'left' }}>
                  <Button variant='btn btn-outline-dark' style={{ maxWidth: "4rem", padding: '0px', marginLeft: '60px' }} onClick={() => { navigate('/') }}>
                    <LogoutIcon style={{ fontSize: "1.3rem" }} /></Button>
                </div>
              </div>

              <div className='row'>
                <div style={{ marginTop: '80px' }} className='col-12'>
                  <h3 className='header mt-3'>לא קיימים מסלולים משויכים במערכת</h3>
                  <br />
                  <h5 style={{ marginTop: '20px' }}>יש לפנות למשרד לצורך שיבוץ</h5>
                </div>
              </div>

            </div>
          )}
        </>
      )}
    </div>
  );
}