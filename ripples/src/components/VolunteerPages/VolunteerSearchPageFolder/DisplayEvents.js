import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";

export default function DisplayEvents() {
  const [events, setEvents] = useState([]);
  //   const fetchEvents = async () => {
  //     const response = database.collection("events");
  //     const data = await response.get();
  //     data.docs.forEach((item) => {
  //       console.log(item.data());
  //       setEvents([...events, item.data()]);
  //     });
  //   };

  //   const events = [];

  const fetchEvents = async () => {
    database
      .collection("events")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          setEvents([...events, doc.data()]);
          events.push(doc.data());
          console.log(events);
        });
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  console.log(events);

  return (
    <div className="events">
      {events &&
        events.map((event) => {
          return (
            <div className="event-container" key={event.organisationUID}>
              <p>{event.eventName}</p>
              <p>{event.eventDescription}</p>
              <p>{event.eventLocation}</p>
              <p>{event.eventDate}</p>
              <p>{event.signupDeadline}</p>
              <p>{event.organisationName}</p>
              <p>{event.organisationUID}</p>
              <p>{event.Tags}</p>
              <br />
            </div>
          );
        })}
    </div>
  );
}
