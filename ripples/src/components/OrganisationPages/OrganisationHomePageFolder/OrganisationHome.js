import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Card, CardGroup } from "react-bootstrap";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import { useAuth } from "../../../contexts/AuthContext";

const mainFeaturedPost = {
  title: "Welcome to Ripples for Organisations!",
  description:
    "We hope that our services available will be able to aid you in helping the community.",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Ripples%20Business%20Card.png?alt=media&token=548fd0e4-b9f9-44fc-b4c6-b62f84bfb938",
  imgText: "main image description",
};

export default function OrganisationHome() {
  const { dbUser } = useAuth();
  const { beneficiaries, events } = dbUser;
  const numEvents = events.length;
  const numBeneficiaries = beneficiaries.length;
  console.log(dbUser);

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
            <Card.Title class="text-center fs-5">Total Events YTD:</Card.Title>
            <Card.Subtitle class="text-center mb-3">
              (total number of events created)
            </Card.Subtitle>
            <Card.Text class="text-center fs-5">
              <h3>{numEvents}</h3>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title class="text-center fs-5">
              Number of Beneficiaries:
            </Card.Title>
            <Card.Subtitle class="text-center mb-3">
              (current number of beneficiaries benefitting from you)
            </Card.Subtitle>
            <Card.Text class="text-center fs-5">
              <h3>{numBeneficiaries}</h3>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <Footer />
    </React.Fragment>
  );
}
