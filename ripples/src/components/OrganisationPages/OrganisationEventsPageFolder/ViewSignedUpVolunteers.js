import React, { useState, useEffect } from "react";
import { Button, Modal, Table, Alert } from "react-bootstrap";
import { database } from "../../../firebase";

export default function ViewSignedUpVolunteers(props) {
  const [open, setOpen] = useState(false);
  const [signedUpVolunteersArr, setSignedUpVolunteersArr] = useState([]);
  const [volunteersProfile, setVolunteersProfile] = useState([]);
  const event = props.e;
  const { eventName, signedUpVolunteers, confirmedVolunteers } = event;

  const fetchVolunteers = async () => {
    let arr = [];
    if (signedUpVolunteers.length > 0) {
      let signedUpArr = [];
      signedUpVolunteers.forEach((volUID) => signedUpArr.push(volUID));
      setSignedUpVolunteersArr(signedUpArr);
      // console.log("here 3: ", signedUpVolunteersArr);
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
  }, [open]);

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleAccept(volUID) {
    if (
      signedUpVolunteers.includes(volUID) &&
      !confirmedVolunteers.includes(volUID)
    ) {
      let newSignedUpArr = [];
      signedUpVolunteers.forEach((uid) => {
        if (uid !== volUID) {
          newSignedUpArr.push(uid);
        }
      });
      database
        .collection("events")
        .doc(event.id)
        .update({ signedUpVolunteers: newSignedUpArr });

      let newConfirmedArr = [];
      confirmedVolunteers.forEach((uid) => {
        newConfirmedArr.push(uid);
      });
      newConfirmedArr.push(volUID);
      database
        .collection("events")
        .doc(event.id)
        .update({ signedUpVolunteers: newConfirmedArr });
      return <Alert>Volunteer accepted!</Alert>;
    } else {
      return <Alert>Error! Cant Accept Volunteer</Alert>;
    }
  }

  function handleReject(volUID) {}

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
                  const { firstName, lastName, contact, email } = profile;
                  return (
                    <tr>
                      <td>{volunteersProfile.indexOf(profile) + 1}</td>
                      <td>{firstName + " " + lastName}</td>
                      <td>{contact}</td>
                      <td>{email}</td>
                      <td>description yet to implement</td>
                      <td>
                        <Button>Reject</Button>
                        <Button onClick={handleAccept(profile.id)}>
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
