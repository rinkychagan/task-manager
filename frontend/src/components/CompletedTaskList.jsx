import React from "react";

const CompletedTaskList = ({ tasks, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <p className="text-center text-gray-500">No completed tasks available</p>
    );
  }

  const getRandomRotation = () => {
    return Math.floor(Math.random() * 10) - 5;
  };

  const randomColours = ["#9AE274", "#A8B83C", "#7EBF57"];

  const getRandomColour = () => {
    return randomColours[Math.floor(Math.random() * randomColours.length)];
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="relative w-80 h-80 p-4 shadow-xl"
          style={{
            transform: `rotate(${getRandomRotation()}deg)`,
            backgroundColor: getRandomColour(),
          }}
        >
          <h2 className="text-4xl font-semibold line-through text-black font-gochi">
            {task.name}
          </h2>
          <p className="text-black font-courier">{task.description}</p>
          <div className="flex space-x-2 mt-auto justify-center">
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTaskList;
