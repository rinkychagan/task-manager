const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const createTask = async (task) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const updateTask = async (id, updatedTask) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

export const deleteTask = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const completeTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/complete/${id}`, {
      method: "PUT",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error completing task:", error);
  }
};

export const fetchCompletedTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/completed`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching completed tasks:", error);
  }
};

export const deleteCompletedTask = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tasks/completed-tasks/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error deleting completed task:", error);
  }
};
