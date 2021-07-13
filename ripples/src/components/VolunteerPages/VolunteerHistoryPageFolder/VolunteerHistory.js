import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import HistoryComponent from "./HistoryComponent";

const mainFeaturedPost = {
  title: "View Past Events Here",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Looking%20Back.jpg?alt=media&token=ce9da289-2449-4bd8-a518-92e0dc0be48f",
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
