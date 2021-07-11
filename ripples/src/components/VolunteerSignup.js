import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Col } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase";

export default function VolunteerSignup() {
  const firstNameRef = useRef();
  const [firstName, setFirstName] = useState("");
  const lastNameRef = useRef();
  const [lastName, setLastName] = useState("");
  const descriptionRef = useRef();
  const [description, setDescription] = useState("");
  const certificationRef = useRef();
  const [certification, setCertification] = useState("");
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

  const [displayImage, setDisplayImage] = useState(
    "Please select an Image for your Profile"
  );
  const [fileUrl, setFileUrl] = useState(null);
  const fileUid = uuidv4();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(fileUid);
    await fileRef.put(file);
    setDisplayImage(file.name);
    setFileUrl(await fileRef.getDownloadURL());
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    if (
      contactRef.current.value < 80000000 ||
      contactRef.current.value > 100000000
    ) {
      return setError("Contact Number is invalid");
    }
    if (!fileUrl) {
      return setError("Please upload an Image for your Profile!");
    }

    try {
      setError("");
      setLoading(true);
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        description: description,
        certification: certification,
        email: email,
        password: password,
        contact: contact,
        dob: dob,
        points: 0,
        eventCounter: 0,
        commitments: [],
        history: [],
        userType: "volunteer",
        fileUrl: fileUrl,
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
            Welcome aboard <em>Ripples!</em>
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
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
            <br></br>
            <Form.Row>
              <Col>
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
              </Col>
              <Col>
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
              </Col>
            </Form.Row>

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
              <TextField
                id="date"
                inputRef={dobRef}
                value={dob}
                required
                onChange={(e) => setDob(e.target.value)}
                label="Date of Birth"
                type="date"
                defaultValue="2017-05-24"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mt-3 mb-3"
            >
              <Form.Control
                as="textarea"
                rows={2}
                ref={descriptionRef}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="Description of Yourself"
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mt-3 mb-3"
            >
              <Form.Control
                as="textarea"
                rows={3}
                ref={certificationRef}
                value={certification}
                onChange={(e) => setCertification(e.target.value)}
                required
                placeholder="List your certifications with a short description
                eg. CPR AED - Able to perform resuscitation of victims who are in a cardiac arrest"
              />
            </Form.Group>

            <Form.File
              id="custom-file-translate-scss"
              label={displayImage}
              lang="en"
              className="mb-4"
              onChange={onFileChange}
              custom
            />

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
