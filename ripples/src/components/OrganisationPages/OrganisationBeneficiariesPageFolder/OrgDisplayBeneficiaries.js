import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function SignedUpComponent() {
  const { dbUser } = useAuth();
  const [beneficiaryList, setBeneficiaryList] = useState([]);
  const [identity, setIdentity] = useState();

  const fetchEvents = async () => {
    let arr = [];

    for (var i = 0; i < dbUser.beneficiaries.length; i++) {
      database
        .collection("user")
        .doc(dbUser.beneficiaries[i])
        .get()
        .then((doc) => {
          arr.push(doc.data());
          setIdentity(doc.id);
        })
        .then(setBeneficiaryList(arr));
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
            <th>Beneficiary First Name</th>
            <th>Beneficiary Last Name</th>
            <th>Beneficiary Description</th>
            <th>Beneficiary Address</th>
            <th>Beneficiary Contact</th>
            <th>Beneficiary Email</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaryList &&
            beneficiaryList.map((beneficiary) => {
              const {
                firstName,
                lastName,
                description,
                address,
                contact,
                email,
              } = beneficiary;
              return (
                <tr key={identity}>
                  <td>{beneficiaryList.indexOf(beneficiary)}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{description}</td>
                  <td>{address}</td>
                  <td>{contact}</td>
                  <td>{email}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {beneficiaryList.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>There are no Beneficiaries under your Organisation right now</h2>
          <br></br>
        </div>
      )}
    </>
  );
}
