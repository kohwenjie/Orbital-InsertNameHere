import React, { useContext, useState, useEffect } from "react";
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
      .then(getUpdatedDBUser(currentUser.uid));
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
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateDatabasePassword(password, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ password: password })
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

  function updateDescription(description, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ dscription: description })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateCertification(certification, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ certification: certification })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function updateAddress(address, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ address: address })
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
  function updateProfileFileUrl(fileUrl, uid) {
    return database
      .collection("user")
      .doc(uid)
      .update({ fileUrl: fileUrl })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function addEvent(
    eventName,
    eventDescription,
    eventLocation,
    eventDate,
    signupDeadline,
    tags,
    fileUrl
  ) {
    const eventUID = uuidv4();
    database
      .collection("user")
      .doc(currentUser.uid)
      .update({
        events: firebase.firestore.FieldValue.arrayUnion(eventUID),
      });

    return database
      .collection("events")
      .doc(eventUID)
      .set({
        eventName: eventName,
        eventDescription: eventDescription,
        eventLocation: eventLocation,
        eventDate: eventDate,
        signupDeadline: signupDeadline,
        tags: tags,
        name: dbUser.name,
        organisationUID: currentUser.uid,
        documentUID: eventUID,
        signedUpVolunteers: [],
        confirmedVolunteers: [],
        rejectedVolunteers: [],
        cancelledEvent: false,
        fileUrl: fileUrl,
        enquiries: [],
        updates: [],
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function sendEnquiry(
    eventUID,
    volUID,
    orgUID,
    volFirstName,
    volLastName,
    message
  ) {
    const enquiryUID = uuidv4();

    database
      .collection("events")
      .doc(eventUID)
      .update({
        enquiries: firebase.firestore.FieldValue.arrayUnion(enquiryUID),
      });

    database
      .collection("enquiries")
      .doc(enquiryUID)
      .set({
        eventUID: eventUID,
        volunteerUID: volUID,
        organisationUID: orgUID,
        volFirstName: volFirstName,
        volLastName: volLastName,
        message: message,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  function addRequest(
    requestDescription,
    requestLocation,
    requestDate,
    signupDeadline,
    tags,
    orgUID
  ) {
    const requestUID = uuidv4();

    database
      .collection("user")
      .doc(orgUID)
      .update({
        beneficiariesPendingRequest:
          firebase.firestore.FieldValue.arrayUnion(requestUID),
      });

    database
      .collection("user")
      .doc(dbUser.uid)
      .update({
        pendingRequests: firebase.firestore.FieldValue.arrayUnion(requestUID),
      });

    return database
      .collection("requests")
      .doc(requestUID)
      .set({
        requesterFirstName: dbUser.firstName,
        requesterLastName: dbUser.lastName,
        requesterUID: currentUser.uid,
        requestDescription: requestDescription,
        requestLocation: requestLocation,
        requestDate: requestDate,
        signupDeadline: signupDeadline,
        requestUID: requestUID,
        organisationUID: orgUID,
        tags: tags,
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function signupEvent(docUID, userUID) {
    database
      .collection("events")
      .doc(docUID)
      .update({
        signedUpVolunteers: firebase.firestore.FieldValue.arrayUnion(userUID),
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function requestOrgLink(orgUID, benUID) {
    database
      .collection("user")
      .doc(orgUID)
      .update({
        requestingBeneficiaries:
          firebase.firestore.FieldValue.arrayUnion(benUID),
      });
  }

  function updateFileUrl(fileUrl, docUID) {
    database.collection("events").doc(docUID).update({
      fileUrl: fileUrl,
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

  function updateEventSignUpDeadline(newSignupDeadline, docUID) {
    database.collection("events").doc(docUID).update({
      signupDeadline: newSignupDeadline,
    });
  }

  function updateEventTags(newTags, docUID) {
    database.collection("events").doc(docUID).update({
      tags: newTags,
    });
  }

  function updateRequestDescription(newRequestDescription, docUID) {
    database.collection("requests").doc(docUID).update({
      requestDescription: newRequestDescription,
    });
  }

  function updateRequestDate(newRequestDate, docUID) {
    database.collection("requests").doc(docUID).update({
      requestDate: newRequestDate,
    });
  }

  function updateRequestLocation(newRequestLocation, docUID) {
    database.collection("requests").doc(docUID).update({
      requestLocation: newRequestLocation,
    });
  }

  function updateRequestSignUpDeadline(newRequestSignupDeadline, docUID) {
    database.collection("requests").doc(docUID).update({
      signupDeadline: newRequestSignupDeadline,
    });
  }

  function updateRequestTags(newTags, docUID) {
    database.collection("requests").doc(docUID).update({
      tags: newTags,
    });
  }

  function updateUpdates(update, docUID) {
    database
      .collection("events")
      .doc(docUID)
      .update({
        updates: firebase.firestore.FieldValue.arrayUnion(update),
      });
  }

  function AddEventToHistory(documentUID, volUID) {
    database
      .collection("user")
      .doc(volUID)
      .update({
        history: firebase.firestore.FieldValue.arrayUnion(documentUID),
      })
      .then(getUpdatedDBUser());
  }

  function RemoveEventFromCommitments(documentUID, volUID) {
    database
      .collection("user")
      .doc(volUID)
      .update({
        commitments: firebase.firestore.FieldValue.arrayRemove(documentUID),
      })
      .then(getUpdatedDBUser());
  }

  function RemoveVolunteerFromSignUp(documentUID, volUID) {
    database
      .collection("events")
      .doc(documentUID)
      .update({
        signedUpVolunteers: firebase.firestore.FieldValue.arrayRemove(volUID),
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function AddVolunteerToConfirmed(documentUID, volUID) {
    database
      .collection("events")
      .doc(documentUID)
      .update({
        confirmedVolunteers: firebase.firestore.FieldValue.arrayUnion(volUID),
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function RemoveBeneficiaryFromRequesting(orgUID, benUID) {
    database
      .collection("user")
      .doc(orgUID)
      .update({
        requestingBeneficiaries:
          firebase.firestore.FieldValue.arrayRemove(benUID),
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function AddBeneficiaryRequestToOrganisationEvent(orgUID, request) {
    database
      .collection("user")
      .doc(orgUID)
      .update({
        events: firebase.firestore.FieldValue.arrayUnion(request.requestUID),
      })
      .then(getUpdatedDBUser(currentUser.uid));

    const newTags = request.tags;
    newTags.push("Beneficiary Request");

    database
      .collection("events")
      .doc(request.requestUID)
      .set({
        eventName:
          request.requesterFirstName +
          " " +
          request.requesterLastName +
          "'s Request",
        eventDescription: request.requestDescription,
        eventLocation: request.requestLocation,
        eventDate: request.requestDate,
        signupDeadline: request.signupDeadline,
        tags: newTags,
        name: dbUser.name,
        organisationUID: currentUser.uid,
        documentUID: request.requestUID,
        signedUpVolunteers: [],
        confirmedVolunteers: [],
        rejectedVolunteers: [],
        cancelledEvent: false,
        enquiries: [],
      });
  }

  function RemoveBeneficiaryRequestFromOrganisationPending(orgUID, requestUID) {
    database
      .collection("user")
      .doc(orgUID)
      .update({
        beneficiariesPendingRequest:
          firebase.firestore.FieldValue.arrayRemove(requestUID),
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function AddBeneficiaryRequestToBenficiaryConfirmed(benUID, requestUID) {
    database
      .collection("user")
      .doc(benUID)
      .update({
        confirmedRequests: firebase.firestore.FieldValue.arrayUnion(requestUID),
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function RemoveBeneficiaryRequestFromBeneficiaryPending(benUID, requestUID) {
    database
      .collection("user")
      .doc(benUID)
      .update({
        pendingRequests: firebase.firestore.FieldValue.arrayRemove(requestUID),
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function AddBeneficiaryToBenficiaries(orgUID, benUID) {
    database
      .collection("user")
      .doc(orgUID)
      .update({
        beneficiaries: firebase.firestore.FieldValue.arrayUnion(benUID),
      })
      .then(getUpdatedDBUser(currentUser.uid));
  }

  function AddOrganisationToBeneficiary(benUID, orgUID) {
    database
      .collection("user")
      .doc(benUID)
      .update({
        linkedOrganisation: firebase.firestore.FieldValue.arrayUnion(orgUID),
      });
  }

  function parseTags(tags) {
    let string = tags[0];
    tags.forEach((tag) => {
      if (tag !== tags[0]) {
        string = string + ", " + tag;
      }
    });
    return string;
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
    updateFirstName,
    updateLastName,
    updateDescription,
    updateCertification,
    updateAddress,
    updateContact,
    updateDob,
    updateEventName,
    updateEventDescription,
    updateEventLocation,
    updateEventDate,
    updateEventSignUpDeadline,
    updateEventTags,
    updateFileUrl,
    updateProfileFileUrl,
    updateRequestDescription,
    updateRequestDate,
    updateRequestLocation,
    updateRequestSignUpDeadline,
    updateRequestTags,
    updateUpdates,
    addEvent,
    addRequest,
    requestOrgLink,
    signupEvent,
    sendEnquiry,
    getUpdatedDBUser,
    setDBUser,
    setCurrentUser,
    RemoveVolunteerFromSignUp,
    AddVolunteerToConfirmed,
    RemoveBeneficiaryFromRequesting,
    AddBeneficiaryToBenficiaries,
    AddOrganisationToBeneficiary,
    AddEventToHistory,
    RemoveEventFromCommitments,
    AddBeneficiaryRequestToOrganisationEvent,
    RemoveBeneficiaryRequestFromOrganisationPending,
    AddBeneficiaryRequestToBenficiaryConfirmed,
    RemoveBeneficiaryRequestFromBeneficiaryPending,
    parseTags,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
