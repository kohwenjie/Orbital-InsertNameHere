import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function VolDisplayFullEvent(props) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { currentUser, signupRequest, parseTags } = useAuth();
  const history = useHistory();
  const request = props.r;
  const {
    requesterFirstName,
    requesterLastName,
    requestDescription,
    requestLocation,
    requestDate,
    signupDeadline,
    Tags,
    requesterUID,
    requestUID,
    organisationUID,
  } = request;

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function signup() {
    signupRequest(requestUID, currentUser.uid);
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
    // if (
    //   confirmedVolunteers.includes(currentUser.uid) ||
    //   signedUpVolunteers.includes(currentUser.uid)
    // ) {
    //   setDisabled(true);
    // } else {
    setDisabled(false);
    // }
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
          <h4>
            {requesterFirstName} {requesterLastName}'s Request
          </h4>
          <p>Request Date: {requestDate}</p>
          <p>Sign up before: {signupDeadline}</p>
          <p>Request Location: {requestLocation}</p>
          <p>Tags: {parseTags(Tags)}</p>
          <h6>{requestDescription}</h6>
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
