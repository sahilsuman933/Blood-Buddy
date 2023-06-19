import Home from "../../assets/home.svg";
import ActiveRequest from "../../assets/active-request.svg";
import BloodInventory from "../../assets/blood-inventory.svg";
import BloodNavbar from "../../assets/blood-navbar.svg";
import DeliveryStatus from "../../assets/delivery-status.svg";
import Login from "../../assets/login.svg";
import Logout from "../../assets/logout.svg";
import User from "../../assets/user.svg";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <div className="icon-container-navbar title">
          <img src={BloodNavbar} alt="blood logo" />
          <p style={{ textAlign: "center" }}>BloodBuddy</p>
        </div>
        <div className="navbar-items">
          <ul>
            <li>
              <Link to="/">
                <div className="icon-container-navbar">
                  <img src={Home} alt="home" />
                  <p>Home</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/blood-request">
                <div className="icon-container-navbar">
                  <img src={BloodNavbar} alt="blood icon" />
                  <p>Blood Request</p>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/active-requests">
                <div className="icon-container-navbar">
                  <img src={ActiveRequest} alt="icon" />
                  <p>Active Request</p>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/blood-inventory">
                <div className="icon-container-navbar">
                  <img src={BloodInventory} alt="icon" />
                  <p>Blood Inventory</p>
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="auth">
          {sessionStorage.getItem("name") === null ? (
            <ul>
              <li>
                <Link to="/login">
                  <div className="icon-container-navbar">
                    <img src={Login} alt="icon" />
                    <p>Login</p>
                  </div>
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <div className="icon-container-navbar">
                  <img src={User} alt="icon" />
                  <p>{sessionStorage.getItem("name")}</p>
                </div>
              </li>
              <li>
                <div
                  className="icon-container-navbar"
                  style={{ cursor: "pointer" }}
                >
                  <img src={Logout} alt="icon" />
                  <p
                    onClick={() => {
                      sessionStorage.removeItem("name");
                      alert("Sucessfully Logged Out!");
                      window.location.reload();
                    }}
                  >
                    Logout
                  </p>
                </div>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
