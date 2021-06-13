import React, { useContext, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { auth, database } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [dbUser, setDBUser] = useState();
  const [loading, setLoading] = useState(true);

  async function getUpdatedDBUser(uid) {
    await database
      .collection("user")
      .doc(uid)
      .get()
      .then((user) => setDBUser(user.data()));
  }

  async function signup(email, password, obj) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      const uid = cred.user.uid;
      database
        .collection("user")
        .doc(uid)
        .set(obj)
        .then(() => getUpdatedDBUser(uid));
    });
  }

  async function login(email, password) {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        getUpdatedDBUser(userCredential.user.uid);
        console.log("logged in", userCredential.user.uid);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.messege);
      });
  }

  function logout() {
    setDBUser();
    console.log(dbUser);
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateAuthEmail(email) {
    return currentUser
      .updateEmail(email)
      .then(() => {
        Alert.alert("Password was changed");
      })
      .catch((error) => {
        Alert.alert(error.messaege);
      });
  }

  function updateDatabaseEmail(email, uid) {
    return database.collection("user").doc(uid).update({ email: email });
  }

  function updateAuthPassword(password) {
    return currentUser
      .updatePassword(password)
      .then(() => {
        Alert.alert("Password was changed");
      })
      .catch((error) => {
        Alert.alert(error.messaege);
      });
  }

  function updateDatabasePassword(password, uid) {
    return database.collection("user").doc(uid).update({ password: password });
  }

  function updateUsername(username, uid) {
    return database.collection("user").doc(uid).update({ username: username });
  }

  function updateFirstName(firstName, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ firstName: firstName });
  }

  function updateLastName(lastName, uid) {
    return database.collection("user").doc(uid).update({ lastName: lastName });
  }

  function updateContact(contact, uid) {
    return database.collection("user").doc(uid).update({ contact: contact });
  }

  function updateDob(dob, uid) {
    return database.collection("user").doc(uid).update({ dob: dob });
  }

  function addEvent(
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    signupDeadline,
    Tags
  ) {
    return database.collection("events").add({
      eventName: eventName,
      eventDescription: eventDescription,
      eventLocation: eventLocation,
      eventDate: eventDate,
      signupDeadline: signupDeadline,
      Tags: Tags,
      organisationName: dbUser.organisationName,
      organisationUID: currentUser.uid,
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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
    addEvent,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
