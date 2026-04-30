import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

//  Token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
export const getProjects = () => API.get("/projects");
export const createProject = (data) => API.post("/projects", data);
// AUTH APIs
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);

//  TASK APIs
export const createTask = (data) => API.post("/tasks", data);
export const getTasks = () => API.get("/tasks");
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const deleteProject = (id) => API.delete(`/projects/${id}`);
export const getUsers = () => API.get("/users");

export default API;
