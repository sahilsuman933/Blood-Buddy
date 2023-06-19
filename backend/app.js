const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Get Blood Temperature
app.get("/data/temperature", (req, res) => {
  const url = "http://192.168.1.185/cm";
  const querystring = { cmnd: "status 10" };

  fetch(url + "?" + new URLSearchParams(querystring), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

// Start server and Connect to MongoDB

app.listen(port, async () => {
  await mongoose
    .connect(
      "mongodb+srv://sahilsuman933:kingmonty@bloodbuddy.cvfq5kg.mongodb.net/bloodbuddy?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      mongoose.connection.useDb("BloodBuddy");
      console.log("MongoDB connected...");
    })
    .catch((err) => console.log(err));

  console.log(`Server started on port ${port}`);
});

// Define BloodRequest schema and model
const BloodRequestSchema = new mongoose.Schema({
  bloodType: String,
  quantity: Number,
  specialRequirements: String,
  urgency: String,
  requestedBy: String,
  requestedAt: Date,
  status: String,
});

const BloodRequest = mongoose.model("BloodRequest", BloodRequestSchema);

// Get all blood requests
app.get("/api/blood-requests", async (req, res) => {
  const data = await BloodRequest.find();
  res.json(data);
});

// Create new blood request
app.post("/api/blood-requests", async (req, res) => {
  const { bloodType, quantity, specialRequirements, urgency, requestedBy } =
    req.body;

  const newRequest = new BloodRequest({
    bloodType,
    quantity,
    specialRequirements,
    urgency,
    requestedBy,
    requestedAt: new Date(),
    status: "In Progress",
  });

  await newRequest.save();
  res.send("Successfully Added!");
});

// Blood Inventory

const BloodInventorySchema = new mongoose.Schema({
  bloodType: String,
  quantity: Number,
});

const BloodInventory = mongoose.model("BloodInventory", BloodInventorySchema);

app.get("/api/blood-inventory", async (req, res) => {
  try {
    const bloodInventory = await BloodInventory.find();
    res.json(bloodInventory);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Authentication

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const user = mongoose.model("users", userSchema);

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const query = user.where({ email, password });
  const isValid = await query.findOne();

  return res.json(isValid);
});
