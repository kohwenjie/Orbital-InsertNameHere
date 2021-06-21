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
  const [eventType, setEventType] = useState();

  const handleChange = (tag) => {
    let tempTags = tags;
    if (tempTags.some((t) => t === tag)) {
      tempTags = tempTags.filter((t) => t !== tag);
    } else {
      tempTags.push(tag);
    }
    setTags(tempTags);
  };

  function handleSubmit(e) {
    e.preventDefault();
    tags.push(eventType);

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
              <h6>Select Category: </h6>
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
                onChange={() => setEventType("Live")}
              />
              <Form.Check
                inline
                name="event type"
                type={"radio"}
                id={"Virtual"}
                label={"Virtual"}
                onChange={() => setEventType("Virtual")}
              />
              <Form.Check
                inline
                name="event type"
                type={"radio"}
                id={"Hybrid"}
                label={"Hybrid"}
                onChange={() => setEventType("Hybrid")}
              />
            </div>

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
