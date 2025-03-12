const express = require("express");
const router = express.Router();
const { 
  getTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  toggleImportant, 
  toggleCompleted 
} = require("../controllers/taskController");

// Task CRUD Routes
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

// Task Toggle Routes
router.put("/:id/important", toggleImportant);
router.put("/:id/completed", toggleCompleted);

module.exports = router;
