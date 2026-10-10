import React from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ todo, onStatusChange, onDelete, onEdit }) => {
  const handleStatusChange = (e) => {
    onStatusChange(todo._id, e.target.value);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo._id);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      default:
        return 'status-pending';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className={`todo-item ${getStatusColor(todo.status)}`}>
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && <p className="todo-description">{todo.description}</p>}
        
        <div className="todo-meta">
          <span className={`priority-badge ${getPriorityColor(todo.priority)}`}>
            {todo.priority}
          </span>
          {todo.dueDate && (
            <span className="due-date">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
          <span className="created-date">
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="todo-actions">
        <select
          value={todo.status}
          onChange={handleStatusChange}
          className="status-select"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={() => onEdit(todo)} className="edit-btn">
          Edit
        </button>

        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
