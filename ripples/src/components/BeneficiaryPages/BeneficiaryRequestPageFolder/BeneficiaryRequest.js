import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import BenDisplayOrg from "./BenDisplayOrg";

const mainFeaturedPost = {
  title: "Create Request to Linked-Up Organisations Here!",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Request.jpg?alt=media&token=a051391c-255a-4025-a5dc-48e7f7b7d00f",
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
