const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/projects", require("./routes/projectRoutes"));
app.use("/tasks", require("./routes/taskRoutes"));
app.use("/users", require("./routes/userRoutes")); // 🔥 ADD THIS

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
