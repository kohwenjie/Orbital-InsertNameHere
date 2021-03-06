import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import OrgDisplayEvents from "./OrgDisplayEvents";
import OrgOngoingEvents from "./OrgOngoingEvents";
import { Tab, Row, Col, Nav } from "react-bootstrap";

const mainFeaturedPost = {
  title: "View or Create New Events Here!",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/events.jfif?alt=media&token=b9c50872-8351-43b0-bd7f-dbb1f7c4336c",
};

export default function OrganisationEvents() {
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
            <Col sm={1}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Created Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Ongoing Events</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={11}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <OrgDisplayEvents />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <OrgOngoingEvents />
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
