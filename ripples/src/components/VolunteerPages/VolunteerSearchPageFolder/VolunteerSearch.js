import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import SearchHeader from "./SearchHeader";
import Footer from "../SharedComponent/Footer";
import VolDisplayEvents from "./VolDisplayEvents";

const mainFeaturedPost = {
  title: "Search for an Event!",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
};

export default function VolunteerSearch() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <SearchHeader post={mainFeaturedPost} />
        <VolDisplayEvents />
      </Container>
      <Footer />
    </React.Fragment>
  );
}
