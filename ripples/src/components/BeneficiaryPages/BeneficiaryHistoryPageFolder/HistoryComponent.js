import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function OrgDisplayBenLinkRequest() {
  const { dbUser } = useAuth();
  const [confirmedRequestsList, setConfirmedRequestsList] = useState([]);
  const [identity, setIdentity] = useState();

  console.log(dbUser);
  console.log(dbUser.confirmedRequests);

  const fetchEvents = async () => {
    let arr = [];

    for (var i = 0; i < dbUser.confirmedRequests.length; i++) {
      database
        .collection("requests")
        .doc(dbUser.confirmedRequests[i])
        .get()
        .then((doc) => {
          arr.push(doc.data());
          console.log(doc.data());
          setIdentity(doc.id);
        })
        .then(setConfirmedRequestsList(arr));
    }
  };

  console.log(confirmedRequestsList);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>S/N</th>
            <th>Request Description</th>
            <th>Request Location</th>
            <th>Request Date</th>
            <th>Request Type</th>
          </tr>
        </thead>
        <tbody>
          {confirmedRequestsList &&
            confirmedRequestsList.map((request) => {
              const {
                requestDescription,
                requestLocation,
                requestDate,
                Tags,
                requesterUID,
                requestUID,
              } = request;
              return (
                <tr>
                  <td>{confirmedRequestsList.indexOf(request) + 1}</td>
                  <td>{requestDescription}</td>
                  <td>{requestLocation}</td>
                  <td>{requestDate}</td>
                  <td>{Tags}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {confirmedRequestsList.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>There are no Beneficiaries under your Organisation right now</h2>
          <br></br>
        </div>
      )}
    </>
  );
}
