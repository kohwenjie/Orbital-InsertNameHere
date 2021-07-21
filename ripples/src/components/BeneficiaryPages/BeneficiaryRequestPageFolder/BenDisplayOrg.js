import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function SignedUpComponent() {
  const { dbUser } = useAuth();
  const [organisationList, setOrganisationList] = useState([]);
  const [identity, setIdentity] = useState();

  const fetchEvents = async () => {
    let arr = [];

    for (var i = 0; i < dbUser.linkedOrganisation.length; i++) {
      database
        .collection("user")
        .doc(dbUser.linkedOrganisation[i])
        .get()
        .then((doc) => {
          arr.push(doc.data());
          setIdentity(doc.id);
        })
        .then(setOrganisationList(arr));
    }
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
            <th>Organisation Name</th>
            <th>Description</th>
            <th>Address</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {organisationList &&
            organisationList.map((organisation) => {
              const { name, description, address, contact, email, uid } =
                organisation;
              return (
                <tr key={uid}>
                  <td>{organisationList.indexOf(organisation) + 1}</td>
                  <td>{name}</td>
                  <td>{description}</td>
                  <td>{address}</td>
                  <td>{email}</td>
                  <td>{contact}</td>
                  <td>
                    <Button className="mt-3">
                      <Link
                        to={{
                          pathname: "/BeneficiaryRequestCreate",
                          aboutProps: {
                            organisationUID: uid,
                          },
                        }}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Request
                      </Link>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {organisationList.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>You have not linked up with any Organisations</h2>
          <br></br>
          <h3>
            Please proceed to link up with Organisations under the organisations
            Tab
          </h3>
        </div>
      )}
    </>
  );
}
