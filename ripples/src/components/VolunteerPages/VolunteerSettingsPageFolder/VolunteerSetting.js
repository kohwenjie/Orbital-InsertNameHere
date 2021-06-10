import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import VolunteerUpdateProfile from "./VolunteerUpdateProfile";
import Footer from "../SharedComponent/Footer";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const sections = [
  { title: "Home", url: "/" },
  { title: "Search", url: "/VolunteerSearch" },
  { title: "Commitments", url: "/VolunteerCommitment" },
  { title: "History", url: "/VolunteerHistory" },
  { title: "Settings", url: "/VolunteerUpdateProfile" },
];

export default function VolunteerHome() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Ripples" sections={sections} />
        <div>
          <br />
        </div>
        <main>
          <VolunteerUpdateProfile />
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
