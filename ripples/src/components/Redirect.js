import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function Redirect() {
  const { currentUser, dbUser, getUpdatedDBUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      getUpdatedDBUser(currentUser.uid);
      if (dbUser) {
        if (dbUser.userType === "volunteer") {
          history.push("/VolunteerHome");
        } else if (dbUser.userType === "organisation") {
          history.push("/OrganisationHome");
        } else {
          history.push("/BeneficiaryHome");
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <Spinner animation="grow" variant="info" />
      <h1>Loading please wait</h1>
    </div>
  );
}

export default Redirect;
