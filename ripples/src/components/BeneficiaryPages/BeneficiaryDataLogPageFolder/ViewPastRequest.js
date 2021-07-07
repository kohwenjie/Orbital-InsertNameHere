import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function ViewPastRequest() {
  const { dbUser, addRequest } = useAuth();
  const [confirmedRequestsList, setConfirmedRequestsList] = useState([]);
  const [identity, setIdentity] = useState();

  console.log(dbUser);
  console.log(dbUser.confirmedRequests);

  const fetchEvents = async () => {
    let arr = [];
    let dbUserConfirmedRequestArr = [];

    if (dbUser.confirmedRequests) {
      dbUserConfirmedRequestArr = dbUser.confirmedRequests;
    }

    dbUserConfirmedRequestArr.forEach((rq) => {
      database
        .collection("requests")
        .doc(rq)
        .get()
        .then((doc) => {
          
          arr.push(doc.data());
          console.log(doc.data());
          setIdentity(doc.id);
        })
        .then(setConfirmedRequestsList(arr));
    });

    console.log(confirmedRequestsList);
  };

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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {confirmedRequestsList &&
            confirmedRequestsList.map((request) => {
              const {
                requestDescription,
                requestLocation,
                requestDate,
                signupDeadline,
                tags,
                organisationUID,
              } = request;
              console.log(request);
              return (
                <tr key={identity}>
                  <td>{confirmedRequestsList.indexOf(request) + 1}</td>
                  <td>{requestDescription}</td>
                  <td>{requestLocation}</td>
                  <td>{requestDate}</td>
                  <td>{tags}</td>

                  <td>
                    <div className="w-100 text-center mt-2 mb-3">
                      <Button>
                        <Link
                          to={{
                            pathname: "/BeneficiaryRepeatRequest",
                            aboutProps: {
                              requestDescription: requestDescription,
                              requestLocation: requestLocation,
                              requestDate: requestDate,
                              signupDeadline: signupDeadline,
                              tags: tags,
                              organisationUID: organisationUID,
                            },
                          }}
                        >
                          Repeat
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {confirmedRequestsList.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>You do not have any Past Request to display</h2>
          <br></br>
        </div>
      )}
    </>
  );
}
