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

  //over here mingyong
  function getUpdatedDBUser(uid) {
    return database
      .collection("user")
      .doc(uid)
      .get()
      .then((user) => setDBUser(user.data()));
  }

  function signup(email, password, obj) {
    return auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      const uid = cred.user.uid;
      database.collection("user").doc(uid).set(obj);
      getUpdatedDBUser(uid);
    });
  }

  function login(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user.uid);
        getUpdatedDBUser(userCredential.user.uid);
        console.log(dbUser);
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.messaege);
      });
  }

  function logout() {
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
