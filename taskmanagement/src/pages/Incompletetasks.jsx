import React from "react";
import Cards from "../components/Cards";

const IncompleteTasks = ({ tasks, toggleImportant, toggleCompleted }) => {
  // Show only tasks that are NOT completed
  const incompleteTasks = tasks.filter(task => !task.isCompleted);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Incomplete Tasks</h2>
      {incompleteTasks.length === 0 ? (
        <p className="text-gray-500">No incomplete tasks left. Good job! 🎉</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
          {incompleteTasks.map((task) => (
            <Cards 
              key={task.id} 
              title={task.title} 
              description={task.description} 
              date={task.date} 
              isImportant={task.isImportant} 
              isCompleted={task.isCompleted} 
              toggleImportant={() => toggleImportant(task.id)} 
              toggleCompleted={() => toggleCompleted(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IncompleteTasks;
