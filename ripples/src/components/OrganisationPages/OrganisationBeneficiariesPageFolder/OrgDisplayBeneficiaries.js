import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";
import OrganisationBeneficiaries from "./OrganisationBeneficiaries";

export default function SignedUpComponent() {
  const { dbUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [identity, setIdentity] = useState();

  const fetchEvents = async () => {
    let arr = [];

    for (var i = 0; i < dbUser.beneficiaries.length; i++) {
      database
        .collection("user")
        .doc(dbUser.beneficiaries[i])
        .get()
        .then((doc) => {
          console.log(doc.data());
          arr.push(doc.data());
          setIdentity(doc.id);
        })
        .then(setEvents(arr));
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  console.log(events);
  console.log(dbUser.beneficiaries);

  return (
    <>
      <div>
        <h2>LIST OF ORGANISATION BENEFICIARIES</h2>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Beneficiary First Name</th>
            <th>Beneficiary Last Name</th>
            <th>Beneficiary Contact</th>
            <th>Beneficiary Email</th>
          </tr>
        </thead>
        <tbody>
          {events &&
            events.map((beneficiary) => {
              const { firstName, lastName, contact, email } = beneficiary;
              return (
                <tr>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{contact}</td>
                  <td>{email}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
