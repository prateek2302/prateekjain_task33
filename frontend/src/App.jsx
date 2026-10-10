import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Filters from './components/Filters';
import EditModal from './components/EditModal';
import { todoAPI } from './services/todoAPI';
import './styles/App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (filters.status || filters.priority || filters.search) {
      fetchTodos();
    }
  }, [filters]);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const filterParams = {};
      if (filters.status) filterParams.status = filters.status;
      if (filters.priority) filterParams.priority = filters.priority;
      if (filters.search) filterParams.search = filters.search;

      const response = await todoAPI.getAllTodos(filterParams);
      setTodos(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (todoData) => {
    setLoading(true);
    try {
      const response = await todoAPI.createTodo(todoData);
      setTodos([response.data.data, ...todos]);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add todo');
      console.error('Error adding todo:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await todoAPI.updateStatus(id, status);
      setTodos(
        todos.map((todo) => (todo._id === id ? response.data.data : todo))
      );
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteTodo = async (id) => {
    setLoading(true);
    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete todo');
      console.error('Error deleting todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (updatedData) => {
    setLoading(true);
    try {
      const response = await todoAPI.updateTodo(editingTodo._id, updatedData);
      setTodos(
        todos.map((todo) =>
          todo._id === editingTodo._id ? response.data.data : todo
        )
      );
      setIsModalOpen(false);
      setEditingTodo(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update todo');
      console.error('Error updating todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (searchTerm) => {
    setFilters({ ...filters, search: searchTerm });
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Todo List App</h1>
        <p className="subtitle">Manage your tasks efficiently</p>
      </header>

      <main className="app-container">
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <div className="app-content">
          <div className="form-section">
            <TodoForm onAddTodo={handleAddTodo} loading={loading} />
          </div>

          <div className="list-section">
            <Filters
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              currentFilters={filters}
            />
            <TodoList
              todos={todos}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTodo}
              onEdit={handleEditTodo}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </main>

      {isModalOpen && editingTodo && (
        <EditModal
          todo={editingTodo}
          onSave={handleSaveEdit}
          onCancel={handleCloseModal}
          loading={loading}
        />
      )}
    </div>
  );
}

export default App;
