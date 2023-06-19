import React, { useEffect, useState } from "react";
import "./style.css";
import Container from "../../components/Container";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ActiveRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/blood-requests");
      const data = await response.json();
      setRequests(data);
    };
    fetchData();
  }, []);
  if (sessionStorage.getItem("name") == null) {
    alert("Please Sign In");
    return <Navigate to="/login" replace="true" />;
  }
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hospital</th>
            <th>Blood Type</th>
            <th>Quantity</th>
            <th>Urgency</th>
            <th>Status</th>
            <th>Monitor Temperature</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, id) => (
            <tr key={request._id}>
              <td>{id + 1}</td>
              <td>{request.requestedBy}</td>
              <td>{request.bloodType}</td>
              <td>{request.quantity}</td>
              <td>{request.urgency}</td>
              <td>{request.status}</td>
              {request.status === "In Progress" ? (
                <td>
                  <Link
                    to="/blood-temperature"
                    style={{
                      color: "white",
                      background: "#ff6b6b",
                      padding: "5px",
                    }}
                  >
                    View
                  </Link>
                </td>
              ) : (
                <td>-</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ActiveRequests;
