import React from "react";
import { FaStar, FaCheck, FaTrash } from "react-icons/fa";

const Cards = ({ title, description, date, isImportant, isCompleted, toggleImportant, toggleCompleted, deleteTask }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-lg w-72 relative transition-transform duration-300 hover:scale-105 ${isCompleted ? "opacity-70" : ""}`}>
      <h3 className={`text-lg font-semibold ${isImportant ? "text-yellow-500" : "text-black"}`}>{title}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="text-gray-400 text-sm">Due: {date}</p>

      <div className="flex justify-between mt-4">
        <button 
          onClick={toggleImportant} 
          className="text-gray-500 hover:text-yellow-500 focus:outline-none"
          aria-label="Mark as important"
        >
          <FaStar size={20} className={isImportant ? "text-yellow-500" : ""} />
        </button>
        <button 
          onClick={toggleCompleted} 
          className="text-gray-500 hover:text-green-500 focus:outline-none"
          aria-label="Mark as completed"
        >
          <FaCheck size={20} className={isCompleted ? "text-green-500" : ""} />
        </button>
        <button 
          onClick={deleteTask} 
          className="text-red-500 hover:text-red-700 focus:outline-none"
          aria-label="Delete task"
        >
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
};

export default Cards;
