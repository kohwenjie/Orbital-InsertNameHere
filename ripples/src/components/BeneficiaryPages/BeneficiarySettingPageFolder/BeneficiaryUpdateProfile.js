import React, { useRef, useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";

export default function BeneficiaryUpdateProfile() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const descriptionRef = useRef();
  const restrictionsRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const addressRef = useRef();
  const contactRef = useRef();
  const dobRef = useRef();
  const {
    currentUser,
    dbUser,
    updateFirstName,
    updateLastName,
    updateUsername,
    updateDescription,
    updateAuthEmail,
    updateDatabaseEmail,
    updateAuthPassword,
    updateDatabasePassword,
    updateAddress,
    updateContact,
    updateDob,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const updates = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      updates.push(
        updateDatabaseEmail(emailRef.current.value, currentUser.uid)
      );
      updates.push(updateAuthEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      updates.push(
        updateDatabasePassword(passwordRef.current.value, currentUser.uid)
      );
      updates.push(updateAuthPassword(passwordRef.current.value));
    }
    if (firstNameRef.current.value) {
      updates.push(
        updateFirstName(firstNameRef.current.value, currentUser.uid)
      );
    }
    if (lastNameRef.current.value) {
      updates.push(updateLastName(lastNameRef.current.value, currentUser.uid));
    }
    if (usernameRef.current.value) {
      updates.push(updateUsername(usernameRef.current.value, currentUser.uid));
    }
    if (descriptionRef.current.value) {
      updates.push(
        updateDescription(descriptionRef.current.value, currentUser.uid)
      );
    }
    if (addressRef.current.value) {
      updates.push(updateAddress(addressRef.current.value, currentUser.uid));
    }
    if (contactRef.current.value) {
      updates.push(updateContact(contactRef.current.value, currentUser.uid));
    }
    if (dobRef.current.value) {
      updates.push(updateDob(dobRef.current.value, currentUser.uid));
    }

    Promise.all(updates)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        Edit Profile
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <h2 className="text-center mb-20">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="firstName" ref={firstNameRef} />
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="lastNameRef" ref={lastNameRef} />
            </Form.Group>
            <Form.Group id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" ref={usernameRef} />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mb-2"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={descriptionRef}
                placeholder="Describe Yourself"
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mb-2"
            >
              <Form.Label>Health Conditions</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={restrictionsRef}
                placeholder="Health Conditions that you have
                eg. Vegetarian, Diabetes, Injured Right Leg, High Blood Pressure"
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="confirmpassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="address">
              <Form.Label>Address</Form.Label>
              <Form.Control type="address" ref={addressRef} />
            </Form.Group>
            <Form.Group id="contact">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="contact" ref={contactRef} />
            </Form.Group>
            <Form.Group id="dob" className="mt-3 mb-3">
              <TextField
                id="date"
                inputRef={dobRef}
                label="Date of Birth"
                type="date"
                defaultValue={dbUser.dob}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update my profile!
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="w-100" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
