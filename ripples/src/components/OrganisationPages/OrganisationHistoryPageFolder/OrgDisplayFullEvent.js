import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function OrgDisplayFullEvent(props) {
  const [open, setOpen] = useState(false);
  const event = props.e;
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    signupDeadline,
    organisationName,

    Tags,
  } = event;

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        More Details
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <img
            className="img-fluid"
            src="https://ivhq.imgix.net/images/pages/volunteer-activity-ideas/volunteer-acitivty-ideascommunity-senior.png?w=850&fit=max&auto=compress%2Cformat"
            alt=""
          />
          <h4>{eventName}</h4>
          <p>Event Date: {eventDate}</p>
          <p>Sign up before: {signupDeadline}</p>
          <p>Location: {eventLocation}</p>
          <p>Brought to you by: {organisationName}</p>
          <p>Tags: {Tags}</p>
          <h6>{eventDescription}</h6>
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
