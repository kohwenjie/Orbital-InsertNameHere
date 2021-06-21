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
      .where("confirmedVolunteers", "array-contains", dbUser.uid)
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
      <div>
        <h2>VOLUNTEERING HISTORY</h2>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
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
                <tr>
                  <td>{eventName}</td>
                  <td>{eventDate}</td>
                  <td>{eventLocation}</td>
                  <td>{eventDescription}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
