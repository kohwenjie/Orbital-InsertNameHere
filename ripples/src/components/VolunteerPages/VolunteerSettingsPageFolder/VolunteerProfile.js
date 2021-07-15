import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card, CardGroup, Image } from "react-bootstrap";
import VolunteerUpdateProfile from "./VolunteerUpdateProfile";

export default function VolunteerProfile() {
  const { dbUser } = useAuth();
  const {
    firstName,
    lastName,
    description,
    certification,
    email,
    contact,
    dob,
    commitments,
    userType,
    fileUrl,
  } = dbUser;

  const numEvents = commitments.length;
  const totalPoints = numEvents * 3;

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
            <VolunteerUpdateProfile />
          </Card.Text>
        </Card.Body>
      </Card>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Text class="text-center fs-5">
              <blockquote class="blockquote text-center">
                <p class="mb-0">Current Points:</p>

                <h3>{totalPoints}</h3>
              </blockquote>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Text class="text-center fs-5">
              <blockquote class="blockquote text-center">
                <p class="mb-0">Total Events Participated: </p>

                <h3>{numEvents}</h3>
              </blockquote>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <Card>
        <Card.Body>
          <Card.Text class="text-center fs-3">
            <h4>
              <b>{firstName} {lastName}</b> ({userType.toUpperCase()})
            </h4>
          </Card.Text>
          <Card.Text class="text-center fs-6">
            <h4>{email}</h4>
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
            <h4>{certification}</h4>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
