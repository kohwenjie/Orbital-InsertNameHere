import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Alert } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function ViewSignedUpVolunteers(props) {
  const [open, setOpen] = useState(false);
  const [signedUpVolunteersArr, setSignedUpVolunteersArr] = useState([]);
  const [volunteersProfile, setVolunteersProfile] = useState([]);
  const { RemoveVolunteerFromSignUp, AddVolunteerToConfirmed } = useAuth();
  const event = props.e;
  const { eventName, signedUpVolunteers, confirmedVolunteers, documentUID } =
    event;

  const fetchVolunteers = async () => {
    let arr = [];
    if (signedUpVolunteers.length > 0) {
      let signedUpArr = [];
      signedUpVolunteers.forEach((volUID) => signedUpArr.push(volUID));
      setSignedUpVolunteersArr(signedUpArr);
    }

    database
      .collection("user")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (signedUpVolunteersArr.includes(doc.id)) {
            arr.push(doc.data());
          }
        });
      })
      .then(() => {
        setVolunteersProfile(arr);
      });
  };

  useEffect(() => {
    fetchVolunteers();
  }, [open, signedUpVolunteers]);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleAccept(volUID) {
    if (
      signedUpVolunteers.includes(volUID) &&
      signedUpVolunteers.length > 0 &&
      !confirmedVolunteers.includes(volUID)
    ) {
      RemoveVolunteerFromSignUp(documentUID, volUID);
      AddVolunteerToConfirmed(documentUID, volUID);

      alert("Accepted Volunteer");
    } else {
      alert("Unable to Accept Volunteer");
    }
  }

  function handleReject(volUID) {
    RemoveVolunteerFromSignUp(documentUID, volUID);
    alert("Volunteer has been Rejected");
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        View Signed Up
      </Button>
      <Modal show={open} onHide={closeModal}>
        <Modal.Body>
          <h4>{eventName}</h4>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {volunteersProfile &&
                volunteersProfile.map((profile) => {
                  const { firstName, lastName, contact, email, uid } = profile;
                  return (
                    <tr key={volunteersProfile.indexOf(profile) + 1}>
                      <td>{volunteersProfile.indexOf(profile) + 1}</td>
                      <td>{firstName + " " + lastName}</td>
                      <td>{contact}</td>
                      <td>{email}</td>
                      <td>description yet to implement</td>
                      <td>
                        <Button onClick={() => handleReject(uid)}>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
