import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";

const mainFeaturedPost = {
  title: "Welcome to Ripples for Beneficiaries!",
  description:
    "Here at Ripples, we aim to improve your day with our services. Feel free to contact us for any assistance!",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
  imgText: "Welcome page introduction ",
};

export default function BeneficiaryHome() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
