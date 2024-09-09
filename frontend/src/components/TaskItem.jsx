import React from "react";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  return (
    <div>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <button onClick={() => onUpdate(task)}>
        Mark as {task.completed ? "Incomplete" : "Complete"}
      </button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
