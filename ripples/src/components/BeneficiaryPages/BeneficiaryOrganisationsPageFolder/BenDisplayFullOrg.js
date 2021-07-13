import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

export default function BenDisplayFullOrg(props) {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { currentUser, requestOrgLink } = useAuth();
  const organisation = props.o;
  const { name, description, address, email, contact, uid, fileUrl } =
    organisation;

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
          Looks like you have already requested or are already linked to this
          organisation!
        </Alert>
      );
    }
    return <></>;
  }

  useEffect(() => {}, []);

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        More Details
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <img
            className="img-fluid"
            src={fileUrl || "https://source.unsplash.com/cAtzHUz7Z8g/1600x900"}
            alt="https://source.unsplash.com/cAtzHUz7Z8g/1600x900"
          />
          <h4>{name}</h4>
          <br />
          <h5>Address: {address}</h5>
          <h5>Email: {email}</h5>
          <h5>Contact: {contact}</h5>
          <h5>Description: </h5>
          <div alignText="center"><h5>{description}</h5></div>
          
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
