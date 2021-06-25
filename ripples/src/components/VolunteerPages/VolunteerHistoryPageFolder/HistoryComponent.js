import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function SignedUpComponent() {
  const { dbUser, RemoveEventFromCommitments, AddEventToHistory } = useAuth();
  const [events, setEvents] = useState([]);
  const [identity, setIdentity] = useState();
  const [newUser, setNewUser] = useState();

  const fetchEvents = async () => {
    let arr = [];
    console.log(dbUser.commitments);

    //shift events from commitments to history and display history events
    database
      .collection("events")
      .where("confirmedVolunteers", "array-contains", dbUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (new Date() > new Date(doc.data().eventDate)) {
            if (
              dbUser.commitments.includes(doc.data().documentUID) &&
              !dbUser.history.includes(doc.data().documentUID)
            ) {
              RemoveEventFromCommitments(doc.data().documentUID, dbUser.uid);
              AddEventToHistory(doc.data().documentUID, dbUser.uid);
              console.log(dbUser.history);
            }
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
    <>
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
      {events.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>Oops You have no History to display!</h2>
          <br></br>
          <h3>Proceed to Search to start finding an event!</h3>
        </div>
      )}
    </>
  );
}
