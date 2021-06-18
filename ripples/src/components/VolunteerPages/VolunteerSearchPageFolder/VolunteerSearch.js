import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import SearchHeader from "./SearchHeader";
import Footer from "../SharedComponent/Footer";
import DisplayEvents from "./DisplayEvents";

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

const mainFeaturedPost = {
  title: "Search for an Event!",
  // description:
    // "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  // imgText: "main image description",
  // linkText: "Continue reading…",
};

export default function VolunteerSearch() {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <SearchHeader post={mainFeaturedPost} />
        <DisplayEvents />
      </Container>
      <Footer />
    </React.Fragment>
  );
}
