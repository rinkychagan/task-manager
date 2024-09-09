const API_URL = "http://localhost:5000/api/tasks";

export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
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

    if (data && data._id) {
      console.log("Task created with ID:", data._id);
    } else {
      console.error("Unexpected response format:", data);
    }

    return data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const updateTask = async (id, updatedTask) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
  const data = await response.json();
  return data;
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};
