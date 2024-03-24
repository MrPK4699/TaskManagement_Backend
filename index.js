const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { Mongo_url } = require("./config/config");

const app = express();

mongoose
  .connect(Mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Failed to Connect MongoDB ${err}`);
  });

app.use(express.json());
// Allow requests from localhost:3000 (your frontend) 
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors({ origin: 'https://6600101c95d53d000833f38f--taskmanagermrpk4699.netlify.app/' }));
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
