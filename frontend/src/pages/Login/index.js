import Container from "../../components/Container";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        loginDetails
      );
      console.log(response.data);
      if (response.data != null) {
        alert("Login Sucess!");
        sessionStorage.setItem("name", response.data.name);
        window.location.reload();
      } else {
        alert("Incorrect Credentials!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails((prevState) => ({ ...prevState, [name]: value }));
  };

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
          Login
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={loginDetails.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginDetails.password}
            onChange={handleInputChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
