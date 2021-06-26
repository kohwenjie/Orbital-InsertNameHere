import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import OrgDisplayEvents from "./OrgDisplayEvents";
import OrgDisplayBenRequests from "./OrgDisplayBenRequests";
import OrgOngoingEvents from "./OrgOngoingEvents";
import { Tab, Row, Col, Nav } from "react-bootstrap";

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

const mainFeaturedPost = {
  title: "View or Create New Events Here!",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
};

export default function OrganisationEvents() {
  // const classes = useStyles();

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
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">View Created Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">View Ongoing Events</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    View Beneficiaries Requests
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <OrgDisplayEvents />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <OrgOngoingEvents />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <OrgDisplayBenRequests />
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
