import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import SearchHeader from "./SearchHeader";
import Footer from "../SharedComponent/Footer";
import VolDisplayEvents from "./VolDisplayEvents";

const mainFeaturedPost = {
  title: "Search for an Event!",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Search.jpg?alt=media&token=01ade070-db0a-4566-bf55-9acfe4c66d0c",
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
