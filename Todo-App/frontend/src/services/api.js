import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "/api"
});


// Get all tasks
export const getTasks = async () => {
  try {
    const response = await api.get("/tasks");
    return response.data;
  } catch (error) {
    console.log("Error fetching tasks:", error);
    throw error;
  }
};


// Add new task
export const addTask = async (task) => {
  try {
    const response = await api.post("/tasks", {
      title: task
    });
    return response.data;
  } catch (error) {
    console.log("Error adding task:", error);
    throw error;
  }
};


// Update task
export const updateTask = async (id, title) => {
  try {
    const response = await api.put(`/tasks/${id}`, {
      title: title
    });
    return response.data;
  } catch (error) {
    console.log("Error updating task:", error);
    throw error;
  }
};


// Toggle task
export const toggleTaskStatus = async (id) => {
  try {
    const response = await api.patch(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error toggling task:", error);
    throw error;
  }
};


// Delete task
export const deleteTaskById = async (id) => {
  try {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.log("Error deleting task:", error);
    throw error;
  }
};