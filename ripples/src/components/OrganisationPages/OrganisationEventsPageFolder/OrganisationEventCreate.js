import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";

export default function OrganisationEventCreate() {
  const [eventName, setEventName] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [eventLocation, setEventLocation] = useState();
  const [eventDate, setEventDate] = useState();
  const [signupDeadline, setSignupDeadline] = useState();
  const [tags, setTags] = useState();
  const { dbUser, addEvent } = useAuth();
  const [error, setError] = useState("");

  console.log(dbUser);

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

    //need to add event UID into own's Events array @MingYong

    setEventName("");
    setEventDescription("");
    setEventLocation("");
    setEventDate("");
    setSignupDeadline("");
    setTags("");
  }

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
            {/* <Form.Group id="eventDate" className="mb-4">
              <Form.Control
                type="eventDate"
                placeholder="Event Date (eg. 6th September 2021)"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </Form.Group> */}
            {/* <Form.Group id="signupDeadline" className="mb-4">
              <Form.Control
                type="signupDeadline"
                placeholder="Sign Up Deadline (eg. 6th September 2021)"
                value={signupDeadline}
                onChange={(e) => setSignupDeadline(e.target.value)}
              />
            </Form.Group> */}
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
            <Form.Group id="tags" className="mb-4">
              <Form.Control
                type="tags"
                placeholder="Tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Group>

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