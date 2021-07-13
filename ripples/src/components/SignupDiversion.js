import React from "react";
import { Link } from "react-router-dom";
import { ButtonGroup, Button } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

export default function SignupDiversion() {
  return (
    <>
      <h2>I am a:</h2>
      <ButtonGroup>
        <Link
          to="/volunteerSignUp"
          className="btn btn-primary btn-lg w-100 m-4"
        >
          Volunteer
        </Link>
        <Link
          to="/beneficiarySignUp"
          className="btn btn-primary btn-lg w-100 m-4"
        >
          Beneficiary
        </Link>
        <Link
          to="/organisationSignUp"
          className="btn btn-primary btn-lg w-100 m-4"
        >
          Organisation
        </Link>
      </ButtonGroup>
    </>
  );
}
