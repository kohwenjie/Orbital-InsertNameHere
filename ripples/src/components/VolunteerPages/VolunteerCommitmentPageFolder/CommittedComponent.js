import React from "react";
import { Table } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";

export default function CommittedComponent() {
  const { dbUser } = useAuth();
  const eventArray = dbUser.commitments;
  return (
    <>
      <div>
        <h2>COMMITMENT PORTION</h2>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {eventArray &&
            eventArray.map((event) => {
              return (
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
