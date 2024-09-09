import React from "react";
import TaskItem from "./TaskItem";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  if (!tasks || tasks.length === 0) {
    return <p>No tasks available</p>;
  }

  return (
    <div>
      {tasks.map((task) =>
        task ? (
          <div key={task._id}>
            <h2>{task.name}</h2>
            <p>{task.description}</p>
            <button onClick={() => onUpdate(task)}>Update</button>
            <button onClick={() => onDelete(task._id)}>Delete</button>
          </div>
        ) : null
      )}
    </div>
  );
};

export default TaskList;
