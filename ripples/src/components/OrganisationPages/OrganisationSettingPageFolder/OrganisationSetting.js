import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import OrganisationProfile from "./OrganisationProfile";
import Footer from "../SharedComponent/Footer";

export default function OrganisationSetting() {
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
