import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import VolDisplayFullEvent from "./VolDisplayFullEvent";

export default function VolDisplayEvents() {
  const [events, setEvents] = useState([]);
  const [identity, setIdentity] = useState();
  const fetchEvents = async () => {
    let arr = [];
    database
      .collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // setIdentity will cause rendering, which is required or nothing will show
          
          arr.push(doc.data());
          setIdentity(doc.id);
        });
      })
      .then(setEvents(arr))
      .then(console.log("THIS IS THE EVENTS ARR", events));
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
      {events &&
        events.map((event) => {
          const { eventName, eventDate, organisationName } = event;
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
                  <VolDisplayFullEvent e={event} />
                </Card.Body>
              </Card>
            </>
          );
        })}
    </CardDeck>
  );
}
