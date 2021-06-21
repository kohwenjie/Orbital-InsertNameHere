import React, { useState, useRef } from "react";
import { Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function OrgUpdateEvent(props) {
  const [open, setOpen] = useState(false);
  const event = props.e;
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    signupDeadline,
    organisationName,
    organisationUID,
    Tags,
    documentUID,
  } = event;
  const {
    updateEventName,
    updateEventDescription,
    updateEventDate,
    updateEventLocation,
    updateSignUpDeadline,
  } = useAuth();
  const eNameRef = useRef();
  const eDescriptionRef = useRef();
  const eLocationRef = useRef();
  const eDateRef = useRef();
  const sDeadlineRef = useRef();
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

    if (eNameRef.current.value) {
      updates.push(updateEventName(eNameRef.current.value, documentUID));
    }
    if (eDescriptionRef.current.value) {
      updates.push(
        updateEventDescription(eDescriptionRef.current.value, documentUID)
      );
    }
    if (eDateRef.current.value) {
      updates.push(updateEventDate(eDateRef.current.value, documentUID));
    }
    if (eLocationRef.current.value) {
      updates.push(
        updateEventLocation(eLocationRef.current.value, documentUID)
      );
    }
    if (sDeadlineRef.current.value) {
      updates.push(
        updateSignUpDeadline(sDeadlineRef.current.value, documentUID)
      );
    }

    Promise.all(updates)
      .then(() => {
        history.push("/OrganisationHome");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Button onClick={openModal} variant="info">
        Test
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-20">Update {eventName}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="eName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="eName"
                  ref={eNameRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="eDescription">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  type="eDescription"
                  ref={eDescriptionRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="eLocation">
                <Form.Label>Event Location</Form.Label>
                <Form.Control
                  type="eLocation"
                  ref={eLocationRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="eDate">
                <Form.Label>Event Date</Form.Label>
                <Form.Control type="eDate" ref={eDateRef} />
              </Form.Group>
              <Form.Group id="sDeadline">
                <Form.Label>Sign Up Deadline</Form.Label>
                <Form.Control type="sDeadline" ref={sDeadlineRef} />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Update Event
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal>
      <div className="w-100 text-center mt-2 mb-3">
        <Link to="/">Cancel Changes</Link>
      </div>
    </>
  );
}
