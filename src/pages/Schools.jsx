import React from 'react'
import Table from './Table';

export default function Schools() {
  const Schoolcolumns = [
    {
        name: "ID",
        selector: (row) => row.personID,
        sortable: true,
    },
    {
        name: "Full Name",
        selector: (row) => row.fullName,
    },
    

];


const Schoolrows = [
    
    {
        personID: 14,
        fullName: "Ethan Lee",
    
    },
    {
        personID: 15,
        fullName: "Isabella Thompson",
 
    },
];

  return (
    <div className='container mt-5' >
    <h3 className="bold" style={{textAlign:'center'}}>מוסדות לימוד</h3>
    <Table columns={Schoolcolumns} rows={Schoolrows}/>
    </div>
  )
}
