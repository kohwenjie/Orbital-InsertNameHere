import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import OrgDisplayFullEvent from "./OrgDisplayFullEvent";

export default function OrgDisplayEvents() {
  const [eventsUID, setEventsUID] = useState([]);
  const [events, setEvents] = useState([]);
  const [identity, setIdentity] = useState([]);
  const { currentUser, getUpdatedDBUser, dbUser } = useAuth();

  const fetchEvents = async () => {
    // database
    //   .collection("user")
    //   .doc(currentUser.uid)
    //   .get()
    //   .then((doc) => {
    //     console.log(doc.get("events"));
    //     setEvents(doc.get("events"));
    //     console.log(events);
    //     console.log(doc);
    //   });

    //seperate container to store the events object, the plan is to pull them all out from the database first and store here
    let eventArr = [];

    // console.log("DBUSER EVENTS LIST:", dbUser.events);
    getUpdatedDBUser(currentUser.uid);
    console.log("dbUser:", dbUser);
    console.log("dbUser events:", dbUser.events);
    setEventsUID(dbUser.events);
    console.log("dbUser events list is here:", dbUser.events);
    console.log("setted eventsUID list:", eventsUID);
    eventsUID.map((eventUID) => {
      database
        .collection("events")
        .doc(eventUID)
        .get()
        .then((event) => {
          console.log(event.data());
          eventArr.push(event.data());
        });
    });

    setEvents(eventArr);
    console.log("eventsArr:", events);
    console.log(events);

    console.log(eventsUID);
    events.forEach((event) => {
      setIdentity(event.documentUID);
      console.log("identity is :", identity);
    });
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
          console.log("number of events available to display:", events.length);
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
                  <OrgDisplayFullEvent identity={identity} />
                </Card.Body>
              </Card>
            </>
          );
        })}
    </CardDeck>
  );
}
