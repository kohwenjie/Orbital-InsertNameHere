import React, { useRef, useState } from "react";
import { Form, Button, Modal, Alert, Col } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../firebase";

export default function VolunteerUpdateProfile() {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const descriptionRef = useRef();
  const certificationRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const contactRef = useRef();
  const dobRef = useRef();
  const {
    currentUser,
    dbUser,
    updateFirstName,
    updateLastName,
    updateDescription,
    updateCertification,
    updateAuthEmail,
    updateDatabaseEmail,
    updateAuthPassword,
    updateDatabasePassword,
    updateContact,
    updateDob,
    updateProfileFileUrl,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
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

  console.log(dbUser);

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
    if (descriptionRef.current.value) {
      updates.push(
        updateDescription(descriptionRef.current.value, currentUser.uid)
      );
    }
    if (certificationRef.current.value) {
      updates.push(
        updateCertification(certificationRef.current.value, currentUser.uid)
      );
    }
    if (contactRef.current.value) {
      if (
        contactRef.current.value < 80000000 ||
        contactRef.current.value > 100000000
      ) {
        return setError("Contact Number is invalid");
      }
      updates.push(updateContact(contactRef.current.value, currentUser.uid));
    }
    if (dobRef.current.value) {
      updates.push(updateDob(dobRef.current.value, currentUser.uid));
    }

    var imageChanged = false;
    const previousImageUrl = dbUser.fileUrl;
    if (fileUrl) {
      console.log(fileUrl);
      console.log(previousImageUrl);
      updates.push(updateProfileFileUrl(fileUrl, currentUser.uid));
      imageChanged = true;
    }

    if (imageChanged) {
      var oldRef = storage.refFromURL(previousImageUrl);
      console.log(oldRef);

      // Delete the file
      oldRef
        .delete()
        .then(() => {
          // File deleted successfully
          console.log(previousImageUrl + " deleted successfully");
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.log(previousImageUrl + " cant be deleted");
          console.log(error);
        });
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
      <Button onClick={openModal} variant="success" size="sm">
        Edit Profile
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <h2 className="text-center mb-20">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password" className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="confirmpassword" className="mb-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <br></br>
            <Form.Row>
              <Col>
                <Form.Group id="firstName" className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="firstName" ref={firstNameRef} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group id="lastName" className="mb-2">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="lastNameRef" ref={lastNameRef} />
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Group id="contact" className="mb-2">
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
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mb-2"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={descriptionRef}
                placeholder="Description of Yourself"
              />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mb-2"
            >
              <Form.Label>Certifications</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                ref={certificationRef}
                placeholder="eg. CPR AED - Able to perform resuscitation of victims who are in a cardiac arrest"
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
            <br></br>
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
