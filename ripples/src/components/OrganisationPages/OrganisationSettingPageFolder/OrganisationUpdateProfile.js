import React, { useRef, useState } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../firebase";

export default function OrganisationUpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const descriptionRef = useRef();
  const addressRef = useRef();
  const contactRef = useRef();
  const {
    currentUser,
    dbUser,
    updateDescription,
    updateAuthEmail,
    updateDatabaseEmail,
    updateAuthPassword,
    updateDatabasePassword,
    updateAddress,
    updateContact,
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
            <Form.Group id="contact" className="mb-2">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="contact" ref={contactRef} />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mb-2"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={3} ref={addressRef} />
            </Form.Group>
            <Form.Group
              controlId="exampleForm.ControlTextarea1"
              className="mb-2"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} ref={descriptionRef} />
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
              Update Profile
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
