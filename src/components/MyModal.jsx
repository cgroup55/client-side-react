import React, { useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
export default function MyModal({ show, handleClose, rowData, colData }) {
   
console.log(rowData);
    return (
        
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>צפייה בנתונים</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {rowData && (
            <div>
              {Object.entries(rowData).map(([key, value]) => (
                <p key={key}>{colData[key]}: {value}</p>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>סגירה</Button>
        </Modal.Footer>
      </Modal>
    );
  }