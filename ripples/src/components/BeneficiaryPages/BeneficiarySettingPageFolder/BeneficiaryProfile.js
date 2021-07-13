import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card, Image } from "react-bootstrap";
import BeneficiaryUpdateProfile from "./BeneficiaryUpdateProfile";

export default function BeneficiaryProfile() {
  const { dbUser } = useAuth();
  const {
    firstName,
    lastName,
    description,
    restrictions,
    email,
    address,
    contact,
    dob,
    requestCounter,
    userType,
    fileUrl,
  } = dbUser;

  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Image
            src={fileUrl}
            roundedCircle
            height="250px"
            width="250px"
            display="center"
            className="rounded mx-auto d-block"
            margin="auto"
          />
          <br />
          <Card.Text class="text-center fs-3">
            <BeneficiaryUpdateProfile />
          </Card.Text>
          <Card.Text class="text-center fs-5">
            Total Number of Requests: {requestCounter}
          </Card.Text>
          <Card.Text class="text-center fs-3">
            {firstName} {lastName} ({userType})
          </Card.Text>
          <Card.Text class="text-center fs-6">Email: {email}</Card.Text>
          <Card.Text class="text-center fs-6">Address: {address}</Card.Text>
          <Card.Text class="text-center fs-6">Contact: {contact}</Card.Text>
          <Card.Text class="text-center fs-6">Date of Birth: {dob}</Card.Text>
          <Card.Text class="text-center fs-6">{description}</Card.Text>
          <Card.Text class="text-center fs-6">{restrictions}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
