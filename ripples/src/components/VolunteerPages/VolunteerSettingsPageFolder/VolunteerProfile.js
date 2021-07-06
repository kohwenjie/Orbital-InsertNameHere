import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Card, CardGroup } from "react-bootstrap";
import VolunteerUpdateProfile from "./VolunteerUpdateProfile";

export default function VolunteerProfile() {
  const { dbUser } = useAuth();
  const {
    firstName,
    lastName,
    username,
    description,
    certification,
    email,
    contact,
    dob,
    points,
    eventCounter,
    history,
    commitments,
    userType,
  } = dbUser;

  const numEvents = history.length;
  const totalPoints = numEvents * 3;

  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Text class="text-center fs-3">
            {username} <VolunteerUpdateProfile />
          </Card.Text>
        </Card.Body>
      </Card>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Text class="text-center fs-5">
              Current Points: {totalPoints}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Text class="text-center fs-5">
              Total Events Participated: {numEvents}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <Card>
        <Card.Body>
          <Card.Text class="text-center fs-3">
            {firstName} {lastName} ({userType})
          </Card.Text>
          <Card.Text class="text-center fs-6">Email: {email}</Card.Text>
          <Card.Text class="text-center fs-6">Contact: {contact}</Card.Text>
          <Card.Text class="text-center fs-6">Date of Birth: {dob}</Card.Text>
          <Card.Text class="text-center fs-6">{description}</Card.Text>
          <Card.Text class="text-center fs-6">{certification}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
