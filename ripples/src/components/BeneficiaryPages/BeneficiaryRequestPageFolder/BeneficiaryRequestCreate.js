import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function BeneficiaryRequestCreate() {
  const [requestDescription, setRequestDescription] = useState();
  const [requestLocation, setRequestLocation] = useState();
  const [requestDate, setRequestDate] = useState();
  const [signupDeadline, setSignupDeadline] = useState();
  const { dbUser, addRequest } = useAuth();
  const [error, setError] = useState("");

  console.log(dbUser);

  function handleSubmit(e) {
    e.preventDefault();

    addRequest(
      requestDescription,
      requestLocation,
      requestDate,
      signupDeadline
    );

    setRequestDescription("");
    setRequestLocation("");
    setRequestDate("");
    setSignupDeadline("");
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
            <Form.Group id="requestDate" className="mb-4">
              <Form.Control
                type="requestDate"
                placeholder="Request Date (eg. 6th September 2021)"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="signupDeadline" className="mb-4">
              <Form.Control
                type="signupDeadline"
                placeholder="Sign Up Deadline (eg. 6th September 2021)"
                value={signupDeadline}
                onChange={(e) => setSignupDeadline(e.target.value)}
              />
            </Form.Group>
            <Button className="w-100" type="submit">
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
