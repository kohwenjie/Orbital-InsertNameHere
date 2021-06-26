import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function SignedUpComponent() {
  const { dbUser } = useAuth();
  const eventArray = dbUser.commitments;
  const [events, setEvents] = useState([]);
  const [identity, setIdentity] = useState();

  console.log(dbUser);
  console.log(dbUser.uid);
  // event array stalls the eventUIDs only
  console.log(eventArray);

  const fetchEvents = async () => {
    let arr = [];
    database
      .collection("events")
      .where("signedUpVolunteers", "array-contains", dbUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          arr.push(doc.data());
          setIdentity(doc.id);
        });
      })
      .then(setEvents(arr));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  console.log(events);
  console.log(eventArray);

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Event Location</th>
            <th>Event Description</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((event) => {
              const { eventName, eventDescription, eventLocation, eventDate } =
                event;
              return (
                <tr key={events.indexOf(event) + 1}>
                  <td>{events.indexOf(event) + 1}</td>
                  <td>{eventName}</td>
                  <td>{eventDate}</td>
                  <td>{eventLocation}</td>
                  <td>{eventDescription}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {events.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>Oops You have not signed up for any events!</h2>
          <br></br>
          <h3>Proceed to Search to start finding an event!</h3>
        </div>
      )}
    </>
  );
}
