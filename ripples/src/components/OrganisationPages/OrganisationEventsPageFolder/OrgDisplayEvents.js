import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import OrgDisplayFullEvent from "./OrgDisplayFullEvent";
import ViewSignedUpVolunteers from "./ViewSignedUpVolunteers";
import OrgViewEnquiries from "./OrgViewEnquiries";

export default function OrgDisplayEvents() {
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
          if (new Date() < new Date(doc.data().eventDate)) {
            arr.push(doc.data());
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
      key="1"
    >
      {events &&
        events.map((event) => {
          const {
            eventName,
            eventDate,
            organisationName,
            fileUrl
          } = event;
          var eventImage
          if (!fileUrl) {
            eventImage = "https://source.unsplash.com/cAtzHUz7Z8g/1600x900"
          } else {
            eventImage = fileUrl
          }
          return (
            <>
              <Card
                style={{
                  minWidth: "17rem",
                  maxWidth: "17rem",
                  flex: 1,
                  boxSizing: "border-box",
                }}
                className="box m-4"
                key={identity}
              >
                <Card.Img
                  variant="top"
                  src={eventImage}
                />
                <Card.Body>
                  <Card.Title>{eventName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {organisationName}
                  </Card.Subtitle>
                  <Card.Text>Event Date:{eventDate}</Card.Text>
                  <OrgDisplayFullEvent e={event} />
                  <ViewSignedUpVolunteers e={event} />
                  <OrgViewEnquiries e={event} />
                </Card.Body>
              </Card>
            </>
          );
        })}
      {events.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>
            There are no events created by your Organisation that is available
          </h2>
          <br></br>
          <h4>Start by creating one right now!</h4>
        </div>
      )}
    </CardDeck>
  );
}
