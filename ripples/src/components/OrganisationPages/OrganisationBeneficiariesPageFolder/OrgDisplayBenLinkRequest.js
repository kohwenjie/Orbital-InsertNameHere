import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function OrgDisplayBenLinkRequest() {
  const {
    dbUser,
    RemoveBeneficiaryFromRequesting,
    AddBeneficiaryToBenficiaries,
    AddOrganisationToBeneficiary,
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

  function handleAccept(benUID) {
    if (
      dbUser.requestingBeneficiaries.includes(benUID) &&
      dbUser.requestingBeneficiaries.length > 0 &&
      !dbUser.beneficiaries.includes(benUID)
    ) {
      RemoveBeneficiaryFromRequesting(dbUser.uid, benUID);
      AddBeneficiaryToBenficiaries(dbUser.uid, benUID);
      //testing useState to rerender
      AddOrganisationToBeneficiary(benUID, dbUser.uid);

      alert("Accepted Volunteer");
    } else {
      alert("Unable to Accept Volunteer");
    }
  }

  function handleReject(benUID) {
    RemoveBeneficiaryFromRequesting(dbUser.uid, benUID);
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
            <th>Action</th>
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
                <tr key={identity}>
                  <td>{requestingBeneficiaryList.indexOf(beneficiary)}</td>
                  <td>{firstName}</td>
                  <td>{lastName}</td>
                  <td>{description}</td>
                  <td>{address}</td>
                  <td>{contact}</td>
                  <td>{email}</td>
                  <td>
                    <Button
                      className="mb-2 btn-sm"
                      onClick={() => handleReject(uid)}
                    >
                      Reject
                    </Button>
                    <Button
                      className="btn-sm"
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
