import React, { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import CompletedTaskList from "../components/CompletedTaskList";
import styles from "../styles/TaskPage.module.css";
import AddTaskForm from "../components/AddTaskForm";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
  fetchCompletedTasks,
} from "../services/taskService";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: "", description: "" });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer.filter((task) => !task.completed));
    };

    const getCompletedTasks = async () => {
      const completedTasksFromServer = await fetchCompletedTasks();
      setCompletedTasks(completedTasksFromServer);
    };

    getTasks();
    getCompletedTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const createdTask = await createTask(newTask);
    setTasks([...tasks, createdTask]);
    setNewTask({ name: "", description: "" });
  };

  const handleUpdateTask = async (task) => {
    const updatedTask = await updateTask(task._id, {
      ...task,
      completed: !task.completed,
    });
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const handleEditTask = async (id, updatedTaskData) => {
    const updatedTask = await updateTask(id, updatedTaskData);
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const handleCompleteTask = async (id) => {
    const completedTask = await completeTask(id);
    if (completedTask) {
      setTasks(tasks.filter((task) => task._id !== id));
      setCompletedTasks([...completedTasks, completedTask]);
    }
  };

  const tabs = [
    {
      id: 0,
      label: "Incomplete Tasks",
      content: (
        <TaskList
          tasks={tasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onComplete={handleCompleteTask}
        />
      ),
    },
    {
      id: 1,
      label: "Completed Tasks",
      content: (
        <CompletedTaskList tasks={completedTasks} onDelete={handleDeleteTask} />
      ),
    },
    {
      id: 2,
      label: "Add New Task",
      content: (
        <div className="flex justify-center items-center min-w-screen m-24 ">
          <form
            onSubmit={handleCreateTask}
            className="flex flex-col items-center justify-center space-y-4 bg-yellow-200 p-4 rounded-lg shadow-lg relative w-96 h-96"
          >
            <input
              type="text"
              placeholder="Task Name"
              value={newTask.name}
              onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
              className="p-2 border border-gray-300 rounded-md w-full bg-yellow-100"
            />
            <input
              type="text"
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md w-full bg-yellow-100"
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Task
            </button>
          </form>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pl-20 pr-20 pb-20 pt-4">
      <div className=" flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab px-4 py-2 text-gray-800 font-medium cursor-pointer transition-all  border-[#1E1E1E] ${
              styles.noise
            } ${
              activeTab === tab.id
                ? "bg-white border border-t border-r border-l rounded-t-lg border-[#1E1E1E]"
                : "bg-[#B3B9B7] border rounded-t-lg  border[#1E1E1E] "
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={`flex-grow  bg-[#B3B9B7] border border-[#1E1E1E] rounded-e-lg rounded-b-lg p-6 shadow-md ${styles.noise}`}
      >
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TaskPage;
