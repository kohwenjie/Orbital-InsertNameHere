import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function OrgDisplayBenLinkRequest() {
  const {
    dbUser,
    RemoveBeneficiaryRequestFromOrganisationPending,
    AddBeneficiaryRequestToOrganisationEvent,
    RemoveBeneficiaryRequestFromBeneficiaryPending,
    AddBeneficiaryRequestToBenficiaryConfirmed,
  } = useAuth();
  const [beneficiaryPendingList, setBeneficiaryPendingList] = useState([]);
  const [identity, setIdentity] = useState();

  console.log(dbUser);
  console.log(dbUser.beneficiariesPendingRequest);

  const fetchEvents = async () => {
    let arr = [];
    let dbUserBenPendingRequestArr = [];
    if (dbUser.beneficiariesPendingRequest) {
      dbUserBenPendingRequestArr = dbUser.beneficiariesPendingRequest;
    }

    dbUserBenPendingRequestArr.forEach((rq) => {
      database
        .collection("requests")
        .doc(rq)
        .get()
        .then((doc) => {
          arr.push(doc.data());
          console.log(doc.data());
          setIdentity(doc.id);
        })
        .then(setBeneficiaryPendingList(arr));
      console.log("pending list:", beneficiaryPendingList);
    });
  };

  console.log(beneficiaryPendingList);

  function handleAccept(request) {
    if (
      dbUser.beneficiariesPendingRequest.includes(request.requestUID) &&
      dbUser.beneficiariesPendingRequest.length > 0 &&
      !dbUser.events.includes(request.requestUID)
    ) {
      RemoveBeneficiaryRequestFromOrganisationPending(
        dbUser.uid,
        request.requestUID
      );
      AddBeneficiaryRequestToOrganisationEvent(dbUser.uid, request);
      RemoveBeneficiaryRequestFromBeneficiaryPending(
        request.requesterUID,
        request.requestUID
      );
      AddBeneficiaryRequestToBenficiaryConfirmed(
        request.requesterUID,
        request.requestUID
      );

      alert("Accepted Beneficiary's Request");
    } else {
      alert("Unable to Accept Beneficiary's Request");
    }
  }

  function handleReject(requesterUID, requestUID) {
    RemoveBeneficiaryRequestFromOrganisationPending(dbUser.uid, requestUID);
    RemoveBeneficiaryRequestFromBeneficiaryPending(requesterUID, requestUID);
    alert("Beneficiary's Request has been Rejected");
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr key={identity}>
            <th>S/N</th>
            <th>Beneficiary Name</th>
            <th>Beneficiary Request Description</th>
            <th>Beneficiary Request Location</th>
            <th>Beneficiary Request Date</th>
            <th>Beneficiary Request Sign Up Deadline</th>
            <th>Beneficiary Request Type</th>
          </tr>
        </thead>
        <tbody>
          {beneficiaryPendingList &&
            beneficiaryPendingList.map((request) => {
              const {
                requesterFirstName,
                requesterLastName,
                requestDescription,
                requestLocation,
                requestDate,
                signupDeadline,
                tags,
                requesterUID,
                requestUID,
              } = request;
              return (
                <tr>
                  <td>{beneficiaryPendingList.indexOf(request) + 1}</td>
                  <td>
                    {requesterFirstName} {requesterLastName}
                  </td>
                  <td>{requestDescription}</td>
                  <td>{requestLocation}</td>
                  <td>{requestDate}</td>
                  <td>{signupDeadline}</td>
                  <td>{tags}</td>
                  <td>
                    <Button
                      className="mb-2"
                      onClick={() => handleReject(requesterUID, requestUID)}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => {
                        handleAccept(request);
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
      {beneficiaryPendingList.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>There are no Beneficiaries under your Organisation right now</h2>
          <br></br>
        </div>
      )}
    </>
  );
}
