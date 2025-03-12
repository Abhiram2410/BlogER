const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoute.js");

const app = express();
app.use(express.json());
app.use(cors());

// Use the tasks route
app.use("/api/tasks", taskRoutes);

// Fix the mongoose connection syntax
mongoose.connect("mongodb://127.0.0.1:27017/taskDB", {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
