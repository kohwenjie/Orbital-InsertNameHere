import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card, Image } from "react-bootstrap";
import OrganisationUpdateProfile from "./OrganisationUpdateProfile";

export default function OrganisationProfile() {
  const { dbUser } = useAuth();
  const { name, description, email, address, contact, fileUrl, userType } =
    dbUser;
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
            <OrganisationUpdateProfile />
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>
              <b>{name}</b> ({userType.toUpperCase()})
            </h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{email}</h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{contact}</h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{address}</h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{description}</h4>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
