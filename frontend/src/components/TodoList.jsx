import React from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

const TodoList = ({ todos, onStatusChange, onDelete, onEdit, loading, error }) => {
  if (loading) {
    return <div className="todo-list loading">Loading todos...</div>;
  }

  if (error) {
    return <div className="todo-list error">Error: {error}</div>;
  }

  if (!todos || todos.length === 0) {
    return <div className="todo-list empty">No todos found. Create one to get started!</div>;
  }

  return (
    <div className="todo-list">
      <h2>Your Todos ({todos.length})</h2>
      <div className="todos-container">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
