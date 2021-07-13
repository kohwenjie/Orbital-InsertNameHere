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
      "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Profile.jpg?alt=media&token=979db10c-9e48-4283-a87f-ea29a003a542",
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
