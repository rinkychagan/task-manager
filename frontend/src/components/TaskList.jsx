import React, { useState } from "react";

const TaskList = ({ tasks, onUpdate, onDelete, onEdit, onComplete }) => {
  const [isEditing, setIsEditing] = useState(null);
  const [editedTask, setEditedTask] = useState({ name: "", description: "" });

  if (!tasks || tasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks available</p>;
  }

  const startEditing = (task) => {
    setIsEditing(task._id);
    setEditedTask({ name: task.name, description: task.description });
  };

  const handleEditSubmit = (e, task) => {
    e.preventDefault();
    onEdit(task._id, editedTask);
    setIsEditing(null);
  };

  const getRandomRotation = () => {
    return Math.floor(Math.random() * 10) - 5;
  };

  const randomColours = [
    "#EAEA88",
    "#C7BBDF",
    "#F59272",
    "#ADE9E9",
    "#F9C1CC",
    "#4DB19A",
  ];

  const getRandomColour = () => {
    return randomColours[Math.floor(Math.random() * randomColours.length)];
  };

  return (
    <div className="grid grid-cols-6 gap-2">
      {tasks.map((task) =>
        task ? (
          <div
            key={task._id}
            className="relative w-80 h-80 p-4 shadow-xl"
            style={{
              transform: `rotate(${getRandomRotation()}deg)`,
              backgroundColor: getRandomColour(),
            }}
          >
            {isEditing === task._id ? (
              <form
                onSubmit={(e) => handleEditSubmit(e, task)}
                className="space-y-4 h-full flex flex-col"
              >
                <input
                  type="text"
                  value={editedTask.name}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, name: e.target.value })
                  }
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <input
                  type="text"
                  value={editedTask.description}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      description: e.target.value,
                    })
                  }
                  className="p-2 border border-gray-300 rounded-md w-full"
                />
                <div className="flex space-x-2 mt-auto ">
                  <button
                    type="submit"
                    className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(null)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col h-full">
                <h2
                  className={`text-xl font-semibold ${
                    task.completed
                      ? "line-through text-gray-500 font-gochi"
                      : "text-black text-2xl font-gochi"
                  }`}
                >
                  {task.name}
                </h2>
                <div className="flex-grow overflow-auto mt-2">
                  <p className="text-black font-courier">{task.description}</p>
                </div>
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => startEditing(task)}
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  {!task.completed && (
                    <button
                      onClick={() => onComplete(task._id)}
                      className="p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                    >
                      Complete?
                    </button>
                  )}
                  <button
                    onClick={() => onDelete(task._id)}
                    className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null
      )}
    </div>
  );
};

export default TaskList;
