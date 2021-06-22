import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "./MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import OrgDisplayEvents from "./OrgDisplayEvents";

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

const mainFeaturedPost = {
  title: "View or Create New Events Here!",
  image: "https://source.unsplash.com/random",
};

export default function OrganisationEvents() {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
        <OrgDisplayEvents />
      </Container>
      <Footer />
    </React.Fragment>
  );
}
