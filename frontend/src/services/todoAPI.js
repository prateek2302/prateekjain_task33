import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const todoAPI = {
  getAllTodos: (filters = {}) =>
    axiosInstance.get('/todos', { params: filters }),
  
  getTodoById: (id) =>
    axiosInstance.get(`/todos/${id}`),
  
  createTodo: (todoData) =>
    axiosInstance.post('/todos', todoData),
  
  updateTodo: (id, todoData) =>
    axiosInstance.put(`/todos/${id}`, todoData),
  
  deleteTodo: (id) =>
    axiosInstance.delete(`/todos/${id}`),
  
  updateStatus: (id, status) =>
    axiosInstance.patch(`/todos/${id}/status`, { status }),
};

export default axiosInstance;
