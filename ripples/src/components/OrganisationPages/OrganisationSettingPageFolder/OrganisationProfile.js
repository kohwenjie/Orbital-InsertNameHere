import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card } from "react-bootstrap";
import OrganisationUpdateProfile from "./OrganisationUpdateProfile";

export default function OrganisationProfile() {
  const { dbUser } = useAuth();
  const { name, description, email, contact } = dbUser;
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Text class="text-center fs-3">
            {name} <OrganisationUpdateProfile />
          </Card.Text>
          <Card.Text class="text-center fs-6">{description}</Card.Text>
          <Card.Text class="text-center fs-6">Email: {email}</Card.Text>
          <Card.Text class="text-center fs-6">Contact: {contact}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
