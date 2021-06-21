import React, { useContext, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { auth, database } from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [dbUser, setDBUser] = useState();
  const [loading, setLoading] = useState(true);

  function getUpdatedDBUser(uid) {
    return database
      .collection("user")
      .doc(uid)
      .get()
      .then((user) => {
        setDBUser(user.data());
      });
    // .then(() => {
    //   console.log("get updated DBUser:", dbUser);
    // });
  }

  function signup(email, password, obj) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      const uid = cred.user.uid;
      obj.uid = uid;
      database
        .collection("user")
        .doc(uid)
        .set(obj)
        .then(() => getUpdatedDBUser(uid));
      console.log("retrieved DBUser:", dbUser);
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password).catch((error) => {
      console.log(error.code);
      console.log(error.messege);
    });
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth
      .sendPasswordResetEmail(email)
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateAuthEmail(email) {
    return currentUser
      .updateEmail(email)
      .then(getUpdatedDBUser(currentUser.uid))
      .then(() => {
        Alert.alert("Password was changed");
      })
      .catch((error) => {
        Alert.alert(error.messaege);
      });
  }

  function updateDatabaseEmail(email, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ email: email })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateAuthPassword(password) {
    return currentUser
      .updatePassword(password)
      .then(() => {
        Alert.alert("Password was changed");
      })
      .then(getUpdatedDBUser(currentUser.uid))
      .catch((error) => {
        Alert.alert(error.messaege);
      });
  }

  function updateDatabasePassword(password, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ password: password })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateUsername(username, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ username: username })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateFirstName(firstName, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ firstName: firstName })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateLastName(lastName, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ lastName: lastName })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateContact(contact, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ contact: contact })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateDob(dob, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ dob: dob })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function addEvent(
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    signupDeadline,
    Tags
  ) {
    const eventUID = uuidv4();
    database
      .collection("user")
      .doc(currentUser.uid)
      .update({
        events: firebase.firestore.FieldValue.arrayUnion(eventUID),
      });

    return database.collection("events").doc(eventUID).set({
      eventName: eventName,
      eventDescription: eventDescription,
      eventLocation: eventLocation,
      eventDate: eventDate,
      signupDeadline: signupDeadline,
      Tags: Tags,
      organisationName: dbUser.organisationName,
      organisationUID: currentUser.uid,
      documentUID: eventUID,
      signedUpVolunteers: [],
      confirmedVolunteers: [],
      cancelledEvent: false,
    });
  }

  //need add request uid to beneficiary's array of request
  function addRequest(
    requestDescription,
    requestLocation,
    requestDate,
    signupDeadline
  ) {
    return database.collection("events").add({
      requestFirstName: dbUser.firstName,
      requestLastName: dbUser.lastName,
      requesterUID: currentUser.uid,
      requestDescription: requestDescription,
      requestLocation: requestLocation,
      requestDate: requestDate,
      signupDeadline: signupDeadline,
    });
  }

  function signupEvent(docUID, userUID) {
    database
      .collection("events")
      .doc(docUID)
      .update({
        signedUpVolunteers: firebase.firestore.FieldValue.arrayUnion(userUID),
      });
  }

  function updateEventName(newEventName, docUID) {
    database.collection("events").doc(docUID).update({
      eventName: newEventName,
    });
  }

  function updateEventDescription(newEventDescription, docUID) {
    database.collection("events").doc(docUID).update({
      eventDescription: newEventDescription,
    });
  }

  function updateEventLocation(newEventLocation, docUID) {
    database.collection("events").doc(docUID).update({
      eventLocation: newEventLocation,
    });
  }

  function updateEventDate(newEventDate, docUID) {
    database.collection("events").doc(docUID).update({
      eventDate: newEventDate,
    });
  }

  function updateSignUpDeadline(newSignupDeadline, docUID) {
    database.collection("events").doc(docUID).update({
      signupDeadline: newSignupDeadline,
    });
  }

  function updateEventTags(newTags, docUID) {
    database.collection("events").doc(docUID).update({
      Tags: newTags,
    });
  }

  function RemoveVolunteerFromSignUp(documentUID, volUID) {
    database
      .collection("events")
      .doc(documentUID)
      .update({
        signedUpVolunteers: firebase.firestore.FieldValue.arrayRemove(volUID),
      });
  }

  function AddVolunteerToConfirmed(documentUID, volUID) {
    database
      .collection("events")
      .doc(documentUID)
      .update({
        confirmedVolunteers: firebase.firestore.FieldValue.arrayUnion(volUID),
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   const data = localStorage.getItem("localUser");
  //   console.log(data);
  //   if (data) {
  //     console.log(data);
  //     setDBUser(JSON.parse(data));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("localUser", JSON.stringify(dbUser));
  // });

  const value = {
    currentUser,
    dbUser,
    login,
    signup,
    logout,
    resetPassword,
    updateAuthEmail,
    updateDatabaseEmail,
    updateAuthPassword,
    updateDatabasePassword,
    updateUsername,
    updateFirstName,
    updateLastName,
    updateContact,
    updateDob,
    updateEventName,
    updateEventDescription,
    updateEventLocation,
    updateEventDate,
    updateSignUpDeadline,
    updateEventTags,
    addEvent,
    addRequest,
    signupEvent,
    getUpdatedDBUser,
    setDBUser,
    setCurrentUser,
    RemoveVolunteerFromSignUp,
    AddVolunteerToConfirmed,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
