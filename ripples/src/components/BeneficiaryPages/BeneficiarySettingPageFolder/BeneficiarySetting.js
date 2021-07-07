import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import BeneficiaryProfile from "./BeneficiaryProfile";
import Footer from "../SharedComponent/Footer";
// }));

export default function BeneficiarySetting() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <BeneficiaryProfile />
        </main>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
