import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function VolDisplayFullEvent(props) {
  const [open, setOpen] = useState(false);
  // const [event, setEvent] = useState();
  // const { currentUser, dbUser } = useAuth();
  const event = props.e;
  const {
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    signupDeadline,
    organisationName,
    organisationUID,
    Tags,
    documentUID,
  } = event;
  // console.log(props.identity);
  // console.log(dbUser);

  // const fetchEvent = async () => {
  //   // database
  //   //   .collection("events")
  //   //   .get()
  //   //   .then((querySnapshot) => {
  //   //     querySnapshot.forEach((doc) => {
  //   //       console.log(doc.id);
  //   //       setEvents([...events, doc.data()]);
  //   //       events.push(doc.data());
  //   //       console.log(events);
  //   //     });
  //   //   });

  //   database
  //     .collection("events")
  //     .doc(props.identity)
  //     .get()
  //     .then((doc) => {
  //       // console.log(doc.data());
  //       setEvent([doc.data()]);
  //       // events.push(doc.data());
  //       // console.log(events);
  //     });
  // };

  // useEffect(() => {
  //   fetchEvent();
  // }, []);

  // console.log(events);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <>

      <Button onClick={openModal} variant="outline-success" size="sm">
        More Details
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <img
            class="img-fluid"
            src="https://ivhq.imgix.net/images/pages/volunteer-activity-ideas/volunteer-acitivty-ideascommunity-senior.png?w=850&fit=max&auto=compress%2Cformat"
            alt=""
          />
          <h4>{eventName}</h4>
          <p>Event Date: {eventDate}</p>
          <p>Sign up before: {signupDeadline}</p>
          <p>Location: {eventLocation}</p>
          <p>Brought to you by: {organisationName}</p>
          <p>Tags: {Tags}</p>
          <h7>{eventDescription}</h7>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary">Sign Up Now</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
