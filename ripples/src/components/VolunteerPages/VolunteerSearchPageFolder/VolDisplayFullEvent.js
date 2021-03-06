import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import VolEnquiry from "./VolEnquiry";

export default function VolDisplayFullEvent(props) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { currentUser, signupEvent, parseTags } = useAuth();
  const event = props.e;
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    signupDeadline,
    organisationName,
    tags,
    documentUID,
    confirmedVolunteers,
    signedUpVolunteers,
    fileUrl,
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

  var image;
  if (fileUrl) {
    image = fileUrl;
  } else {
    image = "https://source.unsplash.com/cAtzHUz7Z8g/1600x900";
  }

  return (
    <>
      <Button onClick={openModal} variant="info" size="sm">
        More Details
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <img
            class="img-fluid"
            src={image}
            alt=""
            width="500px"
            height="400px"
          />
          <h4>{eventName}</h4>
          <p>Event Date: {eventDate}</p>
          <p>Sign up before: {signupDeadline}</p>
          <p>Location: {eventLocation}</p>
          <p>Brought to you by: {organisationName}</p>
          <p>Tags: {parseTags(tags)}</p>
          <h6>{eventDescription}</h6>
        </Modal.Body>
        <ShowSignedUpMessage />
        <Modal.Footer>
          <Button variant="primary" onClick={signup} disabled={disabled}>
            Sign Up Now
          </Button>
          <VolEnquiry e={event} />
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
