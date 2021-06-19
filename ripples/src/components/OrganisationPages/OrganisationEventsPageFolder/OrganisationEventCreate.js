import React, { useState } from "react";
import { Form, Button, Card, Alert, InputGroup } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";

export default function OrganisationEventCreate() {
  const [eventName, setEventName] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [eventLocation, setEventLocation] = useState();
  const [eventDate, setEventDate] = useState();
  const [signupDeadline, setSignupDeadline] = useState();
  const [tags, setTags] = useState([]);
  const { dbUser, currentUser, addEvent } = useAuth();
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    addEvent(
      eventName,
      eventDescription,
      eventLocation,
      eventDate,
      signupDeadline,
      tags
    );

    setEventName("");
    setEventDescription("");
    setEventLocation("");
    setEventDate("");
    setSignupDeadline("");
    setTags([]);
  }

  console.log(dbUser);
  console.log(currentUser);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-20">Create Event</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="eventName" className="mb-4">
              <Form.Control
                type="eventName"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="eventDescription" className="mb-4">
              <Form.Control
                type="eventDescription"
                placeholder="Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="eventLocation" className="mb-4">
              <Form.Control
                type="eventLocation"
                placeholder="Event Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="eventDate" className="mb-4">
              <TextField
                id="date"
                label="Date of Event"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
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
                value={signupDeadline}
                onChange={(e) => setSignupDeadline(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Form.Group>
            <div key={"inline-checkbox"}>
              <Form.Check
                inline
                type={"checkbox"}
                id={"Animal Welfare Tag"}
                label={"Animal Welfare Tag"}
              />
              <Form.Check
                inline
                type={"checkbox"}
                id={"Arts & Heritage"}
                label={"Arts & Heritage"}
              />
              <Form.Check
                inline
                type={"checkbox"}
                id={"Community"}
                label={"Community"}
              />
            </div>
            <div key={"inline-radio"}>
              <Form.Check
                inline
                type={"radio"}
                name="type"
                id={"Live"}
                label={"Live"}
              />
              <Form.Check
                inline
                type={"radio"}
                name="type"
                id={"Virtual"}
                label={"Virtual"}
              />
              <Form.Check
                inline
                type={"radio"}
                name="type"
                id={"Hybrid"}
                label={"Hyrbid"}
              />
            </div>

            {/* THE FOLLOW CHECKBOX AND RADIOBOX IS EXPERIMENTAL FOR TAGS */}
            {/* <InputGroup className="mb-2">
              <InputGroup.Checkbox onSelect={tags.push("Animal Welfare")} />
              <Form.Control value="Animal Welfare" readOnly />
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Checkbox onSelect={tags.push("Arts & Heritage")} />
              <Form.Control value="Arts & Heritage" readOnly />
            </InputGroup> */}
            {/* <InputGroup className="mb-4">
              <InputGroup.Radio aria-label="Radio button for following text input" />
              <Form.Control aria-label="Text input with radio button" />
            </InputGroup> */}

            <Form.File
              id="custom-file-translate-scss"
              label="Insert Image for Event"
              lang="en"
              className="mb-4"
              custom
            />
            <Button className="w-100" type="submit">
              Create Event!
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 mb-3">
        <Link to="/OrganisationEvents">Cancel my edits</Link>
      </div>
    </>
  );
}
