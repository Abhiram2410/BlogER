const Task = require("../models/task");

// @desc Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Create a new task
exports.createTask = async (req, res) => {
  const { title, description, date } = req.body;
  try {
    const newTask = new Task({ 
      title, 
      description, 
      date, 
      important: false, 
      completed: false 
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Update task details
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Toggle task importance
exports.toggleImportant = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.important = !task.important; // Toggle `important`
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error toggling important:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Toggle task completion
exports.toggleCompleted = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed; // Toggle `completed`
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error("Error toggling completed:", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
