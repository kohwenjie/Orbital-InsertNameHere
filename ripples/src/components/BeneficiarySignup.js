import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function BeneficiarySignup() {
  const firstNameRef = useRef();
  const [firstName, setFirstName] = useState("");
  const lastNameRef = useRef();
  const [lastName, setLastName] = useState("");
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const passwordRef = useRef();
  const [password, setPassword] = useState("");
  const passwordConfirmRef = useRef();
  const contactRef = useRef();
  const [contact, setContact] = useState("");
  const dobRef = useRef();
  const [dob, setDob] = useState("");

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
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
        contact: contact,
        dob: dob,
      };
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        userDetails
      );
      history.push("/BeneficiaryHome");
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
            <em>Ripples</em> welcome our Beneficiaries!
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="firstName" className="mt-3 mb-3">
              <Form.Control
                type="firstName"
                ref={firstNameRef}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="First Name"
              />
            </Form.Group>
            <Form.Group id="lastName" className="mt-3 mb-3">
              <Form.Control
                type="lastNameRef"
                ref={lastNameRef}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Last Name"
              />
            </Form.Group>
            <Form.Group id="username" className="mt-3 mb-3">
              <Form.Control
                type="username"
                ref={usernameRef}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group id="email" className="mt-3 mb-3">
              <Form.Control
                type="email"
                ref={emailRef}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
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
            <Form.Group id="contact" className="mt-3 mb-3">
              <Form.Control
                type="contact"
                ref={contactRef}
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                placeholder="Contact Number"
              />
            </Form.Group>
            <Form.Group id="dob" className="mt-3 mb-3">
              <Form.Control
                type="dob"
                ref={dobRef}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                placeholder="Date of Birth"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              I am a Beneficiary!
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
