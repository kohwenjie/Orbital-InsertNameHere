import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import OrgDisplayFullEvent from "./OrgDisplayFullEvent";

export default function OrgHistoryEvents() {
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
          if (new Date(doc.data().eventDate) < new Date()) {
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
    >
      {events &&
        events.map((event) => {
          const {
            eventName,
            eventDate,

            organisationName,
          } = event;
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
                key={events.indexOf(event) + 1}
              >
                <Card.Img
                  variant="top"
                  src="https://ivhq.imgix.net/images/pages/volunteer-activity-ideas/volunteer-acitivty-ideascommunity-senior.png?w=850&fit=max&auto=compress%2Cformat"
                />
                <Card.Body>
                  <Card.Title>{eventName}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {organisationName}
                  </Card.Subtitle>
                  <Card.Text>Event Date:{eventDate}</Card.Text>
                  <OrgDisplayFullEvent e={event} />
                </Card.Body>
              </Card>
            </>
          );
        })}
      {events.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>Oops You have no History to display!</h2>
          <br></br>
          <h3>Proceed to Search to start finding an event!</h3>
        </div>
      )}
    </CardDeck>
  );
}
