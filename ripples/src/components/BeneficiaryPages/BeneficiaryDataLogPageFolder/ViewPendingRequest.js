import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function ViewPendingRequest() {
  const { dbUser } = useAuth();
  const [pendingRequestsList, setPendingRequestsList] = useState([]);
  const [identity, setIdentity] = useState();

  console.log(dbUser);
  console.log(dbUser.pendingRequests);

  const fetchRequest = async () => {
    let arr = [];
    let dbUserPendingRequestArr = [];

    if (dbUser.confirmedRequests) {
      dbUserPendingRequestArr = dbUser.pendingRequests;
    }

    dbUserPendingRequestArr.forEach((rq) => {
      database
        .collection("requests")
        .doc(rq)
        .get()
        .then((doc) => {
          arr.push(doc.data());
          console.log(doc.data());
          setIdentity(doc.id);
        })
        .then(setPendingRequestsList(arr));
    });

    console.log(pendingRequestsList);
  };

  useEffect(() => {
    fetchRequest();
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
          {pendingRequestsList &&
            pendingRequestsList.map((request) => {
              const {
                requestDescription,
                requestLocation,
                requestDate,
                Tags,
              } = request;
              return (
                <tr key={identity}>
                  <td>{pendingRequestsList.indexOf(request) + 1}</td>
                  <td>{requestDescription}</td>
                  <td>{requestLocation}</td>
                  <td>{requestDate}</td>
                  <td>{Tags}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {pendingRequestsList.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>You do not have any Pending Request to display</h2>
          <br></br>
        </div>
      )}
    </>
  );
}
