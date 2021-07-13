import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import OrganisationProfile from "./OrganisationProfile";
import Footer from "../SharedComponent/Footer";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";

export default function OrganisationSetting() {
  const mainFeaturedPost = {
    title: "View Your Profile!",
    image:
      "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Profile.jpg?alt=media&token=cc96cbb7-cea7-418c-8a5e-a32a90eaecb1",
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <MainFeaturedPost post={mainFeaturedPost} />
        <main>
          <OrganisationProfile />
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
