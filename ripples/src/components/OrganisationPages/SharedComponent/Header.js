import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const sections = [
  { title: "Home", url: "/OrganisationHome" },
  { title: "Events", url: "/OrganisationEvents" },
  { title: "Beneficiaries", url: "/OrganisationBeneficiaries" },
  { title: "History", url: "/OrganisationHistory" },
  { title: "Settings", url: "/OrganisationSetting" },
];

const title="Ripples"

export default function Header(props) {
  const classes = useStyles();
  const [error, setError] = useState();
  const { dbUser, logout, setDBUser, setCurrentUser, currentUser } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/Login");
      setDBUser();
      setCurrentUser();
      console.log("logged out: ", dbUser, currentUser);
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        {/* WE ARE GOING TO MAKE THIS BUTTON BELOW LINK TO THE PROFILE PAGE AND THE SAME FOR BENE AND ORG*/}
        <Button size="small">
          <b>{dbUser.organisationName}</b>
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Button variant="outlined" size="small" onClick={handleLogout}>
          Log Out
        </Button>
        {error && <Alert variant="danger">{error}</Alert>}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            to={section.url}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};
