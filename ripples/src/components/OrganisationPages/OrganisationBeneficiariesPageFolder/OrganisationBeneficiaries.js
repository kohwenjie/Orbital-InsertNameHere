import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import OrgDisplayBeneficiaries from "./OrgDisplayBeneficiaries";
import OrgDisplayBenLinkRequest from "./OrgDisplayBenLinkRequest";
import OrgDisplayBenRequest from "./OrgDisplayBenRequest";
import { Tab, Row, Col, Nav } from "react-bootstrap";

const mainFeaturedPost = {
  title: "View Beneficiaries Under You",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
};

export default function OrganisationBeneficiaries() {
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
                  <Nav.Link eventKey="first">View Your Beneficiaries</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">
                    View Beneficiary Request
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">
                    View Beneficiary Link-Up Request
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <OrgDisplayBeneficiaries />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <OrgDisplayBenRequest />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <OrgDisplayBenLinkRequest />
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
