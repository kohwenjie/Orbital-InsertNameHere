import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

export default function BenDisplayFullOrg(props) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { currentUser, requestOrgLink } = useAuth();
  const history = useHistory();
  const organisation = props.o;
  const {
    name,
    description,
    address,
    email,
    contact,
    beneficiaries,
    requestingBeneficiaries,
    events,
    uid,
  } = organisation;

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function requestLink() {
    requestOrgLink(uid, currentUser.uid);
    alert("Linking request sent successfully!");
    closeModal();
    setDisabled(true);
  }

  function ShowSignedUpMessage() {
    if (disabled) {
      return (
        <Alert show variant="info">
          Looks like you are already linked to this organisation!
        </Alert>
      );
    }
    return <></>;
  }

  useEffect(() => {
    // if (
    //   beneficiaries.includes(currentUser.uid) ||
    //   requestingBeneficiaries.includes(currentUser.uid)
    // ) {
    //   setDisabled(true);
    // } else {
    //   setDisabled(false);
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
            className="img-fluid"
            src="https://source.unsplash.com/cAtzHUz7Z8g/1600x900"
            alt=""
          />
          <h4>{name}</h4>
          <p>Description: {description}</p>
          <p>Address: {address}</p>
          <p>Email: {email}</p>
          <p>Contact: {contact}</p>
        </Modal.Body>
        <ShowSignedUpMessage />
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={requestLink} disabled={disabled}>
            Link with Us!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
