import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import OrgDisplayFullEvent from "./OrgDisplayFullEvent";

export default function OrgDisplayEvents() {
  const [events, setEvents] = useState([]);
  const [identity, setIdentity] = useState([]);
  const { currentUser } = useAuth();

  const fetchEvents = async () => {
    database
      .collection("user")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        console.log(doc.get("events"));
        setEvents(doc.get("events"));
        console.log(doc.get("events"));
        console.log(doc.id);
      });

    // console.log(events);
    // events.forEach((data) => {
    //   setIdentity(data.id);
    //   console.log(identity);
    // });
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
              >
                <Card.Img
                  variant="top"
                  src="https://ivhq.imgix.net/images/pages/volunteer-activity-ideas/volunteer-acitivty-ideascommunity-senior.png?w=850&fit=max&auto=compress%2Cformat"
                  // will add image into the event document in firestore then extract to display
                />
                <Card.Body>
                  <Card.Title>{documentUID}</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">
                    {organisationName}
                  </Card.Subtitle> */}
                  {/* <Card.Text>Event Date:{eventDate}</Card.Text> */}
                  {/* <OrgDisplayFullEvent identity={identity} /> */}
                </Card.Body>
              </Card>
            </>
          );
        })}
    </CardDeck>
  );
}
