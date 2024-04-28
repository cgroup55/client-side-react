import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import '../styling/Table.css';


export default function Table({ rows, columns, handleView, handleEdit, handleDelete,handleAdd}) {

    //change number in pagination options
    $(document).ready(function () {
        $('.kUwhdZ option[value="10"]').text('7').val('7');
    });

    //search in all the table data
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

    //renders buttons for view, edit, and delete actions for each row.
    const actionsCell = (row) => (
        <div style={{ display: 'flex',justifyContent:'center'}}>
            <button className='iconsBtn viewIcon' onClick={() => handleView(row)} ><FaEye /></button>
            <button className='iconsBtn editIcon' onClick={() => handleEdit(row)}><FaEdit /></button>
            <button className='iconsBtn deleteIcon' onClick={() => handleDelete(row)}><FaTrash /></button>
            {handleAdd && (<button className='iconsBtn addIcon' onClick={() => handleDelete(row)}><AiOutlineUsergroupAdd /></button>)}
        </div>
    );

   //adding the buttons by adding a column of actions
    const updatedColumns = [...columns, {
        name: 'פעולות',
        selector: null,
        cell: actionsCell,
        ignoreRowClick: true
    }];
    
    
    return (
        <div className='container '>
            <div className='text-start'>
                <input className="searchInput" type="text" placeholder='חפש' onChange={handleFilter}
                    style={{ marginBottom: '10px', padding: '5px', borderRadius: '0.5rem', borderColor: 'lightgrey' }} />
            </div>

            <DataTable
                columns={updatedColumns}
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
