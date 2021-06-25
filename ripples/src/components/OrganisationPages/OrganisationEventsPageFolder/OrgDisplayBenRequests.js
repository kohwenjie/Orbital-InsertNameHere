import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import OrgDisplayFullRequest from "./OrgDisplayFullRequest";

export default function OrgDisplayBenRequests() {
  const [requests, setRequests] = useState([]);
  const [identity, setIdentity] = useState([]);
  const { currentUser } = useAuth();

  const fetchEvents = async () => {
    let arr = [];
    database
      .collection("requests")
      .where("organisationUID", "==", currentUser.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // setIdentity will cause rendering, which is required or nothing will show
          //   if (new Date() < new Date(doc.data().eventDate)) {
          //     arr.push(doc.data());
          //     setIdentity(doc.id);
          //   }
          arr.push(doc.data());
          setIdentity(doc.id);
        });
      })
      .then(setRequests(arr));
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
      {requests &&
        requests.map((request) => {
          const {
            requesterFirstName,
            requesterLastName,
            requestDescription,
            requestLocation,
            requestDate,
            signupDeadline,
            Tags,
            requestUID,
            requesterUID,
            organisationUID,
          } = request;
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
                key={requests.indexOf(request) + 1}
              >
                <Card.Img
                  variant="top"
                  src="https://ivhq.imgix.net/images/pages/volunteer-activity-ideas/volunteer-acitivty-ideascommunity-senior.png?w=850&fit=max&auto=compress%2Cformat"
                  // will add image into the event document in firestore then extract to display
                />
                <Card.Body>
                  <Card.Title>
                    {requesterFirstName} {requesterLastName}'s Request
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {requestDescription}
                  </Card.Subtitle>
                  <Card.Text>Request Date:{requestDate}</Card.Text>
                  <OrgDisplayFullRequest r={request} />
                </Card.Body>
              </Card>
            </>
          );
        })}
      {requests.length === 0 && (
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
