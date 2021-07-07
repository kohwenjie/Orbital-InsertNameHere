import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import VolunteerProfile from "./VolunteerProfile";

const mainFeaturedPost = {
  title: "View Your Profile!",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
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
