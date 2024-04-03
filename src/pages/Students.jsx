import React from 'react'
import Table from './Table'

export default function Students() {
  const headers = ['Name', 'Age', 'Country'];
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
    
    <div>
      <Table headers={headers} data={data} />
    </div>
  )
}

