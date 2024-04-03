import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import '../styling/Table.css';


export default function Table({rows,columns}) {

    //change number in pagination options
    $(document).ready(function () {
        $('.kUwhdZ option[value="10"]').text('7').val('7');
    });
  

    const [records, setRecords] = useState(rows);
    const handleFilter = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filteredRows = rows.filter(row => {
            return columns.some(column => {
                const value = column.selector(row).toString().toLowerCase();
                return value.includes(searchValue);
            });
        });
        setRecords(filteredRows);
    };
    return (
        <div className='container mt-5'>
            <div className='text-start'>
                <input type="text" placeholder='חיפוש חופשי' onChange={handleFilter}
                    style={{ marginBottom: '10px', padding: '5px', borderRadius: '0.5rem', borderColor: 'lightgrey' }} />
            </div>

            <DataTable
                columns={columns}
                data={records}
                pagination
                fixedHeader
                highlightOnHover
                className="custom-table"
                paginationPerPage={7}
                style={{ borderRadius: '0.5rem' }}
            />
            
        </div>
    )
}
