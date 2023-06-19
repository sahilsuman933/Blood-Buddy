import Dashboard from "./pages/Dashboard";
import BloodRequest from "./pages/BloodRequest";
import BloodInventory from "./pages/BloodInventory";
import ActiveRequests from "./pages/ActiveRequest/ActiveRequest";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Temperature from "./pages/Temperature";

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/blood-request" element={<BloodRequest />} />
        <Route exact path="/blood-temperature" element={<Temperature />} />
        <Route exact path="/blood-inventory" element={<BloodInventory />} />
        <Route exact path="/active-requests" element={<ActiveRequests />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
