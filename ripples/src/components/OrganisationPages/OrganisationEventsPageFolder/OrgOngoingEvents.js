import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import OrgDisplayFullEvent from "./OrgDisplayFullEvent";
import ViewSignedUpVolunteers from "./ViewSignedUpVolunteers";

export default function OrgOngoingEvents() {
  const [events, setEvents] = useState([]);
  const [identity, setIdentity] = useState([]);
  const { currentUser } = useAuth();

  const fetchEvents = async () => {
    let arr = [];
    database
      .collection("events")
      .where("organisationUID", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //only show events whose EVENT DATE is TODAY
          if (new Date(doc.data().eventDate) === new Date()) {
            arr.push(doc.data());
            // setIdentity will cause rendering, which is required or nothing will show
            setIdentity(doc.id);
          }
        });
      })
      .then(setEvents(arr));
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
                key={events.indexOf(event) + 1}
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
                  <OrgDisplayFullEvent e={event} />
                  <ViewSignedUpVolunteers e={event} />
                </Card.Body>
              </Card>
            </>
          );
        })}
      {events.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>
            There are no events created by your Organisation that is ongoing
          </h2>
          <br></br>
          <h4>Start by creating one right now!</h4>
        </div>
      )}
    </CardDeck>
  );
}
