import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styling/User.css';
import { readById } from "../tools/api";
import { serverError } from '../tools/swalUtils';
import Swal from 'sweetalert2';
import Map from '../components/Map';
import { Button } from 'react-bootstrap';

export default function EscortHomePage() {
  const url = 'api/Transportation_Line/LineRouteInfo';
  const [existRoute, setExistRoute] = useState(false);
  const [schoolOfLine, setSchoolOfLine] = useState("");
  const [routeDetails, setRouteDetails] = useState("");

  const location = useLocation();
  const escortData = location.state;
  //console.log('escortData-', escortData);
  const [escortInfo, setEscortInfo] = useState([]);

  useEffect(() => {
    if (escortData.userFromDB && Array.isArray(escortData.userFromDB)) {
      setEscortInfo(escortData.userFromDB);
    }
  }, [escortData])

  const handleRowClick = async (info) => {
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

  const handleStartEndLine = (startOrEnd) => {
    console.log(startOrEnd, new Date().toLocaleString());
  };


  return (
    <div className='container'>
      {existRoute ? (
        <div className='col-12'>
          <h3 className='header mt-3'>המסלול שלי</h3>
          <Button style={{ marginBottom: '10px' }} onClick={() => handleStartEndLine('start')}>התחל קו</Button>
          <br />
          <Map routeDetails={routeDetails} mode="escort" school={schoolOfLine} />
          <Button onClick={() => handleStartEndLine('end')}>סיום קו</Button>
        </div>
      ) : (
        <>
          {escortData.userFromDB[0].fullName ? (
            <>
              <div className='col-12'>
                <h3 className='header mt-3'>המסלולים שלי</h3>
              </div>
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
            </>
          ) : (
            <div style={{ marginTop: '150px' }} className='col-12'>
              <h3 className='header mt-3'>לא קיימים מסלולים משויכים במערכת</h3>
              <br />
              <h5>יש לפנות למשרד לצורך שיבוץ</h5>
            </div>
          )}
        </>
      )}
    </div>
  );
}