import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import SignedUpComponent from "./SignedUpComponent";
import ConfirmedComponent from "./ConfirmedComponent";
import { Tab, Row, Col, Nav } from "react-bootstrap";

const mainFeaturedPost = {
  title: "View Your Commitments here",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/To-Do-List.jpg?alt=media&token=a124f86b-483b-4398-b1be-a27ffd0ac9f6",
};

export default function VolunteerCommitment() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Signed Up Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Confirmed Events</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <SignedUpComponent />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <ConfirmedComponent />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
