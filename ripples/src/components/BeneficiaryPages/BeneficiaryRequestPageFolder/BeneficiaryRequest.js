import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import BenDisplayOrg from "./BenDisplayOrg";

const mainFeaturedPost = {
  title: "Create Request to Linked-Up Organisations Here!",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
};

export default function BeneficiaryRequest() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
        <BenDisplayOrg />
      </Container>
      <Footer />
    </React.Fragment>
  );
}
