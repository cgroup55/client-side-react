import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styling/User.css';
import { readById } from "../tools/api";
import { serverError } from '../tools/swalUtils';
import Swal from 'sweetalert2';

export default function EscortHomePage() {
  const url = 'api/Transportation_Line/specificLineData';
  const location = useLocation();
  const escortData = location.state;
  console.log('escortData-', escortData);
  const [escortInfo, setEscortInfo] = useState([]);

  useEffect(() => {
    if (escortData.userFromDB && Array.isArray(escortData.userFromDB)) {
      setEscortInfo(escortData.userFromDB);
    }
  }, [escortData])

  const handleRowClick = async (info) => {
    console.log('escort info-', info);
    const res = await readById(url, 'linecod', info.line_code);
    console.log('res spec line info-', res);
    if (res == undefined || res == null) {
      serverError();
    }
    else if (res.studentid.length == 0) {
      Swal.fire({
        title: "אופס..",
        text: "טרם שובצו תלמידים בקו זה, לא ניתן לצפות בקו ריק",
        icon: "error",
        confirmButtonText: 'חזור',
      });
    }
    else {
      //navigate('/', { state: info });
    }
  };

  if (escortData.userFromDB[0].fullName)
    return (
      <div className='container'>
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

      </div>
    )

  return (
    <div className='container'>
      <div style={{ marginTop: '150px' }} className='col-12'>
        <h3 className='header mt-3'>לא קיימים מסלולים משויכים במערכת</h3>
        <br />
        <h5>יש לפנות למשרד לצורך שיבוץ</h5>
      </div>
    </div>
  )
}