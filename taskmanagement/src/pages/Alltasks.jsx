import React, { useState, useRef } from "react";
import Cards from "../components/Cards";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllTasks = ({ tasks, addTask, toggleImportant, toggleCompleted, deleteTask }) => {
  const [newTask, setNewTask] = useState({ title: "", description: "", date: "" });
  const [isModalOpen, setIsModalOpen] = useState(false); // Use state for modal visibility
  const navigate = useNavigate();

  // Handle new task addition
  const handleAddTask = () => {
    if (!newTask.title.trim()) {
      alert("Title is required!");
      return;
    }

    addTask(newTask);
    setNewTask({ title: "", description: "", date: "" });
    setIsModalOpen(false); // Close modal after adding task
  };

  return (
    <div className="w-full h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4">All Tasks</h2>
      <p className="text-lg font-semibold mb-4">Please complete your tasks :)</p>

      {/* Task List */}
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
            toggleCompleted={() => {
              toggleCompleted(task._id, task.isCompleted);
              if (!task.isCompleted) navigate("/completed-tasks");
            }}
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
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus size={24} />
        </button>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
              <button className="mr-2 bg-gray-300 px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddTask}>
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
  
