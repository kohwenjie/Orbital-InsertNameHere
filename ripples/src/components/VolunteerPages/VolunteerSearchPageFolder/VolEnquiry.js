import React, { useState, useRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

export default function VolEnquiry(props) {
  const [enquiry, setEnquiry] = useState("");
  const enquiryRef = useRef();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser, dbUser, sendEnquiry } = useAuth();
  const event = props.e;
  const { organisationUID, documentUID } = event;

  console.log(currentUser);
  console.log(dbUser);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function createEnquiry(e) {
    e.preventDefault();
    sendEnquiry(
      documentUID,
      currentUser.uid,
      organisationUID,
      dbUser.firstName,
      dbUser.lastName,
      enquiryRef.current.value
    );

    setEnquiry("");
  }

  return (
    <>
      <Button onClick={openModal} variant="success">
        Send an Enquiry
      </Button>
      <Modal show={open} onHide={closeModal} backdrop="static">
        <Modal.Body>
          <Form onSubmit={createEnquiry}>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mt-3 mb-3"
            >
              <Form.Control
                as="textarea"
                rows={2}
                ref={enquiryRef}
                value={enquiry}
                onChange={(e) => setEnquiry(e.target.value)}
                required
                placeholder="Description of Yourself"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100 mb-2" type="submit">
              Send Enquiry
            </Button>{" "}
            <Button variant="secondary" className="w-100" onClick={closeModal}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
