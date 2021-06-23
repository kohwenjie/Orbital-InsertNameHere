import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function OrganisationSignup() {
  const nameRef = useRef();
  const [name, setName] = useState("");
  const descriptionRef = useRef();
  const [description, setDescription] = useState("");
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const passwordRef = useRef();
  const [password, setPassword] = useState("");
  const passwordConfirmRef = useRef();
  const addressRef = useRef();
  const [address, setAddress] = useState("");
  const contactRef = useRef();
  const [contact, setContact] = useState("");
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (
      contactRef.current.value < 80000000 ||
      contactRef.current.value > 100000000
    ) {
      if (
        contactRef.current.value < 60000000 ||
        contactRef.current.value > 70000000
      ) {
        return setError("Contact Number is invalid");
      }
    }

    try {
      setError("");
      setLoading(true);
      const userDetails = {
        name: name,
        description: description,
        email: email,
        password: password,
        address: address,
        contact: contact,
        eventCounter: 0,
        events: [],
        beneficiaries: [],
        history: [],
        userType: "organisation",
      };
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        userDetails
      );
      history.push("/Redirect");
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
            Ripples welcome your Organisation!
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name" className="mt-3 mb-3">
              <Form.Control
                type="name"
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Organisation Name"
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows={3}
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Description of Yourself"
              />
            </Form.Group>
            <Form.Group id="email" className="mt-3 mb-3">
              <Form.Control
                type="email"
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Organisation Email"
              />
            </Form.Group>
            <Form.Group id="password" className="mt-3 mb-3">
              <Form.Control
                type="password"
                ref={passwordRef}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mt-3 mb-3"
            >
              <Form.Control
                as="textarea"
                rows={3}
                ref={addressRef}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Organisation Address"
              />
            </Form.Group>
            <Form.Group id="contact" className="mt-3 mb-3">
              <Form.Control
                type="contact"
                ref={contactRef}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                placeholder="Organisation Contact Number"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up my Organisation!
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
