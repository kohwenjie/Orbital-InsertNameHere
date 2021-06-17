import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

function Redirect() {
  const { currentUser, dbUser, getUpdatedDBUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    getUpdatedDBUser(currentUser.uid);
    console.log(dbUser)
    if (dbUser) {
      if (dbUser.userType === "volunteer") {
        history.push("/VolunteerHome");
      } else if (dbUser.userType === "organisation") {
        history.push("/OrganisationHome");
      } else {
        history.push("/BeneficiaryHome");
      }
    }
  });

  return (
    <div>
      <h1>Loading please wait</h1>
    </div>
  );
}

export default Redirect;
