const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./config/dotenv.env" });

const app = express();

// --- Middleware ---
app.use(cors()); // Allows your Angular app to talk to this API
app.use(express.json({ limit: '10mb' })); // Increased for Base64 images
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- MongoDB Connection ---
// Replace the URL with your local or Atlas connection string
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/voyageDB";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection error:", err));

// --- Import routes ---
const destinationRoutes = require("./routes/destinations");
const voyageRoutes = require("./routes/voyages");
const errorHandler = require("./middleware/errorHandler");

// --- API Routes ---
app.get("/", (req, res) => {
  res.json({
    message: "Voyage API is running...",
    endpoints: {
      destinations: "/api/destinations",
      voyages: "/api/voyages",
    },
  });
});

// Mount routes
app.use("/api/destinations", destinationRoutes);
app.use("/api/voyages", voyageRoutes);

// Error handler middleware (must be last)
app.use(errorHandler);

// --- Server Startup ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
