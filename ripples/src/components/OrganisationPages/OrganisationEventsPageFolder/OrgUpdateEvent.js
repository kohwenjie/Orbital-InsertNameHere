import React, { useState, useRef } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function OrgEditEvent(props) {
  const [open, setOpen] = useState(false);
  const event = props.e;
  const { eventName, documentUID } = event;
  const { updateUpdates } = useAuth();
  const [updates, setUpdates] = useState("");
  const updatesRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updates = [];
    setLoading(true);
    setError("");

    if (updatesRef.current.value) {
      updates.push(updateUpdates(updatesRef.current.value, documentUID));
    }

    Promise.all(updates)
      .then(() => {
        history.push("/OrganisationEvents");
      })
      .catch(() => {
        setError("Failed to update event");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  

  return (
    <>
      <Button onClick={openModal} variant="info">
        Update Event
      </Button>
      <Modal show={open} onHide={closeModal} backdrop="static">
        <Modal.Body>
          <h2 className="text-center mb-20">Update {eventName}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mt-3 mb-3"
            >
              <Form.Control
                as="textarea"
                rows={2}
                ref={updatesRef}
                value={updates}
                onChange={(e) => setUpdates(e.target.value)}
                required
                placeholder="Desription of your Update"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update Event
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="w-100" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
