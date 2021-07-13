import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import OrgEditEvent from "./OrgEditEvent";
import OrgUpdateEvent from "./OrgUpdateEvent";
import { useAuth } from "../../../contexts/AuthContext";

export default function OrgDisplayFullEvent(props) {
  const [open, setOpen] = useState(false);
  const { parseTags } = useAuth();
  const event = props.e;
  console.log(event);
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    signupDeadline,
    organisationName,
    tags,
    fileUrl,
  } = event;

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

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
      </Button>{" "}
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <img className="img-fluid" src={image} alt="" />
          <h4>{eventName}</h4>
          <p>Event Date: {eventDate}</p>
          <p>Sign up before: {signupDeadline}</p>
          <p>Location: {eventLocation}</p>
          <p>Brought to you by: {organisationName}</p>
          <p>Tags: {parseTags(tags)}</p>
          <h6>{eventDescription}</h6>
        </Modal.Body>
        <Modal.Footer>
          <OrgUpdateEvent e={event} />
          <OrgEditEvent e={event} />
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
