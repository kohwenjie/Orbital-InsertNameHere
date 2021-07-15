import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { Card, CardGroup } from "react-bootstrap";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import { useAuth } from "../../../contexts/AuthContext";

const mainFeaturedPost = {
  title: "Welcome to Ripples for Volunteers!",
  description:
    "We hope to be able to help volunteers in making volunteering a much more convenient and meaningful experience!",
  image:
    "https://firebasestorage.googleapis.com/v0/b/orbital-insertnamehere.appspot.com/o/home.jpg?alt=media&token=316fbce5-3840-4303-a600-4161fcb46f43",
  imgText: "main image description",
};

export default function VolunteerHome() {
  const { dbUser } = useAuth();
  const [quote, setQuote] = useState({ author: "", text: "" });

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
            <Card.Title class="text-center fs-5 mb-3">
              Number of Upcoming Events:
            </Card.Title>
            <Card.Text class="text-center fs-5">
              <h3>{dbUser.commitments.length}</h3>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Text class="text-center fs-5">
              <p class="mb-0">
                <h4>Inspirational Quote</h4>
              </p>
            </Card.Text>

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
