import React from "react";

const AddTaskForm = ({ newTask, setNewTask, handleCreateTask }) => {
  return (
    <form
      onSubmit={handleCreateTask}
      className="mb-8 flex flex-col items-center"
    >
      <input
        type="text"
        placeholder="Task Name"
        value={newTask.name}
        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-md"
      />
      <input
        type="text"
        placeholder="Task Description"
        value={newTask.description}
        onChange={(e) =>
          setNewTask({ ...newTask, description: e.target.value })
        }
        className="mb-4 p-2 border border-gray-300 rounded-md w-full max-w-md"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
