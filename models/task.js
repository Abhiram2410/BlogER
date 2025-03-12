const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  isImportant: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);
