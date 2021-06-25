import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function VolDisplayFullEvent(props) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { currentUser, signupEvent, parseTags } = useAuth();
  const history = useHistory();
  const event = props.e;
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    signupDeadline,
    organisationName,
    Tags,
    documentUID,
    confirmedVolunteers,
    signedUpVolunteers,
  } = event;

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function signup() {
    signupEvent(documentUID, currentUser.uid);
    alert("sign up successful!");
    closeModal();
    setDisabled(true);
  }

  function ShowSignedUpMessage() {
    if (disabled) {
      return (
        <Alert show variant="info">
          Looks like you have already signed up for this event!
        </Alert>
      );
    }
    return <></>;
  }

  useEffect(() => {
    if (
      confirmedVolunteers.includes(currentUser.uid) ||
      signedUpVolunteers.includes(currentUser.uid)
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, []);

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        More Details
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <img
            class="img-fluid"
            src="https://ivhq.imgix.net/images/pages/volunteer-activity-ideas/volunteer-acitivty-ideascommunity-senior.png?w=850&fit=max&auto=compress%2Cformat"
            alt=""
          />
          <h4>{eventName}</h4>
          <p>Event Date: {eventDate}</p>
          <p>Sign up before: {signupDeadline}</p>
          <p>Location: {eventLocation}</p>
          <p>Brought to you by: {organisationName}</p>
          <p>Tags: {parseTags(Tags)}</p>
          <h7>{eventDescription}</h7>
        </Modal.Body>
        <ShowSignedUpMessage />
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={signup} disabled={disabled}>
            Sign Up Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
