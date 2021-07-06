import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import OrganisationProfile from "./OrganisationProfile";
import Footer from "../SharedComponent/Footer";

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

export default function OrganisationSetting() {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <div>
          <br />
        </div>
        <main>
          <OrganisationProfile />
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
