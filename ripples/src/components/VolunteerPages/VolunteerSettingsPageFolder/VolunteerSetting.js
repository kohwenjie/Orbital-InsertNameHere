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

export default function VolunteerSetting() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
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
