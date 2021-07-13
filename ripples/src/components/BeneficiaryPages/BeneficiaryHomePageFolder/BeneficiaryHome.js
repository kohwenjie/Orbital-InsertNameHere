import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";

const mainFeaturedPost = {
  title: "Welcome to Ripples for Beneficiaries!",
  description:
    "Here at Ripples, we aim to improve your everyday with our services. Feel free to contact us for any assistance!",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Ripples%20Business%20Card.png?alt=media&token=97927341-9bd8-40f2-90ed-57d297f687bc",
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
