import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Header from "../SharedComponent/Header";
import MainFeaturedPost from "../SharedComponent/MainFeaturedPost";
import Footer from "../SharedComponent/Footer";
import { useAuth } from "../../../contexts/AuthContext"
import firebase from "../../../firebase"
import { useState, useEffect } from "react"

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: "THIS IS A VOLUNTEER HOMEPAGE",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

export default function VolunteerHome() {
  // const {currentUser } = useAuth()
  // console.log(currentUser.uid)

  // const ref = firebase.firestore().collection("user");
  // const [users, setUsers] = useState([])
  //  function getUsers() {
  //   ref.onSnapshot((querySnapshot) => {
  //     const items = [];
  //     querySnapshot.forEach((doc) => {
  //       items.push(doc.data());
  //     });
  //     setUsers(items);
  //   })
  // }

  // useEffect(() => {
  //   getUsers();
  // }, []);



  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
        {/* <div>
          {users.map((user) => {
            console.log(user);
            return <h2>{user.q}</h2>;
          })}
        </div> */}
      </Container>
      <Footer/>
    </React.Fragment>
  );
}
