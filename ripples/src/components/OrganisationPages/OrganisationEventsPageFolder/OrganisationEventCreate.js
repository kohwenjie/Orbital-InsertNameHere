import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { storage } from "../../../firebase";

export default function OrganisationEventCreate() {
  const [eventImage, setEventImage] = useState("Insert Image for Event");
  const [eventName, setEventName] = useState();
  const [eventDescription, setEventDescription] = useState();
  const [eventLocation, setEventLocation] = useState();
  const [eventDate, setEventDate] = useState();
  const [signupDeadline, setSignupDeadline] = useState();
  const [tags, setTags] = useState([]);
  const [eventType, setEventType] = useState();
  const { addEvent, dbUser } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();
  const [fileUrl, setFileUrl] = useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(dbUser.uid + "/" + file.name);
    await fileRef.put(file);
    setEventImage(file.name);
    setFileUrl(await fileRef.getDownloadURL());
  };

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

    if (eventType === "") {
      return setError("Please select an Event Type!");
    } else if (tags.length === 0) {
      return setError("Please select at least 1 Tag");
    }
    tags.push(eventType);
    let currentDate = new Date();
    let signupDate = new Date(signupDeadline);
    let eventActualDate = new Date(eventDate);
    if (signupDate >= eventActualDate) {
      setError("Sign Up Date cannot be later than Event Date!");
    } else if (currentDate >= signupDate) {
      setError("Date has already passed, pick another Date!");
    } else if (!fileUrl) {
      setError("Please upload an Image for the event");
    } else {
      addEvent(
        eventName,
        eventDescription,
        eventLocation,
        eventDate,
        signupDeadline,
        tags,
        fileUrl
      );

      setEventName("");
      setEventDescription("");
      setEventLocation("");
      setEventDate("");
      setSignupDeadline("");
      setTags([]);
      alert("New event has been successfully created!");
      history.push("/OrganisationEvents");
    }
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
                required
              />
            </Form.Group>
            <Form.Group id="eventDescription" className="mb-4">
              <Form.Control
                type="eventDescription"
                placeholder="Event Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="eventLocation" className="mb-4">
              <Form.Control
                type="eventLocation"
                placeholder="Event Location"
                value={eventLocation}
                onChange={(e) => setEventLocation(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="eventDate" className="mb-4">
              <TextField
                id="date"
                label="Date of Event"
                type="date"
                value={eventDate}
                onChange={(e) => {
                  setEventDate(e.target.value);
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                required
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
                required
              />
            </Form.Group>
            <div key={"inline-checkbox"}>
              <h6>Select Category: </h6>
              <Form.Check
                inline
                type={"checkbox"}
                id={"Animal Welfare"}
                label={"Animal Welfare"}
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
              label={eventImage}
              lang="en"
              className="mb-4"
              onChange={onFileChange}
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
