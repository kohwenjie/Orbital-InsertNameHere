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
              {/* if the data and field is available, then it will be shown. else the 
            information will not be shown on the search page
            *hence, we need to ensure that the field for beneficiary request and 
            organsation events are and will be different when stored into firestore */}
              <p>{event.eventName}</p>
              <p>{event.eventDescription}</p>
              <p>{event.requestDescription}</p>
              <p>{event.eventLocation}</p>
              <p>{event.requestLocation}</p>
              <p>{event.eventDate}</p>
              <p>{event.requestDate}</p>
              <p>{event.signupDeadline}</p>
              <p>{event.organisationName}</p>
              <p>{event.requestFirstName}</p>
              <p>{event.requestLastName}</p>
              <p>{event.organisationUID}</p>
              <p>{event.requesterUID}</p>
              <p>{event.Tags}</p>
              <br />
            </div>
          );
        })}
    </div>
  );
}
