import React, { useContext, useState, useEffect } from "react";
import { auth, database } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [dbUser, setDBUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, obj) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      const uid = cred.user.uid;
      database.collection("user").doc(uid).set(obj);
      database
        .collection("user")
        .doc(uid)
        .get()
        .then((user) => setDBUser(user.data()));
      return;
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email, uid) {
    database.collection("user").doc(uid).update({ email: email });
    return currentUser.updateEmail(email);
  }

  function updatePassword(password, uid) {
    database.collection("user").doc(uid).update({ password: password });
    return currentUser.updatePassword(password);
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
    updateEmail,
    updatePassword,
    updateUsername,
    updateFirstName,
    updateLastName,
    updateContact,
    updateDob,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
