import React from "react";
import SignupDiversion from "./SignupDiversion";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import VolunteerDashboard from "./VolunteerDashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import VolunteerSignup from "./VolunteerSignup";
import BeneficiarySignup from "./BeneficiarySignup";
import OrganisationSignup from "./OrganisationSignup";
import VolunteerHome from "./VolunteerHomePageFolder/VolunteerHome";
// import BeneficiaryHome from "./BeneficiaryHomePageFolder/BeneficiaryHome";
// import OrganisationHome from "./OrganisationHomePageFolder/OrganisationHome";
import VolunteerUpdateProfile from "./VolunteerUpdateProfile";
import BeneficiaryUpdateProfile from "./BeneficiaryUpdateProfile";
import OrganisationUpdateProfile from "./OrganisationUpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={VolunteerHome} />
              {/* <PrivateRoute path="/VolunteerHome" component={VolunteerHome} />
              <PrivateRoute
                path="/BeneficiaryHome"
                component={BeneficiaryHome}
              />
              <PrivateRoute
                path="/OrganisationHome"
                component={OrganisationHome}
              /> */}
              <PrivateRoute
                path="/VolunteerUpdateProfile"
                component={VolunteerUpdateProfile}
              />
              <PrivateRoute
                path="/BeneficiaryUpdateProfile"
                component={BeneficiaryUpdateProfile}
              />
              <PrivateRoute
                path="/OrganisationUpdateProfile"
                component={OrganisationUpdateProfile}
              />
              <Route path="/signupDiversion" component={SignupDiversion} />
              <Route path="/volunteerSignup" component={VolunteerSignup} />
              <Route path="/beneficiarySignup" component={BeneficiarySignup} />
              <Route
                path="/organisationSignUp"
                component={OrganisationSignup}
              />
              <Route path="/login" component={Login} />
              <Route path="/forgotPassword" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
