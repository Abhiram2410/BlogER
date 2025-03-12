import React from "react";
import { Link } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";

const Sidebar = () => {
  const data = [
    { title: "All Tasks", icon: <GrNotes />, path: "/all-tasks" },
    { title: "Important Tasks", icon: <LiaNotesMedicalSolid />, path: "/important-tasks" },
    { title: "Completed Tasks", icon: <FaCheckDouble />, path: "/completed-tasks" },
    { title: "Incomplete Tasks", icon: <TbNotebookOff />, path: "/incomplete-tasks" },
  ];

  return (
    <div className="w-1/6 h-screen bg-gray-900 text-white flex flex-col justify-between p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Task Management</h2>
        <h4 className="text-gray-400 text-sm mt-1">abc@gmail.com</h4>
      </div>

      {/* Task List */}
      <div className="flex flex-col space-y-5 flex-grow">
        {data.map((item, i) => (
          <Link
            key={i}
            to={item.path}
            className="flex items-center space-x-4 p-3 hover:bg-gray-700 rounded cursor-pointer text-lg"
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>

      {/* Logout Button */}
      <div>
        <button className="w-full bg-red-600 hover:bg-red-700 p-3 rounded text-white font-semibold">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
