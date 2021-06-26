import { database } from "../../../firebase";
import React, { useState, useEffect } from "react";
import { Card, CardDeck } from "react-bootstrap";
import BenDisplayFullOrg from "./BenDisplayFullOrg";

export default function BenDisplayOrg() {
  const [organisations, setOrganisations] = useState([]);
  const [identity, setIdentity] = useState();

  const fetchOrganisations = async () => {
    let arr = [];
    database
      .collection("user")
      .where("userType", "==", "organisation")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // setIdentity will cause rendering, which is required or nothing will show
          arr.push(doc.data());
          setIdentity(doc.id);
        });
      })
      .then(setOrganisations(arr));
  };

  useEffect(() => {
    fetchOrganisations();
  }, []);

  return (
    <CardDeck
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
      key="1"
    >
      {organisations &&
        organisations.map((organisation) => {
          const { name, description, address } = organisation;
          return (
            <>
              <Card
                style={{
                  minWidth: "17rem",
                  maxWidth: "17rem",
                  // maxHeight: "23rem",
                  flex: 1,
                  boxSizing: "border-box",
                }}
                className="box m-4"
                key={identity}
              >
                <Card.Img
                  variant="top"
                  src="https://source.unsplash.com/cAtzHUz7Z8g/1600x900"
                  // will add image into the event document in firestore then extract to display
                />
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {description}
                  </Card.Subtitle>
                  <Card.Text>Address:{address}</Card.Text>
                  <BenDisplayFullOrg o={organisation} />
                </Card.Body>
              </Card>
            </>
          );
        })}
      {organisations.length === 0 && (
        <div style={{ textAlign: "center", margin: "8rem" }}>
          <h2>There are no Organisations to display</h2>
          <br></br>
        </div>
      )}
    </CardDeck>
  );
}
