import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

export default function BeneficiaryRequestCreate(props) {
  const [requestDescription, setRequestDescription] = useState();
  const [requestLocation, setRequestLocation] = useState();
  const [requestDate, setRequestDate] = useState();
  const [signupDeadline, setSignupDeadline] = useState();
  const [tags, setTags] = useState([]);
  const [requestType, setRequestType] = useState();
  const { dbUser, addRequest } = useAuth();
  const [error, setError] = useState("");
  const history = useHistory();

  console.log(dbUser);
  console.log(props.location.aboutProps);
  console.log(props.location.aboutProps.organisationUID);

  function handleSubmit(e) {
    e.preventDefault();

    if (requestType === "") {
      return setError("Please select an Event Type!");
    }
    tags.push(requestType);
    let currentDate = new Date();
    let signupDate = new Date(signupDeadline);
    let requestActualDate = new Date(requestType);
    if (signupDate >= requestActualDate) {
      setError("Sign Up Date cannot be later than Event Date!");
    } else if (currentDate >= signupDate) {
      setError("Date has already passed, pick another Date!");
    } else {
      addRequest(
        requestDescription,
        requestLocation,
        requestDate,
        signupDeadline,
        tags,
        props.location.aboutProps.organisationUID
      );

      setRequestDescription("");
      setRequestLocation("");
      setRequestDate("");
      setSignupDeadline("");
      setTags([]);
      alert("New event has been successfully created!");
      history.push("/BeneficiaryRequest");
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-20">Create Event</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="requestDescription" className="mb-4">
              <Form.Control
                type="requestDescription"
                placeholder="Request Description"
                value={requestDescription}
                onChange={(e) => setRequestDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="requestLocation" className="mb-4">
              <Form.Control
                type="requestLocation"
                placeholder="Request Location (Address)"
                value={requestLocation}
                onChange={(e) => setRequestLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="eventDate" className="mb-4">
              <TextField
                id="date"
                label="Date of Request"
                type="date"
                value={requestDate}
                onChange={(e) => {
                  setRequestDate(e.target.value);
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
            <div key={"inline-radio"}>
              <h6>Select Request Type: </h6>
              <Form.Check
                inline
                name="event type"
                type={"radio"}
                id={"Live"}
                label={"Live"}
                onChange={() => setRequestType("Live")}
              />
              <Form.Check
                inline
                name="event type"
                type={"radio"}
                id={"Virtual"}
                label={"Virtual"}
                onChange={() => setRequestType("Virtual")}
              />
              <Form.Check
                inline
                name="event type"
                type={"radio"}
                id={"Hybrid"}
                label={"Hybrid"}
                onChange={() => setRequestType("Hybrid")}
              />
            </div>
            <Button className="w-100 mt-2" type="submit">
              Request!
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 mb-3">
        <Link to="/BeneficiaryRequest">Cancel</Link>
      </div>
    </>
  );
}
