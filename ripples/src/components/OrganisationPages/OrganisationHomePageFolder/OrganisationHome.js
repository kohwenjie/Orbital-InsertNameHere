import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import { useAuth } from "../../../contexts/AuthContext";

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

const mainFeaturedPost = {
  title: "Welcome to Ripples for Organisations!",
  description:
    "We hope that our services available will be able to aid you in helping the community.",
  image: "https://source.unsplash.com/1600x900/?volunteer,volunteerism",
  imgText: "main image description",

};

export default function OrganisationHome() {
  // const classes = useStyles();

  const { dbUser } = useAuth();
  console.log(dbUser);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
