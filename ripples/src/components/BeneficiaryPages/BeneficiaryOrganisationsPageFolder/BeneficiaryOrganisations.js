import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import BenDisplayOrg from "./BenDisplayOrg";

const mainFeaturedPost = {
  title: "Find Your Organisations Here",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Helping%20Hands.jpg?alt=media&token=ce59e36b-16dc-420a-9130-758d59924233",
};

export default function BeneficiaryOrganisations() {
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
