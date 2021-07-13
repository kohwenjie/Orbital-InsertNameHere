import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import { useAuth } from "../../../contexts/AuthContext";

const mainFeaturedPost = {
  title: "Welcome to Ripples for Organisations!",
  description:
    "We hope that our services available will be able to aid you in helping the community.",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Ripples%20Business%20Card.png?alt=media&token=548fd0e4-b9f9-44fc-b4c6-b62f84bfb938",
  imgText: "main image description",
};

export default function OrganisationHome() {
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
