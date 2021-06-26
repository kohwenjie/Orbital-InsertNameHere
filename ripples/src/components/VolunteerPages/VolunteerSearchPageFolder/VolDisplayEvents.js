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
        // console.log(querySnapshot);
        querySnapshot.forEach(async (doc) => {
          //check to see if the event is passed the sign up Date
          if (new Date() < new Date(doc.data().signupDeadline)) {
            console.log(doc.data());
            arr.push(await doc.data());
            // setIdentity will cause rendering, which is required or nothing will show
            setIdentity(doc.id);
          }
        });
      });
    setEvents(arr);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
                key={identity}
              >
                <Card.Img
                  variant="top"
                  src="https://source.unsplash.com/cAtzHUz7Z8g/1600x900"
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
      {events.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>Oops There is no Event to Display!</h2>
          <br></br>
        </div>
      )}
    </CardDeck>
  );
}
