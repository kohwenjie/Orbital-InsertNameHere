import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Card, CardGroup } from "react-bootstrap";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import { useAuth } from "../../../contexts/AuthContext";
import { database } from "../../../firebase";

const mainFeaturedPost = {
  title: "Welcome to Ripples for Volunteers!",
  description:
    "We hope to be able to help volunteers in making volunteering a much more convenient and meaningful experience!",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/Ripples%20Business%20Card.png?alt=media&token=548fd0e4-b9f9-44fc-b4c6-b62f84bfb938",
  imgText: "main image description",
};

export default function VolunteerHome() {
  const { dbUser } = useAuth();
  const { commitments } = dbUser;
  const [quote, setQuote] = useState({ author: "", text: "" });
  const numEvents = commitments.length;

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(async function (data) {
        const q = data[Math.floor(100 * Math.random())];
        setQuote(q);
      });
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
      </Container>
      <CardGroup>
        <Card>
          <Card.Body>
            <Card.Text class="text-center fs-5">
              <blockquote class="blockquote text-center">
                <p class="mb-0"> Number of Upcoming Events: </p>
                <br></br>
                <footer>
                  <h3>{numEvents}</h3>
                </footer>
              </blockquote>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Text class="text-center fs-5">Inspirational Quote</Card.Text>

            <blockquote class="blockquote text-center">
              <p class="mb-0">{quote.text}</p>
              <footer class="blockquote-footer">
                <cite title="Source Title">{quote.author || "unknown"}</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      </CardGroup>
      <Footer />
    </React.Fragment>
  );
}
