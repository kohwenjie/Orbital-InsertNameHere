import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import ViewPastRequest from "./ViewPastRequest";
import ViewPendingRequest from "./ViewPendingRequest";
import { Nav, Tab, Row, Col } from "react-bootstrap";

const mainFeaturedPost = {
  title: "View Your Requests Here",
  image: "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/history.jpg?alt=media&token=e9c0c54c-445b-4f0d-a173-e696f9b40a74",
  imgText: "main image description",
};

export default function BeneficiaryDataLog() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">View Pending Request</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">View Past Request</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ViewPendingRequest />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <ViewPastRequest />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <Footer />
    </React.Fragment>
  );
}
