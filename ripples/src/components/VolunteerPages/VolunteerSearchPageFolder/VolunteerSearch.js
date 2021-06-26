import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import SearchHeader from "./SearchHeader";
import Footer from "../SharedComponent/Footer";
import VolDisplayEvents from "./VolDisplayEvents";

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

const mainFeaturedPost = {
  title: "Search for an Event!",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
};

export default function VolunteerSearch() {
  // const classes = useStyles();

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
