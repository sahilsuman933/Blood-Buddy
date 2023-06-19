import { useState } from "react";
import axios from "axios";
import Container from "../../components/Container";
import { Navigate } from "react-router-dom";

const BloodRequest = () => {
  const [bloodRequest, setBloodRequest] = useState({
    bloodType: "",
    quantity: "",
    specialRequirements: "",
    urgency: "",
    requestedBy: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/blood-requests",
        bloodRequest
      );
      alert(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBloodRequest((prevState) => ({ ...prevState, [name]: value }));
  };

  if (sessionStorage.getItem("name") == null) {
    alert("Please Sign In");
    return <Navigate to="/login" replace="true" />;
  }

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          width: "600px",
          backgroundColor: "#F9FDF8",
          padding: "100px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "900",
            marginBottom: "25px",
            marginTop: "-75px",
          }}
        >
          Blood Request
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <label htmlFor="blood-type">Select Blood Type:</label>
          <select
            id="blood-type"
            name="bloodType"
            value={bloodRequest.bloodType}
            onChange={handleInputChange}
          >
            <option value="">-- Select blood type --</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <label htmlFor="blood-quantity">Select Blood Quantity:</label>
          <select
            id="blood-quantity"
            name="quantity"
            value={bloodRequest.quantity}
            onChange={handleInputChange}
          >
            <option value="">-- Select blood quantity --</option>
            <option value="1">1 unit</option>
            <option value="2">2 units</option>
            <option value="3">3 units</option>
            <option value="4">4 units</option>
            <option value="5">5 units</option>
          </select>
          <label htmlFor="blood-requirement">Select Special Requirement:</label>
          <select
            id="blood-requirement"
            name="specialRequirements"
            value={bloodRequest.specialRequirements}
            onChange={handleInputChange}
          >
            <option value="">-- Select special requirement --</option>
            <option value="Leukoreduced">Leukoreduced</option>
            <option value="Irradiated">Irradiated</option>
            <option value="Washed">Washed</option>
            <option value="CMV Negative">CMV Negative</option>
            <option value="Other">Other</option>
          </select>

          <label for="blood-urgency">Select Urgency:</label>
          <select
            id="blood-urgency"
            name="urgency"
            value={bloodRequest.urgency}
            onChange={handleInputChange}
          >
            <option value="Routine">Routine</option>
            <option value="Urgent">Urgent</option>
            <option value="Emergency">Emergency</option>
          </select>

          <p>Requested By</p>
          <input
            type="text"
            name="requestedBy"
            value={bloodRequest.requestedBy}
            onChange={handleInputChange}
          />
          <button>Send Blood Request</button>
        </form>
      </div>
    </Container>
  );
};

export default BloodRequest;
