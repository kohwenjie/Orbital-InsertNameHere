import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card } from "react-bootstrap";

export default function VolunteerProfile() {
  const { dbUser } = useAuth();
  const { firstName, lastName, email, contact, dob, description, userType } =
    dbUser;
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <br></br>
        <Card.Title className="text-center mb-20">
          <h1>
            {firstName} {lastName}
          </h1>
        </Card.Title>
        <Card.Subtitle className="text-center mb-20 text-muted">
          <h3>User Type: {userType}</h3>
        </Card.Subtitle>
        <br></br>
        <br></br>
        <Card.Text className="text-center mb-20">
          <h3>Email: {email}</h3>
        </Card.Text>
        <Card.Text className="text-center mb-20">
          <h3>Contact: {contact}</h3>
        </Card.Text>
        <Card.Text className="text-center mb-20">
          <h3>Date of Birth: {dob}</h3>
        </Card.Text>
        <br></br>
        <Card.Text className="text-center mb-20">
          <h3>
            Description: <div>{description}</div>
          </h3>
        </Card.Text>
        <br></br>
      </Card.Body>
    </Card>
  );
}
