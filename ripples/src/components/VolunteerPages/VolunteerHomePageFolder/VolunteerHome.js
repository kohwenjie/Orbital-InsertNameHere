import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Card, CardGroup } from "react-bootstrap";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import { useAuth } from "../../../contexts/AuthContext";
import { database } from "../../../firebase";

const mainFeaturedPost = {
  title: "Welcome to Ripples for Volunteers!",
  description:
    "We hope to be able to help volunteers in making volunteering a much more convenient and meaningful experience!",
  image: "gs://orbital-insertnamehere.appspot.com/Ripples Business Card.png",
  imgText: "main image description",
};

export default function VolunteerHome() {
  const { dbUser } = useAuth();
  const { commitments } = dbUser;
  const numEvents = commitments.length;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Text class="text-center fs-5">
              Number of Upcoming Events: {numEvents}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Text class="text-center fs-5">Quote of the Day:</Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <Footer />
    </React.Fragment>
  );
}
