import React from 'react'
import { Modal, Button } from 'react-bootstrap';
export default function MyModal({ show, handleClose, rowData,colData}) {

    console.log("find",find);
    console.log(colData);
    return (
        <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Row</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {rowData && (
          <div>
            {Object.entries(rowData).map(([key, value]) => (
              <p key={key}>{key}: {value}</p>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
    );

}
