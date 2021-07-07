import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { database } from "../../../firebase";
import { useAuth } from "../../../contexts/AuthContext";

export default function ViewEnquiries(props) {
  const [open, setOpen] = useState(false);
  const [enquiriesArr, setEnquiriesArr] = useState([]);
  const [enquiriesDetails, setEnquiriesDetail] = useState([]);
  const event = props.e;
  const { enquiries } = event;

  const fetchVolunteers = async () => {
    let arr = [];
    if (enquiries.length > 0) {
      let enquiryArr = [];
      enquiries.forEach((enquiryUID) => enquiryArr.push(enquiryUID));
      setEnquiriesArr(enquiryArr);
    }

    database
      .collection("enquiries")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (enquiriesArr.includes(doc.id)) {
            arr.push(doc.data());
          }
        });
      })
      .then(() => {
        setEnquiriesDetail(arr);
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

  return (
    <>
      <Button onClick={openModal} variant="outline-success" size="sm">
        View Enquiries
      </Button>
      <Modal show={open} onHide={closeModal} size="lg">
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Volunteer Name</th>
                <th>Enquiry</th>
              </tr>
            </thead>
            <tbody>
              {enquiriesDetails &&
                enquiriesDetails.map((enquiry) => {
                  const { volFirstName, volLastName, message } = enquiry;
                  return (
                    <tr key={enquiriesDetails.indexOf(enquiry) + 1}>
                      <td>{enquiriesDetails.indexOf(enquiry) + 1}</td>
                      <td>{volFirstName + " " + volLastName}</td>
                      <td>{message}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {enquiriesDetails.length === 0 && (
            <div style={{ textAlign: "center", margin: "8rem" }}>
              <h2>There are No Enquiries at the moment</h2>
            </div>
          )}
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
