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
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/home.jpg?alt=media&token=316fbce5-3840-4303-a600-4161fcb46f43",
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
            <blockquote class="blockquote text-center">
              <p class="mb-0">Total Events YTD:</p>
              <br />
              <footer class="blockquote-footer">
                <cite title="Source Title">
                  (total number of events created)
                </cite>
              </footer>
              <h3>{numEvents}</h3>
            </blockquote>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <blockquote class="blockquote text-center">
              <p class="mb-0">Number of Beneficiaries:</p>
              <br />
              <footer class="blockquote-footer">
                (current number of beneficiaries benefitting from you)
              </footer>
              <h3>{numBeneficiaries}</h3>
            </blockquote>
          </Card.Body>
        </Card>
      </CardGroup>
      <Footer />
    </React.Fragment>
  );
}
