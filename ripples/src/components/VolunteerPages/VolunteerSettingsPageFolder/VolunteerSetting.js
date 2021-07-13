import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import VolunteerProfile from "./VolunteerProfile";

const mainFeaturedPost = {
  title: "View Your Profile!",
  image: "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Profile.jpg?alt=media&token=cc96cbb7-cea7-418c-8a5e-a32a90eaecb1",
};

export default function VolunteerSetting() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <MainFeaturedPost post={mainFeaturedPost} />
        <main>
          <VolunteerProfile />
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
