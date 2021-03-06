import React, { useState, useRef } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { storage } from "../../../firebase";
import { v4 as uuidv4 } from "uuid";

export default function OrgEditEvent(props) {
  const [open, setOpen] = useState(false);
  const event = props.e;
  const { eventName, tags, documentUID } = event;
  console.log(tags);
  const {
    updateEventName,
    updateEventDescription,
    updateEventDate,
    updateEventLocation,
    updateEventSignUpDeadline,
    updateEventTags,
    updateFileUrl,
    parseTags,
    dbUser,
  } = useAuth();
  const eNameRef = useRef();
  const eDescriptionRef = useRef();
  const eLocationRef = useRef();
  const eDateRef = useRef();
  const sDeadlineRef = useRef();
  const [eDate, setEDate] = useState();
  const [sDeadline, setSDeadline] = useState();
  const [eTags, setETags] = useState([]);
  const [eType, setEType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [eventImage, setEventImage] = useState("Insert Image for Event");
  const [fileUrl, setFileUrl] = useState(null);
  const fileUid = uuidv4();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(fileUid);
    await fileRef.put(file);
    setEventImage(file.name);
    setFileUrl(await fileRef.getDownloadURL());
  };

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  const handleChange = (tag) => {
    console.log("before: ", eTags);
    let tempTags = eTags;
    if (tempTags.some((t) => t === tag)) {
      tempTags = tempTags.filter((t) => t !== tag);
    } else {
      tempTags.push(tag);
    }
    setETags(tempTags);
    console.log("after: ", eTags);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (eTags.length !== 0 || eType !== "") {
      if (eType === "") {
        return setError("Please select an Event Type!");
      } else if (eTags.length === 0) {
        return setError("Please select at least 1 Tag");
      }
    }
    if (eTags.length !== 0 && eType !== "") {
      eTags.push(eType);
    }
    console.log("final: " + eTags);
    const updates = [];
    setLoading(true);
    setError("");

    if (eNameRef.current.value) {
      updates.push(updateEventName(eNameRef.current.value, documentUID));
    }
    if (eDescriptionRef.current.value) {
      updates.push(
        updateEventDescription(eDescriptionRef.current.value, documentUID)
      );
    }
    if (eDateRef.current.value) {
      updates.push(updateEventDate(eDateRef.current.value, documentUID));
    }
    if (eLocationRef.current.value) {
      updates.push(
        updateEventLocation(eLocationRef.current.value, documentUID)
      );
    }
    if (sDeadlineRef.current.value) {
      updates.push(
        updateEventSignUpDeadline(sDeadlineRef.current.value, documentUID)
      );
    }
    if (eTags.length > 0) {
      updates.push(updateEventTags(eTags, documentUID));
    }

    var imageChanged = false;
    const previousImageUrl = event.fileUrl;
    if (fileUrl) {
      console.log(fileUrl);
      console.log(previousImageUrl);
      updates.push(updateFileUrl(fileUrl, documentUID));
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
        history.push("/OrganisationHome");
      })
      .catch(() => {
        setError("Failed to update event");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Button onClick={openModal} variant="warning">
        Edit Event
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <h2 className="text-center mb-20">Update {eventName}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="eName">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="eventName"
                ref={eNameRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="eDescription">
              <Form.Label>Event Description</Form.Label>
              <Form.Control
                type="eventDescription"
                ref={eDescriptionRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="eLocation">
              <Form.Label>Event Location</Form.Label>
              <Form.Control
                type="eventLocation"
                ref={eLocationRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="eDate" className="mb-4">
              <TextField
                id="date"
                label="Date of Event"
                type="date"
                value={eDate}
                ref={eDateRef}
                onChange={(e) => setEDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Form.Group>
            <Form.Group id="signupDeadline" className="mb-4">
              <TextField
                id="date"
                label="Signup Deadline"
                type="date"
                value={sDeadline}
                ref={sDeadlineRef}
                onChange={(e) => setSDeadline(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Form.Group>
            <div key={"inline-checkbox"}>
              <h6>Select Category:</h6>
              <h6 color={"blue"}>
                (Old tags will be used by default unless new tags chosen)
              </h6>
              <h6>Previous Tags: {parseTags(tags)}</h6>
              <Form.Check
                inline
                type={"checkbox"}
                id={"Animal Welfare Tag"}
                label={"Animal Welfare Tag"}
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
                onChange={() => setEType("Live")}
              />
              <Form.Check
                inline
                name="event type"
                type={"radio"}
                id={"Virtual"}
                label={"Virtual"}
                onChange={() => setEType("Virtual")}
              />
              <Form.Check
                inline
                name="event type"
                type={"radio"}
                id={"Hybrid"}
                label={"Hybrid"}
                onChange={() => {
                  setEType("Hybrid");
                }}
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
            <Button disabled={loading} className="w-100" type="submit">
              Edit Event
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
