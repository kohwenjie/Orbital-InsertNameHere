import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import HistoryComponent from "./HistoryComponent";

const mainFeaturedPost = {
  title: "View Past Events Here",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
};

export default function VolunteerHistory() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
        <HistoryComponent />
      </Container>
      <Footer />
    </React.Fragment>
  );
}
