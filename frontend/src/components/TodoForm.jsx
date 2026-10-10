import React, { useState } from 'react';
import '../styles/TodoForm.css';

const TodoForm = ({ onAddTodo, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await onAddTodo(formData);
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
      });
    } catch (err) {
      setError(err.message || 'Failed to add todo');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h2>Create a New Todo</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter todo title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter todo description"
          rows="3"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
};

export default TodoForm;
