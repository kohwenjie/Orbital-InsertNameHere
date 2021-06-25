import React, { useState, useRef } from "react";
import { Card, Button, Modal, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

export default function OrgUpdateEvent(props) {
  const [open, setOpen] = useState(false);
  const event = props.e;
  const { eventName, Tags, documentUID } = event;
  const {
    updateEventName,
    updateEventDescription,
    updateEventDate,
    updateEventLocation,
    updateEventSignUpDeadline,
    updateEventTags,
    parseTags,
  } = useAuth();
  const eNameRef = useRef();
  const eDescriptionRef = useRef();
  const eLocationRef = useRef();
  const eDateRef = useRef();
  const sDeadlineRef = useRef();
  const [eDate, setEDate] = useState();
  const [sDeadline, setSDeadline] = useState();
  const [tags, setTags] = useState([]);
  const [eType, setEType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  const handleChange = (tag) => {
    console.log("before: ", tags);
    let tempTags = tags;
    if (tempTags.some((t) => t === tag)) {
      tempTags = tempTags.filter((t) => t !== tag);
    } else {
      tempTags.push(tag);
    }
    setTags(tempTags);
    console.log("after: ", tags);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (tags.length === 0) {
      setTags(Tags);
    } else {
      if (eType === "") {
        return setError("Please select an Event Type!");
      } else if (tags.length === 0) {
        return setError("Please select at least 1 Tag");
      }
      tags.push(eType);
    }

    const updates = [];
    setLoading(true);
    setError("");

    if (eNameRef.current.value) {
      updates.push(updateEventName(eNameRef.current.value, documentUID));
    }
    if (eDescriptionRef.current.value) {
      updates.push(
        updateEventDescription(eDescriptionRef.current.value, documentUID)
      );
    }
    if (eDateRef.current.value) {
      updates.push(updateEventDate(eDateRef.current.value, documentUID));
    }
    if (eLocationRef.current.value) {
      updates.push(
        updateEventLocation(eLocationRef.current.value, documentUID)
      );
    }
    if (sDeadlineRef.current.value) {
      updates.push(
        updateEventSignUpDeadline(sDeadlineRef.current.value, documentUID)
      );
    }
    if (tags) {
      updates.push(updateEventTags(tags, documentUID));
    }

    Promise.all(updates)
      .then(() => {
        history.push("/OrganisationHome");
      })
      .catch(() => {
        setError("Failed to update event");
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
            <h2 className="text-center mb-20">Update {eventName}</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="eName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="eventName"
                  ref={eNameRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="eDescription">
                <Form.Label>Event Description</Form.Label>
                <Form.Control
                  type="eventDescription"
                  ref={eDescriptionRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="eLocation">
                <Form.Label>Event Location</Form.Label>
                <Form.Control
                  type="eventLocation"
                  ref={eLocationRef}
                  placeholder="Leave blank to keep the same"
                />
              </Form.Group>
              <Form.Group id="eDate" className="mb-4">
                <TextField
                  id="date"
                  label="Date of Event"
                  type="date"
                  value={eDate}
                  ref={eDateRef}
                  onChange={(e) => setEDate(e.target.value)}
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
              <div key={"inline-checkbox"}>
                <h6>Select Category:</h6>
                <h6 color={"blue"}>
                  (Old tags will be used by default unless new tags chosen)
                </h6>
                <h6>Previous Tags: {parseTags(Tags)}</h6>
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Animal Welfare Tag"}
                  label={"Animal Welfare Tag"}
                  onChange={() => handleChange("Animal Welfare")}
                />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Arts & Heritage"}
                  label={"Arts & Heritage"}
                  onChange={() => handleChange("Arts & Heritage")}
                />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Children & Youth"}
                  label={"Children & Youth"}
                  onChange={() => handleChange("Children & Youth")}
                />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Community"}
                  label={"Community"}
                  onChange={() => handleChange("Community")}
                />
                <br />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Disability"}
                  label={"Disability"}
                  onChange={() => handleChange("Disability")}
                />

                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Education"}
                  label={"Education"}
                  onChange={() => handleChange("Education")}
                />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Elderly"}
                  label={"Elderly"}
                  onChange={() => handleChange("Elderly")}
                />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Environment"}
                  label={"Environment"}
                  onChange={() => handleChange("Environment")}
                />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Families"}
                  label={"Families"}
                  onChange={() => handleChange("Families")}
                />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Health"}
                  label={"Health"}
                  onChange={() => handleChange("Health")}
                />
                <br />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Humanitarian"}
                  label={"Humanitarian"}
                  onChange={() => handleChange("Humanitarian")}
                />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Social Service"}
                  label={"Social Service"}
                  onChange={() => handleChange("Social Service")}
                />
                <Form.Check
                  inline
                  type={"checkbox"}
                  id={"Sports"}
                  label={"Sports"}
                  onChange={() => handleChange("Sports")}
                />
              </div>
              <div key={"inline-radio"}>
                <h6>Select Event Type: </h6>
                <Form.Check
                  inline
                  name="event type"
                  type={"radio"}
                  id={"Live"}
                  label={"Live"}
                  onChange={() => setEType("Live")}
                />
                <Form.Check
                  inline
                  name="event type"
                  type={"radio"}
                  id={"Virtual"}
                  label={"Virtual"}
                  onChange={() => setEType("Virtual")}
                />
                <Form.Check
                  inline
                  name="event type"
                  type={"radio"}
                  id={"Hybrid"}
                  label={"Hybrid"}
                  onChange={() => {
                    setEType("Hybrid");
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
