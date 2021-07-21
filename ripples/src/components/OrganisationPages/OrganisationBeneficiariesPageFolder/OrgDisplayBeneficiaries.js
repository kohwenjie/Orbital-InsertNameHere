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
            <th>Beneficiary Name</th>
            <th>Beneficiary Description</th>
            <th>Beneficiary Restriction</th>
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
                restrictions,
                address,
                contact,
                email,
                uid
              } = beneficiary;
              return (
                <tr key={uid}>
                  <td>{beneficiaryList.indexOf(beneficiary) + 1}</td>
                  <td>
                    {firstName} {lastName}
                  </td>
                  <td>{description}</td>
                  <td>{restrictions}</td>
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
