import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import OrgEditRequest from "./OrgEditRequest";
import { useAuth } from "../../../contexts/AuthContext";

export default function OrgDisplayFullEvent(props) {
  const [open, setOpen] = useState(false);
  const { parseTags } = useAuth();
  const request = props.r;
  const {
    requesterFirstName,
    requesterLastName,
    requestDescription,
    requestLocation,
    requestDate,
    signupDeadline,
    Tags,
    requestUID,
    requesterUID,
    organisationUID,
  } = request;

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
      </Button>{" "}
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <img
            className="img-fluid"
            src="https://ivhq.imgix.net/images/pages/volunteer-activity-ideas/volunteer-acitivty-ideascommunity-senior.png?w=850&fit=max&auto=compress%2Cformat"
            alt=""
          />
          <h4>
            {requesterFirstName} {requesterLastName} Request
          </h4>
          <p>Request Date: {requestDate}</p>
          <p>Sign up Deadline: {signupDeadline}</p>
          <p>Request Location: {requestLocation}</p>
          <p>Tags: {parseTags(Tags)}</p>
          <h6>Description: {requestDescription}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <OrgEditRequest r={request} />
        </Modal.Footer>
      </Modal>
    </>
  );
}
