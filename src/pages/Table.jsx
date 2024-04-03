import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import '../styling/Table.css';
import { Typography } from '@mui/material';
export default function Table() {

    //change number in pagination options
    $(document).ready(function () {
        $('.kUwhdZ option[value="10"]').text('7').val('7');
    });

    const columns = [
        {
            name: "ID",
            selector: (row) => row.personID,
            sortable: true,
        },
        {
            name: "Full Name",
            selector: (row) => row.fullName,
        },
        {
            name: "Height",
            selector: (row) => row.height,
        },
        {
            name: "eyeColor",
            selector: (row) => row.eyeColor,
        },

    ];


    const rows = [
        {
            personID: 1,
            fullName: "Kate Shein",
            height: "1.79m",
            eyeColor: "blueeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        },
        {
            personID: 2,
            fullName: "John Smith",
            height: "1.85m",
            eyeColor: "brown",
        },
        {
            personID: 3,
            fullName: "Emily Johnson",
            height: "1.67m",
            eyeColor: "greeeeeeeeeeeeeeeeeeeeeeeeen fcfcccccccccccccc",
        },
        {
            personID: 4,
            fullName: "Michael Davis",
            height: "1.78m",
            eyeColor: "hazel",
        },
        {
            personID: 5,
            fullName: "Sophia Brown",
            height: "1.72m",
            eyeColor: "blue",
        },
        {
            personID: 6,
            fullName: "William Wilson",
            height: "1.81m",
            eyeColor: "brown",
        },
        {
            personID: 7,
            fullName: "Olivia Martinez",
            height: "1.63m",
            eyeColor: "green",
        },
        {
            personID: 8,
            fullName: "James Anderson",
            height: "1.76m",
            eyeColor: "hazel",
        },
        {
            personID: 9,
            fullName: "Emma Garcia",
            height: "1.69m",
            eyeColor: "blue",
        },
        {
            personID: 10,
            fullName: "Benjamin Thomas",
            height: "1.88m",
            eyeColor: "brown",
        },
        {
            personID: 11,
            fullName: "Ava Hernandez",
            height: "1.65m",
            eyeColor: "green",
        },
        {
            personID: 12,
            fullName: "Alexander Rodriguez",
            height: "1.80m",
            eyeColor: "hazel",
        },
        {
            personID: 13,
            fullName: "Mia Lopez",
            height: "1.70m",
            eyeColor: "blue",
        },
        {
            personID: 14,
            fullName: "Ethan Lee",
            height: "1.83m",
            eyeColor: "brown",
        },
        {
            personID: 15,
            fullName: "Isabella Thompson",
            height: "1.79m",
            eyeColor: "blue",
        },
    ];

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
                style={{ marginBottom: '10px', padding: '5px', borderRadius: '0.5rem',borderColor:'lightgrey'}}/>
            </div>

            <DataTable
                columns={columns}
                data={records}
                pagination
                fixedHeader
                highlightOnHover
                className="custom-table"
                paginationPerPage={7}
            />
        </div>
    )
}
