import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function VolunteerSignup() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const contactRef = useRef();
  const dobRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-20">
            Welcome aboard <em>Ripples!</em>
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="firstName" className="mt-3 mb-3">
              <Form.Control
                type="firstName"
                ref={firstNameRef}
                required
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group id="lastName" className="mt-3 mb-3">
              <Form.Control
                type="lastNameRef"
                ref={lastNameRef}
                required
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group id="username" className="mt-3 mb-3">
              <Form.Control
                type="username"
                ref={usernameRef}
                required
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group id="email" className="mt-3 mb-3">
              <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder="Email"
              />
            </Form.Group>
            <Form.Group id="password" className="mt-3 mb-3">
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group id="confirmpassword" className="mt-3 mb-3">
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
                placeholder="Confirm Password"
              />
            </Form.Group>
            <Form.Group id="contact" className="mt-3 mb-3">
              <Form.Control
                type="contact"
                ref={contactRef}
                required
                placeholder="Contact Number"
              />
            </Form.Group>
            <Form.Group id="dob" className="mt-3 mb-3">
              <Form.Control
                type="dob"
                ref={dobRef}
                required
                placeholder="Date of Birth"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              I want to sign up as a Volunteer!
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 mb-4">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
