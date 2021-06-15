import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import { Card, Button } from "react-bootstrap";
import DisplayEvents from "./DisplayEvents";

// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

const mainFeaturedPost = {
  title: "THIS IS A VOLUNTEER SEARCH PAGE",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

// const eventsDisplay = document.querySelector("#display-events");

// function renderEvent(doc) {
//   let li = document.createElement("li");
//   let eventName = document.createElement("span");
//   let eventDescription = document.createElement("span");

//   li.setAttribute("data-id", doc.id);
//   eventName.textContent = doc.data().eventName;
//   eventDescription.textContent = doc.data().eventDescription;

//   li.appendChild(eventName);
//   li.appendChild(eventDescription);

//   console.log(eventsDisplay);
//   eventsDisplay.appendChild(li);
// }

export default function VolunteerSearch() {
  // const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <Card
          style={{ width: "" }}
          
        >
          <DisplayEvents />
          {/* <Card.Body>
            <Card.Title>This is the search tool function</Card.Title>
            <Card.Subtitle>This is the subtitle of the card</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            
            <Button variant="primary">Go somewhere</Button>
          </Card.Body> */}
        </Card>
      </Container>
      <Footer />
    </React.Fragment>
  );
}
