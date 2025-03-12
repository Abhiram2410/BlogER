import React, { useState } from "react";
import Cards from "../components/Cards";

const ImportantTasks = ({ toggleImportant, toggleCompleted, deleteTask }) => {
  // ✅ Add some predefined important tasks
  const [tasks, setTasks] = useState([
    {
      _id: "1",
      title: "Complete React Project",
      description: "React is completed",
      date: "2024-03-01",
      important: true,
      completed: false,
    },
    {
      _id: "2",
      title: "Surge Interview",
      description: "Revise react",
      date: "2024-03-02",
      important: true,
      completed: false,
    },
    {
      _id: "3",
      title: "Buy Groceries",
      description: "Milk, bread, eggs, vegetables.",
      date: "2024-03-03",
      important: true,
      completed: false,
    },
    {
      _id: "4",
      title: "Read AI Research Paper",
      description: "Study the latest AI advancements in deep learning.",
      date: "2024-03-04",
      important: true,
      completed: false,
    },
  ]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Important Tasks</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No important tasks available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
          {tasks.map(task => (
            <Cards 
              key={task._id}
              title={task.title}
              description={task.description}
              date={task.date}
              isImportant={task.important}
              isCompleted={task.completed}
              toggleImportant={() => toggleImportant(task._id)}
              toggleCompleted={() => toggleCompleted(task._id)}
              deleteTask={() => deleteTask(task._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImportantTasks;
