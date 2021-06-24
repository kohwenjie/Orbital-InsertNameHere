import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function SignedUpComponent() {
  const {
    dbUser,
    RemoveBeneficiaryFromRequesting,
    AddBeneficiaryToBenficiaries,
  } = useAuth();
  const [requestingBeneficiaryList, setRequestingBeneficiaryList] = useState(
    []
  );
  const [identity, setIdentity] = useState();

  console.log(dbUser);
  console.log(dbUser.requestingBeneficiaries);

  const fetchEvents = async () => {
    let arr = [];

    for (var i = 0; i < dbUser.requestingBeneficiaries.length; i++) {
      database
        .collection("user")
        .doc(dbUser.requestingBeneficiaries[i])
        .get()
        .then((doc) => {
          arr.push(doc.data());
          setIdentity(doc.id);
        })
        .then(setRequestingBeneficiaryList(arr));
    }
  };

  console.log(requestingBeneficiaryList);

  function handleAccept(volUID) {
    if (
      dbUser.requestingBeneficiaries.includes(volUID) &&
      dbUser.requestingBeneficiaries.length > 0 &&
      !dbUser.beneficiaries.includes(volUID)
    ) {
      RemoveBeneficiaryFromRequesting(dbUser.uid, volUID);
      AddBeneficiaryToBenficiaries(dbUser.uid, volUID);
      //testing useState to rerender

      alert("Accepted Volunteer");
    } else {
      alert("Unable to Accept Volunteer");
    }
  }

  function handleReject(volUID) {
    RemoveBeneficiaryFromRequesting(dbUser.uid, volUID);
    alert("Volunteer has been Rejected");
  }

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
          {requestingBeneficiaryList &&
            requestingBeneficiaryList.map((beneficiary) => {
              const {
                firstName,
                lastName,
                description,
                address,
                contact,
                email,
                uid,
              } = beneficiary;
              return (
                <tr>
                  <td>{requestingBeneficiaryList.indexOf(beneficiary)}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{description}</td>
                  <td>{address}</td>
                  <td>{contact}</td>
                  <td>{email}</td>
                  <td>
                    <Button className="mb-2" onClick={() => handleReject(uid)}>
                      Reject
                    </Button>
                    <Button
                      onClick={() => {
                        handleAccept(uid);
                      }}
                    >
                      Accept
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {requestingBeneficiaryList.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>There are no Beneficiaries under your Organisation right now</h2>
          <br></br>
        </div>
      )}
    </>
  );
}
