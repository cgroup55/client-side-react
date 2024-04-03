import React from 'react'
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';


function Table() {

    const columns = [
        
        {
            name: "Full Name",
            selector: row => row.fullName,
            sortable:true,
        },
        {
            name: "Height",
            selector: row => row.height
        },
        {
            name: "Weight",
            selector: row => row.weight
        },
        {
            name: "Actions",
            cell: row => <div>
                <button onClick={() => handleEdit(row)}>E</button>
                <button onClick={() => handleDelete(row)}>D</button>
                <button onClick={() => handleDetails(row)}>Det</button>
            </div>
        }
    ];
    //make cols in dinamic width

    const rows = [
        {
            id: 1,
            fullName: "John Doe",
            height: "1.75m",
            weight: "89kg",
        },
        {
            id: 288,
            fullName: "Jane Doe",
            height: "1.64m",
            weight: "55kg",
        },
        {
            id: 3,
            fullName: "Sheera Maine",
            height: "1.69m",
            weight: "74kg",
        },  {
            id: 4,
            fullName: "John Doe",
            height: "1.75m",
            weight: "89kg",
        },
        {
            id: 5,
            fullName: "Jane Doe",
            height: "1.64m",
            weight: "55kg",
        },
        {
            id: 6,
            fullName: "Sheera Maine",
            height: "1.69m",
            weight: "74kg",
        },  {
            id: 7,
            fullName: "John Doe",
            height: "1.75m",
            weight: "89kg",
        },
        {
            id: 8,
            fullName: "Jane Doe",
            height: "1.64m",
            weight: "55kg",
        },
        {
            id: 9,
            fullName: "Sheera Maine",
            height: "1.69m",
            weight: "74kg",
        },  {
            id: 1004,
            fullName: "John Doe",
            height: "1.75m",
            weight: "89kg",
        },
        {
            id: 11,
            fullName: "Jane Doe",
            height: "1.64m",
            weight: "55kg",
        },
        {
            id: 12,
            fullName: "Sheera Maine",
            height: "1.69m",
            weight: "74kg",
        },  {
            id: 13,
            fullName: "John Doe",
            height: "1.75m",
            weight: "89kg",
        },
        {
            id: 14,
            fullName: "Jane Doe",
            height: "1.64m",
            weight: "55kg",
        },
        {
            id: 15,
            fullName: "Sheera Maine",
            height: "1.69m",
            weight: "74kg",
        },  {
            id: 16,
            fullName: "John Doe",
            height: "1.75m",
            weight: "89kg",
        },
        {
            id: 17,
            fullName: "Jane Doe",
            height: "1.64m",
            weight: "55kg",
        },
        {
            id: 18,
            fullName: "Sheera Maine",
            height: "1.69m",
            weight: "74kg",
        },  {
            id: 19,
            fullName: "John Doe",
            height: "1.75m",
            weight: "89kg",
        },
        {
            id: 20,
            fullName: "Jane Doe",
            height: "1.64m",
            weight: "55kg",
        },
        {
            id: 21,
            fullName: "Sheera Maine",
            height: "1.69m",
            weight: "74kg",
        },  {
            id: 22,
            fullName: "John Doe",
            height: "1.75m",
            weight: "89kg",
        },
        {
            id: 23,
            fullName: "Jane Doe",
            height: "1.64m",
            weight: "55kg",
        },
        {
            id: 24,
            fullName: "Sheera Maine",
            height: "1.69m",
            weight: "74kg",
        },
    ];
    return (
        <>
            <div className='container mt-5'>
                <DataTable columns={columns} data={rows}
                pagination
                selectableRows
                selectableRowsHighlight
                highlightOnHover
                fixedHeader
                customStyles={{
                    headCells: {
                        style: {
                           
                            whiteSpace: 'nowrap', // Ensure that text doesn't wrap within cells
                        },
                    },
                    cells: {
                        style: {
                            
                            whiteSpace: 'nowrap', // Ensure that text doesn't wrap within cells
                        },
                    },
                }}
                />
                
            </div>
        </>
    );
}

export default Table;