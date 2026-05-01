import axios from "axios";

const API = axios.create({
  baseURL: "https://team-task-manager-production-3608.up.railway.app/api",
});

// Token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// PROJECT APIs
export const getProjects = () => API.get("/projects");
export const createProject = (data) => API.post("/projects", data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// AUTH APIs
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);

// TASK APIs
export const createTask = (data) => API.post("/tasks", data);
export const getTasks = () => API.get("/tasks");
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

// USERS
export const getUsers = () => API.get("/users");

export default API;
