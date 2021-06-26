import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import ViewPastRequest from "./ViewPastRequest";
import ViewPendingRequest from "./ViewPendingRequest";
import { Nav, Tab, Row, Col } from "react-bootstrap";

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

const mainFeaturedPost = {
  title: "View Your Requests Here",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
  imgText: "main image description",
};

export default function BeneficiaryDataLog() {
  // const classes = useStyles();

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
