import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import DisplayFullEvent from "./DisplayFullEvent";

export default function DisplayEvents() {
  const [events, setEvents] = useState([]);
  const [identity, setIdentity] = useState();
  const fetchEvents = async () => {
    database
      .collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          setIdentity(doc.id);
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
    <CardDeck
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {/* <div className="grid"> */}
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
            documentUID,
          } = event;
          return (
            <>
              <Card
                style={{
                  minWidth: "17rem",
                  maxWidth: "17rem",
                  // maxHeight: "23rem",
                  flex: 1,
                  boxSizing: "border-box",
                }}
                className="box m-4"
              >
                <Card.Img
                  variant="top"
                  src="https://ivhq.imgix.net/images/pages/volunteer-activity-ideas/volunteer-acitivty-ideascommunity-senior.png?w=850&fit=max&auto=compress%2Cformat"
                  // will add image into the event document in firestore then extract to display
                />
                <Card.Body>
                  <Card.Title>{eventName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {organisationName}
                  </Card.Subtitle>
                  <Card.Text>Event Date:{eventDate}</Card.Text>
                  <DisplayFullEvent identity={identity} />
                </Card.Body>
              </Card>
            </>
          );
        })}
      {/* </div> */}
    </CardDeck>
  );
}
