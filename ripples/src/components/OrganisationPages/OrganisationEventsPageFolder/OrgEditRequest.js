import React, { useState, useRef } from "react";
import { Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

export default function OrgUpdateEvent(props) {
  const [open, setOpen] = useState(false);
  const request = props.r;
  const { requesterFirstName, requesterLastName, Tags, requestUID } = request;
  const {
    updateRequestDescription,
    updateRequestDate,
    updateRequestLocation,
    updateRequestSignUpDeadline,
    updateRequestTags,
    parseTags,
  } = useAuth();
  const rDescriptionRef = useRef();
  const rLocationRef = useRef();
  const rDateRef = useRef();
  const sDeadlineRef = useRef();
  const [rDate, setRDate] = useState();
  const [sDeadline, setSDeadline] = useState();
  const [tags, setTags] = useState([]);
  const [rType, setRType] = useState("");
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

    if (tags.length === 0) {
      setTags(Tags);
    } else {
      if (rType === "") {
        return setError("Please select an Event Type!");
      } else if (tags.length === 0) {
        return setError("Please select at least 1 Tag");
      }
      tags.push(rType);
    }

    const updates = [];
    setLoading(true);
    setError("");

    if (rDescriptionRef.current.value) {
      updates.push(
        updateRequestDescription(rDescriptionRef.current.value, requestUID)
      );
    }
    if (rDateRef.current.value) {
      updates.push(updateRequestDate(rDateRef.current.value, requestUID));
    }
    if (rLocationRef.current.value) {
      updates.push(
        updateRequestLocation(rLocationRef.current.value, requestUID)
      );
    }
    if (sDeadlineRef.current.value) {
      updates.push(
        updateRequestSignUpDeadline(sDeadlineRef.current.value, requestUID)
      );
    }
    if (tags) {
      updates.push(updateRequestTags(tags, requestUID));
    }

    Promise.all(updates)
      .then(() => {
        history.push("/OrganisationHome");
      })
      .catch(() => {
        setError("Failed to update request");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Button onClick={openModal} variant="info">
        Update Event
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-20">
              Update {requesterFirstName} {requesterLastName}'s Request
            </h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="eDescription">
                <Form.Label>Request Description</Form.Label>
                <Form.Control
                  type="requestDescription"
                  ref={rDescriptionRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="rLocation">
                <Form.Label>Event Location</Form.Label>
                <Form.Control
                  type="requestLocation"
                  ref={rLocationRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="rDate" className="mb-4">
                <TextField
                  id="date"
                  label="Date of Request"
                  type="date"
                  value={rDate}
                  ref={rDateRef}
                  onChange={(e) => setRDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Form.Group>
              <Form.Group id="signupDeadline" className="mb-4">
                <TextField
                  id="date"
                  label="Signup Deadline"
                  type="date"
                  value={sDeadline}
                  ref={sDeadlineRef}
                  onChange={(e) => setSDeadline(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Form.Group>
              <div key={"inline-radio"}>
                <h6>Select Event Type: </h6>
                <Form.Check
                  inline
                  name="event type"
                  type={"radio"}
                  id={"Live"}
                  label={"Live"}
                  onChange={() => setRType("Live")}
                />
                <Form.Check
                  inline
                  name="event type"
                  type={"radio"}
                  id={"Virtual"}
                  label={"Virtual"}
                  onChange={() => setRType("Virtual")}
                />
                <Form.Check
                  inline
                  name="event type"
                  type={"radio"}
                  id={"Hybrid"}
                  label={"Hybrid"}
                  onChange={() => {
                    setRType("Hybrid");
                  }}
                />
              </div>

              <Form.File
                id="custom-file-translate-scss"
                label="Insert Image for Event"
                lang="en"
                className="mb-4"
                custom
              />
              <Button disabled={loading} className="w-100" type="submit">
                Update Event
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal>
    </>
  );
}
