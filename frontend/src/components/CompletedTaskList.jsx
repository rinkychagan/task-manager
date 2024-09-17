import React from "react";
import { MdDelete } from "react-icons/md";

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
    <div className="grid grid-cols-5 gap-2">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="relative w-80 h-80 p-4 shadow-xl overflow-hidden"
          style={{
            transform: `rotate(${getRandomRotation()}deg)`,
            backgroundColor: getRandomColour(),
          }}
        >
          <h2 className="text-4xl font-semibold line-through text-black font-gochi overflow-hidden">
            {task.name}
          </h2>
          <p className="text-black font-courier overflow-auto h-48">
            {task.description}
          </p>
          <div className="flex space-x-2 mt-2 justify-center">
            <button
              onClick={() => onDelete(task._id)}
              className="p-2 text-black rounded-md hover:text-gray-800"
            >
              <MdDelete />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedTaskList;
