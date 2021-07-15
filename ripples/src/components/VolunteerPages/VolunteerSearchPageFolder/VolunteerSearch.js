import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import SearchHeader from "./SearchHeader";
import Footer from "../SharedComponent/Footer";
import VolDisplayEvents from "./VolDisplayEvents";

const mainFeaturedPost = {
  title: "Search for an Event now!",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/volsearch.jpg?alt=media&token=312d8a79-579d-4f6f-aed1-e661783de523",
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
