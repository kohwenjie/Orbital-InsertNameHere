import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import BeneficiaryUpdateProfile from "./BeneficiaryUpdateProfile";
import Footer from "../SharedComponent/Footer";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

export default function BeneficiarySetting() {
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
          <BeneficiaryUpdateProfile />
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
