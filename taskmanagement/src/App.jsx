import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cards from "./components/Cards";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import navigation hook



const AllTasks = () => {
  const [tasks, setTasks] = useState([]); // Ensure tasks is always an array
  const [newTask, setNewTask] = useState({ title: "", description: "", date: "" });
  const modalRef = useRef(null); // Reference for modal

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      const fetchedTasks = response.data.tasks || []; // Ensure it's always an array
      setTasks(fetchedTasks);
      console.log("Fetched tasks:", fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]); // Ensure tasks remains an array even on failure
    }
  };

  useEffect(() => {
    fetchTasks(); // Fetch tasks after component mounts
  }, []);

  // Add a new task
  const addTask = async () => {
    try {
      if (!newTask.title.trim()) {
        alert("Title is required!");
        return;
      }

      const response = await axios.post("http://localhost:5000/api/tasks", newTask);

      if (response.status !== 201) {
        throw new Error("Failed to add task");
      }

      const task = response.data;
      console.log("New Task:", task);

      setTasks((prevTasks) => (Array.isArray(prevTasks) ? [...prevTasks, task] : [task]));

      // Reset newTask state
      setNewTask({ title: "", description: "", date: "" });

      // Hide modal after adding task
      modalRef.current.classList.add("hidden");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle important status
  const toggleImportant = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}/important`);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? response.data : task))
      );
    } catch (error) {
      console.error("Error updating importance:", error);
    }
  };


  const navigate = useNavigate();
  const toggleCompleted = async (id, isCompleted) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        completed: !isCompleted,
      });
  
      // Remove task from AllTasks when marked as completed
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
  
      // Redirect to CompletedTasks page when task is marked completed
      if (!isCompleted) {
        navigate("/completed-tasks");  // Correct absolute path
      }
      
    } catch (error) {
      console.error("Error updating completed status:", error);
    }
  };
  
    

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="w-36">
        <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>
        <p className="text-l font-semibold mb-4">Please complete your tasks :)</p>

        {/* Task Grid */}
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <Cards
              key={task._id}
              title={task.title}
              description={task.description}
              date={task.date}
              isImportant={task.isImportant}
              isCompleted={task.isCompleted}
              toggleImportant={() => toggleImportant(task._id)}
              toggleCompleted={() => toggleCompleted(task._id)}
              deleteTask={() => deleteTask(task._id)}
            />
          ))
        ) : (
          <p>No tasks available</p>
        )}

        {/* Add Task Button */}
        <div className="fixed bottom-6 right-6">
          <button
            className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-700"
            onClick={() => modalRef.current.classList.remove("hidden")}
          >
            <FaPlus size={24} />
          </button>
        </div>

        {/* Add Task Modal */}
        <div
          ref={modalRef}
          className="hidden fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Task</h3>
            <input
              type="text"
              placeholder="Title"
              className="w-full p-2 border mb-2"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border mb-2"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border mb-2"
              value={newTask.date}
              onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
            />
            <div className="flex justify-end">
              <button
                className="mr-2 bg-gray-300 px-4 py-2 rounded"
                onClick={() => modalRef.current.classList.add("hidden")}
              >
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={addTask}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;  