import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";

export default function VolViewUpdates(props) {
  const [open, setOpen] = useState(false);
  const [updatesArr, setUpdatesArr] = useState([]);
  const event = props.e;
  const { updates } = event;

  const fetchVolunteers = async () => {
    if (updates.length > 0) {
      let updateArr = [];
      updates.forEach((update) => updateArr.push(update));
      setUpdatesArr(updateArr);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, [open]);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Button onClick={openModal} variant="success" size="sm">
        View Updates
      </Button>
      <Modal show={open} onHide={closeModal} size="lg">
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Updates</th>
              </tr>
            </thead>
            <tbody>
              {updatesArr &&
                updatesArr.map((update) => {
                  return (
                    <tr key={updatesArr.indexOf(update) + 1}>
                      <td>{updatesArr.indexOf(update) + 1}</td>
                      <td>{update}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {updatesArr.length === 0 && (
            <div style={{ textAlign: "center", margin: "8rem" }}>
              <h2>There are No Updates at the moment</h2>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
