import React from "react";
import SignupDiversion from "./SignupDiversion";
import { Container, Navbar } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import VolunteerSignup from "./VolunteerSignup";
import BeneficiarySignup from "./BeneficiarySignup";
import OrganisationSignup from "./OrganisationSignup";
import VolunteerHome from "./VolunteerPages/VolunteerHomePageFolder/VolunteerHome";
import VolunteerSearch from "./VolunteerPages/VolunteerSearchPageFolder/VolunteerSearch";
import VolunteerCommitment from "./VolunteerPages/VolunteerCommitmentPageFolder/VolunteerCommitment";
import VolunteerHistory from "./VolunteerPages/VolunteerHistoryPageFolder/VolunteerHistory";
import VolunteerSetting from "./VolunteerPages/VolunteerSettingsPageFolder/VolunteerSetting";
// import BeneficiaryHome from "./BeneficiaryHomePageFolder/BeneficiaryHome";
// import OrganisationHome from "./OrganisationHomePageFolder/OrganisationHome";

// import BeneficiaryUpdateProfile from "./BeneficiaryUpdateProfile";
// import OrganisationUpdateProfile from "./OrganisationUpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ minWidth: "false" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={VolunteerHome} />
              {/* <PrivateRoute
                path="/BeneficiaryHome"
                component={BeneficiaryHome}
              />
              <PrivateRoute
                path="/OrganisationHome"
                component={OrganisationHome}
              /> */}
              <PrivateRoute
                path="/VolunteerSearch"
                component={VolunteerSearch}
              />
              <PrivateRoute
                path="/VolunteerCommitment"
                component={VolunteerCommitment}
              />
              <PrivateRoute
                path="/VolunteerHistory"
                component={VolunteerHistory}
              />
              <PrivateRoute
                path="/VolunteerUpdateProfile"
                component={VolunteerSetting}
              />
              {/* <PrivateRoute
                path="/BeneficiaryUpdateProfile"
                component={BeneficiaryUpdateProfile}
              />
              <PrivateRoute
                path="/OrganisationUpdateProfile"
                component={OrganisationUpdateProfile}
              /> */}
              <Route path="/login" component={Login} />
              <Route path="/forgotPassword" component={ForgotPassword} />
              <Route path="/signupDiversion" component={SignupDiversion} />
              <Route path="/volunteerSignup" component={VolunteerSignup} />
              <Route path="/beneficiarySignup" component={BeneficiarySignup} />
              <Route
                path="/organisationSignUp"
                component={OrganisationSignup}
              />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
