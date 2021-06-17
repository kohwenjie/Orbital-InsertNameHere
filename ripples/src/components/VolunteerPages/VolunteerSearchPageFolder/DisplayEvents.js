import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
// import DisplayFullEvent from "./DisplayFullEvent";

export default function DisplayEvents() {
  const [events, setEvents] = useState([]);

  //for use for the modal component
  //https://github.com/arslanah99/dynamic-cards-reactbootstrap/tree/master/src/component
  // const [show, setShow] = useState(false);
  // const [displayEvent, setDisplayEvent] = useState({eventName:"",
  //   eventDescription:"",
  //   eventLocation:"",
  //   eventDate:"",
  //   signupDeadline:"",
  //   organisationName:"",
  //   organisationUID:"",
  //   Tags:""});
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  // const {
  //   eventName,
  //   eventDescription,
  //   eventLocation,
  //   eventDate,
  //   signupDeadline,
  //   organisationName,
  //   organisationUID,
  //   Tags,
  // } = displayEvent;
  // const index = 0;

  //   const fetchEvents = async () => {
  //     const response = database.collection("events");
  //     const data = await response.get();
  //     data.docs.forEach((item) => {
  //       console.log(item.data());
  //       setEvents([...events, item.data()]);
  //     });
  //   };

  //   const events = [];

  const fetchEvents = async () => {
    database
      .collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          setEvents([...events, doc.data()]);
          events.push(doc.data());
          console.log(events);
        });
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  console.log(events);

  return (
    <>
      <div className="grid">
        {events &&
          events.map((event) => {
            const {
              eventName,
              eventDescription,
              eventLocation,
              eventDate,
              signupDeadline,
              organisationName,
              organisationUID,
              Tags,
            } = event;
            return (
              <>
                {/* if the data and field is available, then it will be shown. else the 
            information will not be shown on the search page
            *hence, we need to ensure that the field for beneficiary request and 
            organsation events are and will be different when stored into firestore */}

                {/* i tot beneficiary send request to organisation then organisation create event for them and tag it as Beneficiary request? */}

                <Card style={{ width: "18rem" }} className="box m-4">
                  <Card.Img
                    variant="top"
                    src="https://ivhq.imgix.net/images/pages/volunteer-activity-ideas/volunteer-acitivty-ideascommunity-senior.png?w=850&fit=max&auto=compress%2Cformat"
                    // will add image into the event document in firestore then extract to display
                  />
                  <Card.Body>
                    <Card.Title>{eventName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Organised By: {organisationName}
                    </Card.Subtitle>
                    <Card.Text>{eventDescription}</Card.Text>
                    <Button variant="primary">More Details</Button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
      </div>
    </>
  );
}

//testing use of modal, currently got issue during mapping.
// By right not suppose to use modal inside map, but rather outside the map,
// then in the map function u store the index of the event on click of the button,
// then display on the modal, currently figuring out how

{
  /* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{eventName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Event Date: {eventDate}</p>
          <p>Signup Deadline: {signupDeadline}</p>
          <p>Location: {eventLocation}</p>
          <p>Tags: {Tags}</p>
          <p>Event Details: {eventDescription}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Sign Up Now</Button>
        </Modal.Footer>
      </Modal> */
}
