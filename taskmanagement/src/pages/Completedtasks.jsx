import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([
    {
      _id: "1",
      title: "Surge",
      description: "Surge is located in Bangalore",
      completed: true,
    },
    {
      _id: "2",
      title: "Finished the Project",
      description: "The given task manager is completed",
      completed: true,
    },
  ]);
  
  const navigate = useNavigate(); 

  // Fetch completed tasks from the backend
  const fetchCompletedTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      console.log("API Response:", response.data);

      const tasks = response.data.tasks || response.data;
      if (!Array.isArray(tasks)) throw new Error("Invalid API response format");

      // Filter completed tasks and add them to the existing manual tasks
      setCompletedTasks(prevTasks => [
        ...prevTasks, 
        ...tasks.filter(task => task.completed)
      ]);
    } catch (error) {
      console.error("Error fetching completed tasks:", error);
    }
  };

  // Function to toggle task completion
  const toggleCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        completed: false, 
      });

      setCompletedTasks(prevTasks => prevTasks.filter(task => task._id !== id));
      navigate("/"); 
    } catch (error) {
      console.error("Error updating completed status:", error);
    }
  };

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Completed Tasks</h2>
      {completedTasks.length === 0 ? (
        <p className="text-gray-500">No completed tasks yet.</p>
      ) : (
        <ul>
          {completedTasks.map(task => (
            <li key={task._id} className="p-3 border-b flex justify-between items-center">
              <div>
                <span className="line-through text-gray-500 font-semibold">{task.title}</span>
                <p className="text-sm text-gray-400">{task.description}</p>
              </div>
              <button onClick={() => toggleCompleted(task._id)} className="text-green-500 text-xl">
                ✔
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTasks;
