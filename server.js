const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./config/dotenv.env" });

const app = express();

// --- Middleware ---
app.use(cors()); // Allows your Angular app to talk to this API
app.use(express.json()); // Allows the server to read JSON in request bodies

// --- MongoDB Connection ---
// Replace the URL with your local or Atlas connection string
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/voyageDB";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection error:", err));

// --- Basic Route ---
app.get("/", (req, res) => {
  res.send("Voyage API is running...");
});

// --- Server Startup ---
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
