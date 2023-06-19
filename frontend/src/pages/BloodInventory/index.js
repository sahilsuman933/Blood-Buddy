import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import { Navigate } from "react-router-dom";

const BloodInventory = () => {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/api/blood-inventory");
      const data = await response.json();
      setInventoryData(data);
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
            <th>Blood Type</th>
            <th>Units Available</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map(({ _id, bloodType, unitsAvailable }) => (
            <tr key={_id}>
              <td>{bloodType}</td>
              <td>{unitsAvailable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default BloodInventory;
