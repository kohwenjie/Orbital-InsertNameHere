import React from "react";
import SignupDiversion from "./SignupDiversion";
import { Container, Navbar } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
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
import OrganisationHome from "./OrganisationPages/OrganisationHomePageFolder/OrganisationHome";
import OrganisationBeneficiaries from "./OrganisationPages/OrganisationBeneficiariesPageFolder/OrganisationBeneficiaries";
import OrganisationEvents from "./OrganisationPages/OrganisationEventsPageFolder/OrganisationEvents";
import OrganisationHistory from "./OrganisationPages/OrganisationHistoryPageFolder/OrganisationHistory";
import OrganisationSetting from "./OrganisationPages/OrganisationSettingPageFolder/OrganisationSetting";
import BeneficiaryHome from "./BeneficiaryPages/BeneficiaryHomePageFolder/BeneficiaryHome";
import BeneficiaryRequest from "./BeneficiaryPages/BeneficiaryRequestPageFolder/BeneficiaryRequest";
import BeneficiaryHistory from "./BeneficiaryPages/BeneficiaryHistoryPageFolder/BeneficiaryHistory";
import BeneficiaryOrganisations from "./BeneficiaryPages/BeneficiaryOrganisationsPageFolder/BeneficiaryOrganisations";
import BeneficiarySetting from "./BeneficiaryPages/BeneficiarySettingPageFolder/BeneficiarySetting";

function App() {
  // const isVolunteer = true;
  // const isOrganisation = true;

  // const redirectUser = () => {
  //   if (isVolunteer) {
  //     return (
  //       <>
  //         <Redirect to="/VolunteerHome" />
  //       </>
  //     );
  //   } else if (isOrganisation) {
  //     return (
  //       <>
  //         <Redirect to="/OrganisationHome" />
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <Redirect to="/OrganisationHome" />
  //       </>
  //     );
  //   }
  // };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ minWidth: "false" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/">
                <Redirect to="/BeneficiaryHome" />
              </PrivateRoute>
              <PrivateRoute
                exact
                path="/VolunteerHome"
                component={VolunteerHome}
              />

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
                path="/VolunteerSetting"
                component={VolunteerSetting}
              />
              <PrivateRoute
                path="/OrganisationHome"
                component={OrganisationHome}
              />
              <PrivateRoute
                path="/OrganisationEvents"
                component={OrganisationEvents}
              />
              <PrivateRoute
                path="/OrganisationBeneficiaries"
                component={OrganisationBeneficiaries}
              />
              <PrivateRoute
                path="/OrganisationHistory"
                component={OrganisationHistory}
              />
              <PrivateRoute
                path="/OrganisationSetting"
                component={OrganisationSetting}
              />
              <PrivateRoute
                path="/BeneficiaryHome"
                component={BeneficiaryHome}
              />
              <PrivateRoute
                path="/BeneficiaryRequest"
                component={BeneficiaryRequest}
              />
              <PrivateRoute
                path="/BeneficiaryHistory"
                component={BeneficiaryHistory}
              />
              <PrivateRoute
                path="/BeneficiaryOrganisations"
                component={BeneficiaryOrganisations}
              />
              <PrivateRoute
                path="/BeneficiarySetting"
                component={BeneficiarySetting}
              />

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
