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
          <Card.Text class="text-center fs-3">
            <h4 fontWeight= 'bold' >
              <b>{firstName} {lastName}</b> ({userType.toUpperCase()})
            </h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{email}</h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{address}</h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{contact}</h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{dob}</h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{description}</h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{restrictions}</h4>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
